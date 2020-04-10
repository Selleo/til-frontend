defmodule Statistics.UserStatistics do
  alias ShareableContent.User

  defstruct(
    user: %{},
    reactions: %{
      total: 0,
      like: 0,
      love: 0,
      funny: 0
    },
    posts: %{
      count: 0,
      reactions: %{
        total: 0,
        like: 0,
        love: 0,
        funny: 0
      }
    })
end
