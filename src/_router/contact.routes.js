import ExhibitionList from "/src/pages/contact/ContactList.vue";


export default [
  {
    path: "/contact/",
    children: [
      { path: "list", name: 'ContactList', component: ExhibitionList, meta: { title: "문의 관리" } },
    ],
  },
];
