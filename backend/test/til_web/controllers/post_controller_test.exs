defmodule TilWeb.PostControllerTest do
  use TilWeb.ConnCase
  import Til.Guardian
  import Til.Factory
  alias Til.Repo
  alias Til.ShareableContent.Post

  describe "GET /api/posts" do
    test "returns only public posts", %{conn: conn} do
      insert(:post, title: "public post")
      insert(:post, is_public: false)

      response =
        conn
        |> get(Routes.post_path(conn, :index))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert length(parsed_response_body) == 1

      [post] = parsed_response_body
      assert post["title"] == "public post"
    end

    test "returns posts with categories", %{conn: conn} do
      first_category = insert(:category, name: "Elixir")
      second_category = insert(:category, name: "Javascript")

      insert(:post, categories: [first_category, second_category])
      insert(:post, categories: [first_category])

      response =
        conn
        |> get(Routes.post_path(conn, :index))


      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      [first_post, second_post] = parsed_response_body

      assert first_post["categoryIds"] == [first_category.id, second_category.id]
      assert second_post["categoryIds"] == [first_category.id]
    end

    test "returns all existing posts with proper reaction count", %{conn: conn} do
      first_user = insert(:user)
      second_user = insert(:user)

      first_post = insert(:post, is_public: true)
      second_post = insert(:post, is_public: true)

      insert(:reaction, user_id: first_user.id, post_id: first_post.id)
      insert(:reaction, user_id: second_user.id, post_id: first_post.id)
      insert(:reaction, user_id: first_user.id, post_id: second_post.id)

      response =
        conn
        |> get(Routes.post_path(conn, :index))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      [first_responded_post, second_responded_post] = parsed_response_body

      assert first_responded_post["reactionCount"] == 2
      assert second_responded_post["reactionCount"] == 1
    end

    test "returns all existing posts with proper reactions", %{conn: conn} do
      first_user = insert(:user)
      second_user = insert(:user)

      first_post = insert(:post)
      second_post = insert(:post)

      insert(:reaction, user_id: first_user.id, post_id: first_post.id)
      insert(:reaction, user_id: second_user.id, post_id: first_post.id)
      insert(:reaction, user_id: first_user.id, post_id: second_post.id)

      response =
        conn
        |> get(Routes.post_path(conn, :index))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      [first_responded_post, second_responded_post] = parsed_response_body

      [first_responded_reaction, second_responded_reaction] = first_responded_post["reactions"]
      [third_responded_reaction] = second_responded_post["reactions"]

      assert first_responded_reaction["user_uuid"] == first_user.uuid
      assert first_responded_reaction["post_id"] == first_post.id
      assert first_responded_reaction["user_id"] == nil

      assert second_responded_reaction["user_uuid"] == second_user.uuid
      assert second_responded_reaction["post_id"] == first_post.id
      assert second_responded_reaction["user_id"] == nil

      assert third_responded_reaction["user_uuid"] == first_user.uuid
      assert third_responded_reaction["post_id"] == second_post.id
      assert third_responded_reaction["user_id"] == nil
    end
  end

  describe "GET /api/posts/:id" do
    test "returns particular post if public", %{conn: conn} do
      post = insert(:post, title: "public post")

      response =
        conn
        |> get(Routes.post_path(conn, :show, post.id))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert parsed_response_body["title"] == "public post"
    end

    test "returns particular post with categories", %{conn: conn} do
      first_category = insert(:category, name: "Elixir")
      second_category = insert(:category, name: "Javascript")
      post_title = "Some post"

      post = insert(:post, title: post_title, categories: [first_category, second_category])

      response =
        conn
        |> get(Routes.post_path(conn, :show, post.id))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert parsed_response_body["title"] == post_title
      assert parsed_response_body["categoryIds"] == [first_category.id, second_category.id]
    end

    test "returns particular post with proper reaction count", %{conn: conn} do
      first_user = insert(:user)
      second_user = insert(:user)

      post = insert(:post)

      first_reaction = insert(:reaction, user_id: first_user.id, post_id: post.id)
      second_reaction = insert(:reaction, user_id: second_user.id, post_id: post.id)

      response =
        conn
        |> get(Routes.post_path(conn, :show, post.id))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert parsed_response_body["reactionCount"] == 2
    end

    test "returns particular post with proper reactions data", %{conn: conn} do
      first_user = insert(:user)
      second_user = insert(:user)

      post = insert(:post)

      insert(:reaction, user_id: first_user.id, post_id: post.id, type: "like")
      insert(:reaction, user_id: second_user.id, post_id: post.id, type: "love")

      response =
        conn
        |> get(Routes.post_path(conn, :show, post.id))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      [first_responded_reaction, second_responded_reaction] = parsed_response_body["reactions"]

      assert first_responded_reaction["user_uuid"] == first_user.uuid
      assert first_responded_reaction["post_id"] == post.id
      assert first_responded_reaction["user_id"] == nil
      assert first_responded_reaction["type"] == "like"

      assert second_responded_reaction["user_uuid"] == second_user.uuid
      assert second_responded_reaction["post_id"] == post.id
      assert second_responded_reaction["user_id"] == nil
      assert second_responded_reaction["type"] == "love"
    end

    test "does not return particular post if not public", %{conn: conn} do
      post = insert(:post, is_public: false)

      response =
        conn
        |> get(Routes.post_path(conn, :show, post.id))

      assert response.status == 400

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert parsed_response_body == %{"error" => %{"message" => "not found"}}
    end
  end

  describe "POST /api/posts" do
    test "creates post and returns 201 status with created post", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      post_title = "Some post title"
      post_body = "Some post body"

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> post(Routes.post_path(conn, :create), %{
          title: post_title,
          body: post_body,
          categoryIds: []
        })

      assert response.status == 201

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      created_post = Repo.get_by(Post, title: post_title)

      assert created_post.title == post_title
      assert created_post.body == post_body

      assert parsed_response_body["title"] == post_title
      assert parsed_response_body["body"] == post_body
      assert parsed_response_body["author"]["email"] == current_user.email
    end

    test "creates post with proper categories", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      post_title = "Some post title"

      first_category = insert(:category, name: "Elixir")
      second_category = insert(:category, name: "Javascript")
      insert(:category, name: "Machine Learning")

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> post(Routes.post_path(conn, :create), %{
          title: post_title,
          categoryIds: [first_category.id, second_category.id]
        })

      assert response.status == 201

      %{categories: categories} = Repo.get_by(Post, title: post_title) |> Repo.preload([:categories])

      assert length(categories) == 2

      [post_first_category, post_last_category] = categories

      assert post_first_category.id == first_category.id
      assert post_last_category.id == second_category.id
    end

    test "throws 400 error when lack of title", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      post_body = "Some post body"

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> post(Routes.post_path(conn, :create), %{
          body: post_body,
          categories_ids: []
        })

      assert response.status == 400

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert not is_nil parsed_response_body["errors"]
    end

    test "throws 401 error when not authenticated", %{conn: conn} do
      post_body = "Some post body"

      response =
        conn
        |> post(Routes.post_path(conn, :create), %{
          body: post_body,
          categories_ids: []
        })

      assert response.status == 401

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert not is_nil parsed_response_body["message"] == "unauthenticated"
    end
  end
end
