require 'sinatra'
require 'sinatra/reloader'


get '/' do
  erb :index
end


post '/' do

  opt = {}
  opt['User-Agent'] = 'Opera/9.80 (Windows NT 5.1; U; ja) Presto/2.7.62 Version/11.01 ' #User-Agent偽装

  @url = @params[:url]
  uri = "http://b.hatena.ne.jp/entry/json/?url=#{@url}" #URLを必要に応じて変更
  uri_esc = URI.escape(uri)
  io = open(uri_esc, opt)
  hash = JSON.load(io)

  @bkm = hash["bookmarks"]
  eid = hash["eid"].to_s
  i = 0 
  v = @bkm.size
  
  for var in @bkm do
      timestamp = var["timestamp"].delete("/")[0,8].to_s
      user = var["user"]
  
  
      #ブコメパーマリンク生成
      starurl = "http://s.hatena.com/entry.json?uri=http://b.hatena.ne.jp/#{user}/#{timestamp}#bookmark-#{eid}"
  
      #URLエンコード
      starurl_esc = URI.escape(starurl) 
  
      io_s = open(starurl_esc, opt)
      hash_s =JSON.load(io_s)
  
    #["colored_stars"]を探索して色ごとに配列に突っ込む
    colorstars = Array.new
    if hash_s["entries"].empty? == false #["entries"]が空の人用のif文
      x = hash_s["entries"][0]["colored_stars"]
      if x != nil
        for var_s in x do
          cs = var_s["color"]
          colorstars << cs
        end
      else
      end
        y_star = hash_s["entries"][0]["stars"].length #黄色スターの数
        g_star = colorstars.count("green").to_i
        r_star = colorstars.count("red").to_i
        b_star = colorstars.count("blue").to_i
        p_star = colorstars.count("purple").to_i
        s_power = y_star + g_star * 5 + r_star * 20 + b_star * 50 + p_star * 100
    else
        y_star = 0 #["entries"]が空の人はとりあえず全部0
        g_star = 0
        r_star = 0
        b_star = 0
        p_star = 0
        s_power = 0
    end
      #p user + ", y" + y_star.to_s + ", g" + g_star.to_s + ", r" + r_star.to_s + ", b" + b_star.to_s + ", p" + p_star.to_s
      #p user + " #{s_power}"
    var["y_star"] = y_star
    var["g_star"] = g_star
    var["r_star"] = r_star
    var["b_star"] = b_star
    var["p_star"] = p_star
    var["s_power"] = s_power
    var["icon"] = "http://www.hatena.com/users/#{user[0,2]}/#{user}/profile.gif"
    i += 1
    #puts "ブクマ読み込み中... #{i} / #{v}"
  end #for文のend  
  
  
  erb :index
end













=begin
post '/' do
  @url = @params[:url]
  erb :index
end
=end

