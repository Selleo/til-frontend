import Config

config :til, Til.Repo,
  ssl: true,
  url: System.fetch_env!("DATABASE_URL"),
  pool_size: String.to_integer(System.get_env("POOL_SIZE", "10"))

config :til, TilWeb.Endpoint,
  server: true,
  http: [port: {:system, "PORT"}],
  url: [scheme: "https", host: System.fetch_env!("HOST_URL"), port: 443],
  secret_key_base: System.fetch_env!("SECRET_KEY_BASE")

config :ueberauth, Ueberauth.Strategy.Google.OAuth,
  client_id: System.fetch_env!("GOOGLE_CLIENT_ID"),
  client_secret: System.fetch_env!("GOOGLE_CLIENT_SECRET")

config :til, Til.Guardian,
  issuer: "til",
  secret_key: System.fetch_env!("GUARDIAN_SECRET")

config :til,
  ecto_repos: [Til.Repo],
  frontend_host: System.fetch_env!("FRONTEND_HOST"),
  slack_review_hook: System.fetch_env!("SLACK_REVIEW_HOOK"),
  slack_feed_hook: System.fetch_env!("SLACK_FEED_HOOK"),
  http_adapter: HTTPoison
