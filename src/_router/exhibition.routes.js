import ExhibitionList from "/src/pages/exhibition/ExhibitionList.vue";
import ExhibitionDetail from "/src/pages/exhibition/ExhibitionDetail.vue";
import ExhibitionWrite from "/src/pages/exhibition/ExhibitionWrite.vue";


export default [
  {
    path: "/exhibition/",
    children: [
      { path: "list", name: 'ExhibitionList', component: ExhibitionList, meta: { title: "기획전 관리" } },
      { path: "detail", name: 'ExhibitionDetail', component: ExhibitionDetail, meta: { title: "기획전 관리" } },
      { path: "write", name: 'ExhibitionWrite', component: ExhibitionWrite, meta: { title: "기획전 작성" } },
    ],
  },
];
