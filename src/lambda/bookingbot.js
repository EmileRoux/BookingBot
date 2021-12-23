export async function handler(event, context) {

    if(event.httpMethod == "POST") {
        try {
          let body = JSON.parse(event.body);
          console.log(body);

          return {
            statusCode: 200,
            body: ""
          };

        } catch(e) {
          console.error(e);
        }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello world ${Math.floor(Math.random() * 10)}` })
    };
}