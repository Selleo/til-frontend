defmodule Til.ShareableContent.PostCategory do
  use Ecto.Schema
  import Ecto.Changeset
  alias Til.ShareableContent.Post
  alias Til.ShareableContent.Category

  schema "posts_categories" do
    field :position, :integer

    belongs_to :post, Post
    belongs_to :category, Category
  end

  def changeset(post_category, attrs) do
    post_category
    |> cast(attrs, [
      :position,
      :category_id,
      :post_id,
    ])
    |> validate_required([:category_id, :post_id, :position])
    |> unique_constraint(:category_id, name: :category_post_pair)
  end
end
