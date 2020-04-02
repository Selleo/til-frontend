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

  # TODO returned encoded id only for FE testing/development before slack feature ready
  # After slack ready it will be attached in slack encoded url.
  def render("show_with_nested.json", %{post: post, encoded_id: encoded_id}) do
    serialized = post
    |> serialize_post(:nested)

    Map.merge(serialized, %{encoded_id: encoded_id})
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
      likesCount: post.likes_count,
      likes: render(TilWeb.LikeView, "index.json", likes: post.likes),
      author: render(TilWeb.UserView, "show.json", user: post.author),
      categoriesIds: Enum.map(post.categories, & &1.id)
    }
  end

  defp serialize_post(post) do
    %{
      id: post.id,
      title: post.title,
      body: post.body,
      isPublic: post.is_public,
      likesCount: post.likes_count
    }
  end
end
