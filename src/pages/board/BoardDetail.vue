<template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">게시판 관리</span>
        <p class="sub">공지사항</p>
      </div>
      <div class="boardDetail-container">
        <div class="head-wrap">
          <span class="type">공지사항</span>
          <span class="regdate">22.02.11</span>
          <span class="title">공지사항 제목이 노출되는 영역입니다.</span>
        </div>
        <div class="content">

        </div>
        <div class="file-list">
          <div class="file">
            <i class="far fa-file-alt"></i>
            <a>이미지.png</a>
          </div>
        </div>
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
