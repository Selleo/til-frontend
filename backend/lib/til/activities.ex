defmodule Til.Activities do
  import Ecto.Query, warn: false
  alias Til.Repo
  alias Til.Activities.Like

  def get_user_like_for_post(post_id, user_id) do
    user_like_for_post_query =
      from l in Like,
        where: l.post_id == ^post_id and l.user_id == ^user_id

    Repo.one(user_like_for_post_query)
  end

  def like_post(post_id, user) do
    case get_user_like_for_post(post_id, user.id) do
      %Like{} -> {:error, %{message: "post is already liked"}}
      _ -> create_like(post_id, user)
    end
  end

  def unlike_post(post_id, user_id) do
    case get_user_like_for_post(post_id, user_id) do
      %Like{} = like -> delete_like(like)
      _ -> {:error, %{message: "not found"}}
    end
  end

  # private

  defp create_like(post_id, user) do
    %Like{}
    |> Like.changeset(%{user_id: user.id, post_id: post_id, user_uuid: user.uuid})
    |> Repo.insert()
  end

  defp delete_like(like) do
    Repo.delete(like)
  end
end