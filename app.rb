require 'sinatra'
require 'sinatra/reloader'
require 'json'

get '/' do
  erb :index
end

post '/post' do
  #ここで入力データを処理する
  foo = params[:foo]
  bar = params[:bar]
  data = {
    "foo" => foo,
    "bar" => bar
  }
  content_type :json
  @data = data.to_json  
end













