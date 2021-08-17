alias Til.ShareableContent.{Category, Post}
alias Til.Accounts.User
alias Til.Repo

categories = [
  "angular", "erlang", "flutter", "k8s",
  "markdown", "meetup", "mongodb", "osx", "redis", "rust",
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
  official: true,
  first_text: "Need help with your Ruby on Rails project?",
  second_text: "Visit our website to get more insights.",
}

Repo.insert! %Category{
  name: "devops",
  official: true,
  first_text: "Transform your DevOps expertise today!",
  second_text: "Get more tips from our tech leaders.",
}

Repo.insert! %Category{
  name: "cicd",
  official: true,
  first_text: "Transform your DevOps expertise today!",
  second_text: "Get more tips from our tech leaders.",
}

Repo.insert! %Category{
  name: "vault",
  official: true,
  first_text: "Transform your DevOps expertise today!",
  second_text: "Get more tips from our tech leaders.",
}

Repo.insert! %Category{
  name: "heroku",
  official: true,
  first_text: "Transform your DevOps expertise today!",
  second_text: "Get more tips from our tech leaders.",
}

Repo.insert! %Category{
  name: "docker",
  official: true,
  first_text: "Transform your DevOps expertise today!",
  second_text: "Get more tips from our tech leaders.",
}

Repo.insert! %Category{
  name: "terraform",
  official: true,
  first_text: "Transform your DevOps expertise today!",
  second_text: "Get more tips from our tech leaders.",
}

Repo.insert! %Category{
  name: "aws",
  official: true,
  first_text: "Transform your DevOps expertise today!",
  second_text: "Get more tips from our tech leaders.",
}

Repo.insert! %Category{
  name: "crystal",
  official: true,
  first_text: "Transform your DevOps expertise today!",
  second_text: "Get more tips from our tech leaders.",
}

Repo.insert! %Category{
  name: "android",
  official: true,
  first_text: "Interested in building a powerful mobile solution?",
  second_text: "Get insights from experienced developers.",
}

Repo.insert! %Category{
  name: "html",
  official: true,
  first_text: "Looking for insights on UX/UI development?",
  second_text: "Visit our page to learn more about it.",
}

Repo.insert! %Category{
  name: "javascript",
  url: "https://selleo.com/custom-software-development-company",
  official: true,
  first_text: "Interested in developing a JavaScript project?",
  second_text: "Get more details from our experts.",
}

Repo.insert! %Category{
  name: "ruby",
  url: "https://selleo.com/ruby-on-rails-expert-developers-team",
  official: true,
  first_text: "Need help with your Ruby on Rails project?",
  second_text: "Visit our website to get more insights.",
}

Repo.insert! %Category{
  name: "general",
  url: "https://selleo.com/custom-software-development-company",
  official: true,
  first_text: "Need key insights on software development?",
  second_text: "Go to our main page to get more tips.",
}

Repo.insert! %Category{
  name: "react",
  url: "https://selleo.com/react-expert-developers-team",
  official: true,
  first_text: "Need help with React.js?",
  second_text: "Click for more tips and tricks.",
}

Repo.insert! %Category{
  name: "ember",
  official: true,
  first_text: "Looking for tips from experienced Ember developers?",
  second_text: "Visit our website for more information.",
}

Repo.insert! %Category{
  name: "css",
  url: "https://selleo.com/ux-design",
  official: true,
  first_text: "Looking for insights on UX/UI development?",
  second_text: "Visit our page to learn more about it.",
}

Repo.insert! %Category{
  name: "git",
  url: "https://selleo.com/custom-software-development-company",
  official: true,
  first_text: "Need key insights on software development?",
  second_text: "Go to our main page to get more tips.",
}

Repo.insert! %Category{
  name: "chrome",
  url: "https://selleo.com/custom-software-development-company",
  official: true,
  first_text: "Need key insights on software development?",
  second_text: "Go to our main page to get more tips.",
}

Repo.insert! %Category{
  name: "linux",
  url: "https://selleo.com/custom-software-development-company",
  official: true,
  first_text: "Need key insights on software development?",
  second_text: "Go to our main page to get more tips.",
}

Repo.insert! %Category{
  name: "elixir",
  url: "https://selleo.com/elixir-expert-developers-team",
  official: true,
  first_text: "Looking for Elixir expertise?",
  second_text: "Read more from our experts.",
}

Repo.insert! %Category{
  name: "phoenix",
  url: "https://selleo.com/elixir-expert-developers-team",
  official: true,
  first_text: "Looking for Elixir expertise?",
  second_text: "Read more from our experts.",
}

Repo.insert! %Category{
  name: "commandline",
  url: "https://selleo.com/devops-cloud-services",
  official: true,
  first_text: "Transform your DevOps expertise today!",
  second_text: "Get more tips from our tech leaders.",
}

Repo.insert! %Category{
  name: "nodejs",
  url: "https://selleo.com/node-js-expert-developers-team",
  official: true,
  first_text: "Need help with Node.js development?",
  second_text: "Get help from our experienced teams",
}

Repo.insert! %Category{
  name: "sql",
  url: "https://selleo.com/devops-cloud-services",
  official: true,
  first_text: "Transform your DevOps expertise today!",
  second_text: "Get more tips from our tech leaders.",
}

Repo.insert! %Category{
  name: "react-native",
  url: "https://selleo.com/react-native-expert-developers-team",
  official: true,
  first_text: "Interested in building a powerful mobile solution?",
  second_text: "Get insights from experienced developers.",
}

Repo.insert! %Category{
  name: "qa",
  official: true,
  first_text: "In need of help with the quality of your products?",
  second_text: "Visit our page to learn more about it.",
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
