defmodule TilWeb.Statistics.UserController do
  use TilWeb, :controller

  def index(conn, _) do
    conn
      |> put_status(:ok)
      |> render("index.json", users_statistics: [%{user: nil}])
  end

  def show(conn, %{"id" => id}) do
    conn
      |> put_status(:ok)
      |> render("show.json", user_statistics: %{user: nil})
  end
end
