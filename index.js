const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

// const MONGODB = "mongodb+srv://admin:coopercodes@apolloserversetup.n9ghj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const MONGODB =
  "mongodb://localhost:27017/?readPreference=primary&directConnection=true&ssl=false";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
