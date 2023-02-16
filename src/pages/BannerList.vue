  <template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">배너 관리</span>
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
          </div>
        </div>
        <div class="board-filter-right-wrap">
          <router-link :to="{ name: 'BannerSetting', query: {} }" class="edit-btn" >작성 하기</router-link>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
            <tr class="table-head">
              <th width="3%"></th>
              <th width="15%" class="cursor-pointer">배너<i class="fas fa-caret-down"></i></th>
              <th width="25%" class="cursor-pointer">노출순서<i class="fas fa-caret-down"></i></th>
              <th width="40%">배너 명</th>
              <th width="20%"></th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                메인
              </td>
              <td class="">
                <select>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </td>
              <td>
                배너의 제목이 노출되는 영역입니다.
              </td>
              <td>
                <router-link :to="{ name: 'BannerSetting', query: {} }" class="view-detail" >상세보기</router-link>
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
    this.$parent.$parent.$refs.gnb.setGnbInfo(8);
  }
}
</script>
