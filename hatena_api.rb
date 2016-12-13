require 'open-uri'
require 'json'


#はてなAPIから返るjsonをハッシュ化 
uri = 'http://b.hatena.ne.jp/entry/json/?url=http://anond.hatelabo.jp/20161206134710' #URLを必要に応じて変更
opt = {}
opt['User-Agent'] = 'Opera/9.80 (Windows NT 5.1; U; ja) Presto/2.7.62 Version/11.01 ' #User-Agent偽装
  io = open(uri, opt)
  hash = JSON.load(io)
  bkm = hash["bookmarks"]
  eid = hash["eid"].to_s
 
for var in bkm do
    timestamp = var["timestamp"].delete("/")[0,8].to_s
    user = var["user"]

#   53の["entries"]が空の人の処理を考えないといけない
#   timestamp = bkm[53]["timestamp"].delete("/")[0,8].to_s
#   user = bkm[53]["user"]

    #ブコメパーマリンク生成
    starurl = "http://s.hatena.com/entry.json?uri=http://b.hatena.ne.jp/#{user}/#{timestamp}#bookmark-#{eid}"

    #URLエンコード
    starurl_esc = URI.escape(starurl) 

    io_s = open(starurl_esc, opt)
    hash_s =JSON.load(io_s)

  #["colored_stars"]を探索して色ごとに配列に突っ込む
  colorstars = Array.new
  if hash_s["entries"].empty? == false #53の人用のif文
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
  else
    y_star = 0 #["entries"]が空の人はとりあえず全部0
    g_star = 0
    r_star = 0
    b_star = 0
    p_star = 0
  end
    p user + ", y" + y_star.to_s + ", g" + g_star.to_s + ", r" + r_star.to_s + ", b" + b_star.to_s + ", p" + p_star.to_s

end #for文のend

#ブコメのスター数を返すAPI
#http://s.hatena.com/entry.json?uri={ブコメのパーマリンク}

#ブコメのパーマリンク
#http://b.hatena.ne.jp/{ユーザーID}/{コメントの日付(YYYYMMDD)}#bookmark-{エントリーID}

#URI.escape(url)
