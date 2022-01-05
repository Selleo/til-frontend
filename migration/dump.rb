require 'rubygems'
require 'bundler/setup'
require 'csv'
require 'active_record'
require 'pry'


def title_url(title)
  title.downcase.gsub(/\s+/, "-").gsub(/[^a-zA-Z0-9\-_]/, "").squeeze("-")
end

def extract_full_name(dev)
  last_name = dev.email.split(/(\.|@)/)[2]
  start_at = I18n.transliterate(dev.username).index(last_name)
  first_name = dev.username[0...start_at].capitalize
  last_name = dev.username[start_at..-1].capitalize

  [first_name, last_name]
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
        "uuid",
        "first_name",
        "last_name",
      ])
    )
  Developer.all.each do |dev|
    first_name, last_name = extract_full_name(dev)
    f.write(
      CSV.generate_line([
        dev.id,
        dev.email,
        dev.username,
        SecureRandom.uuid,
        first_name,
        last_name,
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
        title_url(post.title),
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

  f.write("  \"/\" => \"https://til.selleo.com\",\n")
  f.write("\n")

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



