  <template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">문의 관리</span>
        <!-- 검색 -->
        <Search :search_type_list="this.contactStore.search_type_list" @getListAfterSearching="getListAfterSearching"/>
      </div>
      <div class="board-container">
        <div class="board-filter-wrap">
          <div class="filter-container">
            <div class="filter-container">
              <div class="filter-wrap">
                <p class="button" @click="removeAll">선택 삭제</p>
              </div>
            </div>
          </div>
        </div>
<!--        <div class="board-filter-right-wrap">
          <span class="edit-btn">등록 하기</span>
        </div>-->
        <Filter :page_block_list="this.contactStore.page_block_list" @getListAfterChangingPageBlock="getListAfterChangingPageBlock"/>

        <!-- 리스트 영역 -->
        <Table :header="this.contactStore.header" :list="this.listForTable" />

        <!-- 페이징 -->
        <Page :storeInfo="this.contactStore" @getListOtherPage="getListOtherPage"/>
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
import {useContactStore} from '@/_stores';

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
    const contactStore = useContactStore();
    return {
      contactStore,
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
        page: this.contactStore.page,
        page_block: this.contactStore.page_block,
      }

      if(this.searchKeyword !== ''){
        params.searchType = this.searchType;
        params.searchKeyword = this.searchKeyword;
      }

      this.contactStore.getAll(params).then(() => {
        this.setListForTable();
      }).catch(err => { console.log("err", err); });
    },
    setListForTable(){
      this.listForTable = [];
      this.contactStore.contact_list.forEach((contact, idx) => {
        let td_data = [];
        td_data.push({t:'', class:'', type:'checkbox', param:{check:false, contact:contact.contact}});
        td_data.push({t:this.getNameFromValue(contact.type, this.contactStore.type_name_value_list), class:'', type:'text', param:{}});
        td_data.push({t:this.formattedDate(contact.regdate), class:'', type:'text', param:{}});
        td_data.push({t:contact.title, class:'', type:'text', param:{}});
        td_data.push({t:'', class:'', type:'link', param:{link:[{text:'상세보기', href:'ContactDetail', key:contact.contact}]}});
        this.listForTable.push(td_data);
      });
    },
    getListAfterSearching(searchType, searchKeyword){
      this.searchType = searchType;
      this.searchKeyword = searchKeyword;
      this.getListOtherPage(1);
    },
    getListAfterChangingPageBlock(page_block){
      this.contactStore.page_block = page_block;
      this.getListOtherPage(1);
    },
    getListOtherPage(page){
      this.contactStore.page = page;
      this.getList();
    },
    removeAll(){
      var checkList = [];
      this.listForTable.forEach((tr, idx) => {
        tr.forEach((td, idx) => {
          if(td.type === 'checkbox' && td.param.check){
            checkList.push({contact:td.param.contact})
          }
        });
      });
      if(checkList.length === 0){
        alert('삭제할 게시글을 확인해주세요.')
        return;
      }
      this.contactStore.removeAll(checkList).then((resp) => {
        if(resp.data.code === 200){
          alert('삭제되었습니다.');
          this.contactStore.header.forEach((h, idx) => {
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
    this.$parent.$parent.$refs.gnb.activeBtn("contact");
    this.getListAfterChangingPageBlock(this.contactStore.page_block_list[0].value);
  }
}
</script>
