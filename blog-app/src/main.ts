import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import './assets/main.css';

axios.defaults.baseURL = 'http://127.0.0.1:8000';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.config.globalProperties.$axios = axios; // Attach axios to the app instance

app.mount('#app');
