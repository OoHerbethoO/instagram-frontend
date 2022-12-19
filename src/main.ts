import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createApp, h, provide } from 'vue'
import App from './App.vue'
import './assets/sass/main.scss'
import router from './router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const httpLink = createHttpLink({
  uri: 'http://localhost:4005/graphql',
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

app.use(router)
app.mount('#app')
const options = {}
app.use(Toast, options)
