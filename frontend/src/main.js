import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './index.css'

import {  
  setConfig,
  frappeRequest,
  resourcesPlugin,
} from 'frappe-ui'

let app = createApp(App)

setConfig('resourceFetcher', frappeRequest)

app.use(router)
app.use(resourcesPlugin)


app.mount('#app')
