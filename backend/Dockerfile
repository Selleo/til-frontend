# --- build stage ---
FROM elixir:1.13.0-rc.1-alpine AS build

RUN apk add --update alpine-sdk coreutils

WORKDIR /app

ENV MIX_ENV=prod

COPY mix.exs mix.lock ./
COPY config config
COPY priv priv
COPY lib lib

RUN mix local.hex --force && \
    mix local.rebar --force && \
    mix deps.get && \
    mix deps.compile && \
    mix compile && \
    mix release

# --- application stage ---
FROM alpine:3.14

RUN apk add --update bash openssl libstdc++ ncurses-libs curl postgresql-client

WORKDIR /app

COPY --from=build /app/_build/prod/rel/til ./
RUN chown -R nobody: /app
USER nobody

ENV HOME=/app

CMD ["./bin/til", "start"]
