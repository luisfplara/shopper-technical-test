const { knex } = require('./connection');
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Product {
    code: ID!
    name: String!
    cost_price: Float
    sales_price: Float
  }
  type Pack {
    id: ID!
    pack_id: Int
    product_id: Int
    qty: Int
  }
  
  type Query {
    products(code:ID): [Product],
    packs(pack_id:Int):[Pack]
  }
`;

 async function getProducts(args) {
  console.log('args');
console.log(args);

  if(args.code){
    return  await knex.select().from('products').where('code', args.code);
  }else{
    return await knex.select().from('products');
  }
    


}
async function getPacks(args) {

  if(args.pack_id){
    
    return  await knex.select().from('packs').where('pack_id', args.pack_id);
  }else{
    return await knex.select().from('packs');
  }
}


const resolvers = {
    Query: {
      products(parent, args, contextValue, info){
        return getProducts(args);
      },
      packs(parent, args, contextValue, info){
 
        return getPacks(args);
      }
    }
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
