<template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">게시판 관리</span>
      </div>
      <div class="write-container">
        <div class="category-wrap">
          <select v-model="this.type">
            <option v-for="type in this.boardStore.type_name_value_list" v-bind:value="type.value">{{type.name}}</option>
          </select>
          <select v-model="this.category">
            <option v-for="category in this.fieldStore.category_list" v-bind:value="category.field">{{category.name}}</option>
          </select>
          <select v-model="this.area">
            <option v-for="area in this.fieldStore.area_list" v-bind:value="area.field">{{area.name}}</option>
          </select>
        </div>
        <div class="input-wrap-full">
          <input type="text" placeholder="제목을 입력해주세요." v-model="this.title"/>
        </div>
        <div class="input-wrap-full">
          <div id="summernote"></div>
<!--          <textarea v-model="this.content"></textarea>-->
        </div>
        <div class="input-wrap">
          <div class="label">
            첨부파일
          </div>
          <div class="input">
            <span class="add-file" @click="addFiles(this.$refs.files_new)">파일 추가</span>
            <input type="file" ref="files_new" multiple v-on:change="handleUpload(this.$refs.files_new.files, this.files_new)" class="hidden" style="display: none;" accept="image/*"/>
            <div v-for="(file, index) in this.files" class="upload-list">
              <span class="file_name">{{ file.name }}</span>
              <span class="remove-file" @click="removeFileAdd(this.files, index, file)">삭제</span>
            </div>
            <div v-for="(file, index) in this.files_new" class="upload-list">
              <span class="file_name">{{ file.name }}</span>
              <span class="remove-file" @click="removeFile(this.files_new, index)">삭제</span>
            </div>
          </div>
        </div>
        <div class="input-wrap">
          <div class="label">
            해시태그
          </div>
          <div class="input">
            <input type="text" placeholder="해시태그를 입력해주세요. 여러 개의 해시태그 입력 시 , 를 입력하면 됩니다." v-model="this.tagStr"/>
          </div>
        </div>
        <div class="submit-wrap">
          <span @click="submit">{{ this.board === 0 ? '완료':'수정' }}</span>
          <span @click="goToBoardList">취소</span>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import Header from '/src/components/common/Header.vue';
import {useBoardStore, useFieldStore} from '@/_stores';

export default {
  components: {
    Header,
  },
  setup(){
    const boardStore = useBoardStore();
    const fieldStore = useFieldStore();
    return {
      boardStore,
      fieldStore,
    }
  },
  data() {
    return {
      board:0,
      type:0,
      title:'',
      content:'',
      category:0,
      area:0,
      files:[],
      files_new:[],
      files_del:[],
      tagList:[],
      tagStr:'',
    }
  },
  watch:{
    category : {
      handler(newValue, oldValue) {
        this.getCategoryFieldList(newValue, 2);
      },
    },
  },
  methods: {
    initBoard(){
      this.board = 0;
      this.type = this.boardStore.type_name_value_list[0].value;
      this.title = '';
      this.content = '';
      this.category = this.fieldStore.category_list[0].field;
      this.area = 0;
      this.files = [];
      this.files_new = [];
    },
    addFiles(target, type){
      target.click();
      if(type === 1){
        this.removeFile(this.thumb_new, 0)
      }
    },
    handleUpload(targetList, fileList) {
      /*
        Adds the uploaded file to the files array
      */
      for (var i = 0; i < targetList.length; i++) {
        fileList.push(targetList[i]);
      }
    },
    removeFile(fileList, key) {
      fileList.splice(key, 1);
    },
    removeFileAdd(fileList, key, file) {
      fileList.splice(key, 1);
      this.files_del.push(file);
    },
    getDetail(){
      this.boardStore.getById(this.board).then((resp) => {
        this.board = this.boardStore.board.board;
        this.type = this.boardStore.board.type;
        this.title = this.boardStore.board.title;
        this.content = this.boardStore.board.content;
        $('#summernote').summernote('code', this.content);
        this.category = this.boardStore.board.category;
        this.area = this.boardStore.board.area;
        this.files = this.boardStore.board.files
        this.tagList = [];
        this.files_new = [];
        this.files_del = [];
        this.getTags(this.board);
      }).catch(err => { console.log("err", err); });
    },
    getTags(key){
      this.boardStore.getTags(key).then((resp) => {
        this.tags = this.boardStore.board.tags;
        this.tagStr = '';
        this.tags.forEach((tag,index) => {
          if(index !== 0){
            this.tagStr += ','
          }
          this.tagStr += tag.value;
        })
      }).catch(err => { console.log("err", err); });
    },
    submit(){
      // 태그리스트 값 셋팅
      var tagStrList = this.tagStr.split(',')
      if(tagStrList.length === 1 && tagStrList[0] === ''){
        tagStrList = [];
      }
      tagStrList.forEach((t, idx) =>{
        var tag = {
          value : t
        }
        this.tagList.push(tag);
      });

      // 에디터 내용 적용
      this.content = $('#summernote').summernote('code');

      let formData = new FormData();
      formData.append("type", this.type);
      formData.append("title", this.title);
      formData.append("content", this.content);
      formData.append("category", this.category);
      formData.append("area", this.area);
      formData.append("tagList", JSON.stringify(this.tagList));

      for (var i = 0; i < this.files_new.length; i++) {
        formData.append('files_new', this.files_new[i]);
      }

      if(this.board === 0){
        this.boardStore.save(formData).then((resp) => {
          if(resp.data.code === 200){
            alert('등록되었습니다.');
            this.goToBoardList();
          }
        }).catch(err => { console.log("err", err); });
      } else {
        if(this.files_del.length !== 0){
          formData.append("files_del", JSON.stringify(this.files_del));
        }
        this.boardStore.modify(this.board, formData).then((resp) => {
          if(resp.data.code === 200){
            alert('수정되었습니다.');
            this.goToBoardList();
          }
        }).catch(err => { console.log("err", err); });
      }
    },
    goToBoardList(){
      this.$router.push({name:'BoardList'});
    },
    getCategoryList(type) {
      this.fieldStore.listCategory({type: type}).then((resp) => {
        if(resp.data.code == 200){
          this.fieldStore.category_list = resp.data.body;
          if(this.$route.query.key != null){
            this.board = this.$route.query.key;
            this.getDetail();
          } else {
            this.initBoard();
          }
        }
      }).catch(err => { console.log("err", err); });
    },
    getCategoryFieldList(field, type) {
      this.fieldStore.listCategory({ type: type, category_field: field }).then((resp) => {
        if (resp.data.code == 200) {
          switch (type) {
            case 2:
              this.fieldStore.area_list = resp.data.body;
              if(this.$route.query.key != null){
                this.area = this.boardStore.board.area;
              } else {
                this.area = this.fieldStore.area_list[0].field;
              }
              break;
          }
        }
      }).catch(err => { console.log("err", err); });
    },
  },
  mounted() {
    $('#summernote').summernote({
      placeholder: '진행 상세 내용을 입력해 주세요',
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
    this.$parent.$parent.$refs.gnb.activeBtn("board");
    this.getCategoryList(1);
  }
}
</script>
