import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'

// Punto de entrada: crea la aplicacion Vue y la monta dentro de #app.
const app = createApp(App)

app.use(router)

app.mount('#app')
