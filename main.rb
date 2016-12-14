require 'sinatra'
require 'sinatra/reloader'

get '/' do
    @title = "shooting"
  erb :index
end
