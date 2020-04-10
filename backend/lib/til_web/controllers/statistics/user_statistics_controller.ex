defmodule TilWeb.Statistics.UserStatisticsController do
  use TilWeb, :controller
  alias Til.Statistics
  alias Til.Accounts

  def index(conn, _) do
    users_statistics = Statistics.get_users_statistics()

    conn
      |> put_status(:ok)
      |> render("index.json", users_statistics: users_statistics)
  end

  def show(conn, %{"id" => uuid}) do
    user_statistics = Accounts.get_user_with_all_posts(uuid) |> Statistics.get_user_statistics()

    conn
      |> put_status(:ok)
      |> render("show.json", user_statistics: user_statistics)
  end
end
