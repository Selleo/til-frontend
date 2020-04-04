defmodule Til.Notifications.Notifiers.SlackNotifier do
  use GenServer, restart: :temporary

  @frontend_host Application.get_env(:til, :frontend_host)
  @slack_review_hook Application.get_env(:til, :slack_review_hook)
  @slack_feed_hook Application.get_env(:til, :slack_feed_hook)

  def start_link(notification_params) do
    GenServer.start_link(__MODULE__, notification_params)
  end

  def init(notification_params) do
    GenServer.cast(self(), notification_params)
    {:ok, %{}}
  end

  def handle_cast([:post_published, %{post: post}], state) do
    body = Jason.encode!(%{
      text: "#{author_string(post)} created post <#{@frontend_host}/posts/#{post.id}|#{post.title}> #{categories_string(post)}"
    })

    with {:ok, _} <- HTTPoison.post @slack_feed_hook, body do {:noreply, %{}} end
  end

  def handle_cast([:post_created, %{post: post, hashed_id: hashed_id}], state) do
    body = Jason.encode!(%{
      text: "#{author_string(post)} created post <#{@frontend_host}/posts/hidden?hashed_id=#{hashed_id}|#{post.title}> #{categories_string(post)}"
    })

    with {:ok, _} <- HTTPoison.post @slack_review_hook, body do {:noreply, %{}} end
  end

  # private

  defp categories_string(post), do: "#{Enum.map post.categories, &("##{&1.name} ")}"

  defp author_string(post), do: "#{post.author.first_name} #{post.author.last_name}"
end


