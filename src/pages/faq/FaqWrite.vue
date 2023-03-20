<template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">FAQ 관리</span>
      </div>
      <div class="write-container">
        <div class="input-wrap-full">
          <input type="text" placeholder="제목을 입력해주세요." v-model="this.title"/>
        </div>
        <div class="input-wrap-full">
          <textarea v-model="this.content"></textarea>
        </div>
        <div class="submit-wrap">
          <span @click="submit">{{ this.faq === 0 ? '등록':'수정' }}</span>
          <span @click="goToList">취소</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '/src/components/common/Header.vue';
import { useFaqStore } from '@/_stores';

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
    initFaq(){
      this.faq = 0;
      this.title = '';
      this.content = '';
    },
    getDetail(){
      this.faqStore.getById(this.faq).then((resp) => {
        this.faq = this.faqStore.faq.faq;
        this.title = this.faqStore.faq.title;
        this.content = this.faqStore.faq.content;
      }).catch(err => { console.log("err", err); });
    },
    submit(){
      let data = {
        title : this.title,
        content : this.content,
      }

      if(this.faq === 0){
        this.faqStore.save(data).then((resp) => {
          if(resp.data.code === 200){
            alert('등록되었습니다.');
            this.goToList();
          }
        }).catch(err => { console.log("err", err); });
      } else {
        this.faqStore.modify(this.faq, data).then((resp) => {
          console.log(resp)
          if(resp.data.code === 200){
            alert('수정되었습니다.');
            this.goToList();
          }
        }).catch(err => { console.log("err", err); });
      }
    },
    goToList(){
      this.$router.push({name:'FaqList'});
    }
  },
  created() {
    this.$parent.$parent.$refs.gnb.activeBtn("faq");
    if(this.$route.query.key != null){
      this.faq = this.$route.query.key;
      this.getDetail();
    } else {
      this.initFaq();
    }
  }
}
</script>
