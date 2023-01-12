import { DefaultApolloClient } from '@vue/apollo-composable'
import { createApp, h, provide } from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import App from './App.vue'
import './assets/sass/main.scss'
import apolloClient from './config/graphql.config'
import router from './router'

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

app.use(router)
app.mount('#app')
const options = {
  timeout: 1000,
  position: 'bottom-center',
}
app.use(Toast, options)
