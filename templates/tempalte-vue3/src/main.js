import { createApp } from 'vue';
import router from './router/index.js';
import { createPinia } from 'pinia';
// import mitt from 'mitt'

import App from './App.vue';

import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/image-preview/style';

const app = createApp(App);
app.use(router);
app.use(createPinia())
// app.config.globalProperties.$mittBus = mitt()
app.mount('#app');
