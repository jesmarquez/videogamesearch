import fetch from 'node-fetch'

export const handler = async (event, context) => {
  try{
  var url = event.path

  url = url.split('/.netlify/functions/cors/')[1]
  url = decodeURIComponent(url)
  url = new URL(url)
  for(let i in event.queryStringParameters){
    url.searchParams.append(i, event.queryStringParameters[i])
  }
  
  var cookie_string = event.headers["cookie"] || ""
  var useragent = event.headers["user-agent"] || ""
  
  // todo: check if it works
  /*var clientid = import.meta.env.VITE_IGDB_CLIENT_ID || ""
  var authorization =  import.meta.env.VITE_IGDB_AUTH_TOKEN || "" */
  
  var header_to_send = {
    
    "Cookie" : cookie_string,
    "User-Agent" : useragent,
    "Client-ID": "y01gh4f3nmcgy8bfwptgcqx3hus7iy",
    "Authorization": "Bearer iqq4sbh2lftf6ml6oj7pnwtnqm3yb2", 
    "Content-Type" : "application/json",
    "Accept" : "*/*",
    "Host" : url.host
  }
  var options = {
    method: event.httpMethod.toUpperCase(),
    headers: header_to_send,
    body: JSON.stringify(event.body)
  }
  if(event.httpMethod.toUpperCase() == "GET" || event.httpMethod.toUpperCase() == "HEAD" )
    delete options.body
    
  var response = await fetch(url, options)
  var response_text = await response.text()
  //var response_buffer = await response.buffer()
  //var base64_encoded = response_buffer.toString("base64")
  var headers = response.headers.raw()
  var cookie_header = null
  
  if(headers["set-cookie"]) 
    cookie_header = headers["set-cookie"]
  
  return {
    statusCode: response.status,
    body: response_text,
    //body: base64_encoded,
    //isBase64Encoded : true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST",
      "Content-Type": String(headers["content-type"]) || "text/plain",
      multiValueHeaders: {
        "set-cookie": cookie_header || []
        
      }
    }
  }
}catch(e){
  console.log(e)
}
}
