defmodule TilWeb.UserController do
  use TilWeb, :controller
  alias Til.Accounts
  alias Til.ShareableContent

  def index(conn, _) do
    conn
      |> put_status(:ok)
      |> render("index.json", users: Accounts.get_users())
  end

  def show(conn, %{"id" => user_id}) do
    conn
      |> put_status(:ok)
      |> render("show.json", user: Accounts.get_user(user_id))
  end
end
