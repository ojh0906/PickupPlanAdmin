<template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">플랜 관리</span>
        <!-- 검색 -->
        <Search :search_type_list="this.planStore.search_type_list" @getListAfterSearching="getListAfterSearching"/>
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
              <router-link :to="{ name: 'PlanRecommend', query: {} }" class="button" >추천목록</router-link>
            </div>
          </div>
        </div>
        <Filter :page_block_list="this.planStore.page_block_list" @getListAfterChangingPageBlock="getListAfterChangingPageBlock"/>
        <div class="board-btn-wrap">
          <a :class="['cursor-pointer', this.confirmBool?'edit-btn':'del-btn']" @click="this.confirmBool = !this.confirmBool; this.getListOtherPage(1);">승인대기</a>
        </div>

        <!-- 리스트 영역 -->
        <Table :header="this.planStore.header" :list="this.listForTable" />

        <!-- 페이징 -->
        <Page :storeInfo="this.planStore" @getListOtherPage="getListOtherPage"/>
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
import { usePlanStore, useFieldStore } from '@/_stores';

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
    const planStore = usePlanStore();
    const fieldStore = useFieldStore();
    return {
      planStore,
      fieldStore,
    }
  },
  data() {
    return{
      listForTable:[],
      searchType:'',
      searchKeyword:'',
      confirmBool:false,
    }
  },
  watch:{

  },
  methods: {
    getList(){
      let params = {
        page: this.planStore.page,
        page_block: this.planStore.page_block,
      }

      if(this.searchKeyword !== ''){
        params.searchType = this.searchType;
        params.searchKeyword = this.searchKeyword;
      }

      if(this.confirmBool){
        params.confirm = 2;
      }

      this.planStore.getAll(params).then(() => {
        this.setListForTable();
      }).catch(err => { console.log("err", err); });
    },
    setListForTable(){
      this.listForTable = [];
      this.planStore.plan_list.forEach((plan, idx) => {
        let td_data = [];
        td_data.push({t:'', class:'', type:'checkbox', param:{check:false, plan:plan.plan, confirm:plan.confirm}});
        td_data.push({t:this.planStore.getConfirmName(plan.confirm), class:'', type:'text', param:{}});
        td_data.push({t:plan.member_info.type === 1 ? '일반':'파트너', class:'', type:'text', param:{}});
        td_data.push({t:plan.member_info.id, class:'', type:'text', param:{}});
        td_data.push({t:this.fieldStore.getFieldName(1,plan.category), class:'', type:'text', param:{}});
        td_data.push({t:this.formattedDate(plan.regdate), class:'', type:'text', param:{}});
        td_data.push({t:plan.title, class:'', type:'text', param:{}});
        td_data.push({t:plan.contents_tot+'개', class:'', type:'text', param:{}});
        td_data.push({t:'', class:'', type:'link', param:{link:[{text:'상세보기', href:'PlanDetail', key:plan.plan}]}});
        this.listForTable.push(td_data);
      });
    },
    getListAfterSearching(searchType, searchKeyword){
      this.searchType = searchType;
      this.searchKeyword = searchKeyword;
      this.getListOtherPage(1);
    },
    getListAfterChangingPageBlock(page_block){
      this.planStore.page_block = page_block;
      this.getListOtherPage(1);
    },
    getListOtherPage(page){
      this.planStore.page = page;
      this.getList();
    },
    removeAll(){
      var checkList = [];
      this.listForTable.forEach((tr, idx) => {
        tr.forEach((td, idx) => {
          if(td.type === 'checkbox' && td.param.check){
            checkList.push({plan:td.param.plan})
          }
        });
      });
      if(checkList.length === 0){
        alert('삭제할 플랜을 선택해주세요.')
        return;
      }
      this.planStore.removeAll(checkList).then((resp) => {
        if(resp.data.code === 200){
          alert('삭제되었습니다.');
          this.planStore.header.forEach((h, idx) => {
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
            checkList.push({plan:td.param.plan})
            if(td.param.confirm != 2){
              check = true;
            }
          }
        });
      });
      if(checkList.length === 0){
        alert('승인처리할 플랜을 선택해주세요.')
        return;
      }
      if(check){
        alert('승인대기 상태만 선택해주세요.')
        return;
      }
      this.planStore.updateConfirmAll(3, checkList).then((resp) => {
        if(resp.data.code === 200){
          this.confirmBool = false;
          alert('승인처리되었습니다.');
          this.planStore.header.forEach((h, idx) => {
            if(h.type === 'checkbox'){
              h.val = false;
            }
          });
          this.getListOtherPage(1);
        }
      }).catch(err => { console.log("err", err); });
    },
    getCategoryList(type) {
      this.fieldStore.listCategory({type: type}).then((resp) => {
        if(resp.data.code == 200){
          this.fieldStore.categoryList = resp.data.body;
          this.getListAfterChangingPageBlock(this.planStore.page_block_list[0].value);
        }
      }).catch(err => { console.log("err", err); });
    },
  },
  created() {
    this.$parent.$parent.$refs.gnb.activeBtn("plan");
    this.getCategoryList(1);
  }
}
</script>