defmodule TilWeb.PostCategoryView do
  use TilWeb, :view

  def render("index.json", %{categories: categories}) do
    categories
    |> Enum.map(&serialize_category/1)
  end

  # private

  defp serialize_category(category) do
    %{
      id: category.id,
      name: category.name,
      position: category.position,
      url: category.url,
      firstText: category.first_text,
      secondText: category.second_text,
    }
  end
end
