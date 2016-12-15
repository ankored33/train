require 'bundler'
Bundler.require

get '/' do
  slim :index
end

get '/member/:name' do
  member_age = rand(100)
  content_type :json
  data = {name: params[:name], age: member_age}
  data.to_json
end