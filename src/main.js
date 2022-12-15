import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
// import MultiLang from "@/core/multilang"
import store from '@/store'
import '@/assets/styles/main.css'
import '@/assets/styles/font.css'

const app = createApp(App)

app.use(router);
app.use(store);
// app.use(MultiLang);

app.mount('#app')
