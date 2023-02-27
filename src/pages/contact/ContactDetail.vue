<template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">문의 관리</span>
      </div>
      <div class="boardDetail-container">
        <div class="head-wrap">
          <span class="type">{{ this.getNameFromValue(this.contactStore.contact.type, this.contactStore.type_name_value_list) }}</span>
          <span class="regdate">{{ this.formattedDate(this.contactStore.contact.regdate) }}</span>
          <span class="title">{{ this.contactStore.contact.title }}</span>
        </div>
        <div class="content">
          {{ this.contactStore.contact.content }}
        </div>
        <!--  파일 리스트  -->
        <div class="file-list" v-if="this.contactStore.contact.files != null && this.contactStore.contact.files.length !== 0">
          <div class="file" v-for="file in this.contactStore.contact.files">
            <i class="far fa-file-alt"></i>
            <a>{{ file.name }}</a>
          </div>
        </div>
        <div class="answer-wrap">
          <!--  답변 리스트  -->
          <div class="answer-list">
            <div v-for="reply in this.contactStore.contact.replyList">
              {{ reply.reply }}
            </div>
          </div>
          <span>답변 작성</span>
          <input type="text" v-model="this.reply">
          <input type="submit" value="등록" @click="submit">
        </div>
<!--
        <div class="submit-wrap">
           <span>확인</span>
           <span>취소</span>
        </div>
-->
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
      this.contactStore.getById(this.contact).then((resp) => {
        this.contactStore.getReply(this.contact);
      }).catch(err => { console.log("err", err); });
    },
    submit(){
      if(this.reply === ''){
        alert('답변을 입력하세요.');
        return;
      }
      this.contactStore.saveRply(this.contact, 1, this.reply).then((resp) => {
        if(resp.data.code === 200){
          alert('등록되었습니다.');
          this.reply = '';
          this.contactStore.getReply(this.contact);
          //this.goToBoardList();
        }
      }).catch(err => { console.log("err", err); });
    }
  },
  created() {
    this.$parent.$parent.$refs.gnb.activeBtn("contact");
    if(this.$route.query.key != null){
      this.contact = this.$route.query.key;
      this.getDetail();
    } else {
      alert('잘못된 접근입니다.');
    }
  }
}
</script>
