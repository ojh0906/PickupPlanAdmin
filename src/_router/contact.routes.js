import ContactList from "/src/pages/contact/ContactList.vue";
import ContactDetail from "/src/pages/contact/ContactDetail.vue";


export default [
  {
    path: "/contact/",
    children: [
      { path: "list", name: 'ContactList', component: ContactList, meta: { title: "문의 관리" } },
      { path: "detail", name: 'ContactDetail', component: ContactDetail, meta: { title: "문의 상세" } },
    ],
  },
];
