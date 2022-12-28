import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createApp, h, provide } from 'vue'
import App from './App.vue'
import './assets/sass/main.scss'
import router from './router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import apolloClient from './config/graphql.config'

import './assets/js/modal.js'
import './assets/js/dropdown.js'

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
