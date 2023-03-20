<template>
  <div id="gnb-container">
    <div class="gnb-header">
      <p class="page-name"><span class="colored">픽업플랜</span> 관리자 센터</p>
    </div>
    <div class="home-menu">
      <router-link :to="{ name: 'Index', query: {} }" :class="this.active === 'dash' ? 'menu active':'menu'">홈(대시보드)</router-link>
    </div>
    <div class="menu-list-container">
      <div class="menu-item">
        <router-link :to="{ name: 'MemberList', query: {} }" :class="this.active === 'member' ? 'menu active':'menu'">회원 관리</router-link>
      </div>
      <div class="menu-item">
        <router-link :to="{ name: 'ContentsList', query: {} }" :class="this.active === 'contents' ? 'menu active':'menu'">콘텐츠 관리 - 준비중</router-link>
      </div>
      <div class="menu-item">
        <router-link :to="{ name: 'PlanList', query: {} }" :class="this.active === 'plan' ? 'menu active':'menu'">플랜 관리 - 준비중</router-link>
      </div>
      <div class="menu-item">
        <router-link :to="{ name: 'ExhibitionList', query: {} }" :class="this.active === 'exhibition' ? 'menu active':'menu'">기획전 관리</router-link>
      </div>
      <div class="menu-item">
        <router-link :to="{ name: 'ContactList', query: {} }" :class="this.active === 'contact' ? 'menu active':'menu'">문의 관리</router-link>
      </div>
      <div class="menu-item">
        <router-link :to="{ name: 'BoardList', query: {} }" :class="this.active === 'board' ? 'menu active':'menu'">게시판 관리</router-link>
      </div>
      <div class="menu-item">
        <router-link :to="{ name: 'FaqList', query: {} }" :class="this.active === 'faq' ? 'menu active':'menu'">FAQ 관리</router-link>
      </div>
      <div class="menu-item">
        <router-link :to="{ name: 'BannerList', query: {} }" :class="this.active === 'banner' ? 'menu active':'menu'">배너 관리</router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: [''],
  data() {
    return {
      active:'dash',
    }
  },
  watch: {

  },
  methods: {
    activeBtn(type){
      this.active = type;
    },
    setLoginInfo(login){
      // this.login =  login;
    },
  },
  created() {
  }
}
</script>
