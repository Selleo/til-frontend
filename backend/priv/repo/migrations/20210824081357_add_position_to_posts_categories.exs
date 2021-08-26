defmodule Til.Repo.Migrations.AddPositionToPostsCategories do
  use Ecto.Migration

  def change do
    alter table(:posts_categories) do
      add :position, :integer, default: 1, null: false
    end
  end
end
