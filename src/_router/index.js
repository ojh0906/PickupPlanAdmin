import { createRouter, createWebHistory } from 'vue-router'
import HomeRoutes from "./home.routes";
import MemberRoutes from "./member.routes";
import ContentsRoutes from "./contents.routes";
import PlanRoutes from "./plan.routes";
import ExhibitionRoutes from "./exhibition.routes";
import ContactRoutes from "./contact.routes";
import BoardRoutes from "./board.routes";
import FaqRoutes from "./faq.routes";
import BannerRoutes from "./banner.routes";


import Login from "/src/pages/Login.vue";

import {useRouteHistoryStore} from '@/_stores/route_history'
import {useAuthStore} from '@/_stores';
import dayjs from 'dayjs';

const routes = [
    { path: "/login", name:"Login", component: Login }, // 비로그인 시 해당 페이지로 라우팅
    ...HomeRoutes,
    ...MemberRoutes,
    ...ContentsRoutes,
    ...PlanRoutes,
    ...ExhibitionRoutes,
    ...ContactRoutes,
    ...BoardRoutes,
    ...FaqRoutes,
    ...BannerRoutes,
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
    const authStore = useAuthStore();
    const isExpiryAuth = dayjs().isAfter(authStore.expiryTime);

    if (isExpiryAuth) {
        alert("로그인이 만료되었습니다.");
        authStore.logout();
    }
})
