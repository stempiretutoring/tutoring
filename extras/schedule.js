exports = async function ({ query, headers, body }, response) {
  try {

    const reqBody = JSON.parse(body.text());

    // Update these to reflect your db/collection
    var serviceName = "";
    var dbName = "";
    var collName = "";

    // Get a collection from the context
    const res = await context.services
      .get(serviceName)
      .db(dbName)
      .collection(collName)
      .updateMany(
        { email: reqBody['userEmail'] },
        {
          $set: {
            "schedule.$[d].times": reqBody['schedule'],
          },
        },
        {
          arrayFilters: [{ "d.date": reqBody['date'] }],
        }
      );

    response.setBody(JSON.stringify(res));

    return response;
  } catch (e) {
    response.setStatusCode(400);
    response.setBody(e.message);
  }
};

