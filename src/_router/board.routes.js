import BoardList from "/src/pages/board/BoardList.vue";
import BoardDetail from "/src/pages/board/BoardDetail.vue";
import BoardWrite from "/src/pages/board/BoardWrite.vue";

export default [
  {
    path: "/board/",
    children: [
      { path: "list", name: 'BoardList', component: BoardList, meta: { title: "게시판 관리" } },
      { path: "detail", name: 'BoardDetail', component: BoardDetail, meta: { title: "게시판 상세" } },
      { path: "write", name: 'BoardWrite', component: BoardWrite, meta: { title: "게시판 작성" } },
    ],
  },
];
