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
        <!--  파일 리스트  -->
        <div class="file-list">
          <div class="file">
            <i class="far fa-file-alt"></i>
            <a>이미지.png</a>
          </div>
          <div class="file">
            <i class="far fa-file-alt"></i>
            <a>이미지.png</a>
          </div>
        </div>
        <!--  이전/다음 글  -->
        <div class="b-list-wrap">
          <a>
            <span>이전글</span>
            <span>공지사항</span>
            <span>22.07.01</span>
            <span>공지사항 제목이 노출되는 영역입니다.</span>
          </a>
          <a>
            <span>다음글</span>
            <span>블로그</span>
            <span>22.07.01</span>
            <span>블로그 제목이 노출되는 영역입니다.</span>
          </a>
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
