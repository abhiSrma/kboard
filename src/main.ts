import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import App from './App.vue'
import router from './router'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

// eslint-disable-next-line vue/multi-word-component-names, vue/no-reserved-component-names
app.component('Dialog', Dialog)
app.component('InputText', InputText)
// eslint-disable-next-line vue/multi-word-component-names, vue/no-reserved-component-names
app.component('Button', Button)

app.mount('#app')
