<template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">회원 관리</span>
        <!-- 검색 -->
        <Search :search_type_list="search_type_list" @getListAfterSearching="getListAfterSearching"/>
      </div>
      <div class="board-container">
        <div class="board-filter-wrap">
          <div class="filter-container">
            <div class="filter-wrap">
              <p class="button" @click="removeAll">선택 삭제</p>
            </div>
            <div class="filter-wrap">
              <p class="button" @click="updateStateAll">승인하기</p>
            </div>
          </div>
        </div>
        <div class="board-filter-right-wrap">
<!--          <span class="stop-user">다운로드</span>-->
          <select>
            <option>10개씩 보기</option>
            <option>5개씩 보기</option>
          </select>
        </div>

        <!-- 리스트 영역 -->
        <Table :header="this.header" :list="this.listForTable" />

        <div class="paging-wrap">
          <a class="active">1</a>
          <a>2</a>
          <a>3</a>
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
    const header = [
      {title:'', width:'3%', type:'checkbox'},
      {title:'구분', width:'5%'},
      {title:'상태', width:'5%'},
      {title:'가입일', width:'10%'},
      {title:'아이디', width:'15%'},
      {title:'연락처', width:'15%'},
      {title:'이메일', width:'15%'},
      {title:'', width:'20%'},
    ];
    const search_type_list = [
      { text: '제목', value: 'title'},
      { text: '내용', value: 'content'},
    ];
    const page_block_list = [
      { text: '10개씩 보기', value: 10},
      { text: '5개씩 보기', value: 5},
    ];
    const type_name_value_list = [
      { name: '일반', value: 1},
      { name: '강사', value: 2},
      { name: '파트너', value: 3},
    ];
    const state_name_value_list = [
      { name: '강사 신청', value: 1},
      { name: '파트너 신청', value: 2},
      { name: '완료', value: 3},
    ];
    return {
      memberStore,
      header,
      search_type_list,
      page_block_list,
      type_name_value_list,
      state_name_value_list,
    }
  },
  data() {
    return{
      listForTable:[],
      searchType:'',
      searchKeyword:'',
      checkList:[],
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

      this.memberStore.getAll(params).then(() => {
        this.setListForTable();
      }).catch(err => { console.log("err", err); });
    },
    setListForTable(){
      this.listForTable = [];
      this.memberStore.member_list.forEach((member, idx) => {
        let td_data = [];
        td_data.push({t:'', class:'', type:'checkbox', param:{check:false, member:member.member}});
        td_data.push({t:this.getNameFromValue(member.type, this.type_name_value_list), class:'', type:'text', param:{}});
        td_data.push({t:this.getNameFromValue(member.partner_info == null ? 3:member.partner_info.state, this.state_name_value_list), class:'', type:'text', param:{}});
        td_data.push({t:this.formattedDate(member.regdate,'YY.MM.DD'), class:'bold', type:'text', param:{}});
        td_data.push({t:member.id, class:'bold', type:'text', param:{}});
        td_data.push({t:member.phone, class:'', type:'text', param:{}});
        td_data.push({t:member.email, class:'blue-text', type:'text', param:{}});
        td_data.push({t:'', class:'', type:'button', param:{link:[{text:'상세보기', href:'MemberDetail', key:member.member}]}});
        this.listForTable.push(td_data);
      });
    },
    getListAfterSearching(searchType, searchKeyword){
      this.searchType = searchType;
      this.searchKeyword = searchKeyword;
      this.getListOtherPage(1);
    },
    sellerApplyChange(){
      if(this.sellerApply){
        this.sellerApply = false;
      } else {
        this.sellerApply = true;
      }
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
      this.listForTable.forEach((tr, idx) => {
        tr.forEach((td, idx) => {
          if(td.type === 'checkbox' && td.param.check){
            console.log(td.param.member)
            this.checkList.push({member:td.param.member})
          }
        });
      });
    },
    updateStateAll(){
      console.log(this.checkList);
    }
  },
  created() {
    this.$parent.$parent.$refs.gnb.activeBtn('member');
    this.memberStore.page_block = this.page_block_list[0].value;
    this.getList();
  }
}
</script>
