<template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">FAQ 관리</span>
      </div>
      <div class="boardDetail-container">
        <div class="head-wrap">
          <span class="regdate">{{ this.formattedDate(this.faqStore.faq.regdate) }}</span>
          <span class="title">{{ this.faqStore.faq.title }}</span>
        </div>
        <div class="content">
          <p class="sub">답변 내용</p>
          {{ this.faqStore.faq.content }}
        </div>
        <div class="submit-wrap">
          <span @click="goToList">확인</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '/src/components/common/Header.vue';
import {useFaqStore} from '@/_stores';

export default {
  components: {
    Header,
  },
  setup(){
    const faqStore = useFaqStore();
    return {
      faqStore,
    }
  },
  data() {
    return {
      faq:0,
      title:'',
      content:'',
    }
  },
  watch:{

  },
  methods: {
    getDetail(){
      this.faqStore.getById(this.faq).then((resp) => {
      }).catch(err => { console.log("err", err); });
    },
    goToList(){
      this.$router.push({name:'FaqList'});
    },
  },
  created() {
    this.$parent.$parent.$refs.gnb.activeBtn("faq");
    if(this.$route.query.key != null){
      this.faq = this.$route.query.key;
      this.getDetail();
    } else {
      alert('잘못된 접근입니다.');
    }
  }
}
</script>
