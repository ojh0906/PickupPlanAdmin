<template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">FAQ 관리</span>
      </div>
      <div class="boardDetail-container">
        <div class="head-wrap">
          <span class="regdate">2022.02.02</span>
          <span class="title">FAQ 제목입니다람쥐썬더</span>
        </div>
        <div class="content">
          <p class="sub">답변 내용</p>
          답변내용 입니다. 답변내용입니다.
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
import {useContactStore} from '@/_stores';

export default {
  components: {
    Header,
  },
  setup(){
    const contactStore = useContactStore();
    return {
      contactStore,
    }
  },
  data() {
    return {
      contact:0,
      reply:'',
    }
  },
  watch:{

  },
  methods: {
    getDetail(){

    },
    submit(){

    }
  },
  created() {
    this.$parent.$parent.$refs.gnb.activeBtn("board");
  }
}
</script>
