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
            <img :src="this.getFirstImagePath(this.planStore.plan.thumb)">
          </div>
          <div class="info">
            <table>
              <tr>
                <td class="colored">
                  플랜 명
                </td>
                <td colspan="3">{{ this.planStore.plan.title }}</td>
              </tr>
              <tr>
                <td class="colored">
                    구분
                </td>
                <td>
                  {{ this.planStore.plan.category != null ? this.fieldStore.getFieldName(1,this.planStore.plan.category):'' }}
                </td>
                <td class="colored">
                    강사목록
                </td>
                <td>
                  <span class="more" @click="this.modalOpen = true;">목록보기</span>
                </td>
              </tr>
              <tr>
                <td class="colored">
                  강의소요시간
                </td>
                <td>
                  {{ this.planStore.plan.total_hour }}시간
                </td>
                <td class="colored">
                  상태
                </td>
                <td>
                  {{ this.planStore.getConfirmName(this.planStore.plan.confirm) }}
                </td>
              </tr>
              <tr>
                <td class="colored">
                  좋아요
                </td>
                <td>
                  {{ this.planStore.plan.like_tot }} 개
                </td>
                <td class="colored">
                  일반 / 파트너
                </td>
                <td>
                  {{ this.planStore.plan.member_info != null && this.planStore.plan.member_info.type === 1 ? '일반':'파트너' }}
                </td>
              </tr>
              <tr>
                <td colspan="4" class="colored">간단설명</td>
              </tr>
              <tr>
                <td class="info-text" colspan="4">
                  {{ this.planStore.plan.explanation }}
                </td>
              </tr>
            </table>
          </div>
        </div>
        <!--  해시태그  -->
        <div class="tag-wrap">
          <span v-for="tag in this.planStore.plan.tags">#{{ tag.value }}</span>
        </div>
        <div class="tab-wrap">
          <div :class="['tab cursor-pointer', this.tab === 0 ? 'active':'']" @click="this.tab = 0;">
            구성정보
          </div>
          <div :class="['tab cursor-pointer', this.tab === 1 ? 'active':'']" @click="this.tab = 1;">
            파트너 소개
          </div>
          <div :class="['tab cursor-pointer', this.tab === 2 ? 'active':'']" @click="this.tab = 2;">
            파트너 콘텐츠
          </div>
          <div :class="['tab cursor-pointer', this.tab === 3 ? 'active':'']" @click="this.tab = 3;">
            파트너 플랜
          </div>
        </div>
        <div class="tab-content-container">
          <!--   구성정보    -->
          <div class="tab-content active" v-if="this.tab === 0">
            {{ this.planStore.plan.content }}
          </div>
          <!--   파트너 소개    -->
          <div class="tab-content active" v-if="this.tab === 1">
            {{ this.planStore.plan.member_info != null && this.planStore.plan.member_info.type === 1 ? '':this.planStore.plan.member_info.partner_info.info }}
          </div>
          <!--   파트너 콘텐츠  -->
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
          <!--   파트너 플랜  -->
          <div class="tab-content active" v-if="this.tab === 3">
            <div class="list-container">
              <div class="item" v-for="plan in this.planStore.partner_plan_list">
                <div class="contents">
                  <span class="no">No.{{ plan.plan }}</span>
                  <div class="thumb">
                    <img :src="this.getFirstImagePath(plan.thumb)">
                  </div>
                  <div class="info">
                    <table>
                      <tr>
                        <td>플랜 제목</td>
                        <td>{{ plan.title }}</td>
                      </tr>
                      <tr>
                        <td>파트너 명</td>
                        <td>{{ this.planStore.plan.member_info != null && this.planStore.plan.member_info.type === 1 ? this.planStore.plan.member_info.name:this.planStore.plan.member_info.partner_info.name }}</td>
                      </tr>
                      <tr>
                        <td>강의소요 시간</td>
                        <td>{{ plan.total_hour }}시간</td>
                      </tr>
                      <tr>
                        <td>간단 설명</td>
                        <td>{{ plan.explanation }}</td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div class="btn" @click="this.planStore.goToDetail(plan.plan, {page:1,page_block:4,member:plan.member_info.member})">
                  <span>자세히 보기</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-background" v-if="this.modalOpen" @click="this.modalOpen = false;"></div>
  <div class="modal tutor-modal" v-if="this.modalOpen">
    <div class="modal-head">
      <p class="title">강사 목록</p>
    </div>
    <table>
      <thead>
        <th width="20%">순번</th>
        <th width="80%">강사명</th>
      </thead>
      <tbody>
        <tr v-for="(member, index) in this.memberList">
          <td>{{ index + 1 }}</td>
          <td>{{ member.partner_info.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Header from '/src/components/common/Header.vue';
import { usePlanStore, useContentsStore, useFieldStore } from '@/_stores';

export default {
  components: {
    Header,
  },
  setup(){
    const planStore = usePlanStore();
    const contentsStore = useContentsStore();
    const fieldStore = useFieldStore();
    return {
      planStore,
      contentsStore,
      fieldStore,
    }
  },
  data() {
    return {
      plan:0,
      tab:0,
      modalOpen:false,
      memberList:[],
    }
  },
  watch:{

  },
  methods: {
    getDetail(){
      this.planStore.getById(this.plan).then((resp) => {
        this.getPartnerContentsList(this.planStore.plan.member_info.member);
        this.getPartnerPlanList(this.planStore.plan.member_info.member);
        this.getPartnerList();
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
    getPartnerPlanList(member) {
      let params = {
        page: 1,
        page_block: 4,
        member:member,
      }
      this.planStore.getPartnerPlanList(params).then((resp) => {
      }).catch(err => { console.log("err", err); });
    },
    getPartnerList(){
      this.planStore.plan.plan_contents.forEach((plan_contents,i)=>{
        let filterList = this.memberList.filter(m => m.member === plan_contents.contents_info.member);
        if(filterList.length === 0){
          this.memberList.push(plan_contents.contents_info.member_info);
        }
      });
    },
  },
  created() {
    this.$parent.$parent.$refs.gnb.activeBtn("plan");
    if(this.$route.query.key != null){
      this.plan = this.$route.query.key;
      this.getCategoryList(1);
    } else {
      alert('잘못된 접근입니다.');
    }
  }
}
</script>
