defmodule TilWeb.UserView do
  use TilWeb, :view

  def render("index.json", %{users: users}) do
    users
    |> Enum.map(&serialize_user/1)
  end

  def render("show.json", %{user: user}) do
    serialize_user(user)
  end

  def render("show_with_nested.json", %{user: user}) do
    serialize_user(user, :nested)
  end

  defp serialize_user(user) do
    %{
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      image: user.image,
      userName: user.username,
      uuid: user.uuid,
    }
  end

  defp serialize_user(user, :nested) do
    %{
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      image: user.image,
      posts: render(TilWeb.PostView, "index_with_nested.json", posts: user.posts),
      userName: user.username,
      uuid: user.uuid,
    }
  end
end
