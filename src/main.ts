import { createApp } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import App from './App.vue'
import router from './router'
import './styles/style.css'
import { apolloClient } from './apollo/client'

createApp(App)
  .use(router)
  .provide(DefaultApolloClient, apolloClient)
  .mount('#app')
