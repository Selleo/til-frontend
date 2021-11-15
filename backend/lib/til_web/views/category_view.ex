defmodule TilWeb.CategoryView do
  use TilWeb, :view

  def render("index.json", %{categories: categories}) do
    categories
    |> Enum.map(&serialize_category/1)
  end

  def render("show.json", %{category: category}) do
    serialize_category(category, :with_posts)
  end

  # private

  defp serialize_category(category) do
    %{
      id: category.id,
      name: category.name,
      url: category.url,
      firstText: category.first_text,
      secondText: category.second_text,
    }
  end

  defp serialize_category(category, :with_posts) do
    %{
      id: category.id,
      name: category.name,
      posts: render(TilWeb.PostView, "paginated_index_with_nested.json", page: prepare_page(category.posts_categories)),
      url: category.url,
      firstText: category.first_text,
      secondText: category.second_text,
    }
  end

  defp prepare_page(page) do
    entries = Enum.map(page.entries, &(&1.post))

    Map.merge(page, %{entries: entries})
  end
end
