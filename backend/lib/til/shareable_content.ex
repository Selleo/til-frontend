defmodule Til.ShareableContent do
  import Ecto.Query, warn: false
  alias Til.Repo
  alias Til.ShareableContent.{Post, Category}

  def get_posts, do: Repo.all(Post) |> preload_post_data() |> Enum.map(&Post.populate_reaction_count/1)

  def get_post(id), do: Repo.get!(Post, id) |> preload_post_data() |> Post.populate_reaction_count()

  def get_post_by(attrs), do: Repo.get_by(Post, attrs) |> preload_post_data()

  def create_post(author, attrs \\ %{}) do
    %Post{author_id: author.id}
    |> change_post(attrs)
    |> Repo.insert()
  end

  def update_post(post, attrs \\ %{}) do
    post
    |> change_post(attrs)
    |> Repo.update()
  end

  def delete_post(post), do: Repo.delete(post)

  def get_categories, do: Repo.all(Category)

  def get_or_create_category(name) do
    case Repo.get_by(Category, name: name) do
      nil -> %Category{name: name, official: false} |> Repo.insert!()
      category -> category
    end
  end

  #private

  defp change_post(post, attrs) do
    category_names = if attrs["categories"], do: attrs["categories"], else: []
    categories = category_names |> Enum.map(&get_or_create_category/1)

    post
    |> Post.changeset(attrs)
    |> Ecto.Changeset.put_assoc(:categories, categories)
  end

  defp preload_post_data(post_data), do: Repo.preload(post_data, [:categories, :author, reactions: :user])
end

