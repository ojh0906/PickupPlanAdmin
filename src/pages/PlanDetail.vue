<template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">플랜 정보</span>
      </div>
      <div class="contents-detail-container">
        <div class="info-container">
          <div class="thumb">
            <img src="/vite.svg">
          </div>
          <div class="info">
            <table>
              <tr>
                <td class="colored">
                  플랜 명
                </td>
                <td colspan="3">플랜 제목이 노출되는 영역</td>
              </tr>
              <tr>
                <td class="colored">
                    구분
                </td>
                <td>
                    파트너
                </td>
                <td class="colored">
                    강사목록
                </td>
                <td>

                </td>
              </tr>
              <tr>
                <td class="colored">
                  강의소요시간
                </td>
                <td>
                  100시간
                </td>
                <td class="colored">
                  상태
                </td>
                <td>
                  <select>
                    <option>승인</option>
                    <option>대기</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td class="colored">
                  좋아요
                </td>
                <td>
                  307 개
                </td>
                <td class="colored">
                  평점
                </td>
                <td>
                  4.0
                </td>
              </tr>
              <tr>
                <td colspan="4" class="colored">간단설명</td>
              </tr>
              <tr>
                <td class="info-text" colspan="4">
                  간단설명이 노출되는 영역입니다.
                </td>
              </tr>
            </table>
          </div>
        </div>
        <!--  해시태그  -->
        <div class="tag-wrap">
          <span>#해시 태그</span>
          <span>#해시 태그</span>
          <span>#해시 태그</span>
          <span>#해시 태그</span>
          <span>#해시 태그</span>
          <span>#해시 태그</span>
        </div>
        <div class="tab-wrap">
          <div class="tab ">
            구성정보
          </div>
          <div class="tab">
            파트너 소개
          </div>
          <div class="tab active">
            파트너 콘텐츠
          </div>
          <div class="tab ">
            파트너 플랜
          </div>
        </div>
        <div class="tab-content-container">
          <!--   구성정보    -->
          <div class="tab-content">
            콘텐츠 상세 소개 정보가 노출되는 영역 입니다. 콘텐츠 상세 소개 정보가 노출되는 영역 입니다. 콘텐츠 상세 소개 정보가 노출되는 영역 입니다. 콘텐츠 상세 소개 정보가 노출되는 영역 입니다. 콘텐츠 상세 소개 정보가 노출되는 영역 입니다. 콘텐츠 상세 소개 정보가 노출되는 영역 입니다. 콘텐츠 상세 소개 정보가 노출되는 영역 입니다. 콘텐츠 상세 소개 정보가 노출되는 영역 입니다. 콘텐츠 상세 소개 정보가 노출되는 영역 입니다. 콘텐츠 상세 소개 정보가 노출되는 영역 입니다. 콘텐츠 상세 소개 정보가 노출되는 영역 입니다. 콘텐츠 상세 소개 정보가 노출되는 영역 입니다.
          </div>
          <!--   파트너 소개    -->
          <div class="tab-content">
            콘텐츠 상세 소개 정보가 노출되는 영역 입니다. 콘텐츠 상세 소개 정보가 노출되는 영역 입니다. 콘텐츠 상세 소개 정보가 노출되는 영역 입니다. 콘텐츠 상세 소개 정보가 노출되는 영역 입니다. 콘텐츠 상세 소개 정보가 노출되는 영역 입니다. 콘텐츠 상세 소개 정보가 노출되는 영역 입니다. 콘텐츠 상세 소개 정보가 노출되는 영역 입니다. 콘텐츠 상세 소개 정보가 노출되는 영역 입니다. 콘텐츠 상세 소개 정보가 노출되는 영역 입니다. 콘텐츠 상세 소개 정보가 노출되는 영역 입니다. 콘텐츠 상세 소개 정보가 노출되는 영역 입니다. 콘텐츠 상세 소개 정보가 노출되는 영역 입니다.
          </div>
          <!--   파트너 콘텐츠  -->
          <div class="tab-content active">
            <div class="list-container">
              <div class="item">
                <div class="contents">
                  <span class="no">No.A5412</span>
                  <div class="thumb">
                    <img src="/vite.svg">
                  </div>
                  <div class="info">
                    <table>
                      <tr>
                        <td>콘텐츠 제목</td>
                        <td>콘텐츠 제목이 노출되는 영역입니다.</td>
                      </tr>
                      <tr>
                        <td>강사명</td>
                        <td>홍길동</td>
                      </tr>
                      <tr>
                        <td>강의소요 시간</td>
                        <td>4시간</td>
                      </tr>
                      <tr>
                        <td>간단 섬령</td>
                        <td>콘텐츠에 대한 간단한 설명이 노출 되는 영역 입니다.</td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div class="btn">
                  <span>자세히 보기</span>
                </div>
              </div>
            </div>
          </div>
          <!--   파트너 플랜  -->
          <div class="tab-content">
            <div class="list-container">
              <div class="item">
                <div class="contents">
                  <span class="no">No.A5412</span>
                  <div class="thumb">
                    <img src="/vite.svg">
                  </div>
                  <div class="info">
                    <table>
                      <tr>
                        <td>플랜 제목</td>
                        <td>플랜 제목이 노출되는 영역입니다.</td>
                      </tr>
                      <tr>
                        <td>파트너 명</td>
                        <td>홍길동</td>
                      </tr>
                      <tr>
                        <td>강의소요 시간</td>
                        <td>4시간</td>
                      </tr>
                      <tr>
                        <td>간단 섬령</td>
                        <td>플랜에 대한 간단한 설명이 노출 되는 영역 입니다.</td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div class="btn">
                  <span>자세히 보기</span>
                </div>
              </div>
            </div>
          </div>
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
    this.$parent.$parent.$refs.gnb.setGnbInfo(3);
  }
}
</script>
