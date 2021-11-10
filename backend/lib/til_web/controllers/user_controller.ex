defmodule TilWeb.UserController do
  use TilWeb, :controller
  alias Til.Accounts

  def index(conn, _) do
    users = Accounts.get_users()

    conn
      |> put_status(:ok)
      |> render("index.json", users: users)
  end

  def show(conn, %{"id" => username}) do
    only_public = is_nil conn.private[:guardian_default_resource]
    user = Accounts.get_user_with_posts(username, only_public)

    conn
      |> put_status(:ok)
      |> render("show_with_nested.json", user: user)
  end
end
