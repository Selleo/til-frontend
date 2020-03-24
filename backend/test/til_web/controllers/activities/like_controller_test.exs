defmodule TilWeb.Activities.LikeControllerTest do
  use TilWeb.ConnCase
  import Til.Guardian
  import Til.Factory
  alias Til.ShareableContent
  alias Til.Repo
  alias Til.Activities.Like

  describe "PUT /api/activities/like" do
    test "creates like for post when not liked yet and returns ok", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      post = insert(:post)

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> put(Routes.like_path(conn, :like, %{"id" => post.id}))

      assert response.status == 200

      likes = Repo.all(Like)

      assert length(likes) == 1

      [like] = likes

      assert like["user_id"] == current_user.id
      assert like["post_id"] == post.id
    end

    test "does not create new like and throws error when post is already liked", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      post = insert(:post)
      insert(:like, user_id: current_user.id, post_id: post.id)

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> put(Routes.like_path(conn, :like, %{"id" => post.id}))

      assert response.status == 400

      likes = Repo.all(Like)

      assert length(likes) == 1

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert parsed_response_body["message"] == "post is already liked"
    end

    test "throws error when user is not authenticated", %{conn: conn} do
      post = insert(:post)

      response =
        conn
        |> put(Routes.like_path(conn, :like, %{"id" => post.id}))

      assert response.status == 401

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert not is_nil parsed_response_body["message"] == "unauthenticated"
    end
  end

  describe "DELETE /api/activities/like" do
    test "deletes like properly and returns ok", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      post = insert(:post)
      insert(:like, user_id: current_user.id, post_id: post.id)

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> delete(Routes.like_path(conn, :unlike, %{"id" => post.id}))

      assert response.status == 200

      likes = Repo.all(Like)

      assert length(likes) == 0
    end

    test "throws error if like for post doesn't exists", %{conn: conn} do
      current_user = insert(:user)
      {:ok, token, _} = encode_and_sign(current_user.uuid, %{})

      response =
        conn
        |> put_req_header("authorization", "bearer: " <> token)
        |> delete(Routes.like_path(conn, :unlike, %{"id" => "some-fake-id"}))

      assert response.status == 400

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert not is_nil(parsed_response_body["errors"])
    end

    test "throws error if not authenticated", %{conn: conn} do
      post = insert(:post)

      response =
        conn
        |> delete(Routes.like_path(conn, :unlike, %{"id" => post.id}))

      assert response.status == 401

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)

      assert not is_nil parsed_response_body["message"] == "unauthenticated"
    end
  end
end
