
defmodule Til.NotificationsTest do
  use TilWeb.ConnCase
  import Til.Factory
  alias Til.Repo
  alias Til.ShareableContent.Post

  describe "post published notification" do
    test "builds notification message properly" do
      first_category = insert(:category)
      second_category = insert(:category)
      post = insert(:post)

      insert(:post_category, post_id: post.id, category_id: first_category.id)
      insert(:post_category, post_id: post.id, category_id: second_category.id)

      post = Repo.get!(Post, post.id) |> Repo.preload([:author, posts_categories: :category])

      expected_message = "#{post.author.first_name} #{post.author.last_name} created post <#{Application.get_env(:til, :frontend_host)}/posts/#{post.id}|#{post.title}> ##{first_category.name} ##{second_category.name} "
      assert Til.Notifications.build_notification_message(:post_published, post) == expected_message
    end
  end

  describe "post created notification" do
    test "builds notification message properly" do
      first_category = insert(:category)
      second_category = insert(:category)

      post = insert(:post)

      insert(:post_category, post_id: post.id, category_id: first_category.id)
      insert(:post_category, post_id: post.id, category_id: second_category.id)

      post = Repo.get!(Post, post.id) |> Repo.preload([:author, posts_categories: :category])

      expected_message = "#{post.author.first_name} #{post.author.last_name} created post <#{Application.get_env(:til, :frontend_host)}/review-posts?hashed_id=somehashedid|#{post.title}> ##{first_category.name} ##{second_category.name} "
      assert Til.Notifications.build_notification_message(:post_created, post, "somehashedid") == expected_message
    end
  end
end
