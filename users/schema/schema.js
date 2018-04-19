const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;
const { find } = require("lodash");
const axios = require("axios");

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    users: {
      type: new GraphQLList(UserType),
      async resolve({ id }, _) {
        return (await axios.get(`http://localhost:3000/companies/${id}/users`))
          .data;
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: {
      type: GraphQLString
    },
    firstName: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    company: {
      type: CompanyType,
      async resolve({ companyId }, args) {
        return (await axios.get(`http://localhost:3000/companies/${companyId}`))
          .data;
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      async resolve(_, { id }) {
        return (await axios.get(`http://localhost:3000/users/${id}`)).data;
      }
    },
    company: {
      type: CompanyType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      async resolve(_, { id }) {
        return (await axios.get(`http://localhost:3000/companies/${id}`)).data;
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addUser: {
      type: UserType,
      args: {
        firstName: {
          type: new GraphQLNonNull(GraphQLString)
        },
        age: {
          type: new GraphQLNonNull(GraphQLInt)
        },
        companyId: {
          type: GraphQLString
        }
      },
      async resolve(_, { firstName, age }) {
        return (await axios.post("http://localhost:3000/users", {
          firstName,
          age
        })).data;
      }
    },
    deleteUser: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: async (_, { id }) => {
        return (await axios.delete(`http://localhost:3000/users/${id}`)).data;
      }
    },
    editUser: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        },
        firstName: {
          type: GraphQLString
        },
        age: {
          type: GraphQLInt
        },
        companyId: {
          type: GraphQLString
        }
      },
      resolve: async (parentValue, { id, companyId }) => {
        return (await axios.patch(`http://localhost:3000/users/${id}`, {
          companyId
        })).data;
      }
    }
  })
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
