  <template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">FAQ 관리</span>
        <!-- 검색 -->
        <Search :search_type_list="this.boardStore.search_type_list" />
      </div>

      <div class="board-container">
        <div class="board-filter-wrap">
          <div class="filter-container">
            <div class="filter-wrap">
              <p class="button" >선택 삭제</p>
            </div>
          </div>
        </div>
        <Filter :page_block_list="this.boardStore.page_block_list" />
        <div class="board-btn-wrap">
          <router-link :to="{ name: 'BoardWrite', query: {} }" class="edit-btn" >
            작성 하기
          </router-link>
        </div>

        <!-- 리스트 영역 -->
        <div class="table-wrap">
          <table>
            <thead>
            <tr class="table-head">
              <th width="10%">
                <input type="checkbox"/>
              </th>
              <th width="20%">
                작성일
              </th>
              <th>
                제목
              </th>
              <th width="10%">
              </th>
              <th width="10%">
              </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <input type="checkbox"/>
              </td>
              <td>
                2022.01.01
              </td>
              <td>
                faq 제목입니다람쥐썬더
              </td>
              <td>
                <a href="" class="view-detail">상세보기</a>
              </td>
              <td>
                <a href="" class="view-detail">수정하기</a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <!-- 페이징 -->
<!--        <Page :storeInfo="this.faqStore"/>-->
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
import {useBoardStore} from '@/_stores';

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
    const boardStore = useBoardStore();
    return {
      boardStore,
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


  },
  created() {
    this.$parent.$parent.$refs.gnb.activeBtn("faq");
  }
}
</script>
