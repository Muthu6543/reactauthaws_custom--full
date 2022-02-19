/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
var AWS = require("aws-sdk");

exports.handler = (event, context, callback) => {
  var cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({
    apiVersion: "2016-04-18",
  });

  var params = {
    GroupName: "TEACHERS", //your confirmed user gets added to this group
    UserPoolId: event.userPoolId,
    Username: event.userName,
  };

  // the user attribute 'custom:ManagerID' was set on User Sign Up.  Here, we are// using it as a flag.  If it has a value, then add the user to the Managers group.
  console.log(event.request.userAttributes["custom:category"]);
  if (event.request.userAttributes["custom:category"]) {
    cognitoIdentityServiceProvider.adminAddUserToGroup(
      params,
      function (err, data) {
        if (err) {
          callback(err); // uh oh, an error
        }

        callback(null, event); // yay! success
      }
    );
  }
};

// exports.handler = async (event) => {
//     console.log(`EVENT: ${JSON.stringify(event)}`);
//     return {
//       statusCode: 200,
//       //  Uncomment below to enable CORS requests
//       //  headers: {
//       //      "Access-Control-Allow-Origin": "*",
//       //      "Access-Control-Allow-Headers": "*"
//       //  },
//       body: JSON.stringify("Hello from Lambda!"),
//     };
//   };
