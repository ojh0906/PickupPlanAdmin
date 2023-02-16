import { createRouter, createWebHistory } from 'vue-router'
import HomeRoutes from "./home.routes";
import MemberRoutes from "./member.routes";
import Login from "/src/pages/Login.vue";

import {useRouteHistoryStore} from '@/_stores/route_history'
import {useAuthStore} from '@/_stores';

const routes = [
    { path: "/login", name:"Login", component: Login }, // 비로그인 시 해당 페이지로 라우팅
    ...HomeRoutes,
    ...MemberRoutes,
    //...NoticeRoutes,
    //...ContactRoutes,
    //...FaqRoutes,
    //...ProductRoutes,
    // catch all redirect to home page
    { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;

router.beforeEach(async (to) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ["/login"];
    const authRequired = !publicPages.includes(to.path);
    const authStore = useAuthStore();
    // console.log("before router auth", authStore.member, authStore.isAuthenticated, authStore.auth_token);
    if (authRequired && !authStore.isAuthenticated) {
        authStore.returnUrl = to.fullPath;
        return "/login";
    }
});

// save history stack
router.afterEach((to, from, failure) => {
    const route_history = useRouteHistoryStore()
    route_history.push(from.path)
})
