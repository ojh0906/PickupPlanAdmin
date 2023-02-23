<template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">기획전 관리</span>
      </div>
      <div class="write-container">
        <div class="input-wrap-full">
          <input type="text" placeholder="제목을 입력해주세요." v-model="this.title"/>
        </div>
        <div class="input-wrap-full">
          <textarea v-model="this.content"></textarea>
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
            썸네일
          </div>
          <div class="input">
            <span class="add-file" @click="addFiles(this.$refs.thumb_new);" v-if="(this.thumb_new.length + this.thumb.length) === 0">파일 추가</span>
            <input type="file" ref="thumb_new" v-on:change="handleUpload(this.$refs.thumb_new.files, this.thumb_new)" class="hidden" style="display: none;" accept="image/*"/>
            <div v-for="(file, index) in this.thumb" class="upload-list">
              <span class="file_name">{{ file.name }}</span>
              <span class="remove-file" @click="removeFile(this.thumb, index)">삭제</span>
            </div>
            <div v-for="(file, index) in this.thumb_new" class="upload-list">
              <span class="file_name">{{ file.name }}</span>
              <span class="remove-file" @click="removeFile(this.thumb_new, index)">삭제</span>
            </div>
          </div>
        </div>
        <div class="input-wrap">
          <div class="label">
            모집기간
          </div>
          <div class="input date">
            연도
            <select v-model="this.start_year">
              <option v-bind:value="this.thisYear">{{this.thisYear}}</option>
              <option v-for="n in 100" v-bind:value="this.thisYear - n">{{this.thisYear - n}}</option>
            </select>
            월
            <select v-model="this.start_month">
              <option v-for="n in 12" v-bind:value="n">{{n}}</option>
            </select>
            일
            <select v-model="this.start_day">
              <option v-for="day in this.projectStore.day_list[this.start_month-1]" v-bind:value="day">{{day}}</option>
              <option v-if="this.start_month == 2 && checkLeap(this.start_year)">29</option>
            </select>
            <span class="gap">~</span>
            연도
            <select v-model="this.end_year">
              <option v-bind:value="this.thisYear">{{this.thisYear}}</option>
              <option v-for="n in 100" v-bind:value="this.thisYear - n">{{this.thisYear - n}}</option>
            </select>
            월
            <select v-model="this.end_month">
              <option v-for="n in 12" v-bind:value="n">{{n}}</option>
            </select>
            일
            <select v-model="this.end_day">
              <option v-for="day in this.projectStore.day_list[this.end_month-1]" v-bind:value="day">{{day}}</option>
              <option v-if="this.end_month == 2 && checkLeap(this.end_year)">29</option>
            </select>
          </div>
        </div>
        <div class="input-wrap input-double">
          <div class="input-wrap">
            <div class="label">
              모집인원수
            </div>
            <div class="input">
              <input type="text" v-model="this.total"/>
            </div>
          </div>
          <div class="input-wrap">
            <div class="label">
              카테고리
            </div>
            <div class="input">
              <select v-model="this.category">
                <option v-for="category in this.projectStore.category_name_value_list" v-bind:value="category.value">{{category.name}}</option>
              </select>
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
        <div class="input-wrap">
          <div class="label">
            유료/무료
          </div>
          <div class="input">
            <span :class="this.free ? 'select-btn':'select-btn selected'" @click="this.free = false">유료</span>
            <span :class="this.free ? 'select-btn selected':'select-btn'" @click="this.free = true">무료</span>
          </div>
        </div>
        <div class="submit-wrap">
          <span @click="submit">{{ this.project === 0 ? '완료':'수정' }}</span>
          <span @click="goToProjectList">취소</span>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import Header from '/src/components/common/Header.vue';
import {useProjectStore} from '@/_stores';

