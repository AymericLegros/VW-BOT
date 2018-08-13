import fetch from 'node-fetch';
import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';

export const apollo = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:55555/graphql', fetch }),
  cache: new InMemoryCache()
});


// apollo.query({
//   query: gql`
//     query getBook {
//       books {
//         title
//         author
//       }
//     }
//   `,
// })
//   .then(data => console.log(data.data.books))
//   .catch(error => console.error(error));