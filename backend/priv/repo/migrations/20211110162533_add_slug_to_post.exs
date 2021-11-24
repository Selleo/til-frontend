defmodule Til.Repo.Migrations.AddSlugToPost do
  use Ecto.Migration

  def change do
    alter table(:posts) do
      add :slug, :string, null: false
    end
  end
end
