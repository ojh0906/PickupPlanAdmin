<template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">홈</span>
      </div>
      <div class="dash-board-container">
        <div class="dash-wrap">
          <div class="item title-wrap br">
            신규 회원
          </div>
          <div class="item title-wrap">
            총 회원
          </div>
          <div class="item br">
            {{ this.addComma(this.authStore.dashInfo.member_new) }} 명
          </div>
          <div class="item ">
            {{ this.addComma(this.authStore.dashInfo.member_tot) }} 명
          </div>
          <div class="item title-wrap br">
            신규 강사/파트너
          </div>
          <div class="item title-wrap">
            총 강사/파트너
          </div>
          <div class="item br">
            {{ this.addComma(this.authStore.dashInfo.partner_new) }} 명
          </div>
          <div class="item ">
            {{ this.addComma(this.authStore.dashInfo.partner_tot) }} 명
          </div>
          <div class="item title-wrap br">
            신규 콘텐츠
          </div>
          <div class="item title-wrap">
            총 콘텐츠
          </div>
          <div class="item br">
            {{ this.addComma(this.authStore.dashInfo.contents_new) }} 개
          </div>
          <div class="item ">
            {{ this.addComma(this.authStore.dashInfo.contents_tot) }} 개
          </div>
          <div class="item title-wrap br">
            신규 플랜
          </div>
          <div class="item title-wrap">
            총 플랜
          </div>
          <div class="item br">
            {{ this.addComma(this.authStore.dashInfo.plan_new) }} 개
          </div>
          <div class="item ">
            {{ this.addComma(this.authStore.dashInfo.plan_tot) }} 개
          </div>


        </div>
      </div>
    </div>
  </div>

</template>
<script>
import Header from '/src/components/common/Header.vue';
import { useAuthStore } from '@/_stores';

export default {
  components: {
    Header,
  },
  data() {
    const  authStore = useAuthStore();
    return {
      authStore,
    }
  },
  watch:{

  },
  methods: {
    getInfo(){
      this.authStore.getDashInfo().then((resp) => {
      }).catch(err => { console.log("err", err); });
    },
  },
  created() {
    this.$parent.$parent.$refs.gnb.activeBtn("index");
    this.getInfo();
  }
}
</script>
