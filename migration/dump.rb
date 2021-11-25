require 'rubygems'
require 'bundler/setup'
require 'csv'
require 'active_record'


def title_url(title)
  title.downcase.gsub(/\s+/, "-").gsub(/[^a-zA-Z0-9\-_]/, "").squeeze("-")
end

ActiveRecord::Base.establish_connection(
  "postgres://til:secret@localhost:5400/til?sslmode=disable"
)

class Channel < ActiveRecord::Base; end
class Developer < ActiveRecord::Base; end
class Post < ActiveRecord::Base; end

File.open("users.csv", "w") do |f|
    f.write(
      CSV.generate_line([
        "id",
        "email",
        "username",
        "uuid"
      ])
    )
  Developer.all.each do |dev|
    f.write(
      CSV.generate_line([
        dev.id,
        dev.email,
        dev.username,
        SecureRandom.uuid
      ], col_sep: ",", row_sep: "\n", quote_char: '"')
    )
  end
end

File.open("categories.csv", "w") do |f|
    f.write(
      CSV.generate_line([
        "id",
        "name",
        "official"
      ])
    )
  Channel.all.each do |ch|
    f.write(
      CSV.generate_line([
        ch.id,
        ch.name,
        false
      ], col_sep: ",", row_sep: "\n", quote_char: '"')
    )
  end
end

File.open("posts.csv", "w") do |f|
    f.write(
      CSV.generate_line([
        "id",
        "title",
        "slug",
        "body",
        "is_public",
        "author_id",
        "inserted_at",
        "updated_at",
        "reviewed"
      ])
    )
  Post.all.each do |post|
    f.write(
      CSV.generate_line([
        post.id,
        post.title,
        post.slug,
        post.body,
        true,
        post.developer_id,
        post.inserted_at,
        post.updated_at,
        true
      ], col_sep: ",", row_sep: "\n", quote_char: '"')
    )
  end
end

File.open("posts_categories.csv", "w") do |f|
    f.write(
      CSV.generate_line([
        "post_id",
        "category_id"
      ])
    )
  Post.all.each do |post|
    f.write(
      CSV.generate_line([
        post.id,
        post.channel_id,
      ], col_sep: ",", row_sep: "\n", quote_char: '"')
    )
  end
end


File.open("redirections.cr", "w") do |f|
  f.write("# This file is generated from Selleo/til/migration/dump.rb script based on current database\n\n")
  f.write("REDIRECTIONS = {\n")

  Post.all.each do |post|
    f.write("  \"/posts/#{post.slug}-#{title_url(post.title)}\" => \"https://til.selleo.com/posts/#{post.id}-#{title_url(post.title)}\",\n")
  end
  f.write("\n")
  Channel.all.each do |ch|
    f.write("  \"/#{ch.name}\" => \"https://til.selleo.com/category/#{ch.name}\",\n")
  end
  f.write("\n")
  Developer.all.each do |dev|
    f.write("  \"/authors/#{dev.username}\" => \"https://til.selleo.com/authors/#{dev.username}\",\n")
  end

  f.write("}")
end



