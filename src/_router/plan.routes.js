import PlanList from "/src/pages/plan/PlanList.vue";
import PlanDetail from "/src/pages/plan/PlanDetail.vue";
import PlanRecommend from "/src/pages/plan/PlanRecommend.vue";

export default [
  {
    path: "/plan/",
    children: [
      { path: "list", name: 'PlanList', component: PlanList, meta: { title: "플랜 관리" } },
      { path: "detail", name: 'PlanDetail', component: PlanDetail, meta: { title: "플랜 상세" } },
      { path: "recommend", name: 'PlanRecommend', component: PlanRecommend, meta: { title: "플랜 추천" } },
    ],
  },
];
