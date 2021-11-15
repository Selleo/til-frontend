defmodule TilWeb.MeControllerTest do
  use TilWeb.ConnCase
  import Til.Factory
  import Til.Guardian

  describe "GET /api/me" do
    test "returns current user with all posts", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      insert(:post, author: current_user, is_public: true)
      insert(:post, author: current_user, is_public: false)

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> get(Routes.me_path(conn, :index))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert parsed_response_body["uuid"] == current_user.uuid
      assert parsed_response_body["email"] == current_user.email
      assert parsed_response_body["firstName"] == current_user.first_name
      assert parsed_response_body["lastName"] == current_user.last_name
      assert parsed_response_body["image"] == current_user.image
      assert length(parsed_response_body["posts"]["posts"]) == 2
    end

    test "paginates posts properly", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      now = DateTime.utc_now()
      created_posts = Enum.map(0..65,
        fn num -> insert(:post, author: current_user, reviewed: true, is_public: true, inserted_at: DateTime.add(now, num, :second)) end
      )

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> get(Routes.me_path(conn, :index))

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
        |> get(Routes.me_path(conn, :index, page: 2, page_size: 40))

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
        |> get(Routes.me_path(conn, :index, page: 2))

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

    test "throws error when not authenticated", %{conn: conn} do
      response =
        conn
        |> get(Routes.me_path(conn, :index))

      assert response.status == 401

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert parsed_response_body == %{"errors" => %{"detail" => "unauthenticated"}}
    end
  end
end
