<template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">배너 관리</span>
      </div>
      <div class="bannerSetting-container">
        <table>
          <tr>
              <td class="title">배너위치</td>
              <td>
                <select v-model="this.type">
                  <option v-for="type in this.bannerStore.type_name_value_list" v-bind:value="type.value">{{type.name}}</option>
                </select>
              </td>
              <td class="title">노출 순서</td>
              <td>
                <select v-model="this.sort">
                  <option v-for="i in 4" v-bind:value="i">{{i}}</option>
                </select>
              </td>
          </tr>
          <tr>
            <td class="title">배너명</td>
            <td colspan="3">
              <input type="text" placeholder="배너명을 입력하세요." v-model="this.name"/>
            </td>
          </tr>
          <tr>
            <td class="title">URL</td>
            <td colspan="3">
              <input type="text" placeholder="URL을 입력하세요." v-model="this.link" />
            </td>
          </tr>
          <tr>
            <td class="title">이미지 등록</td>
            <td colspan="3">
              <span class="add-file" @click="addFiles(this.$refs.images_new);" v-if="(this.images_new.length + this.images.length) === 0">파일 추가</span>
              <input type="file" ref="images_new" v-on:change="handleUpload(this.$refs.images_new.files, this.images_new)" class="hidden" style="display: none;" accept="image/*"/>
              <div class="file-list" v-for="(file, index) in this.images">
                <span>{{ file.name }}<i class="fas fa-times" @click="removeFile(this.images, index)"></i></span>
              </div>
              <div class="file-list" v-for="(file, index) in this.images_new">
                <span>{{ file.name }}<i class="fas fa-times" @click="removeFile(this.images_new, index)"></i></span>
              </div>
            </td>
          </tr>
        </table>
        <div class="submit-wrap">
          <span class="submit" @click="submit">{{ this.banner === 0 ? '저장':'수정' }}</span>
          <span class="submit" @click="goToBannerList">취소</span>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import Header from '/src/components/common/Header.vue';
import {useBannerStore} from '@/_stores';

export default {
  components: {
    Header,
  },
  setup(){
    const bannerStore = useBannerStore();
    return {
      bannerStore,
    }
  },
  data() {
    return {
      banner:0,
      type:0,
      sort:0,
      name:'',
      link:'',
      images:[],
      images_new:[],
    }
  },
  watch:{

  },
  methods: {
    initBanner(){
      this.banner = 0;
      this.type = this.bannerStore.type_name_value_list[0].value;
      this.sort = 1;
      this.name = '';
      this.link = '';
      this.images = [];
      this.images_new = [];
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
    getDetail(){
      this.bannerStore.getById(this.banner).then((resp) => {
        this.banner = this.bannerStore.banner.banner;
        this.type = this.bannerStore.banner.type;
        this.sort = this.bannerStore.banner.sort;
        this.name = this.bannerStore.banner.name;
        this.link = this.bannerStore.banner.link;
        this.images = JSON.parse(this.bannerStore.banner.images);
      }).catch(err => { console.log("err", err); });
    },
    submit(){
      let formData = new FormData();
      formData.append("type", this.type);
      formData.append("sort", this.sort);
      formData.append("name", this.name);
      formData.append("link", this.link);

      for (var i = 0; i < this.images_new.length; i++) {
        formData.append('images_new', this.images_new[i]);
      }

      if(this.banner === 0){
        this.bannerStore.save(formData).then((resp) => {
          if(resp.data.code === 200){
            alert('등록되었습니다.');
            this.goToBannerList();
          }
        }).catch(err => { console.log("err", err); });
      } else {
        this.bannerStore.modify(this.banner, formData).then((resp) => {
          if(resp.data.code === 200){
            alert('수정되었습니다.');
            this.goToBannerList();
          }
        }).catch(err => { console.log("err", err); });
      }
    },
    goToBannerList(){
      this.$router.push({name:'BannerList'});
    }
  },
  created() {
    this.$parent.$parent.$refs.gnb.activeBtn("banner");
    if(this.$route.query.key != null){
      this.banner = this.$route.query.key;
      this.getDetail();
    } else {
      this.initBanner();
    }
  }
}
</script>
