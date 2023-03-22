  <template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">배너 관리</span>
        <!-- 검색 -->
        <Search :search_type_list="this.bannerStore.search_type_list" @getListAfterSearching="getListAfterSearching"/>
      </div>
      <div class="board-container">
        <div class="board-filter-wrap">
          <div class="filter-container">
            <div class="filter-wrap">
              <p class="button" @click="removeAll">선택 삭제</p>
            </div>
          </div>
        </div>
        <Filter :page_block_list="this.bannerStore.page_block_list" @getListAfterChangingPageBlock="getListAfterChangingPageBlock"/>
        <div class="board-btn-wrap">
          <router-link :to="{ name: 'BannerSetting', query: {} }" class="edit-btn" >작성 하기</router-link>
        </div>

        <!-- 리스트 영역 -->
        <Table :header="this.bannerStore.header" :list="this.listForTable" />

        <!-- 페이징 -->
        <Page :storeInfo="this.bannerStore" @getListOtherPage="getListOtherPage"/>
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
import {useBannerStore} from '@/_stores';

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
    const bannerStore = useBannerStore();
    return {
      bannerStore,
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
        page: this.bannerStore.page,
        page_block: this.bannerStore.page_block,
      }

      if(this.searchKeyword !== ''){
        params.searchType = this.searchType;
        params.searchKeyword = this.searchKeyword;
      }

      this.bannerStore.getAll(params).then(() => {
        this.setListForTable();
      }).catch(err => { console.log("err", err); });
    },
    setListForTable(){
      this.listForTable = [];
      this.bannerStore.banner_list.forEach((banner, idx) => {
        let td_data = [];
        td_data.push({t:'', class:'', type:'checkbox', param:{check:false, banner:banner.banner}});
        td_data.push({t:this.getNameFromValue(banner.type, this.bannerStore.type_name_value_list), class:'', type:'text', param:{}});
        td_data.push({t:banner.sort, class:'', type:'text', param:{}});
        td_data.push({t:banner.name, class:'', type:'text', param:{}});
        td_data.push({t:'', class:'', type:'link', param:{link:[{text:'상세보기', href:'BannerSetting', key:banner.banner}]}});
        this.listForTable.push(td_data);
      });
    },
    getListAfterSearching(searchType, searchKeyword){
      this.searchType = searchType;
      this.searchKeyword = searchKeyword;
      this.getListOtherPage(1);
    },
    getListAfterChangingPageBlock(page_block){
      this.bannerStore.page_block = page_block;
      this.getListOtherPage(1);
    },
    getListOtherPage(page){
      this.bannerStore.page = page;
      this.getList();
    },
    removeAll(){
      var checkList = [];
      this.listForTable.forEach((tr, idx) => {
        tr.forEach((td, idx) => {
          if(td.type === 'checkbox' && td.param.check){
            checkList.push({banner:td.param.banner})
          }
        });
      });
      if(checkList.length === 0){
        alert('삭제할 배너를 선택해주세요.')
        return;
      }
      this.bannerStore.removeAll(checkList).then((resp) => {
        if(resp.data.code === 200){
          alert('삭제되었습니다.');
          this.bannerStore.header.forEach((h, idx) => {
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
    this.$parent.$parent.$refs.gnb.activeBtn("banner");
    this.getListAfterChangingPageBlock(this.bannerStore.page_block_list[0].value);
  }
}
</script>
