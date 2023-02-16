<template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">플랜 관리</span>
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
            <div class="filter-wrap">
              <router-link :to="{ name: 'PlanRecommend', query: {} }" class="button" >추천설정</router-link>
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
              <th width="8%" class="cursor-pointer">상태 <i class="fas fa-caret-down"></i></th>
              <th width="10%">아이디</th>
              <th width="15%" class="cursor-pointer">대분류 <i class="fas fa-caret-down"></i></th>
              <th width="15%" class="cursor-pointer">소분류 <i class="fas fa-caret-down"></i></th>
              <th width="15%">등록일</th>
              <th width="20%">플랜명</th>
              <th width="8%">콘텐츠</th>
              <th width="20%"></th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                대기 중
              </td>
              <td class="">
                Patner001
              </td>
              <td class="">
                카테고리명
              </td>
              <td>
                카테고리명
              </td>
              <td>
                22.07.31
              </td>
              <td class="">
                플랜 제목이 노출 되는 영역 …
              </td>
              <td class="">
                00개
              </td>
              <td>
                <router-link :to="{ name: 'PlanDetail', query: {} }" class="view-detail" >상세보기</router-link>
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
    this.$parent.$parent.$refs.gnb.activeBtn("plan");
  }
}
</script>
