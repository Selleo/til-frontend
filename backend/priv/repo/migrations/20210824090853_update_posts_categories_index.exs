defmodule Til.Repo.Migrations.UpdatePostsCategoriesIndex do
  use Ecto.Migration

  def change do
    drop unique_index(:posts_categories, [:post_id, :category_id])

    create unique_index(:posts_categories, [:post_id, :category_id], name: :category_post_pair)
  end
end
