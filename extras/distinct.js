// This function is the endpoint's request handler.
exports = async function({ query, headers, body}, response) {
  try{
    const {field} = query;
    // change the empty strings to reflect your own instance
    const res = await context.services.get("").db("").collection("").distinct(field);

    response.setStatusCode(200);
    
    response.setBody(
      JSON.stringify({
        res
      }))

    return response;
  } catch (e) {
    response.setStatusCode(400);
    response.setBody(e.message);
  }
};

