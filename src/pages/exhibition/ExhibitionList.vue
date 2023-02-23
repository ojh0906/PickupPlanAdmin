<template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">기획전 관리</span>
        <!-- 검색 -->
        <Search :search_type_list="this.projectStore.search_type_list" @getListAfterSearching="getListAfterSearching"/>
      </div>
      <div class="board-container">
        <div class="board-filter-wrap">
          <div class="filter-container">
            <div class="filter-wrap">
              <p class="button" @click="removeAll">선택 삭제</p>
            </div>
<!--
            <div class="filter-wrap">
              <p class="button">승인하기</p>
            </div>
-->
          </div>
        </div>
        <Filter :page_block_list="this.projectStore.page_block_list" @getListAfterChangingPageBlock="getListAfterChangingPageBlock"/>
        <div class="board-btn-wrap">
          <router-link :to="{ name: 'ExhibitionWrite', query: {} }" class="edit-btn" >
            작성 하기
          </router-link>
        </div>

        <!-- 리스트 영역 -->
        <Table :header="this.projectStore.header" :list="this.listForTable" />

        <!-- 페이징 -->
        <Page :storeInfo="this.projectStore" @getListOtherPage="getListOtherPage"/>
      </div>

    </div>
  </div>

</template>
<script>
import Header from '@/components/common/Header.vue';
import Table from "@/components/list/Table.vue";
import Page from "@/components/list/Page.vue";
import Search from "@/components/list/Search.vue";
import Order from "@/components/list/Order.vue";
import Filter from "@/components/list/Filter.vue";
import {useProjectStore} from '@/_stores';

export default {
  components: {
    Header,
    Table,
    Page,
    Search,
    Order,
    Filter,
  },
  setup(){
    const projectStore = useProjectStore();
    return {
      projectStore,
    }
  },
  data() {
    return{
      listForTable:[],
      searchType:'',
      searchKeyword:'',
    }
  },
  watch:{

  },
  methods: {
    getList(){
      let params = {
        page: this.projectStore.page,
        page_block: this.projectStore.page_block,
      }

      if(this.searchKeyword !== ''){
        params.searchType = this.searchType;
        params.searchKeyword = this.searchKeyword;
      }

      this.projectStore.getAll(params).then(() => {
        this.setListForTable();
      }).catch(err => { console.log("err", err); });
    },
    setListForTable(){
      this.listForTable = [];
      this.projectStore.project_list.forEach((project, idx) => {
        let td_data = [];
        td_data.push({t:'', class:'', type:'checkbox', param:{check:false, project:project.project}});
        td_data.push({t:this.formattedDate(project.regdate,'YY.MM.DD'), class:'bold', type:'text', param:{}});
        td_data.push({t:project.title, class:'bold', type:'text', param:{}});
        td_data.push({t:project.apply_cnt + '명', class:'bold', type:'text', param:{}});
        td_data.push({t:'', class:'', type:'link', param:{link:[{text:'상세보기', href:'ExhibitionDetail', key:project.project}]}});
        td_data.push({t:'', class:'', type:'button', param:{func:[{text:'수정하기', key:project.project, store:this.projectStore, value:function(key){this.store.goToProjectModify(key);}},]}});
        this.listForTable.push(td_data);
      });
    },
    getListAfterSearching(searchType, searchKeyword){
      this.searchType = searchType;
      this.searchKeyword = searchKeyword;
      this.getListOtherPage(1);
    },
    getListAfterChangingPageBlock(page_block){
      this.projectStore.page_block = page_block;
      this.getListOtherPage(1);
    },
    getListOtherPage(page){
      this.projectStore.page = page;
      this.getList();
    },
    removeAll(){
      var checkList = [];
      this.listForTable.forEach((tr, idx) => {
        tr.forEach((td, idx) => {
          if(td.type === 'checkbox' && td.param.check){
            checkList.push({project:td.param.project})
          }
        });
      });
      if(checkList.length === 0){
        alert('삭제할 기획을 선택해주세요.')
        return;
      }
      this.projectStore.removeAll(checkList).then((resp) => {
        if(resp.data.code === 200){
          alert('삭제되었습니다.');
          this.projectStore.header.forEach((h, idx) => {
            if(h.type === 'checkbox'){
              h.val = false;
            }
          });
          this.getListOtherPage(1);
        }
      }).catch(err => { console.log("err", err); });
    },
  },
  created() {
    this.$parent.$parent.$refs.gnb.activeBtn('exhibition');
    this.getListAfterChangingPageBlock(this.projectStore.page_block_list[0].value);
  }
}
</script>
