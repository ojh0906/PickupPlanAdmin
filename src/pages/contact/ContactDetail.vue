<template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">문의 관리</span>
      </div>
      <div class="boardDetail-container">
        <div class="head-wrap">
          <span class="type">일반</span>
          <span class="regdate">22.02.11</span>
          <span class="title">문의사항 제목이 노출되는 영역입니다.</span>
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
        <div class="answer-wrap">
          <span>답변 작성</span>
          <input type="text">
          <input type="submit" value="등록">
        </div>
        <div class="submit-wrap">
           <span>확인</span>
           <span>취소</span>
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
    this.$parent.$parent.$refs.gnb.activeBtn("contact");
  }
}
</script>
