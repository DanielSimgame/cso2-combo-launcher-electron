import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home/index.vue'

const FirstInit = () => import("@/views/FirstInit/index.vue")
const About = () => import("@/views/About/index.vue")

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/first-init',
        name: 'FirstInit',
        component: FirstInit
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
