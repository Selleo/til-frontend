defmodule TilWeb.Statistics.UserStatisticsView do
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
      user: user_statistics.user,
      reactions: user_statistics.reactions,
      posts: user_statistics.posts
    }
  end
end
