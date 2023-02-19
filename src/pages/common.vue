<template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">파트너 관리</span>
      </div>
    </div>
  </div>

</template>
<script>
import Header from '/src/components/common/Header.vue';

export default {
  components: {
    Header,
  },
  data() {

  },
  watch:{

  },
  methods: {
  },
  created() {
    this.$parent.$parent.$refs.gnb.activeBtn("board");
  }
}
</script>
