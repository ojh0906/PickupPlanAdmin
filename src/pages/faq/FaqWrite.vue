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
          <div id="summernote"></div>
          <!--          <textarea v-model="this.content"></textarea>-->
        </div>
        <div class="submit-wrap">
          <span @click="submit">수정</span>
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
  mounted() {
    $('#summernote').summernote({
      placeholder: '답변 내용을 입력해 주세요',
      tabsize: 2,
      height: 300,
      toolbar: [
        ['style', ['style']],
        ['font', ['bold', 'underline', 'clear']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['table', ['table']],
        ['insert', ['link', 'picture', 'video']],
        ['view', ['fullscreen', 'codeview', 'help']]
      ],
      callbacks: {
        onChange: function (contents, $editable) {
          //console.log(this);
        }
      }
    });
  },
  created() {
    this.$parent.$parent.$refs.gnb.activeBtn("contact");
  }
}
</script>
