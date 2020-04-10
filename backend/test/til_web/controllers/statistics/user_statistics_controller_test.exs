defmodule TilWeb.Statistics.UserStatisticsControllerTest do
  use TilWeb.ConnCase
  import Til.Factory

  describe "GET /api/statistics/users" do
    test "returns users with proper statistics", %{conn: conn} do
      first_user = insert(:user)
      second_user = insert(:user)

      # First user posts
      first_post = insert(:post, author: first_user)
      second_post = insert(:post, author: first_user)

      # Second user posts
      third_post = insert(:post, author: second_user)
      fourth_post = insert(:post, author: second_user)

      # First user reactions
      insert(:reaction, user_id: first_user.id, post_id: third_post.id, type: "like")
      insert(:reaction, user_id: first_user.id, post_id: third_post.id, type: "love")
      insert(:reaction, user_id: first_user.id, post_id: third_post.id, type: "surprised")
      insert(:reaction, user_id: first_user.id, post_id: fourth_post.id, type: "funny")
      insert(:reaction, user_id: first_user.id, post_id: fourth_post.id, type: "like")

      # Second user reactions
      insert(:reaction, user_id: second_user.id, post_id: first_post.id, type: "like")
      insert(:reaction, user_id: second_user.id, post_id: first_post.id, type: "love")
      insert(:reaction, user_id: second_user.id, post_id: second_post.id, type: "like")
      insert(:reaction, user_id: second_user.id, post_id: second_post.id, type: "funny")

      response =
        conn
        |> get(Routes.user_statistics_path(conn, :index))

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert response.status == 200

      assert parsed_response_body == [
        %{
          "user" => %{
            "uuid" => first_user.uuid,
            "email" => first_user.email,
            "firstName" => first_user.first_name,
            "lastName" => first_user.last_name,
            "image" => first_user.image,
          },
          "postCount" => 2,
          "reactionsGiven" => %{
            "total" => 5,
            "like" => 2,
            "love" => 1,
            "funny" => 1,
            "surprised" => 1
          },
          "reactionsReceived" => %{
            "total" => 4,
            "like" => 2,
            "love" => 1,
            "funny" => 1,
            "surprised" => 0
          }
        },
        %{
          "user" => %{
            "uuid" => second_user.uuid,
            "email" => second_user.email,
            "firstName" => second_user.first_name,
            "lastName" => second_user.last_name,
            "image" => second_user.image,
          },
          "postCount" => 2,
          "reactionsGiven" => %{
            "total" => 4,
            "like" => 2,
            "love" => 1,
            "funny" => 1,
            "surprised" => 0
          },
          "reactionsReceived" => %{
            "total" => 5,
            "like" => 2,
            "love" => 1,
            "funny" => 1,
            "surprised" => 1
          }
        }
      ]
    end
  end

  describe "GET /api/statistics/users/:id" do
    test "returns particular user with relevant statistics", %{conn: conn} do
      first_user = insert(:user)
      second_user = insert(:user)

      # First user posts
      first_post = insert(:post, author: first_user)
      second_post = insert(:post, author: first_user)

      # Second user posts
      third_post = insert(:post, author: second_user)
      fourth_post = insert(:post, author: second_user)

      # First user reactions
      insert(:reaction, user_id: first_user.id, post_id: third_post.id, type: "like")
      insert(:reaction, user_id: first_user.id, post_id: third_post.id, type: "love")
      insert(:reaction, user_id: first_user.id, post_id: third_post.id, type: "surprised")
      insert(:reaction, user_id: first_user.id, post_id: fourth_post.id, type: "funny")
      insert(:reaction, user_id: first_user.id, post_id: fourth_post.id, type: "like")

      # Second user reactions
      insert(:reaction, user_id: second_user.id, post_id: first_post.id, type: "like")
      insert(:reaction, user_id: second_user.id, post_id: first_post.id, type: "love")
      insert(:reaction, user_id: second_user.id, post_id: second_post.id, type: "like")
      insert(:reaction, user_id: second_user.id, post_id: second_post.id, type: "funny")

      response =
        conn
        |> get(Routes.user_statistics_path(conn, :show, first_user.uuid))

      {:ok, parsed_response_body} = Jason.decode(response.resp_body)
      assert response.status == 200

      assert parsed_response_body == %{
        "user" => %{
          "uuid" => first_user.uuid,
          "email" => first_user.email,
          "firstName" => first_user.first_name,
          "lastName" => first_user.last_name,
          "image" => first_user.image,
        },
        "postCount" => 2,
        "reactionsGiven" => %{
          "total" => 5,
          "like" => 2,
          "love" => 1,
          "funny" => 1,
          "surprised" => 1
        },
        "reactionsReceived" => %{
          "total" => 4,
          "like" => 2,
          "love" => 1,
          "funny" => 1,
          "surprised" => 0
        }
      }
    end
  end
end
