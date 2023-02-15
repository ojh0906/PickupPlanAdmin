<template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">콘텐츠 추천 설정</span>
      </div>
      <!--  카테고리  -->
      <div class="contents-category-list">
        <span class="active">카테고리명</span>
        <span>카테고리명</span>
        <span>카테고리명</span>
        <span>카테고리명</span>
        <span>카테고리명</span>
        <span>카테고리명</span>
        <span>카테고리명</span>
        <span>카테고리명</span>
        <span>카테고리명</span>
        <span>카테고리명</span>
        <span>카테고리명</span>
        <span>카테고리명</span>
      </div>
      <!--   목록   -->
      <div class="board-container mb-10">
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
          <span class="edit-btn">등록 하기</span>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
            <tr class="table-head">
              <th width="3%"></th>
              <th width="10%">순서</th>
              <th width="50%">콘텐츠 제목</th>
              <th width="15%">강사명</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                1
              </td>
              <td class="">
                콘텐츠 제목이 노출 되는 영역 …
              </td>
              <td>
                강사명
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

  <div class="modal-background"></div>
  <div class="contents-modal modal">
    <div class="modal-head">
      <p class="title">등록</p>
    </div>
    <div class="search-wrap">
      <input type="text" placeholder="강좌 검색" />
      <span><i class="fas fa-search"></i></span>
    </div>
    <div class="list-container">
      <div class="item">
        <div class="contents">
          <div class="thumb">
            <img src="/vite.svg">
          </div>
          <div class="info">
            <table>
                <tr>
                  <td colspan="2">콘텐츠 제목</td>
                </tr>
                <tr>
                  <td>작성자 ID</td>
                  <td>No. 1234</td>
                </tr>
                <tr>
                  <td>강의 시간</td>
                  <td><i class="fas fa-heart"></i>222</td>
                </tr>
            </table>
          </div>
        </div>
        <div class="btn">
          <span>등록</span>
        </div>
      </div>
      <div class="item">
        <div class="contents">
          <div class="thumb">
            <img src="/vite.svg">
          </div>
          <div class="info">
            <table>
              <tr>
                <td colspan="2">콘텐츠 제목</td>
              </tr>
              <tr>
                <td>작성자 ID</td>
                <td>No. 1234</td>
              </tr>
              <tr>
                <td>강의 시간</td>
                <td><i class="fas fa-heart"></i>222</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="btn">
          <span>등록</span>
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
    return {
      modalYn:false,
    }
  },
  watch:{

  },
  methods: {
  },
  created() {
    this.$parent.$parent.$refs.gnb.setGnbInfo(3);
  }
}
</script>
