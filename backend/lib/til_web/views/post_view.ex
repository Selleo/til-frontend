defmodule TilWeb.PostView do
  use TilWeb, :view

  def render("index.json", %{posts: posts}) do
    posts
    |> Enum.map(&serialize_post/1)
  end

  def render("index_with_nested.json", %{posts: posts}) do
    posts
    |> Enum.map(fn post -> serialize_post(post, :nested) end)
  end

  def render("show.json", %{post: post}) do
    post
    |> serialize_post()
  end

  def render("show_with_nested.json", %{post: post}) do
    post
    |> serialize_post(:nested)
  end

  defp serialize_post(post, :nested) do
    %{
      id: post.id,
      title: post.title,
      body: post.body,
      isPublic: post.is_public,
      reactionCount: post.reaction_count,
      reactions: render(TilWeb.ReactionView, "index.json", reactions: post.reactions),
      slug: post.slug,
      author: render(TilWeb.UserView, "show.json", user: post.author),
      reviewed: post.reviewed,
      categories: render(TilWeb.PostCategoryView, "index.json", categories: Enum.map(post.posts_categories, &(Map.merge(&1.category, %{position: &1.position})))),
      createdAt: post.inserted_at
    }
  end

  defp serialize_post(post) do
    %{
      id: post.id,
      title: post.title,
      body: post.body,
      isPublic: post.is_public,
      reviewed: post.reviewed,
      reactionCount: post.reaction_count,
      slug: post.slug,
      createdAt: post.inserted_at
    }
  end
end
