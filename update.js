import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
require('dotenv').config();

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'itemId': path parameter
    Key: {
      userId: process.env.SECRET_ID,
      itemId: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET purchased=:p, available=:a, purchaseHistory = list_append(purchaseHistory, :ph), quanityAvailable = :qa",
    ExpressionAttributeValues: {
      ":p": data.purchased,
      ":a": data.available,
      ":ph": [data.purchaseHistory],
      ":qa": data.quanityAvailable - Number(data.purchaseHistory.quanity)
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };

  await dynamoDb.update(params);

  return { status: true };
});
