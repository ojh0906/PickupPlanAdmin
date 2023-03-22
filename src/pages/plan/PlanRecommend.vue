<template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">플랜 추천 설정</span>
      </div>
      <!--  카테고리  -->
      <div class="contents-category-list">
        <span :class="['cursor-pointer',this.category == 0?'active':'']"
              @click="this.category = 0; this.getListOtherPage(1)">전체</span>

        <span :class="['cursor-pointer',this.category == category.field?'active':'']"
              @click="this.category = category.field; this.getListOtherPage(1)"
              v-for="category in this.fieldStore.categoryList">{{ category.name }}</span>
      </div>
      <!--   목록   -->
      <div class="board-container mb-10">
        <div class="board-filter-wrap">
          <div class="filter-container">
            <div class="filter-wrap">
              <p class="button" @click="recommendRemove">선택 삭제</p>
            </div>
          </div>
        </div>
        <Filter :page_block_list="this.planStore.page_block_list" @getListAfterChangingPageBlock="getListAfterChangingPageBlock"/>
        <div class="board-btn-wrap">
          <a :class="['cursor-pointer edit-btn']" @click="openModal">등록하기</a>
        </div>

        <!-- 리스트 영역 -->
        <Table :header="this.planStore.header2" :list="this.listForTable" />

        <!-- 페이징 -->
        <Page :storeInfo="this.planStore" @getListOtherPage="getListOtherPage"/>
      </div>
    </div>
  </div>

  <div class="modal-background" v-if="this.modalOpen" @click="closeModal"></div>
  <div class="contents-modal modal" v-if="this.modalOpen">
    <div class="modal-head">
      <p class="title">등록</p>
    </div>
    <div class="search-wrap">
      <input type="text" placeholder="강좌 검색" v-model="this.searchKeyword" @keypress.enter="getModalAll"/>
      <span><i class="fas fa-search" @click="getModalAll"></i></span>
    </div>
    <div class="list-container">
      <div class="item" v-for="plan in this.planStore.plan_modal_list">
        <div class="contents">
          <div class="thumb">
            <img :src="this.getFirstImagePath(plan.thumb)">
          </div>
          <div class="info">
            <table>
                <tr>
                  <td colspan="2">{{ plan.title }}</td>
                </tr>
                <tr>
                  <td>{{ plan.member_info.id }}</td>
                  <td>{{ this.fieldStore.getFieldName(1,plan.category) }}</td>
                </tr>
                <tr>
                  <td>{{ plan.total_hour }}</td>
                  <td><i class="fas fa-heart"></i>{{ plan.like_tot }}</td>
                </tr>
            </table>
          </div>
        </div>
        <div class="btn" @click="recommendAdd(plan.plan)">
          <span>등록</span>
        </div>
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
      searchKeyword:'',
      category:0,
      modalOpen:false,
    }
  },
  watch:{

  },
  methods: {
    getList(){
      let params = {
        page: this.planStore.page,
        page_block: this.planStore.page_block,
        recommend: true,
      }

      if(this.category !== 0){
        params.category = this.category;
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
        td_data.push({t:this.fieldStore.getFieldName(1,plan.category), class:'', type:'text', param:{}});
        td_data.push({t:plan.member_info.id, class:'', type:'text', param:{}});
        td_data.push({t:plan.title, class:'', type:'text', param:{}});
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
    recommendRemove(){
      var checkList = [];
      this.listForTable.forEach((tr, idx) => {
        tr.forEach((td, idx) => {
          if(td.type === 'checkbox' && td.param.check){
            checkList.push({plan:td.param.plan})
          }
        });
      });
      if(checkList.length === 0){
        alert('추천 삭제할 콘텐츠를 선택해주세요.')
        return;
      }
      this.planStore.updateRecommendAll(0, checkList).then((resp) => {
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
    recommendAdd(plan){
      var checkList = [];
      checkList.push({plan:plan})
      this.planStore.updateRecommendAll(1, checkList).then((resp) => {
        if(resp.data.code === 200){
          alert('추가되었습니다.');
          this.closeModal();
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
    getModalAll(){
      let params = {
        page: this.planStore.page,
        page_block: this.planStore.page_block,
      }

      if(this.searchKeyword !== ''){
        params.searchKeyword = this.searchKeyword;
      }

      this.planStore.getModalAll(params).then(() => {
      }).catch(err => { console.log("err", err); });
    },
    openModal(){
      this.modalOpen = true;
      this.getModalAll();
    },
    closeModal(){
      this.modalOpen = false;
      this.searchKeyword = '';
      this.getModalAll();
    }
  },
  created() {
    this.$parent.$parent.$refs.gnb.activeBtn("plan");
    this.getCategoryList(1);
  }
}
</script>