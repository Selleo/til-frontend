defmodule TilWeb.PostControllerTest do
  use TilWeb.ConnCase
  import Til.Guardian
  import Til.Factory
  alias Til.ShareableContent

  describe "GET /api/posts" do
    test "returns all existing posts with categories as public", %{conn: conn} do
      first_category = insert(:category, name: "Elixir")
      second_category = insert(:category, name: "Javascript")

      insert(:post, categories: [first_category, second_category])
      insert(:post, categories: [first_category])

      response =
        conn
        |> get(Routes.post_path(conn, :index))

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert response.status == 200

      [first_post, second_post] = parsed_response_body

      assert first_post["data"]["categoriesIds"] == [first_category.id, second_category.id]
      assert second_post["data"]["categoriesIds"] == [first_category.id]
    end
  end

  describe "POST /api/posts" do
    test "creates post and returns 201 status with created post", %{conn: conn} do
      current_user = insert(:user, email: "peter@parker.com")
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      post_title = "Some post title"
      post_body = "Some post body"

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> post(Routes.post_path(conn, :create), %{
          title: post_title,
          body: post_body,
          categories_ids: []
        })

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)


      created_post = ShareableContent.get_post_by(title: post_title)

      assert response.status == 201

      assert created_post.title == post_title
      assert created_post.body == post_body

      assert parsed_response_body["data"]["title"] == post_title
      assert parsed_response_body["data"]["body"] == post_body
      assert parsed_response_body["data"]["author"]["data"]["email"] == "peter@parker.com"
    end

    test "throws 400 error when lack of title", %{conn: conn} do
      current_user = insert(:user, email: "peter@parker.com")
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      post_body = "Some post body"

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> post(Routes.post_path(conn, :create), %{
          body: post_body,
          categories_ids: []
        })

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert response.status == 400
      assert not is_nil parsed_response_body["errors"]
    end

    test "creates post with proper categories", %{conn: conn} do
      current_user = insert(:user, email: "peter@parker.com")
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
          categories_ids: [first_category.id, second_category.id]
        })

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert response.status == 201

      %{categories: categories} = ShareableContent.get_post_by(title: post_title)

      post_first_category = List.first categories
      post_last_category = List.last categories

      assert post_first_category.id == first_category.id
      assert post_last_category.id == second_category.id
    end
  end
end
