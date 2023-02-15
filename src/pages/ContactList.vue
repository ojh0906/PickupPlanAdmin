  <template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">문의 관리</span>
      </div>
      <div class="board-container">
        <div class="board-filter-wrap">
          <div class="filter-container">
            <div class="filter-wrap">
              <p class="label active">
                <span class="filter-chk"></span>
                전체 선택
              </p>
            </div>
            <div class="filter-wrap">
              <p class="button">선택 삭제</p>
            </div>
            <div class="filter-wrap">
              <p class="button">승인하기</p>
            </div>
          </div>
        </div>
        <div class="board-filter-right-wrap">
          <span class="edit-btn">등록 하기</span>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
            <tr class="table-head">
              <th width="3%"></th>
              <th width="15%">회원구분</th>
              <th width="25%">등록일</th>
              <th width="40%">제목</th>
              <th width="20%"></th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                파트너
              </td>
              <td class="">
                22.07.31
              </td>
              <td>
                문의사항의 제목이 노출되는 영역입니다.
              </td>
              <td>
                <router-link :to="{ name: 'PartnerDetail', query: {} }" class="view-detail" >상세보기</router-link>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
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
import Header from '/src/components/common/Header.vue';

export default {
  components: {
    Header,
  },
  data() {

  },
  watch:{

  },
  methods: {
  },
  created() {
    this.$parent.$parent.$refs.gnb.setGnbInfo(6);
  }
}
</script>
