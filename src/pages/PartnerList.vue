<template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">파트너 관리</span>
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
          <span class="stop-user">다운로드</span>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
            <tr class="table-head">
              <th width="3%"></th>
              <th width="5%" class="cursor-pointer">구분 <i class="fas fa-caret-down"></i></th>
              <th width="5%" class="cursor-pointer">상태 <i class="fas fa-caret-down"></i></th>
              <th width="10%">가입일</th>
              <th width="15%">아이디</th>
              <th width="15%">연락처</th>
              <th width="15%">이메일</th>
              <th width="20%">주소</th>
              <th width="20%"></th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                강사
              </td>
              <td>
                대기
              </td>
              <td class="bold">
                22.07.31
              </td>
              <td class="bold">
                itsouser
              </td>
              <td>
                010-2222-2222
              </td>
              <td>
                user@gmail.com
              </td>
              <td class="">
                서울시 성동구 왕십리로 …
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
    this.$parent.$parent.$refs.gnb.setGnbInfo(2);
  }
}
</script>
