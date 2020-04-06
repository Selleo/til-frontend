defmodule Til.Notifications.Notifiers.SlackNotifier do
  use GenServer, restart: :temporary

  def start_link(notification_params) do
    GenServer.start_link(__MODULE__, notification_params)
  end

  def init(notification_params) do
    GenServer.cast(self(), notification_params)
    {:ok, %{}}
  end

  def handle_cast([:post_published, %{post: post}] = params, state) do
    body = Jason.encode!(%{
      text: "#{author_string(post)} created post <#{frontend_host()}/posts/#{post.id}|#{post.title}> #{categories_string(post)}"
    })

    with {:ok, _} <- http_adapter().post feed_hook(), body do {:noreply, %{
      params: params, body: body
    }} end
  end

  def handle_cast([:post_created, %{post: post, hashed_id: hashed_id}] = params, state) do
    body = Jason.encode!(%{
      text: "#{author_string(post)} created post <#{frontend_host()}/review-posts?hashed_id=#{hashed_id}|#{post.title}> #{categories_string(post)}"
    })

    with {:ok, _} <- http_adapter().post review_hook(), body do {:noreply, %{
      params: params, body: body
    }} end
  end

  # private

  defp http_adapter, do: Application.get_env(:til, :http_adapter)
  defp review_hook, do: Application.get_env(:til, :slack_review_hook)
  defp feed_hook, do: Application.get_env(:til, :slack_feed_hook)
  defp frontend_host, do: Application.get_env(:til, :frontend_host)

  defp categories_string(post), do: "#{Enum.map post.categories, &("##{&1.name} ")}"

  defp author_string(post), do: "#{post.author.first_name} #{post.author.last_name}"
end


