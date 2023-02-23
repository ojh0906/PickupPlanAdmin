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
            <div v-for="(file, index) in this.files_new" :key="index" class="upload-list">
              <span class="file_name">{{ file.name }}</span>
              <span class="remove-file" @click="removeFile(this.files_new, key)">삭제</span>
            </div>
          </div>
        </div>
        <div class="input-wrap">
          <div class="label">
            썸네일
          </div>
          <div class="input">
            <span class="add-file" @click="addFiles(this.$refs.thumb_new);" v-if="this.thumb_new.length === 0">파일 추가</span>
            <input type="file" ref="thumb_new" v-on:change="handleUpload(this.$refs.thumb_new.files, this.thumb_new)" class="hidden" style="display: none;" accept="image/*"/>
            <div v-for="(file, index) in this.thumb_new" :key="index" class="upload-list">
              <span class="file_name">{{ file.name }}</span>
              <span class="remove-file" @click="removeFile(this.thumb_new, key)">삭제</span>
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
          <span @click="submit">완료</span>
          <span>취소</span>
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
    checkLeap(year){
      return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
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

      this.projectStore.save(formData).then((resp) => {
        console.log(resp);
        if(resp.data.code === 200){
          alert('등록되었습니다.');
          this.$router.push({name:'ExhibitionList'})
        }
      }).catch(err => { console.log("err", err); });
    }
  },
  created() {
    this.$parent.$parent.$refs.gnb.activeBtn("exhibition");
  }
}
</script>
