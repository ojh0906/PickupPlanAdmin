<template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">기획전 관리</span>
      </div>
      <div class="exhibition-detail-container">
        <p class="info-text"><strong>{{ this.projectStore.project.title }}</strong>기획전 정보</p>
        <div class="title-wrap">
          <div class="regdate">
            {{ formattedDate(this.projectStore.project.regdate,'YY.MM.DD') }}
          </div>
          <div class="tile">
            {{ this.projectStore.project.title }}
          </div>
        </div>
        <div class="content-wrap">
            <img>
            <table>
              <tr>
                <td>모집 기간</td>
                <td>{{ formattedDate(this.projectStore.project.start,'YY.MM.DD') }} ~ {{ formattedDate(this.projectStore.project.end,'YY.MM.DD') }}</td>
              </tr>
              <tr>
                <td>모집 현황</td>
                <td>{{ this.projectStore.project.apply_cnt }} 명 / {{ this.projectStore.project.total }} 명</td>
              </tr>
              <tr>
                <td>카테고리</td>
                <td>{{ this.getNameFromValue(this.projectStore.project.category, this.projectStore.category_name_value_list) }}</td>
              </tr>
              <tr>
                <td>유료/무료</td>
                <td>{{ this.projectStore.project.free ? '무료':'유료' }}</td>
              </tr>
              <tr>
                <td>첨부 파일</td>
                <td>
                  <a v-for="file in this.projectStore.project.filesJson">{{ file.name }}</a>
                </td>
              </tr>
            </table>
            <p class="tag">{{ getTagName(this.projectStore.project.tags) }}</p>
          <span class="submit" @click="getApply">모집현황보기</span>
        </div>
      </div>
    </div>
  </div>

  <div class="modal-background" v-show="applyShow" @click="this.applyShow = !this.applyShow;"></div>
  <div class="exhibition-modal modal" v-show="applyShow">
    <div class="modal-head">
      <p class="title"><strong>{{ this.projectStore.project.title }}</strong> 기획전 모집현황</p>
    </div>
    <!-- 리스트 영역 -->
    <Table :header="this.projectStore.header_apply" :list="this.listForTable" />
  </div>

</template>
<script>
import Header from '/src/components/common/Header.vue';
import Table from '/src/components/list/Table.vue';
import {useProjectStore} from '@/_stores';

export default {
  components: {
    Header,
    Table,
  },
  setup(){
    const projectStore = useProjectStore();
    return {
      projectStore,
    }
  },
  data() {
    return {
      project:0,
      applyShow:false,
      listForTable:[],
    }
  },
  watch:{

  },
  methods: {
    getDetail(){
      this.projectStore.getById(this.project).then((resp) => {
      }).catch(err => { console.log("err", err); });
    },
    getApply(){
      this.projectStore.getApply(this.project).then((resp) => {
        this.setListForTable();
        this.applyShow = true;
      }).catch(err => { console.log("err", err); });
    },
    getTagName(tagList){
      var result = '';

      if(tagList != null){
        tagList.forEach((t,idx) => {
          if(idx === 0){
            result += t.value
          } else {
            result += ' '+t.value
          }
        });
      }
      return result;
    },
    setListForTable(){
      this.listForTable = [];
      console.log(this.projectStore.project.applyList)
      if(this.projectStore.project.applyList != null){
        this.projectStore.project.applyList.forEach((apply, idx) => {
          let td_data = [];
          td_data.push({t:idx+1, class:'', type:'text', param:{}});
          td_data.push({t:this.formattedDate(apply.regdate,'YY.MM.DD'), class:'', type:'text', param:{}});
          td_data.push({t:apply.id, class:'', type:'text', param:{}});
          td_data.push({t:'', class:'', type:'button',
            param:{func:[
                {text:'상세보기', key:apply.member, store:this.projectStore, value:function(key){this.store.goToMemberDetail(key);}},
                {text:'삭제', key:apply.project_apply, refresh:this.getApply, store:this.projectStore, value:function(key){
                    this.store.removeApply(key).then((resp) => {
                      if(resp.data.code === 200){
                        alert('삭제되었습니다.');
                        this.refresh();
                      }
                    }).catch(err => { console.log("err", err); });
                }}
            ]}});
          this.listForTable.push(td_data);
        });
      }
    },
    test(key){
      console.log(key)

    }
  },
  created() {
    this.$parent.$parent.$refs.gnb.activeBtn("exhibition");
    if(this.$route.query.key != null){
      this.project = this.$route.query.key;
      this.getDetail();
    } else {
      alert('잘못된 접근입니다.');
    }
  }
}
</script>
