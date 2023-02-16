import ContentsList from "/src/pages/contents/ContentsList.vue";
import ContentsDetail from "/src/pages/contents/ContentsDetail.vue";
import ContentsRecommend from "/src/pages/contents/ContentsRecommend.vue";

export default [
  {
    path: "/contents/",
    children: [
      { path: "list", name: 'ContentsList', component: ContentsList, meta: { title: "콘텐츠 관리" } },
      { path: "detail", name: 'ContentsDetail', component: ContentsDetail, meta: { title: "콘텐츠 상세" } },
      { path: "recommend", name: 'ContentsRecommend', component: ContentsRecommend, meta: { title: "콘텐츠 추천" } },
    ],
  },
];
