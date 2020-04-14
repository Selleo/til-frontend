defmodule TilWeb.UserController do
  use TilWeb, :controller
  alias Til.Accounts

  def index(conn, _) do
    users = Accounts.get_users()

    conn
      |> put_status(:ok)
      |> render("index.json", users: users)
  end

  def show(conn, %{"id" => user_uuid}) do
    is_public = true
    user = Accounts.get_user_with_posts(user_uuid, is_public)

    conn
      |> put_status(:ok)
      |> render("show_with_nested.json", user: user)
  end
end
