defmodule Til.Accounts do
  import Ecto, warn: false
  alias Til.Repo
  alias Til.Accounts.User

  def get_user(uuid), do: Repo.get_by(User, uuid: uuid)

  def get_user_by(attrs), do: Repo.get_by(User, attrs)

  def get_user_with_all_posts(uuid), do: Repo.get_by(User, uuid: uuid) |> preload_posts

  def get_user_with_visible_posts(uuid), do: Repo.get_by(User, uuid: uuid) |> preload_visible_posts

  def get_users, do: Repo.all(User)

  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs |> Map.merge(%{uuid: Ecto.UUID.generate}))
    |> Repo.insert()
  end

  # private

  defp preload_posts(user) do
    user |> Repo.preload([:posts])
  end

  defp preload_visible_posts(user) do
    visible_posts_query = from p in Post, where: p.for_review == false
    user |> Repo.preload([posts:])
  end
end
