<template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">게시판 관리</span>
        <p class="sub">{{ this.getNameFromValue(this.boardStore.board.type, this.boardStore.type_name_value_list) }}</p>
      </div>
      <div class="boardDetail-container">
        <div class="head-wrap">
          <span class="type">{{ this.getNameFromValue(this.boardStore.board.type, this.boardStore.type_name_value_list) }}</span>
          <span class="regdate">{{ this.formattedDate(this.boardStore.board.regdate) }}</span>
          <span class="title">{{ this.boardStore.board.title }}</span>
        </div>
        <div class="content" v-html="this.boardStore.board.content">
        </div>
        <!--  파일 리스트  -->
        <div class="file-list">
          <div class="file" v-for="file in this.boardStore.board.files" >
            <i class="far fa-file-alt"></i>
            <a class="cursor-pointer" @click="getFileDown(file)">{{ file.name }}</a>
          </div>
        </div>
        <!--  이전/다음 글  -->
        <div class="b-list-wrap">
          <a v-if="this.boardStore.b_board != null" @click="this.boardStore.goToBoardDetail(this.boardStore.b_board.board)">
            <span>이전글</span>
            <span>{{ this.getNameFromValue(this.boardStore.b_board.type, this.boardStore.type_name_value_list) }}</span>
            <span>{{ this.formattedDate(this.boardStore.b_board.regdate) }}</span>
            <span>{{ this.boardStore.b_board.title }}</span>
          </a>
          <a v-if="this.boardStore.a_board != null" @click="this.boardStore.goToBoardDetail(this.boardStore.a_board.board)">
            <span>다음글</span>
            <span>{{ this.getNameFromValue(this.boardStore.a_board.type, this.boardStore.type_name_value_list) }}</span>
            <span>{{ this.formattedDate(this.boardStore.a_board.regdate) }}</span>
            <span>{{ this.boardStore.a_board.title }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '/src/components/common/Header.vue';
import {useBoardStore} from '@/_stores';

export default {
  components: {
    Header,
  },
  setup(){
    const boardStore = useBoardStore();
    return {
      boardStore,
    }
  },
  data() {
    return {
      board:0,
    }
  },
  watch:{

  },
  methods: {
    getDetail(){
      this.boardStore.getById(this.board).then((resp) => {
      }).catch(err => { console.log("err", err); });
    },
    getFileDown(file){
      location.href = this.getFileDownPath(file);
    },
  },
  created() {
    this.$parent.$parent.$refs.gnb.activeBtn("board");
    if(this.$route.query.key != null){
      this.board = this.$route.query.key;
      this.getDetail();
    } else {
      alert('잘못된 접근입니다.');
    }
  }
}
</script>
