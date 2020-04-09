defmodule TilWeb.Statistics.UserView do
  use TilWeb, :view

  def render("index.json", %{users_statistics: users_statistics}) do
    users_statistics
    |> Enum.map(&serialize_user_statistics/1)
  end

  def render("show.json", %{user_statistics: user_statistics}) do
    serialize_user_statistics(user_statistics)
  end

  # private

  defp serialize_user_statistics(user_statistics) do
    %{
      user: user_statistics.user
    }
  end
end
