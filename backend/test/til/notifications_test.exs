
defmodule Til.NotificationsTest do
  use TilWeb.ConnCase
  import Til.Factory

  describe "post published notification" do
    test "called with correct params" do
      post = insert(:post, categories: [])
      {:ok, slack_notifier_pid} = Til.Notifications.notify_post_published(post)

      %{params: [notification, %{post: passed_post}]} = :sys.get_state(slack_notifier_pid)

      assert notification == :post_published
      assert post == passed_post
    end

    test "sends notification with correct body" do
      first_category = insert(:category)
      second_category = insert(:category)
      post = insert(:post, categories: [first_category, second_category])

      {:ok, slack_notifier_pid} = Til.Notifications.notify_post_published(post)

      %{body: body} = :sys.get_state(slack_notifier_pid)

      assert body == Jason.encode!(%{
        text: "#{post.author.first_name} #{post.author.last_name} created post <#{Application.get_env(:til, :frontend_host)}/posts/#{post.id}|#{post.title}> ##{first_category.name} ##{second_category.name} "
      })
    end
  end

  describe "post created notification" do
    test "called with correct params" do
      post = insert(:post, categories: [])
      {:ok, slack_notifier_pid} = Til.Notifications.notify_post_created(post, "somehashedid")

      %{params: [notification, %{post: passed_post, hashed_id: hashed_id}]} = :sys.get_state(slack_notifier_pid)

      assert notification == :post_created
      assert post == passed_post
      assert hashed_id == "somehashedid"
    end

    test "sends notification with correct body" do
      first_category = insert(:category)
      second_category = insert(:category)
      post = insert(:post, categories: [first_category, second_category])

      {:ok, slack_notifier_pid} = Til.Notifications.notify_post_created(post, "somehashedid")

      %{body: body} = :sys.get_state(slack_notifier_pid)

      assert body == Jason.encode!(%{
        text: "#{post.author.first_name} #{post.author.last_name} created post <#{Application.get_env(:til, :frontend_host)}/review-posts?hashed_id=somehashedid|#{post.title}> ##{first_category.name} ##{second_category.name} "
      })
    end
  end
end
