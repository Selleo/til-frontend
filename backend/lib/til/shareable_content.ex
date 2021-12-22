defmodule Til.ShareableContent do
  import Ecto.Query, warn: false
  alias Til.Repo
  alias Til.ShareableContent.{Category, Post, PostCategory}
  alias Ecto.Adapters.SQL

  def get_post(id) do
    case Repo.get(Post, id) do
      nil -> {:error, :not_found}
      post ->
        {
          :ok,
          post
          |> preload_post_data()
          |> Post.populate_reaction_count()
        }
    end
  end

  def get_post_by(attrs) do
    case Repo.get_by(Post, attrs) do
      nil -> {:error, :not_found}
      post ->
        {
          :ok,
          post
          |> preload_post_data()
          |> Post.populate_reaction_count()
        }
    end
  end

  def get_hidden_post(hashed_id) do
    with {:ok, %{"sub" => id}} <- decode_post_id(hashed_id),
         {:ok, post} <- get_post_by(id: id, reviewed: false)
    do
      {:ok, post}
    else
      {:error, _} -> {:error, :not_found}
    end
  end

  def get_post(id, only_public) do
    case only_public do
      true -> get_post_by(id: id, reviewed: true, is_public: true)
      false -> get_post_by(id: id, reviewed: true)
    end
  end

  def get_posts(only_public, %{"q" => search_query} = params) do
    total_entries_sql = """
    select p.* from posts p
      join users u on u.id = p.author_id
      join lateral (
        select ts_rank_cd(
          setweight(to_tsvector(p.title), 'A')
          ||
          setweight(to_tsvector(u.first_name || ' ' || u.last_name), 'B')
          ||
          setweight(to_tsvector(p.body), 'D')
          ,
          plainto_tsquery($1)
        ) as rank
      ) ranks on true
      where ranks.rank > 0 and p.is_public = ANY($2) and p.reviewed = true
      order by ranks.rank desc, p.inserted_at desc
    """

    sql = """
    select p.* from posts p
      join users u on u.id = p.author_id
      join lateral (
        select ts_rank_cd(
          setweight(to_tsvector(p.title), 'A')
          ||
          setweight(to_tsvector(u.first_name || ' ' || u.last_name), 'B')
          ||
          setweight(to_tsvector(p.body), 'D')
          ,
          to_tsquery($1)
        ) as rank
      ) ranks on true
      where ranks.rank > 0 and p.is_public = ANY($2) and p.reviewed = true
      order by ranks.rank desc, p.inserted_at desc
      limit $3
      offset $4
    """

    prepared_query = "#{search_query |> String.trim() |> String.replace(" ", " & ")}:*"

    total_entries_results =
      SQL.query!(Repo, total_entries_sql, [prepared_query, is_public_in(only_public)])

    page = if is_nil(params["page"]), do: 1, else: String.to_integer(params["page"])
    page_size = if is_nil(params["page_size"]), do: 20, else: String.to_integer(params["page_size"])
    offset = (page - 1) * page_size
    total_entries = length(total_entries_results.rows)
    total_pages = total_entries / page_size
      |> Float.ceil()
      |> trunc

    results =
      SQL.query!(Repo, sql, [prepared_query, is_public_in(only_public), page_size, offset])

    posts = results.rows
      |> Enum.map(&Repo.load(Post, {results.columns, &1}))
      |> Repo.preload([:author, posts_categories: :category, reactions: :user])
      |> Enum.map(&Post.populate_reaction_count/1)

    %{
      entries: posts,
      page_number: page,
      page_size: page_size,
      total_pages: total_pages,
      total_entries: total_entries
    }
  end

  def get_posts(only_public, params) do
    result = base_posts_query(only_public)
    |> Repo.paginate(params)

    Map.merge(result, %{
      entries: result.entries |> Enum.map(&Post.populate_reaction_count/1)
    })
  end

  def create_post(_, %{"is_public" => true, "reviewed" => true}) do
    {:error, :public_reviewed_forbidden}
  end

  def create_post(author, attrs) do
    with {:ok, post} <- %Post{author_id: author.id} |> change_post(attrs) |> Repo.insert(),
         {:ok} <- post |> process_categories_association(attrs)
    do
      get_post(post.id)
    else
      {:error, %Ecto.Changeset{errors: _} = changeset} ->
        {:error, :changeset, changeset}
    end
  end

  def update_post(post, attrs \\ %{}) do
    with {:ok, post} <- post |> change_post(attrs) |> Repo.update(),
         {:ok} <- post |> process_categories_association(attrs)
    do
      get_post(post.id)
    else
      {:error, %Ecto.Changeset{errors: _} = changeset} ->
        {:error, :changeset, changeset}
    end
  end

  def delete_post(post), do: Repo.delete(post)

  def approve_post(hashed_id) do
    with {:ok, %{"sub" => id}} <- decode_post_id(hashed_id),
         {:ok, post} <- get_post_by(id: id, reviewed: false),
         {:ok, post} <- update_post(post, %{reviewed: true})
    do
      {:ok, post}
    else
      {:error, :not_found} -> {:error, :post_approved}
      {:error, %Ecto.Changeset{errors: _} = changeset} -> {:error, :changeset, changeset}
      {:error, _} -> {:error, :not_found}
    end
  end

  def get_categories, do: Repo.all(Category)

  def get_category(id, only_public, params) do
    case Repo.get(Category, id) do
      nil -> {:error, :not_found}
      category ->
        {
          :ok,
          category
          |> preload_category_posts(only_public, params)
        }
    end
  end

  def encode_post_id(id) do
    jwt_handler().encode_and_sign(
      id,
      %{},
      ttl: {100, :weeks}
    )
  end

  #private

  defp base_posts_query(only_public) do
    from(
      p in Post,
      order_by: [desc: p.inserted_at],
      where: p.is_public in ^is_public_in(only_public) and p.reviewed == true,
      preload: [:author, posts_categories: :category, reactions: :user]
    )
  end

  defp is_public_in(true), do: [true]

  defp is_public_in(false), do: [true, false]

  defp get_or_create_category(name) do
    case Repo.get_by(Category, name: name) do
      nil -> %Category{name: name} |> Repo.insert!()
      category -> category
    end
  end

  defp decode_post_id(encoded) do
    jwt_handler().decode_and_verify(encoded)
  end

  defp change_post(post, attrs) do
    post
    |> Post.changeset(attrs)
  end

  defp process_categories_association(post, %{ "categories" => category_names }) do
    categories = category_names |> Enum.map(&get_or_create_category/1)

    from(pc in PostCategory, where: pc.post_id == ^post.id) |> Repo.delete_all

    categories
      |> Enum.with_index(1)
      |> Enum.map(fn {category, position} -> PostCategory.changeset(%PostCategory{}, %{ post_id: post.id, category_id: category.id, position: position  }) end)
      |> Enum.map(&Repo.insert/1)

    {:ok}
  end

  defp process_categories_association(_, _), do: {:ok}

  defp preload_post_data(post_data) do
    Repo.preload(post_data, [:author, posts_categories: :category, reactions: :user])
  end

  defp preload_category_posts(category, only_public_posts, params) do
    preload_posts_query = from(
      p in Post,
      preload: [:author, posts_categories: :category, reactions: :user]
    )

    preloaded_post_categories = PostCategory
      |> join(:inner, [pc], p in Post, on: pc.post_id == p.id)
      |> where([pc, p], pc.category_id == ^category.id and p.is_public in ^is_public_in(only_public_posts) and p.reviewed == true)
      |> select([pc, p], pc)
      |> order_by([pc, p], desc: p.inserted_at)
      |> preload(post: ^preload_posts_query)
      |> Repo.paginate(params)

    Map.put(category, :posts_categories, preloaded_post_categories)
  end

  defp jwt_handler do
    Application.get_env(:til, :guardian, Til.Guardian)
  end
end
