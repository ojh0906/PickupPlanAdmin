import FaqList from "/src/pages/faq/FaqList.vue";
import FaqDetail from "/src/pages/faq/FaqDetail.vue";
import FaqWrite from "/src/pages/faq/FaqWrite.vue";

export default [
  {
    path: "/faq/",
    children: [
      { path: "list", name: 'FaqList', component: FaqList, meta: { title: "FAQ 관리" } },
      { path: "detail", name: 'FaqDetail', component: FaqDetail, meta: { title: "FAQ 상세" } },
      { path: "write", name: 'FaqWrite', component: FaqWrite, meta: { title: "FAQ 작성" } },
    ],
  },
];
