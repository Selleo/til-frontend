defmodule TilWeb.PostController do
  use TilWeb, :controller
  alias Til.Accounts
  alias Til.ShareableContent

  def index(conn, _) do
    posts = ShareableContent.get_posts()

    conn
      |> put_status(:ok)
      |> render("index_with_nested.json", posts: posts)
  end

  def show(conn, %{"id" => id}) do
    post = ShareableContent.get_post(id)

    conn
      |> put_status(:ok)
      |> render("show_with_nested.json", post: post)
  end

  def create(%{private: %{:guardian_default_resource => current_user}} = conn, params) do
    author = Accounts.get_user(current_user.uuid)

    case ShareableContent.create_post(author, params) do
      {:ok, post} ->
        post = ShareableContent.get_post(post.id)

        conn
        |> put_status(:created)
        |> render("show_with_nested.json", post: post)

      {:error, %Ecto.Changeset{errors: _} = changeset} ->
        render_changeset_error(conn, changeset)
    end
  end

  # private

  defp render_changeset_error(conn, changeset) do
    conn
    |> put_status(:bad_request)
    |> put_view(TilWeb.ErrorView)
    |> render("400.json", changeset: changeset)
  end
end
