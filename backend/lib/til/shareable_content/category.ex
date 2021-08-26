defmodule Til.ShareableContent.Category do
  use Ecto.Schema
  import Ecto.Changeset
  alias Til.ShareableContent.PostCategory

  schema "categories" do
    field :name, :string
    field :official, :boolean
    field :url, :string
    field :first_text, :string
    field :second_text, :string

    has_many :posts_categories, PostCategory, on_delete: :delete_all
  end

  def changeset(post, attrs) do
    post
    |> cast(attrs, [:name])
    |> validate_required([:name])
    |> unique_constraint(:name)
  end
end
