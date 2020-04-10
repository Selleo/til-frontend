defmodule TilWeb.Statistics.UserStatisticsController do
  use TilWeb, :controller
  alias Statistics.UserStatistics

  def index(conn, _) do
    conn
      |> put_status(:ok)
      |> render("index.json", users_statistics: [%UserStatistics{}])
  end

  def show(conn, %{"id" => id}) do
    conn
      |> put_status(:ok)
      |> render("show.json", user_statistics: %UserStatistics{})
  end
end
