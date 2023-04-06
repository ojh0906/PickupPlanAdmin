<template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">콘텐츠 정보</span>
      </div>
      <div class="contents-detail-container">
        <p class="text-right mb-2">콘텐츠 No : {{ this.contentsStore.contents.contents }}</p>
        <div class="info-container">
          <div class="thumb">
            <img :src="this.getFirstImagePath(this.contentsStore.contents.images)">
          </div>
          <div class="info">
            <table>
              <tr>
                <td class="colored">
                  콘텐츠 명
                </td>
                <td colspan="3">{{ this.contentsStore.contents.title }}</td>
              </tr>
              <tr>
                <td class="colored">
                    구분
                </td>
                <td>
                  {{ this.contentsStore.contents.category != null ? this.fieldStore.getFieldName(1,this.contentsStore.contents.category):'' }}
                </td>
                <td class="colored">
                    강사명
                </td>
                <td>
                  {{ this.contentsStore.contents.member_info != null ? this.contentsStore.contents.member_info.partner_info.name:'' }}
                </td>
              </tr>
              <tr>
                <td class="colored">
                  강의소요시간
                </td>
                <td>
                  {{ this.contentsStore.contents.hour }}
                </td>
                <td class="colored">
                  상태
                </td>
                <td>
                  {{ this.contentsStore.getConfirmName(this.contentsStore.contents.confirm) }}
                </td>
              </tr>
              <tr>
                <td class="colored">
                  좋아요
                </td>
                <td>
                  {{ this.contentsStore.contents.like_tot }} 개
                </td>
                <td class="colored">
                  강사 / 파트너
                </td>
                <td>
                  {{ this.contentsStore.contents.member_info != null && this.contentsStore.contents.member_info.type === 2 ? '강사':'파트너' }}
                </td>
              </tr>
              <tr>
                <td colspan="4" class="colored">간단설명</td>
              </tr>
              <tr>
                <td class="info-text" colspan="4">
                  {{ this.contentsStore.contents.explanation }}
                </td>
              </tr>
            </table>
          </div>
        </div>
        <!--  해시태그  -->
        <div class="tag-wrap">
          <span v-for="tag in this.contentsStore.contents.tags">#{{ tag.value }}</span>
        </div>
        <div class="preview-wrap">
          <!--    콘텐츠 소개 영상      -->
          <div class="video-wrap">
            <p>콘텐츠 소개 영상</p>
            <!-- video 태그 넣으시면 됩니다.  -->
            <img :src="this.getFirstImagePath(this.contentsStore.contents.thumb)">
          </div>
          <div class="img-wrap">
            <p>강의 미리 보기</p>
            <div class="img-scroll">
              <img :src="this.getImagePath(images.path)" v-for="images in this.contentsStore.contents.imagesArray">
            </div>
          </div>
        </div>
        <div class="tab-wrap">
          <div :class="['tab cursor-pointer', this.tab === 0 ? 'active':'']" @click="this.tab = 0;">
            상세정보
          </div>
          <div :class="['tab cursor-pointer', this.tab === 1 ? 'active':'']" @click="this.tab = 1;">
            강사 소개
          </div>
          <div :class="['tab cursor-pointer', this.tab === 2 ? 'active':'']" @click="this.tab = 2;">
            강사 콘텐츠
          </div>
        </div>
        <div class="tab-content-container">
          <!--   상세정보    -->
          <div class="tab-content active" v-if="this.tab === 0">
            <div v-html="this.showEnterContent(this.contentsStore.contents.content)">
            </div>
          </div>
          <!--   강사소개    -->
          <div class="tab-content active" v-if="this.tab === 1">
            {{ this.contentsStore.contents.member_info.partner_info.info }}
          </div>
          <!--   강사 콘텐츠  -->
          <div class="tab-content active" v-if="this.tab === 2">
            <div class="list-container">
              <div class="item" v-for="content in this.contentsStore.partner_contents_list">
                <div class="contents">
                  <span class="no">No.{{ content.contents }}</span>
                  <div class="thumb">
                    <img :src="this.getFirstImagePath(content.images)">
                  </div>
                  <div class="info">
                    <table>
                      <tr>
                        <td>콘텐츠 제목</td>
                        <td>{{ content.title }}</td>
                      </tr>
                      <tr>
                        <td>강사명</td>
                        <td>{{ content.member_info.partner_info.name }}</td>
                      </tr>
                      <tr>
                        <td>강의소요 시간</td>
                        <td>{{ content.hour }}시간</td>
                      </tr>
                      <tr>
                        <td>간단 설명</td>
                        <td>{{ content.explanation }}</td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div class="btn" @click="this.contentsStore.goToDetail(content.contents, {page:1,page_block:4,member:content.member_info.member})">
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
import { useContentsStore, useFieldStore } from '@/_stores';

export default {
  components: {
    Header,
  },
  setup(){
    const contentsStore = useContentsStore();
    const fieldStore = useFieldStore();
    return {
      contentsStore,
      fieldStore,
    }
  },
  data() {
    return {
      contents:0,
      tab:0,
    }
  },
  watch:{

  },
  methods: {
    getDetail(){
      this.contentsStore.getById(this.contents).then((resp) => {
        this.getPartnerContentsList(this.contentsStore.contents.member_info.member);
      }).catch(err => { console.log("err", err); });
    },
    getCategoryList(type) {
      this.fieldStore.listCategory({type: type}).then((resp) => {
        if(resp.data.code == 200){
          this.fieldStore.categoryList = resp.data.body;
          this.getDetail();
        }
      }).catch(err => { console.log("err", err); });
    },
    getPartnerContentsList(member) {
      let params = {
        page: 1,
        page_block: 4,
        member:member,
      }
      this.contentsStore.getPartnerContentsList(params).then((resp) => {
      }).catch(err => { console.log("err", err); });
    },
  },
  created() {
    this.$parent.$parent.$refs.gnb.activeBtn("contents");
    if(this.$route.query.key != null){
      this.contents = this.$route.query.key;
      this.getCategoryList(1);
    } else {
      alert('잘못된 접근입니다.');
    }
  }
}
</script>