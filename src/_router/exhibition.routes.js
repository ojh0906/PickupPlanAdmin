import ExhibitionList from "/src/pages/exhibition/ExhibitionList.vue";


export default [
  {
    path: "/exhibition/",
    children: [
      { path: "list", name: 'ExhibitionList', component: ExhibitionList, meta: { title: "기획전 관리" } },
    ],
  },
];
