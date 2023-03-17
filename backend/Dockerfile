# --- build stage ---
FROM hexpm/elixir:1.13.4-erlang-24.3.4.10-alpine-3.16.4 AS build

RUN apk add --update alpine-sdk coreutils

RUN mkdir /app
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
FROM alpine:3.16.4

RUN apk add --update bash openssl libstdc++ ncurses-libs curl postgresql-client

RUN mkdir /app
WORKDIR /app

COPY --from=build /app/_build/prod/rel/til ./
ADD entrypoint.sh /app/
RUN chown -R nobody: /app
USER nobody

ENV HOME=/app
ENTRYPOINT [ "/app/entrypoint.sh" ]
