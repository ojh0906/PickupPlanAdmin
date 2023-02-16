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
            신규 파트너
          </div>
          <div class="item br">
            00 명
          </div>
          <div class="item ">
            000,000 명
          </div>
          <div class="item title-wrap br">
            총 신규 회원
          </div>
          <div class="item title-wrap">
            총 신규 파트너
          </div>
          <div class="item br">
            00 명
          </div>
          <div class="item ">
            000 명
          </div>
          <div class="item title-wrap br">
            콘텐츠
          </div>
          <div class="item title-wrap">
            총 콘텐츠
          </div>
          <div class="item br">
            00 개
          </div>
          <div class="item ">
            0,000 개
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
    return {
      id: "admin",
      password: "1234",
    }
  },
  watch:{

  },
  methods: {
    onSubmit() {
      const authStore = useAuthStore();
      // const param = JSON.stringify(values, null, 2);
      // console.log("param", param);
      return authStore.login(this.id, this.password)
          .catch(error => console.log(error));
    },
  },
  created() {
    this.$parent.$parent.$refs.gnb.activeBtn("index");
    this.onSubmit();
  }
}
</script>
