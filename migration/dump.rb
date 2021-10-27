require 'rubygems'
require 'bundler/setup'
require 'csv'
require 'active_record'


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
        "inserted_at",
        "updated_at"
      ])
    )
  Developer.all.each do |dev|
    f.write(
      CSV.generate_line([
        dev.id,
        dev.email,
        dev.username,
        SecureRandom.uuid,
        dev.inserted_at,
        dev.updated_at
      ], col_sep: ",", row_sep: "\n", quote_char: '"')
    )
  end
end

