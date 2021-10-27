import Config

config :til, TilWeb.Endpoint,
  render_errors: [view: TilWeb.ErrorView, accepts: ~w(json)],
  pubsub_server: MyApp.PubSub,
  force_ssl: [hsts: true, rewrite_on: [:x_forwarded_proto]]

config :logger, level: :debug
