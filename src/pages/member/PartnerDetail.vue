<template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit"><span class="b">{{ this.memberStore.member.name }}</span> 회원 정보</span>
      </div>

      <!--   회원 정보   -->
      <div class="partner-detail-container">
        <div class="title-wrap">
          이름
        </div>
        <div class="val-wrap">
          {{ this.memberStore.member.name }}
        </div>
        <div class="title-wrap">
          이메일
        </div>
        <div class="val-wrap">
          {{ this.memberStore.member.email }}
        </div>
        <div class="title-wrap">
          아이디
        </div>
        <div class="val-wrap">
          {{ this.memberStore.member.id }}
        </div>
        <div class="title-wrap">
          휴대전화
        </div>
        <div class="val-wrap">
          {{ this.memberStore.member.phone }}
        </div>
      </div>

      <div v-if="this.memberStore.member.partner_info != null">
        <div class="top-container">
          <span class="tit"><span class="b">{{ this.memberStore.member.partner_info.name }}</span> 파트너 정보</span>
        </div>

        <!--   파트너 정보   -->
        <div class="partner-detail-container">
          <div class="title-wrap">
            아이디
          </div>
          <div class="val-wrap">
            {{ this.memberStore.member.id }}
          </div>
          <div class="title-wrap">
            회사 주소<br>(사업장 소재지)
          </div>
          <div class="val-wrap">
            {{ this.memberStore.member.partner_info.address }} {{ this.memberStore.member.partner_info.address_detail }}
          </div>
          <div class="title-wrap">
            이메일
          </div>
          <div class="val-wrap">
            {{ this.memberStore.member.partner_info.email }}
          </div>
          <div class="title-wrap">
            {{ this.memberStore.member.partner_info.state === 1 || this.memberStore.member.type === 2 ? '담당자명' : '강사명' }}
          </div>
          <div class="val-wrap">
            {{ this.memberStore.member.partner_info.name }}
          </div>
          <div class="title-wrap">
            회사명
          </div>
          <div class="val-wrap">
            {{ this.memberStore.member.partner_info.company_name }}
          </div>
          <div class="title-wrap">
            연락처
          </div>
          <div class="val-wrap">
            {{ this.memberStore.member.partner_info.phone }}
          </div>
          <div class="title-wrap">
            상태
          </div>
          <div class="val-wrap">
            {{ this.getNameFromValue(this.memberStore.member.partner_info.state, this.memberStore.state_name_value_list) }}
          </div>
          <div class="title-wrap">
            이메일
          </div>
          <div class="val-wrap">
            {{ this.memberStore.member.partner_info.email }}
          </div>
          <div class="title-wrap">
            {{ this.memberStore.member.partner_info.state === 1 || this.memberStore.member.type === 2 ? '이력서' : '사업자등록증' }}
          </div>
          <div class="val-wrap">
            <p class="cursor-pointer" @click="getFileDown(this.memberStore.member.partner_info.resume_file)"
               v-if="this.memberStore.member.partner_info.state === 1 || this.memberStore.member.type === 2">
              {{ this.getFirstImageName(this.memberStore.member.partner_info.resume_file) }}
            </p>
            <p class="cursor-pointer" @click="getFileDown(this.memberStore.member.partner_info.company_file)"
               v-else>
              {{ this.getFirstImageName(this.memberStore.member.partner_info.company_file) }}
            </p>
          </div>
          <div class="title-wrap">
            {{ this.memberStore.member.partner_info.state === 1 || this.memberStore.member.type === 2 ? '프로필' : '회사소개서' }}
          </div>
          <div class="val-wrap">
            <p class="cursor-pointer" @click="getFileDown(this.memberStore.member.partner_info.profile_file)"
               v-if="this.memberStore.member.partner_info.state === 1 || this.memberStore.member.type === 2">
              {{ this.getFirstImageName(this.memberStore.member.partner_info.profile_file) }}
            </p>
            <p class="cursor-pointer" @click="getFileDown(this.memberStore.member.partner_info.company_info)"
               v-else>
              {{ this.getFirstImageName(this.memberStore.member.partner_info.company_info) }}
            </p>
          </div>
          <div class="info-title">
            소개
          </div>
          <div class="info-val">
            {{ this.memberStore.member.partner_info.info }}
          </div>
        </div>
        <!--   콘텐츠 목록   -->
<!--        <div class="board-container">
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
          </div>
          <div class="table-wrap">
            <table>
              <thead>
              <tr class="table-head">
                <th width="3%"></th>
                <th width="5%">상태</th>
                <th width="15%" class="cursor-pointer">대분류 <i class="fas fa-caret-down"></i></th>
                <th width="15%" class="cursor-pointer">소분류 <i class="fas fa-caret-down"></i></th>
                <th width="15%">등록일</th>
                <th width="15%">콘텐츠 명</th>
                <th width="20%"></th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  대기중
                </td>
                <td>
                  카테고리명
                </td>
                <td class="bold">
                  카테고리명
                </td>
                <td class="bold">
                  00.00.00
                </td>
                <td>
                  콘텐츠 제목이 노출 되는 영역 입니다
                </td>
                <td>
                  <router-link :to="{ name: 'ContentsDetail', query: {} }" class="view-detail" >상세보기</router-link>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>-->
      </div>
    </div>
  </div>
</template>
<script>
import Header from '/src/components/common/Header.vue';
import {useMemberStore} from '@/_stores';

export default {
  components: {
    Header,
  },
  setup(){
    const memberStore = useMemberStore();
    return {
      memberStore,
    }
  },
  data() {
    return {
      member:0,
    }
  },
  watch:{

  },
  methods: {
    getDetail(){
      this.memberStore.getById(this.member).then((resp) => {
      }).catch(err => { console.log("err", err); });
    },
    getFileDown(file){
      location.href = this.getFileDownPath(JSON.parse(file)[0]);
    },
  },
  created() {
    this.$parent.$parent.$refs.gnb.activeBtn('member');
    if(this.$route.query.key != null){
      this.member = this.$route.query.key;
      this.getDetail();
    } else {
      alert('잘못된 접근입니다.');
    }
  }
}
</script>
