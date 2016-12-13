require 'open-uri'
require 'nokogiri'

#スクレイピングURL
url = 'http://b.hatena.ne.jp/entry/www.asahi.com/articles/ASJCW7FVMJCWUCVL00P.html'

#User-Agent偽装
opt = {}
opt['User-Agent'] = 'Opera/9.80 (Windows NT 5.1; U; ja) Presto/2.7.62 Version/11.01 ' 

charset = nil
html = open(url,opt) do |f|
  charset = f.charset 
  f.read
end


doc = Nokogiri::HTML.parse(html, nil, charset)

doc.xpath('//*[@id="bookmark-user-jack_oo_lantern"]').each do |node|
  # tilte
  puts node.css('li').size

end
# '//*[@id="all-bookmarks"]/*[@id="public-bookmarks"]/ul'
#//*[@id="all-bookmarks"]/*[@id="public-bookmarks"]/*[@id="remaining-all-bookmarks"]/ul