import Cookies from '@/utils/cookies'
import { ApolloClient, createHttpLink, InMemoryCache, ApolloLink } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'
const env = import.meta.env as any

const authLink: any = setContext((_, { headers }) => {
  const authHeader: any = {}
  const token = Cookies.getToken()
  if (token) {
    authHeader['Authorization'] = `${token}`
  }
  return {
    headers: {
      ...headers,
      ...authHeader,
    },
  }
})

const httpLink: any = createUploadLink({
  uri: env.VITE_APP_API_URL,
})

const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
})

export default apolloClient
