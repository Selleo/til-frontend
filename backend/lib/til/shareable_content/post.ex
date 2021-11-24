defmodule Til.ShareableContent.Post.TitleSlug do
  use EctoAutoslugField.Slug, from: :title, to: :slug
end

defmodule Til.ShareableContent.Post do
  use Ecto.Schema
  import Ecto.Changeset
  alias Til.Accounts.User
  alias Til.ShareableContent.PostCategory
  alias Til.Activities.Reaction
  alias Til.ShareableContent.Post.TitleSlug

  defdelegate authorize(action, user, params), to: Til.Policies.PostPolicy

  schema "posts" do
    field :title, :string
    field :body, :string
    field :is_public, :boolean
    field :reviewed, :boolean
    field :slug, TitleSlug.Type
    field :reaction_count, :integer, virtual: true

    belongs_to :author, User
    has_many :reactions, Reaction, on_delete: :delete_all
    has_many :posts_categories, PostCategory, on_replace: :delete, on_delete: :delete_all, preload_order: [asc: :position]
    timestamps()
  end

  def changeset(post, attrs) do
    post
    |> cast(attrs, [
      :title,
      :body,
      :author_id,
      :is_public,
      :reviewed,
      :slug
    ])
    |> validate_required([:title])
    |> unique_constraint(:title, message: "This title already exist")
    |> TitleSlug.maybe_generate_slug
    |> validate_required([:slug])
  end

  def populate_reaction_count(post) do
    %{post | reaction_count: length(post.reactions)}
  end
end
