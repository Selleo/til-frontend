defmodule Til.Repo.Migrations.AddUrlToCategory do
  use Ecto.Migration

  def change do
    alter table(:categories) do
      add :url, :string
    end
  end
end
