defmodule TilWeb.CategoryControllerTest do
  use TilWeb.ConnCase
  import Til.Factory
  import Til.Guardian

  describe "GET /api/categories" do
    test "returns all existing categories as public", %{conn: conn} do
      first_category = insert(:category, name: "Elixir", url: "https://somepage.com", first_text: "First text", second_text: "Second text")
      second_category = insert(:category, name: "Javascript", url: "https://somepage.com", first_text: "First text", second_text: "Second text")

      response =
        conn
        |> get(Routes.category_path(conn, :index))

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert response.status == 200

      [first_responded_category, second_responded_category] = parsed_response_body

      assert length(parsed_response_body) == 2

      assert first_responded_category["name"] == first_category.name
      assert first_responded_category["url"] == first_category.url
      assert first_responded_category["firstText"] == first_category.first_text
      assert first_responded_category["secondText"] == first_category.second_text
      assert second_responded_category["name"] == second_category.name
      assert second_responded_category["url"] == second_category.url
      assert second_responded_category["firstText"] == second_category.first_text
      assert second_responded_category["secondText"] == second_category.second_text
    end
  end

  describe "GET /api/categories/:id" do
    test "returns category with only reviewed and public assigned posts when not authenticated", %{conn: conn} do
      first_post = insert(:post, title: "first post", reviewed: true, is_public: true)
      second_post = insert(:post, title: "second post", reviewed: true, is_public: true)
      third_post = insert(:post, title: "third post", reviewed: true, is_public: false)
      fourth_post = insert(:post, title: "fourth post", reviewed: false, is_public: true)

      first_category = insert(:category, name: "Elixir")

      insert(:post_category, post_id: first_post.id, category_id: first_category.id)
      insert(:post_category, post_id: second_post.id, category_id: first_category.id)
      insert(:post_category, post_id: third_post.id, category_id: first_category.id)

      response =
        conn
        |> get(Routes.category_path(conn, :show, first_category.id))

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert response.status == 200

      %{ "posts" => posts } = parsed_response_body

      assert length(posts["posts"]) == 2

      [first_responded_post, second_responded_post] = posts["posts"]

      assert first_responded_post["title"] == first_post.title
      assert second_responded_post["title"] == second_post.title
    end

    test "returns category with posts sorted correctly (desc by inserted_at)", %{conn: conn} do
      now = DateTime.utc_now()
      first_post = insert(:post, title: "first post", reviewed: true, is_public: true, inserted_at: now)
      second_post = insert(:post, title: "second post", reviewed: true, is_public: true, inserted_at: DateTime.add(now, 1, :second))
      third_post = insert(:post, title: "third post", reviewed: true, is_public: true, inserted_at: DateTime.add(now, 2, :second))
      fourth_post = insert(:post, title: "fourth post", reviewed: true, is_public: true, inserted_at: DateTime.add(now, 3, :second))

      first_category = insert(:category, name: "Elixir")

      insert(:post_category, post_id: first_post.id, category_id: first_category.id)
      insert(:post_category, post_id: second_post.id, category_id: first_category.id)
      insert(:post_category, post_id: third_post.id, category_id: first_category.id)
      insert(:post_category, post_id: fourth_post.id, category_id: first_category.id)

      response =
        conn
        |> get(Routes.category_path(conn, :show, first_category.id))

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert response.status == 200

      %{ "posts" => posts } = parsed_response_body

      assert length(posts["posts"]) == 4

      [first_responded_post, second_responded_post, third_responded_post, fourth_respondend_post] = posts["posts"]

      assert first_responded_post["title"] == fourth_post.title
      assert second_responded_post["title"] == third_post.title
      assert third_responded_post["title"] == second_post.title
      assert fourth_respondend_post["title"] == first_post.title
    end

    test "paginates posts in category properly", %{conn: conn} do
      first_category = insert(:category, name: "Elixir")
      now = DateTime.utc_now()
      created_posts = Enum.map(0..65, fn num -> insert(:post, reviewed: true, is_public: true, inserted_at: DateTime.add(now, num, :second)) end)
      Enum.each(0..65, fn num -> insert(:post_category, post_id: Enum.at(created_posts, num).id, category_id: first_category.id) end)

      response =
        conn
        |> get(Routes.category_path(conn, :show, first_category.id))

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert response.status == 200

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
        |> get(Routes.category_path(conn, :show, first_category.id, page: 2, page_size: 40))

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert response.status == 200

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
        |> get(Routes.category_path(conn, :show, first_category.id, page: 2))

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert response.status == 200

      %{ "posts" => posts } = parsed_response_body

      assert posts["pageNumber"] == 2
      assert posts["pageSize"] == 20
      assert posts["totalEntries"] == 66
      assert posts["totalPages"] == 4
      assert length(posts["posts"]) == 20
      assert Enum.at(posts["posts"], 0)["id"] == Enum.at(created_posts, 45).id
      assert Enum.at(posts["posts"], 19)["id"] == Enum.at(created_posts, 26).id
    end

    test "returns category with only reviewed posts when authenticated", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      first_post = insert(:post, title: "first post", reviewed: true, is_public: true)
      second_post = insert(:post, title: "second post", reviewed: true, is_public: true)
      third_post = insert(:post, title: "third post", reviewed: true, is_public: false)
      fourth_post = insert(:post, title: "fourth post", reviewed: false, is_public: true)

      first_category = insert(:category, name: "Elixir")

      insert(:post_category, post_id: first_post.id, category_id: first_category.id)
      insert(:post_category, post_id: second_post.id, category_id: first_category.id)
      insert(:post_category, post_id: third_post.id, category_id: first_category.id)
      insert(:post_category, post_id: fourth_post.id, category_id: first_category.id)

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> get(Routes.category_path(conn, :show, first_category.id))

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert response.status == 200

      %{ "posts" => posts } = parsed_response_body

      assert length(posts["posts"]) == 3

      [first_responded_post, second_responded_post, third_responded_post] = posts["posts"]

      assert first_responded_post["title"] == first_post.title
      assert second_responded_post["title"] == second_post.title
      assert third_responded_post["title"] == third_post.title
    end
  end
end
