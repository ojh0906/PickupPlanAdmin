<template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">회원 관리</span>
        <!-- 검색 -->
        <Search :search_type_list="this.memberStore.search_type_list" @getListAfterSearching="getListAfterSearching"/>
      </div>
      <div class="board-container">
        <div class="board-filter-wrap">
          <div class="filter-container">
            <div class="filter-wrap">
              <p class="button" @click="removeAll">선택 삭제</p>
            </div>
            <div class="filter-wrap">
              <p class="button" @click="updateStateAll(3)">선택 승인</p>
            </div>
            <div class="filter-wrap">
              <p class="button" @click="updateStateAll(4)">선택 반려</p>
            </div>
          </div>
        </div>
        <Filter :page_block_list="this.memberStore.page_block_list" @getListAfterChangingPageBlock="getListAfterChangingPageBlock"/>

        <!-- 리스트 영역 -->
        <Table :header="this.memberStore.header" :list="this.listForTable" />

        <!-- 페이징 -->
        <Page :storeInfo="this.memberStore" @getListOtherPage="getListOtherPage"/>
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
import {useMemberStore} from '@/_stores';

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
    const memberStore = useMemberStore();
    return {
      memberStore,
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
        page: this.memberStore.page,
        page_block: this.memberStore.page_block,
      }

      if(this.searchKeyword !== ''){
        params.searchType = this.searchType;
        params.searchKeyword = this.searchKeyword;
      }

      this.memberStore.getAll(params).then(() => {
        this.setListForTable();
      }).catch(err => { console.log("err", err); });
    },
    setListForTable(){
      this.listForTable = [];
      this.memberStore.member_list.forEach((member, idx) => {
        let td_data = [];
        td_data.push({t:'', class:'', type:'checkbox', param:{check:false, member:member.member, state:member.partner_info == null ? 3:member.partner_info.state}});
        td_data.push({t:this.getNameFromValue(member.type, this.memberStore.type_name_value_list), class:'', type:'text', param:{}});
        td_data.push({t:this.getNameFromValue(member.partner_info == null ? 3:member.partner_info.state, this.memberStore.state_name_value_list), class:'', type:'text', param:{}});
        td_data.push({t:this.formattedDate(member.regdate,'YY.MM.DD'), class:'bold', type:'text', param:{}});
        td_data.push({t:member.id, class:'bold', type:'text', param:{}});
        td_data.push({t:member.phone, class:'', type:'text', param:{}});
        td_data.push({t:member.email, class:'blue-text', type:'text', param:{}});
        td_data.push({t:'', class:'', type:'link', param:{link:[{text:'상세보기', href:'MemberDetail', key:member.member}]}});
        this.listForTable.push(td_data);
      });
    },
    getListAfterSearching(searchType, searchKeyword){
      this.searchType = searchType;
      this.searchKeyword = searchKeyword;
      this.getListOtherPage(1);
    },
    getListAfterChangingPageBlock(page_block){
      this.memberStore.page_block = page_block;
      this.getListOtherPage(1);
    },
    getListOtherPage(page){
      this.memberStore.page = page;
      this.getList();
    },
    removeAll(){
      var checkList = [];
      this.listForTable.forEach((tr, idx) => {
        tr.forEach((td, idx) => {
          if(td.type === 'checkbox' && td.param.check){
            checkList.push({member:td.param.member})
          }
        });
      });
      if(checkList.length === 0){
        alert('삭제할 회원을 선택해주세요.')
        return;
      }
      this.memberStore.removeAll(checkList).then((resp) => {
        if(resp.data.code === 200){
          alert('삭제되었습니다.');
          this.memberStore.header.forEach((h, idx) => {
            if(h.type === 'checkbox'){
              h.val = false;
            }
          });
          this.getListOtherPage(1);
        }
      }).catch(err => { console.log("err", err); });
    },
    updateStateAll(state){
      var stateStr = '';
      if(state === 3){
        stateStr = '승인'
      } else {
        stateStr = '반려'
      }
      var checkList = [];
      var apply = false;
      this.listForTable.forEach((tr, idx) => {
        tr.forEach((td, idx) => {
          if(td.type === 'checkbox' && td.param.check){
            checkList.push({member:td.param.member})
            if(td.param.state == 3 || td.param.state == 4){ // 완료나 반려상태
              apply = true;
            }
          }
        });
      });
      if(checkList.length === 0){
        alert(stateStr+'할 회원을 확인해주세요.');
        return;
      };

      if(apply){
        alert('강사/파트너 신청 상태만 체크해주세요.');
        return;
      };

      this.memberStore.updateStateAll(state, checkList).then((resp) => {
        if(resp.data.code === 200){
          alert(stateStr + '되었습니다.');
          this.memberStore.header.forEach((h, idx) => {
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
    this.$parent.$parent.$refs.gnb.activeBtn('member');
    this.getListAfterChangingPageBlock(this.memberStore.page_block_list[0].value);
  }
}
</script>
