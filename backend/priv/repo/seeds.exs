alias Til.ShareableContent.{Category, Post}
alias Til.Accounts.User
alias Til.Repo

categories = [
  "android", "angular", "aws", "crystal", "docker", "ember", "erlang", "flutter", "heroku", "html", "k8s",
  "markdown", "meetup", "mongodb", "nodejs", "osx", "phoenix", "redis", "rust", "terraform", "vault"
]

Enum.map(categories, fn category ->
  Repo.insert! %Category{
    name: category,
    official: true
  }
end)

Repo.insert! %Category{
  name: "rails",
  url: "https://selleo.com/ruby-on-rails-expert-developers-team",
  official: true
}

Repo.insert! %Category{
  name: "javascript",
  url: "https://selleo.com/custom-software-development-company",
  official: true
}

Repo.insert! %Category{
  name: "ruby",
  url: "https://selleo.com/ruby-on-rails-expert-developers-team",
  official: true
}

Repo.insert! %Category{
  name: "general",
  url: "https://selleo.com/custom-software-development-company",
  official: true
}

Repo.insert! %Category{
  name: "react",
  url: "https://selleo.com/react-expert-developers-team",
  official: true
}

Repo.insert! %Category{
  name: "css",
  url: "https://selleo.com/ux-design",
  official: true
}

Repo.insert! %Category{
  name: "git",
  url: "https://selleo.com/custom-software-development-company",
  official: true
}

Repo.insert! %Category{
  name: "chrome",
  url: "https://selleo.com/custom-software-development-company",
  official: true
}

Repo.insert! %Category{
  name: "linux",
  url: "https://selleo.com/custom-software-development-company",
  official: true
}

Repo.insert! %Category{
  name: "elixir",
  url: "https://selleo.com/elixir-expert-developers-team",
  official: true
}

Repo.insert! %Category{
  name: "commandline",
  url: "https://selleo.com/devops-cloud-services",
  official: true
}

Repo.insert! %Category{
  name: "nodejs",
  url: "https://selleo.com/node-js-expert-developers-team",
  official: true
}

Repo.insert! %Category{
  name: "sql",
  url: "https://selleo.com/devops-cloud-services",
  official: true
}

Repo.insert! %Category{
  name: "react-native",
  url: "https://selleo.com/react-native-expert-developers-team",
  official: true
}

# user1 = Repo.insert! %User{
#     first_name: "Mick",
#     email: "Mick@dkjf.pl",
#     uuid: Ecto.UUID.generate()
#   }

# user2 = Repo.insert! %User{
#     first_name: "John",
#     email: "john@dkjf.pl",
#     uuid: Ecto.UUID.generate()
#   }

# user3 = Repo.insert! %User{
#     first_name: "Phil",
#     email: "phil@dkjf.pl",
#     uuid: Ecto.UUID.generate()
#   }

# user4 = Repo.insert! %User{
#     first_name: "Greg",
#     email: "greg@dkjf.pl",
#     uuid: Ecto.UUID.generate()
#   }


# Repo.insert! %Post{
#   author: user1,
#   title: "markdown",
#   body: "this is markdown with js",
#   is_public: true,
#   reviewed: true,
# }

# Repo.insert! %Post{
#   author: user2,
#   title: "elixir",
#   body: "this is markdown with elixir",
#   is_public: true,
#   reviewed: true,
# }

# Repo.insert! %Post{
#   author: user3,
#   title: "angular",
#   body: "this is angular with js",
#   is_public: true,
#   reviewed: true,
# }

# Repo.insert! %Post{
#   author: user1,
#   title: "html",
#   body: "this is aws with chrome",
#   is_public: true,
#   reviewed: true,
# }

# Repo.insert! %Post{
#   author: user4,
#   title: "mongodb",
#   body: "this is mongdb with erlang and flutter",
#   is_public: true,
#   reviewed: true,
# }

# Repo.insert! %Post{
#   author: user1,
#   title: "sql",
#   body: "sql osx and nodejs",
#   is_public: true,
#   reviewed: true,
# }

# Repo.insert! %Post{
#   author: user4,
#   title: "crystal",
#   body: "sql osx crystal and nodejs",
#   is_public: true,
#   reviewed: true,
# }

# Repo.insert! %Post{
#   author: user1,
#   title: "css",
#   body: "css osx and nodejs",
#   is_public: true,
#   reviewed: true,
# }

# Repo.insert! %Post{
#   author: user4,
#   title: "docker",
#   body: "docker rails git and nodejs",
#   is_public: true,
#   reviewed: true,
# }
