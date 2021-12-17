defmodule Til.Accounts do
  import Ecto.Query, warn: false
  alias Til.Repo
  alias Til.Accounts.User
  alias Til.ShareableContent.Post

  def get_user(uuid), do: Repo.get_by(User, uuid: uuid)

  def get_user_by(attrs), do: Repo.get_by(User, attrs)

  def get_user_with_posts(username, only_public), do: Repo.get_by(User, username: username) |> preload_posts(only_public)

  def get_user_with_paginated_posts(username, only_public, params), do: Repo.get_by(User, username: username) |> preload_posts(only_public, params)

  def get_user_with_all_posts(uuid, params), do: Repo.get_by(User, uuid: uuid) |> preload_posts(params, :all)

  def get_users, do: Repo.all(User)

  def get_users_with_posts(only_public), do: Repo.all(User) |> preload_posts(only_public)

  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  def update_user(user, attrs \\ %{}) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  # private

  defp preload_posts(user, only_public) do
    post_query =
      from p in Post,
      where: p.is_public in ^is_public_in(only_public) and p.reviewed == true,
      preload: [:author, posts_categories: :category, reactions: :user]
    user |> Repo.preload([posts: post_query])
  end

  defp preload_posts(user, params, :all) do
    preloaded_posts = Post
      |> where([p], p.author_id == ^user.id)
      |> preload([:author, posts_categories: :category, reactions: :user])
      |> order_by([p], desc: p.inserted_at)
      |> Repo.paginate(params)

    Map.put(user, :posts, preloaded_posts)
  end

  defp preload_posts(user, only_public, params) do
    preloaded_posts = Post
      |> where([p], p.author_id == ^user.id and p.is_public in ^is_public_in(only_public) and p.reviewed == true)
      |> preload([:author, posts_categories: :category, reactions: :user])
      |> order_by([p], desc: p.inserted_at)
      |> Repo.paginate(params)

    Map.put(user, :posts, preloaded_posts)
  end

  defp is_public_in(true), do: [true]

  defp is_public_in(false), do: [true, false]
end
