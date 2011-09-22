require 'sinatra'
require 'httparty'
require 'json'

get '/' do
  content_type :json
  headers \
    "Access-Control-Allow-Origin" => "*"

  options = { :query => { :botid => params[:botid], :input => params[:message], :custid => params[:custid] } }
  response = HTTParty.post('http://www.pandorabots.com/pandora/talk-xml', options)
  $stderr.puts "Response:"
  $stderr.puts response.to_yaml
  response.parsed_response.to_json
end

