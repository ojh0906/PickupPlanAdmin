import MemberList from "/src/pages/PartnerList.vue";
import MemberDetail from "/src/pages/PartnerDetail.vue";

export default [
  {
    path: "/member/",
    children: [
      { path: "list", name: 'MemberList', component: MemberList, meta: { title: "회원관리" } },
      { path: "detail", name: 'MemberDetail', component: MemberDetail, meta: { title: "회원상세" } },
    ],
  },
];
