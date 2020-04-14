defmodule Til.Statistics do
  alias Til.Accounts
  alias Til.Repo
  import Ecto.Query
  alias Til.Activities.Reaction
  alias Til.ShareableContent.Post
  alias Til.Statistics.UserStatistics

  def get_users_statistics(only_public) do
    Accounts.get_users_with_posts(only_public) |> Enum.map(fn user -> get_user_statistics(user, only_public) end)
  end

  def get_user_statistics(user, only_public) do
    %UserStatistics{
      user: user,
      post_count: length(user.posts),
      reactions_given: get_user_reactions(user.id) |> serialize_user_reactions(),
      reactions_received: get_user_received_reactions(user.id, only_public) |> serialize_user_reactions()
    }
  end

  # private

  defp get_user_reactions(user_id) do
    reactions_query = from r in Reaction, where: r.user_id == ^user_id

    reactions_query |> Repo.all()
  end

  defp get_user_received_reactions(user_id, only_public) do
    reactions_query =
      from p in Post,
        where: p.author_id == ^user_id and p.reviewed == true and p.is_public in ^is_public_in(only_public),
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

  defp is_public_in(true), do: [true]

  defp is_public_in(false), do: [true, false]
end
