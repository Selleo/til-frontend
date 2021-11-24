defmodule TilWeb.PostControllerTest do
  use TilWeb.ConnCase
  import Til.Guardian
  import Til.Factory
  alias Til.Repo
  alias Til.ShareableContent.{Post, Category}

  describe "GET /api/posts" do
    test "returns only public and reviewed posts for unauthenticated users", %{conn: conn} do
      first_post = insert(:post, title: "public post", is_public: true, reviewed: true)
      insert(:post, is_public: false, reviewed: false)
      insert(:post, is_public: false, reviewed: true)
      insert(:post, is_public: true, reviewed: false)

      response =
        conn
        |> get(Routes.post_path(conn, :index))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert length(parsed_response_body["data"]) == 1
      [post] = parsed_response_body["data"]
      assert post["title"] == "public post"
      assert post["createdAt"] != nil
    end

    test "returns only reviewed posts for authenticated users", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      insert(:post, title: "public reviewed post", is_public: true, reviewed: true)
      insert(:post, title: "internal reviewed post", is_public: false, reviewed: true)
      insert(:post, is_public: true, reviewed: false)
      insert(:post, is_public: false, reviewed: false)

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> get(Routes.post_path(conn, :index))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert length(parsed_response_body["data"]) == 2
      [first_post, second_post] = parsed_response_body["data"]
      assert first_post["title"] == "public reviewed post"
      assert second_post["title"] == "internal reviewed post"
    end

    test "returns posts with categories sorted by position", %{conn: conn} do
      first_category = insert(:category, name: "Elixir")
      second_category = insert(:category, name: "Javascript")
      third_category = insert(:category, name: "Commandline", url: "https://someurl.com")
      fourth_category = insert(:category, name: "Rails")
      fifth_category = insert(:category, name: "Postgres")

      first_post = insert(:post, reviewed: true)
      second_post = insert(:post, reviewed: true)

      insert(:post_category, post_id: first_post.id, category_id: fifth_category.id, position: 5)
      insert(:post_category, post_id: first_post.id, category_id: fourth_category.id, position: 4)
      insert(:post_category, post_id: first_post.id, category_id: second_category.id, position: 2)
      insert(:post_category, post_id: first_post.id, category_id: third_category.id, position: 3)
      insert(:post_category, post_id: first_post.id, category_id: first_category.id, position: 1)

      insert(:post_category, post_id: second_post.id, category_id: first_category.id, position: 1)

      response =
        conn
        |> get(Routes.post_path(conn, :index))


      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      [first_post, second_post] = parsed_response_body["data"]
      assert first_post["categories"] == [
        %{"id" => first_category.id, "name" => first_category.name, "url" => first_category.url, "firstText" => first_category.first_text, "secondText" => first_category.second_text, "position" => 1},
        %{"id" => second_category.id, "name" => second_category.name, "url" => second_category.url, "firstText" => second_category.first_text, "secondText" => second_category.second_text, "position" => 2},
        %{"id" => third_category.id, "name" => third_category.name, "url" => third_category.url, "firstText" => third_category.first_text, "secondText" => third_category.second_text, "position" => 3},
        %{"id" => fourth_category.id, "name" => fourth_category.name, "url" => fourth_category.url, "firstText" => fourth_category.first_text, "secondText" => fourth_category.second_text, "position" => 4},
        %{"id" => fifth_category.id, "name" => fifth_category.name, "url" => fifth_category.url, "firstText" => fifth_category.first_text, "secondText" => fifth_category.second_text, "position" => 5}
      ]
      assert second_post["categories"] == [
        %{"id" => first_category.id, "name" => first_category.name, "url" => first_category.url, "firstText" => first_category.first_text, "secondText" => first_category.second_text, "position" => 1},
      ]
    end

    test "returns all existing posts with proper reaction count", %{conn: conn} do
      first_user = insert(:user)
      second_user = insert(:user)

      first_post = insert(:post, reviewed: true, is_public: true)
      second_post = insert(:post, reviewed: true, is_public: true)

      insert(:reaction, user_id: first_user.id, post_id: first_post.id)
      insert(:reaction, user_id: second_user.id, post_id: first_post.id)
      insert(:reaction, user_id: first_user.id, post_id: second_post.id)

      response =
        conn
        |> get(Routes.post_path(conn, :index))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      [first_responded_post, second_responded_post] = parsed_response_body["data"]
      assert first_responded_post["reactionCount"] == 2
      assert second_responded_post["reactionCount"] == 1
    end

    test "returns all existing posts with proper reactions", %{conn: conn} do
      first_user = insert(:user)
      second_user = insert(:user)

      first_post = insert(:post, reviewed: true)
      second_post = insert(:post, reviewed: true)

      insert(:reaction, user_id: first_user.id, post_id: first_post.id)
      insert(:reaction, user_id: second_user.id, post_id: first_post.id)
      insert(:reaction, user_id: first_user.id, post_id: second_post.id)

      response =
        conn
        |> get(Routes.post_path(conn, :index))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      [first_responded_post, second_responded_post] = parsed_response_body["data"]

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

    test "paginates posts properly with proper sorting from newest to oldest", %{conn: conn} do
      now = DateTime.utc_now()
      records = Enum.map(0..65, fn num -> insert(:post, reviewed: true, is_public: true, inserted_at: DateTime.add(now, num, :second)) end)

      response =
        conn
        |> get(Routes.post_path(conn, :index))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert parsed_response_body["pageNumber"] == 1
      assert parsed_response_body["pageSize"] == 20
      assert parsed_response_body["totalEntries"] == 66
      assert parsed_response_body["totalPages"] == 4
      assert length(parsed_response_body["data"]) == 20
      assert Enum.at(parsed_response_body["data"], 0)["id"] == Enum.at(records, 65).id
      assert Enum.at(parsed_response_body["data"], 19)["id"] == Enum.at(records, 46).id

      response =
        conn
        |> get(Routes.post_path(conn, :index, page: 2))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert parsed_response_body["pageNumber"] == 2
      assert parsed_response_body["pageSize"] == 20
      assert parsed_response_body["totalEntries"] == 66
      assert parsed_response_body["totalPages"] == 4
      assert length(parsed_response_body["data"]) == 20
      assert Enum.at(parsed_response_body["data"], 0)["id"] == Enum.at(records, 45).id
      assert Enum.at(parsed_response_body["data"], 19)["id"] == Enum.at(records, 26).id

      response =
        conn
        |> get(Routes.post_path(conn, :index, page: 2, page_size: 40))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert parsed_response_body["pageNumber"] == 2
      assert parsed_response_body["pageSize"] == 40
      assert parsed_response_body["totalEntries"] == 66
      assert parsed_response_body["totalPages"] == 2
      assert length(parsed_response_body["data"]) == 26
      assert Enum.at(parsed_response_body["data"], 0)["id"] == Enum.at(records, 25).id
      assert Enum.at(parsed_response_body["data"], 25)["id"] == Enum.at(records, 0).id
    end

    test "paginates posts properly with proper sorting from newest to oldest during search", %{conn: conn} do
      now = DateTime.utc_now()
      records = Enum.map(0..65, fn num -> insert(:post, reviewed: true, is_public: true, inserted_at: DateTime.add(now, num, :second)) end)

      response =
        conn
        |> get(Routes.post_path(conn, :index, q: "post-title-"))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert parsed_response_body["pageNumber"] == 1
      assert parsed_response_body["pageSize"] == 20
      assert parsed_response_body["totalEntries"] == 66
      assert parsed_response_body["totalPages"] == 4
      assert length(parsed_response_body["data"]) == 20
      assert Enum.at(parsed_response_body["data"], 0)["id"] == Enum.at(records, 65).id
      assert Enum.at(parsed_response_body["data"], 19)["id"] == Enum.at(records, 46).id

      response =
        conn
        |> get(Routes.post_path(conn, :index, page: 2, q: "post-title-"))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert parsed_response_body["pageNumber"] == 2
      assert parsed_response_body["pageSize"] == 20
      assert parsed_response_body["totalEntries"] == 66
      assert parsed_response_body["totalPages"] == 4
      assert length(parsed_response_body["data"]) == 20
      assert Enum.at(parsed_response_body["data"], 0)["id"] == Enum.at(records, 45).id
      assert Enum.at(parsed_response_body["data"], 19)["id"] == Enum.at(records, 26).id

      response =
        conn
        |> get(Routes.post_path(conn, :index, page: 2, page_size: 40, q: "post-title-"))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert parsed_response_body["pageNumber"] == 2
      assert parsed_response_body["pageSize"] == 40
      assert parsed_response_body["totalEntries"] == 66
      assert parsed_response_body["totalPages"] == 2
      assert length(parsed_response_body["data"]) == 26
      assert Enum.at(parsed_response_body["data"], 0)["id"] == Enum.at(records, 25).id
      assert Enum.at(parsed_response_body["data"], 25)["id"] == Enum.at(records, 0).id

      response =
        conn
        |> get(Routes.post_path(conn, :index, page: 1, page_size: 20, q: Enum.at(records, 0).title))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert parsed_response_body["pageNumber"] == 1
      assert parsed_response_body["pageSize"] == 20
      assert parsed_response_body["totalEntries"] == 1
      assert parsed_response_body["totalPages"] == 1
      assert length(parsed_response_body["data"]) == 1
    end

    test "searches properly with post title > author name > category name > post body priority", %{conn: conn} do
      first_user = insert(:user, first_name: "Bruce", last_name: "Wayne")
      second_user = insert(:user, first_name: "Peter", last_name: "Parker")

      # No fit at all
      insert(:post, title: "No fit title 5", body: "no fit body", author: second_user, reviewed: true)
      # Only fit for post body
      insert(:post, title: "No fit title 4", body: "Bruce post body", author: second_user, reviewed: true)
      # Only fit for category name
      first_category = insert(:category, name: "Bruce category")
      second_category = insert(:category, name: "no fit category")
      post = insert(:post,
        title: "Not fit title 3",
        body: "some not fit body",
        author: second_user,
        reviewed: true,
      )
      insert(:post_category, post_id: post.id, category_id: first_category.id)
      insert(:post_category, post_id: post.id, category_id: second_category.id)

      # Only fit for author name
      insert(:post, title: "Not fit title", body: "some not fit body", author: first_user, reviewed: true)
      # Only fit for title
      insert(:post, title: "Bruce post", body: "some not fit body", author: second_user, reviewed: true)

      response =
        conn
        |> get(Routes.post_path(conn, :index), %{
          q: "bruce"
        })

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert length(parsed_response_body["data"]) == 3
      [first_responded_post, second_responded_post, third_responded_post] = parsed_response_body["data"]

      assert first_responded_post["title"] == "Bruce post"
      assert second_responded_post["author"]["firstName"] == "Bruce"
      assert third_responded_post["body"] == "Bruce post body"
    end

    test "searches properly when authenticated", %{conn: conn} do
      first_user = insert(:user, first_name: "Bruce", last_name: "Wayne")
      {:ok, token, _} = encode_and_sign(first_user.uuid, %{})

      second_user = insert(:user, first_name: "Peter", last_name: "Parker")

      # No fit at all
      insert(:post, title: "No fit title 5", body: "no fit body", author: second_user, reviewed: true)
      # Only fit for post body
      insert(:post, title: "No fit title 4", body: "Bruce post body", author: second_user, reviewed: true)
      # Only fit for category name
      first_category = insert(:category, name: "Bruce category")
      second_category = insert(:category, name: "no fit category")
      post = insert(:post,
        title: "Not fit title 3",
        body: "some not fit body",
        author: second_user,
        reviewed: true,
      )

      insert(:post_category, post_id: post.id, category_id: first_category.id)
      insert(:post_category, post_id: post.id, category_id: second_category.id)
      # Only fit for author name
      insert(:post, title: "Not fit title", body: "some not fit body", author: first_user, reviewed: true, is_public: false)
      # Only fit for title
      insert(:post, title: "Bruce post", body: "some not fit body", author: second_user, reviewed: true, is_public: false)

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> get(Routes.post_path(conn, :index), %{
          q: "bruce"
        })

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert length(parsed_response_body["data"]) == 3
      [first_responded_post, second_responded_post, third_responded_post] = parsed_response_body["data"]

      assert first_responded_post["title"] == "Bruce post"
      assert second_responded_post["author"]["firstName"] == "Bruce"
      assert third_responded_post["body"] == "Bruce post body"
    end

    test "searches properly when not authenticated", %{conn: conn} do
      first_user = insert(:user, first_name: "Bruce", last_name: "Wayne")
      second_user = insert(:user, first_name: "Peter", last_name: "Parker")

      # No fit at all
      insert(:post, title: "No fit title 5", body: "no fit body", author: second_user, reviewed: true)
      # Only fit for post body
      insert(:post, title: "No fit title 4", body: "Bruce post body", author: second_user, reviewed: true)
      # Only fit for category name
      first_category = insert(:category, name: "Bruce category")
      second_category = insert(:category, name: "no fit category")
      post = insert(:post,
        title: "Not fit title 3",
        body: "some not fit body",
        author: second_user,
        reviewed: true,
      )
      insert(:post_category, post_id: post.id, category_id: first_category.id)
      insert(:post_category, post_id: post.id, category_id: second_category.id)
      # Only fit for author name
      insert(:post, title: "Not fit title", body: "some not fit body", author: first_user, reviewed: true, is_public: false)
      # Only fit for title
      insert(:post, title: "Bruce post", body: "some not fit body", author: second_user, reviewed: true, is_public: false)

      response =
        conn
        |> get(Routes.post_path(conn, :index), %{
          q: "bruce"
        })

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert length(parsed_response_body["data"]) == 1
      [responded_post] = parsed_response_body["data"]

      assert responded_post["body"] == "Bruce post body"
    end
  end

  describe "GET /api/posts/:id" do
    test "returns particular post if public and reviewed for unauthenticated user", %{conn: conn} do
      post = insert(:post, reviewed: true, is_public: true, title: "public post")

      response =
        conn
        |> get(Routes.post_path(conn, :show, post.id))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert parsed_response_body["title"] == "public post"
    end

    test "returns particular post if only reviewed for authenticated user", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})
      post = insert(:post, reviewed: true, is_public: false, title: "internal reviewed post")

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> get(Routes.post_path(conn, :show, post.id))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert parsed_response_body["title"] == "internal reviewed post"
    end

    test "returns particular post with sorted categories", %{conn: conn} do
      first_category = insert(:category, name: "Elixir")
      second_category = insert(:category, name: "Javascript")
      post_title = "Some post"

      post = insert(:post, reviewed: true, title: post_title)
      insert(:post_category, post_id: post.id, category_id: first_category.id, position: 2)
      insert(:post_category, post_id: post.id, category_id: second_category.id, position: 1)

      response =
        conn
        |> get(Routes.post_path(conn, :show, post.id))

      assert response.status == 200

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert parsed_response_body["title"] == post_title
      assert parsed_response_body["categories"] == [
        %{"id" => second_category.id, "name" => second_category.name, "url" => second_category.url, "firstText" => second_category.first_text, "secondText" => second_category.second_text, "position" => 1},
        %{"id" => first_category.id, "name" => first_category.name, "url" => first_category.url, "firstText" => first_category.first_text, "secondText" => first_category.second_text, "position" => 2}
      ]
    end

    test "returns particular post with proper reaction count", %{conn: conn} do
      first_user = insert(:user)
      second_user = insert(:user)

      post = insert(:post, reviewed: true)

      insert(:reaction, user_id: first_user.id, post_id: post.id)
      insert(:reaction, user_id: second_user.id, post_id: post.id)

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

      post = insert(:post, reviewed: true)

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

    test "does not return particular post if not public for unauthenticated users", %{conn: conn} do
      post = insert(:post, is_public: false, reviewed: true)

      response =
        conn
        |> get(Routes.post_path(conn, :show, post.id))

      assert response.status == 400

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert parsed_response_body == %{"errors" => %{"detail" => "not found"}}
    end

    test "does not return particular post if not reviewed for authenticated users", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      post = insert(:post, is_public: false, reviewed: false)

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> get(Routes.post_path(conn, :show, post.id))

      assert response.status == 400

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert parsed_response_body == %{"errors" => %{"detail" => "not found"}}
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
          categories: []
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

    test "creates post with proper slug", %{conn: conn} do
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
          categories: []
        })

      assert response.status == 201

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert parsed_response_body["slug"] == "some-post-title"
    end

    test "creates reviewed post and returns 201 status with created post", %{conn: conn} do
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
          categories: [],
          reviewed: true
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

    test "creates public post and returns 201 status with created post", %{conn: conn} do
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
          categories: [],
          reviewed: false,
          public: true
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

    test "creates post with proper ordered categories", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      post_title = "Some post title"

      first_category = insert(:category, name: "Elixir")
      second_category = insert(:category, name: "Javascript")
      third_category = insert(:category, name: "CMD")
      fourth_category = insert(:category, name: "Git")
      fifth_category = insert(:category, name: "Machine Learning")

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> post(Routes.post_path(conn, :create), %{
          title: post_title,
          categories: [first_category.name, second_category.name, third_category.name, fourth_category.name, fifth_category.name]
        })

      assert response.status == 201

      %{posts_categories: posts_categories} = Repo.get_by(Post, title: post_title) |> Repo.preload([posts_categories: :category])

      assert length(posts_categories) == 5

      [post_first_category, post_second_category, post_third_category, post_fourth_category, post_fifth_category] = posts_categories

      assert post_first_category.category.id == first_category.id
      assert post_first_category.position == 1
      assert post_second_category.category.id == second_category.id
      assert post_second_category.position == 2
      assert post_third_category.category.id == third_category.id
      assert post_third_category.position == 3
      assert post_fourth_category.category.id == fourth_category.id
      assert post_fourth_category.position == 4
      assert post_fifth_category.category.id == fifth_category.id
      assert post_fifth_category.position == 5
    end

    test "creates new categories as unofficial during post creation", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})
      first_category = insert(:category, name: "Elixir")
      second_category = insert(:category, name: "Javascript")

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> post(Routes.post_path(conn, :create), %{
          title: "Some post title",
          categories: [first_category.name, second_category.name, "ML", "Vue"]
        })

      assert response.status == 201

      %{posts_categories: posts_categories} = Repo.get_by(Post, title: "Some post title") |> Repo.preload([posts_categories: :category])
      assert length(posts_categories) == 4
      [post_first_category, post_second_category, post_third_category, post_fourth_category] = posts_categories
      assert post_first_category.category.id == first_category.id
      assert post_second_category.category.id == second_category.id
      assert post_third_category.category.name == "ML"
      assert post_third_category.category.official == false
      assert post_fourth_category.category.name == "Vue"
      assert post_fourth_category.category.official == false
      assert length(Repo.all(Category)) == 4
    end

    test "throws error while creating public and reviewed post", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      insert(:category, name: "Machine Learning")

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> post(Routes.post_path(conn, :create), %{
          title: "Some post title",
          is_public: true,
          reviewed: true
        })

      assert response.status == 400

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert parsed_response_body == %{"errors" => %{"detail" => "can't create public reviewed post"}}
      assert length(Repo.all(Post)) == 0
    end

    test "throws error when post with same title exists", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      insert(:post, title: "Some post title")

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> post(Routes.post_path(conn, :create), %{title: "Some post title"})

      assert response.status == 400

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert parsed_response_body == %{"errors" => %{"title" => ["This title already exist"]}}
      assert length(Repo.all(Post)) == 1
    end

    test "throws 401 error when not authenticated", %{conn: conn} do
      post_body = "Some post body"

      response =
        conn
        |> post(Routes.post_path(conn, :create), %{
          body: post_body,
          categories: []
        })

      assert response.status == 401

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert parsed_response_body == %{"errors" => %{"detail" => "unauthenticated"}}
    end
  end
end
