defmodule Til.Notifications do
  def notify_post_published(post) do
    Til.Notifications.NotificationSupervisor.run_notifier([:post_published, %{post: post}])
  end

  def notify_post_created(post, hashed_id) do
    Til.Notifications.NotificationSupervisor.run_notifier([:post_created, %{post: post, hashed_id: hashed_id}])
  end
end
