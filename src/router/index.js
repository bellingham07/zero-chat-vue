import {createRouter, createWebHistory} from 'vue-router'
import LoginPage from "../components/login/LoginPage.vue";
import RegisterPage from "../components/login/RegisterPage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
            component: LoginPage
        },
        {
            path: '/reg',
            name: 'register',
            component: RegisterPage
        },
        {
            path: '/index',
            name: 'index',
            component: ()=>import("../components/chat/IndexView.vue"),
            children:[
                {
                    path: 'message',
                    name: 'message',
                    component: ()=>import("../components/chat/view/MessageView.vue")
                },
                {
                    path: 'contacts',
                    name: 'contacts',
                    component: ()=>import("../components/chat/view/ContactsView.vue")
                },
                {
                    path: 'setting',
                    name: 'setting',
                    component: ()=>import("../components/chat/view/SettingView.vue")
                },
                {
                    path: 'chat',
                    name: 'chat',
                    component: ()=>import("../components/chat/view/ChatView.vue")
                },
            ]
        },
    ]
})

export default router