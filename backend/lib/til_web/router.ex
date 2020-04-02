defmodule TilWeb.Router do
  use TilWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :authenticated do
    plug TilWeb.Plug.AuthAccessPipeline
  end

  scope "/auth", TilWeb do
    get "/:provider", AuthController, :request
    get "/:provider/callback", AuthController, :callback
  end

  scope "/api", TilWeb do
    pipe_through :api
    resources "/users", UserController, only: [:index, :show]
    resources "/posts", PostController, only: [:index, :show]
    resources "/categories", CategoryController, only: [:index]

    pipe_through :authenticated
    get "/me", MeController, :index do
      resources "/me/posts", Me.PostController, only: [:update, :delete]
    end

    resources "/posts", PostController, only: [:create] do
      post "/likes", Posts.LikeController, :like
      delete "/likes", Posts.LikeController, :unlike
    end
  end
end
