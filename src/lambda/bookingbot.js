 /* Import faunaDB sdk */
 const faunadb = require('faunadb')

 /* configure faunaDB Client with our secret */
 const q = faunadb.query
 const client = new faunadb.Client({
   secret: process.env.FAUNADB_SERVER_SECRET,
   keepAlive: false
 })
 
 export async function handler(event, context) {
 
     if(event.httpMethod == "POST") {
         try {
           let body = JSON.parse(event.body);
           console.log(body);
 
           return client.query(q.Paginate(q.Match(q.Ref('indexes/all_commands'))))
           .then((response) => {
             const commands = response.data
           
             const getAllDataQuery = commands.map((ref) => {
               return q.Get(ref)
             })
 
             console.log(getAllDataQuery);
 
             // then query the refs
             return client.query(getAllDataQuery).then((ret) => {
               return {
                 statusCode: 200,
                 body: ""
               }
             })
           }).catch((error) => {
             console.log('error', error)
             return {
               statusCode: 400,
               body: JSON.stringify(error)
             }
           })
 
         } catch(error) {
           console.log('error', error)
         }
     }    
 
     return {
       statusCode: 200,
       body: JSON.stringify({ message: 'Pong' })
     };
 }