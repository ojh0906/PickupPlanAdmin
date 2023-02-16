import BannerList from "/src/pages/banner/BannerList.vue";
import BannerSetting from "/src/pages/banner/BannerSetting.vue";

export default [
  {
    path: "/banner/",
    children: [
      { path: "list", name: 'BannerList', component: BannerList, meta: { title: "배너 관리" } },
      { path: "setting", name: 'BannerSetting', component: BannerSetting, meta: { title: "배너 작성" } },
    ],
  },
];
