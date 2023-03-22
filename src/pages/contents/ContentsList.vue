<template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">콘텐츠 관리</span>
        <!-- 검색 -->
        <Search :search_type_list="this.contentsStore.search_type_list" @getListAfterSearching="getListAfterSearching"/>
      </div>
      <div class="board-container">
        <div class="board-filter-wrap">
          <div class="filter-container">
            <div class="filter-wrap">
              <p class="button" @click="removeAll">선택 삭제</p>
            </div>
            <div class="filter-wrap">
              <p class="button" @click="confirmState">선택 승인</p>
            </div>
            <div class="filter-wrap">
              <router-link :to="{ name: 'ContentsRecommend', query: {} }" class="button" >추천목록</router-link>
            </div>
          </div>
        </div>
<!--        <div class="board-filter-right-wrap">
          <span class="edit-btn">등록 하기</span>
          <select>
            <option value="">필터 선택</option>
          </select>
        </div>-->
        <Filter :page_block_list="this.contentsStore.page_block_list" @getListAfterChangingPageBlock="getListAfterChangingPageBlock"/>
        <div class="board-btn-wrap">
          <a :class="['cursor-pointer', this.confirmBool?'edit-btn':'del-btn']" @click="this.confirmBool = !this.confirmBool; this.getListOtherPage(1);">승인대기</a>
        </div>

        <!-- 리스트 영역 -->
        <Table :header="this.contentsStore.header" :list="this.listForTable" />

        <!-- 페이징 -->
        <Page :storeInfo="this.contentsStore" @getListOtherPage="getListOtherPage"/>
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
import { useContentsStore, useFieldStore } from '@/_stores';

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
    const contentsStore = useContentsStore();
    const fieldStore = useFieldStore();
    return {
      contentsStore,
      fieldStore,
    }
  },
  data() {
    return{
      listForTable:[],
      searchType:'',
      searchKeyword:'',
      categoryList:[],
      confirmBool:false,
    }
  },
  watch:{

  },
  methods: {
    getList(){
      let params = {
        page: this.contentsStore.page,
        page_block: this.contentsStore.page_block,
      }

      if(this.searchKeyword !== ''){
        params.searchType = this.searchType;
        params.searchKeyword = this.searchKeyword;
      }

      if(this.confirmBool){
        params.confirm = 2;
      }

      this.contentsStore.getAll(params).then(() => {
        this.setListForTable();
      }).catch(err => { console.log("err", err); });
    },
    setListForTable(){
      this.listForTable = [];
      this.contentsStore.contents_list.forEach((contents, idx) => {
        let td_data = [];
        td_data.push({t:'', class:'', type:'checkbox', param:{check:false, contents:contents.contents, confirm:contents.confirm}});
        td_data.push({t:this.contentsStore.getConfirmName(contents.confirm), class:'', type:'text', param:{}});
        td_data.push({t:contents.member_info.id, class:'', type:'text', param:{}});
        td_data.push({t:this.fieldStore.getFieldName(1,contents.category), class:'', type:'text', param:{}});
        td_data.push({t:this.formattedDate(contents.regdate), class:'', type:'text', param:{}});
        td_data.push({t:contents.title, class:'', type:'text', param:{}});
        td_data.push({t:'', class:'', type:'link', param:{link:[{text:'상세보기', href:'ContentsDetail', key:contents.contents}]}});
        this.listForTable.push(td_data);
      });
    },
    getListAfterSearching(searchType, searchKeyword){
      this.searchType = searchType;
      this.searchKeyword = searchKeyword;
      this.getListOtherPage(1);
    },
    getListAfterChangingPageBlock(page_block){
      this.contentsStore.page_block = page_block;
      this.getListOtherPage(1);
    },
    getListOtherPage(page){
      this.contentsStore.page = page;
      this.getList();
    },
    removeAll(){
      var checkList = [];
      this.listForTable.forEach((tr, idx) => {
        tr.forEach((td, idx) => {
          if(td.type === 'checkbox' && td.param.check){
            checkList.push({contents:td.param.contents})
          }
        });
      });
      if(checkList.length === 0){
        alert('삭제할 콘텐츠를 선택해주세요.')
        return;
      }
      this.contentsStore.removeAll(checkList).then((resp) => {
        if(resp.data.code === 200){
          alert('삭제되었습니다.');
          this.contentsStore.header.forEach((h, idx) => {
            if(h.type === 'checkbox'){
              h.val = false;
            }
          });
          this.getListOtherPage(1);
        }
      }).catch(err => { console.log("err", err); });
    },
    confirmState(){
      var check = false;
      var checkList = [];
      this.listForTable.forEach((tr, idx) => {
        tr.forEach((td, idx) => {
          if(td.type === 'checkbox' && td.param.check){
            checkList.push({contents:td.param.contents})
            if(td.param.confirm != 2){
              check = true;
            }
          }
        });
      });
      if(checkList.length === 0){
        alert('승인처리할 콘텐츠를 선택해주세요.')
        return;
      }
      if(check){
        alert('승인대기 상태만 선택해주세요.')
        return;
      }
      this.contentsStore.updateConfirmAll(3, checkList).then((resp) => {
        if(resp.data.code === 200){
          this.confirmBool = false;
          alert('승인처리되었습니다.');
          this.contentsStore.header.forEach((h, idx) => {
            if(h.type === 'checkbox'){
              h.val = false;
            }
          });
          this.getListOtherPage(1);
        }
      }).catch(err => { console.log("err", err); });
    },
    getCategoryList(type) {
      this.categoryList = [];
      this.fieldStore.listCategory({type: type}).then((resp) => {
        if(resp.data.code == 200){
          console.log(resp);
          this.fieldStore.categoryList = resp.data.body;
          this.getListAfterChangingPageBlock(this.contentsStore.page_block_list[0].value);
        }
      }).catch(err => { console.log("err", err); });
    },
  },
  created() {
    this.$parent.$parent.$refs.gnb.activeBtn("contents");
    this.getCategoryList(1);
  }
}
</script>