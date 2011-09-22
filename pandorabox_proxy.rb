require 'sinatra'
require 'httparty'
require 'json'

get '/' do
  content_type :json

  options = { :query => { :botid => params[:botid], :input => params[:message], :custid => params[:custid] } }
  response = HTTParty.post('http://www.pandorabots.com/pandora/talk-xml', options)
  response.parsed_response.to_json
end

