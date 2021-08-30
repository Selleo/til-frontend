defmodule TilWeb.AuthController do
  use TilWeb, :controller
  plug Ueberauth
  alias Til.Accounts

  def request(conn, _), do: conn

  def callback(
    %{
      assigns: %{
        ueberauth_auth: %{
          info: %{email: email, first_name: first_name, last_name: last_name, image: image},
          credentials: %{token: _},
          uid: _
        }
      },
      query_params: params
    } = conn, _
  ) do
    {:ok, user} = case Accounts.get_user_by(email: email) do
      nil ->
        Accounts.create_user(%{
          email: email,
          first_name: first_name,
          last_name: last_name,
          image: image
        })
      user -> {:ok, user}
    end

    {:ok, jwt, _} = jwt_handler().encode_and_sign(user.uuid)

    conn
    |> put_resp_header("authorization", "Bearer #{jwt}")
    |> redirect(
      external: get_redirect_url(params, jwt)
    )
  end

  defp get_redirect_url(params, jwt) do
    case params["state"] do
      nil -> "#{Application.get_env(:til, :frontend_host)}/auth?auth_token=#{jwt}"
      state -> "#{Application.get_env(:til, :frontend_host)}/auth?auth_token=#{jwt}&callback_url=#{URI.encode_www_form(state)}"
    end
  end

  defp jwt_handler do
    Application.get_env(:til, :guardian, Til.Guardian)
  end
end
