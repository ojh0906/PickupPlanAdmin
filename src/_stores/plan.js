import {defineStore} from "pinia";
import {http} from "@/_services";
import router from '@/_router';

const baseUrl = `/admin/plan`;

const header = [
  {title:'', width:'3%', type:'checkbox', val:false},
  {title:'상태', width:'8%'},
  {title:'일반/파트너', width:'8%'},
  {title:'아이디', width:'10%'},
  {title:'구분', width:'15%'},
  {title:'등록일', width:'15%'},
  {title:'플랜명', width:'30%'},
  {title:'콘텐츠', width:'10%'},
  {title:'', width:'20%'},
];
const header2 = [
  {title:'', width:'3%', type:'checkbox', val:false},
  {title:'구분', width:'15%'},
  {title:'아이디', width:'10%'},
  {title:'플랜명', width:'35%'},
  {title:'', width:'20%'},
];
const search_type_list = [
  { text: '제목', value: 'title'},
  { text: '아이디', value: 'id'},
];
const page_block_list = [
  { text: '10개씩 보기', value: 10},
  { text: '5개씩 보기', value: 5},
];

export const usePlanStore = defineStore({
  id: "plan",
  state: () => ({
    header:header,
    header2:header2,
    search_type_list:search_type_list,
    page_block_list:page_block_list,
    page:1,
    page_block:page_block_list[0].value,
    num_block:10,
    endPage:999999,
    start_page:999999,
    end_page:999999,
    pagesList:[],
    plan_list: [],
    plan_list_total:0,
    plan: {},
    plan_modal_list: [],
    partner_plan_list: [],
  }),
  actions: {
    async getAll(params) {
      try {
        this.plan_list = [];
        await http.post(`${baseUrl}/list`, params).then(resp => {
          if (resp.data.code === 200) {
            this.plan_list = resp.data.body;
            this.plan_list_total = resp.data.total;

            // 페이징 셋팅
            this.endPage = Math.ceil(this.plan_list_total / this.page_block)
            this.pagesList = [];

            this.start_page = (Math.ceil(this.page / this.num_block) - 1) * this.num_block + 1;
            this.end_page = this.start_page + this.num_block;
            if(this.end_page > this.endPage){
              this.end_page = this.endPage + 1;
            }

            for (let i = this.start_page; i < this.end_page; i++) {
              this.pagesList.push(i)
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getModalAll(params) {
      try {
        this.plan_modal_list = [];
        await http.post(`${baseUrl}/list`, params).then(resp => {
          if (resp.data.code === 200) {
            this.plan_modal_list = resp.data.body;
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getPartnerPlanList(params) {
      try {
        this.partner_plan_list = [];
        await http.post(`${baseUrl}/list`, params).then(resp => {
          if (resp.data.code === 200) {
            this.partner_plan_list = resp.data.body;
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getById(id) {
      try {
        await http.get(`${baseUrl}/${id}`).then(resp => {
          console.log(resp)
          if (resp.data.code === 200) {
            this.plan = resp.data.body;
            //this.contact.files = JSON.parse(this.contact.files)
            //this.getReply(id);
          }
        });
      } catch (error) {
        console.log(error)
      }
    },
    async removeAll(checkList) {
      return await http.post(`${baseUrl}/remove`, { planList: checkList })
    },
    /*async getReply(id) {
      try {
        await http.post(`${baseUrl}/${id}/reply/list`,{}).then(resp => {
          if (resp.data.code === 200) {
            this.contact.replyList = resp.data.body;
          }
        });
      } catch (error) {
        console.log(error)
      }
    },*/
    getConfirmName(confirm){
      var result = 'error';

      if(confirm == 1){
        result = '승인요청전';
      } else if(confirm == 2){
        result = '승인대기';
      } else if(confirm == 3){
        result = '완료';
      }
      return result;
    },
    async updateConfirmAll(confirm, checkList) {
      return await http.post(`${baseUrl}/column/all`, { confirm:confirm, planList: checkList })
    },
    async updateRecommendAll(recommend, checkList) {
      return await http.post(`${baseUrl}/column/all`, { recommend:recommend, planList: checkList })
    },
    goToDetail(key, params){
      router.push({name:'PlanDetail', query: {key:key }});
      this.getById(key);
      this.getPartnerPlanList(params);
    },
  },
});
