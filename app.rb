require 'bundler'
Bundler.require

get '/' do
  slim :index
end

get '/geturl/:url' do
  member_age = rand(100)
  content_type :json
  data = {url: params[:url], age: member_age}
  data.to_json
end