defmodule TilWeb.HealthcheckController do
  use TilWeb, :controller

  def index(conn, _params) do
    case Ecto.Adapters.SQL.query(Til.Repo, "SELECT 1") do
      {:ok, _} ->
        send_resp(conn, 200, "")

      {:error, error} ->
        conn
        |> put_status(500)
        |> json(%{error: error.message})
    end
  end
end
