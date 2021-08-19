defmodule Til.Repo.Migrations.AddTextFirstAndTextSecondToCategory do
  use Ecto.Migration

  def change do
    alter table(:categories) do
      add :first_text, :string
      add :second_text, :string
    end
  end
end
