defmodule Til.Statistics do
  alias Til.Accounts
  alias Til.Repo
  import Ecto.Query
  alias Til.Activities.Reaction
  alias Til.ShareableContent.Post
  alias Til.Statistics.UserStatistics

  def get_users_statistics do
    Accounts.get_users_with_posts() |> Enum.map(&get_user_statistics/1)
  end

  def get_user_statistics(user) do
    %UserStatistics{
      user: user,
      post_count: length(user.posts),
      reactions_given: get_user_reactions(user.id) |> serialize_user_reactions(),
      reactions_received: get_user_received_reactions(user.id) |> serialize_user_reactions()
    }
  end

  # private

  defp get_user_reactions(user_id) do
    reactions_query = from r in Reaction, where: r.user_id == ^user_id

    reactions_query |> Repo.all()
  end

  defp get_user_received_reactions(user_id) do
    reactions_query =
      from p in Post,
        where: p.author_id == ^user_id,
        join: r in Reaction,
        on: r.post_id == p.id,
        select: r

    reactions_query |> Repo.all()
  end

  defp serialize_user_reactions(reactions) do
    %{
      total: length(reactions),
      like: Enum.filter(reactions, &(&1.type == "like")) |> length(),
      love: Enum.filter(reactions, &(&1.type == "love")) |> length(),
      funny: Enum.filter(reactions, &(&1.type == "funny")) |> length(),
      surprised: Enum.filter(reactions, &(&1.type == "surprised")) |> length()
    }
  end
end
