import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
// import MultiLang from "@/core/multilang"
import store from '@/store'
import '@/assets/styles/main.css'
import '@/assets/styles/font.css'
import VueClickAway from 'vue3-click-away'
import Jazzicon from 'vue3-jazzicon/src/components'
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App)

app.use(router);
app.use(store);
app.use(VueClickAway);
app.use(VueApexCharts);
app.component('jazzicon', Jazzicon);
// app.use(MultiLang);

app.mount('#app')
