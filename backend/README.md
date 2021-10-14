# Til

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official website: https://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Forum: https://elixirforum.com/c/phoenix-forum
  * Source: https://github.com/phoenixframework/phoenix

## Deployment

1. Build image

```
docker build -t til:NEW_VER .
docker tag til:NEW_VER AWS_ACCOUNT_ID.dkr.ecr.eu-central-1.amazonaws.com/til:NEW_VER
docker push AWS_ACCOUNT_ID.dkr.ecr.eu-central-1.amazonaws.com/til:NEW_VER
```

2. Terraform apply with newest tag

3. Log in to EC2 and elixir container and run migrations

```
./bin/til rpc Til.Release.migrate
```

