
import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLEnumType,
  GraphQLInputObjectType
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
} from 'graphql-relay';

import {
  Root,
  Store,
  Ticket,
  getRoot,
  getViewer,
  getStore,
  getStores,
  getConnectedTickets,
  getTicket,
  getTickets
} from './database';

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {type, id} = fromGlobalId(globalId);
    if (type === 'Viewer') {
      return getRoot(id);
    } else if (type === 'store') {
      return getStore(id);
    } else if (type === 'ticket') {
      return getTicket(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof Root) {
      return viewerType;
    } else if (obj instanceof Store)  {
      return storeType;
    } else if (obj instanceof Ticket)  {
      return ticketType;
    } else {
      return null;
    }
  }
);

const ticketType = new GraphQLObjectType({
  name: 'Ticket',
  fields: () => ({
    id: globalIdField('ticket', ({ id }) => id),
    title: {
      type: GraphQLString,
      resolve: ({ title }) => title
    },
    subject: {
      type: GraphQLString,
      resolve: ({ subject }) => subject
    }
  }),
  interfaces: () => [nodeInterface]
});

const { connectionType: ticketConnection, edgeType : graphQLTicketEdge, } = connectionDefinitions({ name: 'Ticket', nodeType: ticketType });

const FilterObject = new GraphQLInputObjectType({
  name: 'FilterObject',
  fields: {
    __e: { type: GraphQLString },
    __ne: { type: GraphQLString }
  }
});

const storeType = new GraphQLObjectType({
  name: 'Store',
  fields: () => ({
    id: globalIdField('store', ({ id }) => id),
    number: {
      type: GraphQLInt,
      resolve: ({ number }) => number
    },
    name: {
      type: GraphQLString,
      resolve: ({ name }) => name
    },
    ticketConnection: {
      type: ticketConnection,
      args: {
        filter: {
          type: new GraphQLInputObjectType({
            name: 'Filter',
            fields: {
              title: { type: FilterObject },
              subject: { type: FilterObject }
            }
          })
        },
        ...connectionArgs
      },
      resolve: ({ ticket },args) => connectionFromArray(getConnectedTickets(ticket), args)
    }
  }),
  interfaces: () => [nodeInterface]
});

const { connectionType: storeConnection, edgeType : graphQLStoreEdge, } = connectionDefinitions({ name: 'Store', nodeType: storeType });

const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  description: 'Viewer',
  fields: () => ({
    id: globalIdField('Viewer'),
    store: {
      type: storeType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve: (_, { id }) => getStore(fromGlobalId(id).id)
    },
    storeConnection: {
      type: storeConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getStores(), args)
    },
    ticket: {
      type: ticketType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve: (_, { id }) => getTicket(fromGlobalId(id).id)
    },
    ticketConnection: {
      type: ticketConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getTickets(), args)
    }
  }),
  interfaces: [nodeInterface]
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    viewer: {
      type: viewerType,
      resolve: () => getViewer()
    }
  })
});

export const Schema = new GraphQLSchema({
  query: queryType
});
