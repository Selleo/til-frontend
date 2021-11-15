defmodule TilWeb.UserControllerTest do
  use TilWeb.ConnCase
  import Til.Factory
  import Til.Guardian

  describe "GET /api/users" do
    test "returns all users as public", %{conn: conn} do
      first_user = insert(:user)
      second_user = insert(:user)

      response =
        conn
        |> get(Routes.user_path(conn, :index))

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert response.status == 200

      [first_responded_user, second_responded_user] = parsed_response_body

      assert first_responded_user["uuid"] == first_user.uuid
      assert second_responded_user["uuid"] == second_user.uuid
      assert first_responded_user["firstName"] == first_user.first_name
      assert second_responded_user["firstName"] == second_user.first_name
      assert first_responded_user["email"] == first_user.email
      assert second_responded_user["email"] == second_user.email
      assert first_responded_user["lastName"] == first_user.last_name
      assert second_responded_user["lastName"] == second_user.last_name
      assert first_responded_user["userName"] == first_user.username
      assert second_responded_user["userName"] == second_user.username
    end
  end

  describe "GET /api/users/:id" do
    test "returns particular user with only public posts when no authenticated", %{conn: conn} do
      user = insert(:user)
      insert(:post, title: "public post", author: user, is_public: true, reviewed: true)
      insert(:post, author: user, is_public: false, reviewed: true)

      response =
        conn
        |> get(Routes.user_path(conn, :show, user.username))

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert response.status == 200

      assert parsed_response_body["uuid"] == user.uuid
      assert parsed_response_body["firstName"] == user.first_name
      assert parsed_response_body["email"] == user.email
      assert parsed_response_body["lastName"] == user.last_name
      assert parsed_response_body["userName"] == user.username

      assert length(parsed_response_body["posts"]["posts"]) == 1

      [post] = parsed_response_body["posts"]["posts"]

      assert post["title"] == "public post"
    end

    test "returns particular user with all reviewed posts when authenticated", %{conn: conn} do
      user = insert(:user)
      {:ok, token, _} = encode_and_sign(user.uuid, %{})
      insert(:post, title: "public post", author: user, is_public: true, reviewed: true)
      insert(:post, author: user, is_public: false, reviewed: true)


      insert(:post, reviewed: true, is_public: false, title: "internal reviewed post")

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> get(Routes.user_path(conn, :show, user.username))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert length(parsed_response_body["posts"]["posts"]) == 2
    end

    test "paginates posts properly", %{conn: conn} do
      user = insert(:user)
      {:ok, token, _} = encode_and_sign(user.uuid, %{})

      now = DateTime.utc_now()
      created_posts = Enum.map(0..65,
        fn num -> insert(:post, author: user, reviewed: true, is_public: true, inserted_at: DateTime.add(now, num, :second)) end
      )

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> get(Routes.user_path(conn, :show, user.username))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      %{ "posts" => posts } = parsed_response_body

      assert posts["pageNumber"] == 1
      assert posts["pageSize"] == 20
      assert posts["totalEntries"] == 66
      assert posts["totalPages"] == 4
      assert length(posts["posts"]) == 20
      assert Enum.at(posts["posts"], 0)["id"] == Enum.at(created_posts, 65).id
      assert Enum.at(posts["posts"], 19)["id"] == Enum.at(created_posts, 46).id

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> get(Routes.user_path(conn, :show, user.username, page: 2, page_size: 40))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      %{ "posts" => posts } = parsed_response_body

      assert posts["pageNumber"] == 2
      assert posts["pageSize"] == 40
      assert posts["totalEntries"] == 66
      assert posts["totalPages"] == 2
      assert length(posts["posts"]) == 26
      assert Enum.at(posts["posts"], 0)["id"] == Enum.at(created_posts, 25).id
      assert Enum.at(posts["posts"], 25)["id"] == Enum.at(created_posts, 0).id

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> get(Routes.user_path(conn, :show, user.username, page: 2))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      %{ "posts" => posts } = parsed_response_body

      assert posts["pageNumber"] == 2
      assert posts["pageSize"] == 20
      assert posts["totalEntries"] == 66
      assert posts["totalPages"] == 4
      assert length(posts["posts"]) == 20
      assert Enum.at(posts["posts"], 0)["id"] == Enum.at(created_posts, 45).id
      assert Enum.at(posts["posts"], 19)["id"] == Enum.at(created_posts, 26).id
    end
  end
end