export default {
  components: {
    Header,
  },
  setup(){
    const projectStore = useProjectStore();
    return {
      projectStore,
    }
  },
  data() {
    return{
      project:0,
      title:'',
      content:'',
      start:'',
      end:'',
      total:0,
      category:this.projectStore.category_name_value_list[0].value,
      free:false,
      tagStr:'',
      tags:[],
      files:[],
      thumb:[],
      tagList:[],
      files_new:[],
      thumb_new:[],
      thisYear: (new Date()).getFullYear(),
      start_year:(new Date()).getFullYear(),
      start_month:1,
      start_day:1,
      end_year:(new Date()).getFullYear(),
      end_month:1,
      end_day:1,
      files_del:[],
    }
  },
  watch:{
    total : {
      handler(newValue, oldValue) {
        this.total = new Number(this.total.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')).toString();
      },
    },
  },
  methods: {
    initProject(){
      this.project = 0;
      this.title = '';
      this.content = '';
      this.start = '';
      this.end = '';
      this.total = '0';
      this.category = this.projectStore.category_name_value_list[0].value;
      this.free = false;
      this.tagStr = '';
      this.tags = [];
      this.files = [];
      this.thumb = [];
      this.tagList = [];
      this.files_new = [];
      this.thumb_new = [];
      this.thisYear = (new Date()).getFullYear();
      this.start_year = (new Date()).getFullYear();
      this.start_month = 1;
      this.start_day = 1;
      this.end_year = (new Date()).getFullYear();
      this.end_month = 1;
      this.end_day = 1;
      this.files_del = [];
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
    checkLeap(year){
      return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    },
    getDetail(){
      this.projectStore.getById(this.project).then((resp) => {
        this.project = this.projectStore.project.project;
        this.title = this.projectStore.project.title;
        this.content = this.projectStore.project.content;
        this.start = this.formattedDate(this.projectStore.project.start,'YYYYMMDD');
        this.end = this.formattedDate(this.projectStore.project.end,'YYYYMMDD');
        this.total = this.projectStore.project.total+'';
        this.category = this.projectStore.project.category;
        this.free = this.projectStore.project.free;
        this.tagStr = this.projectStore.project.tagStr;
        this.files = JSON.parse(this.projectStore.project.files);
        this.thumb = JSON.parse(this.projectStore.project.thumb);
        this.tagList = [];
        this.files_new = [];
        this.thumb_new = [];
        this.files_del = [];
        this.thisYear = (new Date()).getFullYear();
        this.start_year = this.start.substring(0,4);
        this.start_month = Number(this.start.substring(4,6)).toString();
        this.start_day = Number(this.start.substring(6,8)).toString();
        this.end_year = this.end.substring(0,4);
        this.end_month = Number(this.end.substring(4,6)).toString();
        this.end_day = Number(this.end.substring(6,8)).toString();
        this.getTags(this.project);
      }).catch(err => { console.log("err", err); });
    },
    getTags(key){
      this.projectStore.getTags(key).then((resp) => {
        this.tags = this.projectStore.project.tags;
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
      // 시작일 종료일 값 셋팅
      this.start = this.start_year + ('0' + this.start_month).slice(-2) + ('0' + this.start_day).slice(-2);
      this.end = this.end_year + ('0' + this.end_month).slice(-2) + ('0' + this.end_day).slice(-2);

      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("content", this.content);
      formData.append("start", this.start);
      formData.append("end", this.end);
      formData.append("total", this.total);
      formData.append("category", this.category);
      formData.append("free", this.free);
      formData.append("tagList", JSON.stringify(this.tagList));

      for (var i = 0; i < this.files_new.length; i++) {
        formData.append('files_new', this.files_new[i]);
      }
      for (var i = 0; i < this.thumb_new.length; i++) {
        formData.append('thumb_new', this.thumb_new[i]);
      }

      if(this.project === 0){
        this.projectStore.save(formData).then((resp) => {
          if(resp.data.code === 200){
            alert('등록되었습니다.');
            this.goToProjectList();
          }
        }).catch(err => { console.log("err", err); });
      } else {
        if(this.files_del.length !== 0){
          formData.append("files_del", JSON.stringify(this.files_del));
        }
        this.projectStore.modify(this.project, formData).then((resp) => {
          if(resp.data.code === 200){
            alert('수정되었습니다.');
            this.goToProjectList();
          }
        }).catch(err => { console.log("err", err); });
      }
    },
    goToProjectList(){
      this.$router.push({name:'ExhibitionList'});
    }
  },
  created() {
    this.$parent.$parent.$refs.gnb.activeBtn("exhibition");
    if(this.$route.query.key != null){
      this.project = this.$route.query.key;
      this.getDetail();
    } else {
      this.initProject();
    }
  }
}
</script>
