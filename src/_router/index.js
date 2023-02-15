import { createRouter, createWebHistory } from 'vue-router'
import Index from "/src/pages/Index.vue";
import Login from "/src/pages/Login.vue";
import PartnerList from "/src/pages/PartnerList.vue";
import PartnerDetail from "/src/pages/PartnerDetail.vue";
import ContentsList from "/src/pages/ContentsList.vue";
import ContentsRecommend from "/src/pages/ContentsRecommend.vue";
import PlanList from "/src/pages/PlanList.vue";
import ExhibitionList from "/src/pages/ExhibitionList.vue";
import ContactList from "/src/pages/ContactList.vue";

import BoardList from "/src/pages/BoardList.vue";
import BannerList from "/src/pages/BannerList.vue";



const beforeAuth = (isAuth) => (to, from, next) => {
};

const routes = [
    {
        path: '',
        name: 'Index',
        component: Index,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/partnerList',
        name: 'PartnerList',
        component: PartnerList,
    },
    {
        path: '/partnerDetail',
        name: 'PartnerDetail',
        component: PartnerDetail,
    },
    {
        path: '/contentsList',
        name: 'ContentsList',
        component: ContentsList,
    },
    {
        path: '/contentsRecommend',
        name: 'ContentsRecommend',
        component: ContentsRecommend,
    },

    {
        path: '/planList',
        name: 'PlanList',
        component: PlanList,
    },

    {
        path: '/exhibitionList',
        name: 'ExhibitionList',
        component: ExhibitionList,
    },

    {
        path: '/contactList',
        name: 'ContactList',
        component: ContactList,
    },

    {
        path: '/boardList',
        name: 'BoardList',
        component: BoardList,
    },

    {
        path: '/bannerList',
        name: 'BannerList',
        component: BannerList,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
