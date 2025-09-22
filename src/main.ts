import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from '@/presentation/App.vue'
import HomeView from '@/presentation/views/HomeView.vue'
import AboutView from '@/presentation/views/AboutView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
