<template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">기획전 관리</span>
      </div>
      <div class="exhibition-detail-container">
        <p class="info-text"><strong>000</strong>기획전 정보</p>
        <div class="title-wrap">
          <div class="regdate">
            22.02.22
          </div>
          <div class="tile">
            기획전 제목이 노출되는 영역입니다.
          </div>
        </div>
        <div class="content-wrap">
            <img>
            <table>
              <tr>
                <td>모집 기간</td>
                <td>22.08.01 ~ 22.08.20</td>
              </tr>
              <tr>
                <td>모집 현황</td>
                <td>00명 / 00 명</td>
              </tr>
              <tr>
                <td>카테고리</td>
                <td>행사</td>
              </tr>
              <tr>
                <td>유료/무료</td>
                <td>무료</td>
              </tr>
              <tr>
                <td>첨부 파일</td>
                <td><a>이미지.png</a></td>
              </tr>
            </table>
            <p class="tag">#해시태그 #해시태그 #해시태그 #해시태그</p>
            <span class="submit">모집현황보기</span>
        </div>
      </div>
    </div>
  </div>

  <div class="modal-background"></div>
  <div class="exhibition-modal modal">
    <div class="modal-head">
      <p class="title"><strong>000</strong> 기획전 모집현황</p>
    </div>
    <table>
      <thead>
        <th width="10%">
          순번
        </th>
        <th width="20%">
          신청일
        </th>
        <th width="30%">
          아이디
        </th>
        <th width="10%">
        </th>
        <th width="10%">
        </th>
      </thead>
      <tbody>
        <tr>
          <td>
            1
          </td>
          <td>
            22.02.02
          </td>
          <td>
            아이디
          </td>
          <td>
            <span class="btn">상세보기</span>
          </td>
          <td>
            <span class="btn">삭제</span>
          </td>
        </tr>
        <tr>
          <td>
            1
          </td>
          <td>
            22.02.02
          </td>
          <td>
            아이디
          </td>
          <td>
            <span class="btn">상세보기</span>
          </td>
          <td>
            <span class="btn">삭제</span>
          </td>
        </tr>
      </tbody>
    </table>
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
    this.$parent.$parent.$refs.gnb.activeBtn("board");
  }
}
</script>
