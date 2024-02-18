import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VeeValidatePlugin } from './includes/validation'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.use(VeeValidatePlugin);
app.component('LoadingGlobal', Loading)

app.mount('#app')
