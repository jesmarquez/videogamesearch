var fetch = require('node-fetch')
exports.handler = async (event, context) => {
  var url = event.path
  url = url.split('.netlify/functions/cors/')[1]
  url = decodeURIComponent(url)
  url = new URL(url)
  
  for(let i in event.queryStringParameters){
    url.searchParams.append(i, event.queryStringParameters[i])
  }
  
  var cookie_string = event.headers.cookie || ""
  var useragent = event.headers["user-agent"] || ""
  
  // todo: check if it works
  var clientid = import.meta.env.VITE_IGDB_CLIENT_ID || ""
  var authorization =  import.meta.env.VITE_IGDB_AUTH_TOKEN || ""
  
  var header_to_send = {
    "Cookie" : cookie_string,
    "User-Agent" : useragent,
    "Client-ID": clientid,
    "Authorization": authorization,
    "Content-type" : "application/json",
    "Access-Control-Allow-Origin": "*",
    "Accept" : "*/*",
    "Host" : url.host
  }
  var options = {
    method: event.httpMethod.toUpperCase(),
    headers: header_to_send,
    body: event.body
  }
  if(event.httpMethod.toUpperCase() == "GET" || event.httpMethod.toUpperCase() == "HEAD" )
    delete options.body
    
  var response = await fetch(url, options)
  var response_text = await response.text()
  var headers = response.headers.raw()
  
  var cookie_header = null
  if(headers["set-cookie"]) 
    cookie_header = headers["set-cookie"]
  
  return {
    statusCode: 200,
    body: response_text,
    headers: {
      "Content-type": String(header["content-type"]) || "text/plain",
      multiValueHeaders: {
        "set-cookie": cookie_header || []
        
      }
    }
  }
}
