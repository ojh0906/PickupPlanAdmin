import BoardList from "/src/pages/board/BoardList.vue";
import BoardDetail from "/src/pages/board/BoardDetail.vue";

export default [
  {
    path: "/board/",
    children: [
      { path: "list", name: 'BoardList', component: BoardList, meta: { title: "게시판 관리" } },
      { path: "detail", name: 'BoardDetail', component: BoardDetail, meta: { title: "게시판 상세" } },
    ],
  },
];
