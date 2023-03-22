import {defineStore} from "pinia";
import {http} from "@/_services";

const baseUrl = `/admin/member`;

const header = [
  {title:'', width:'3%', type:'checkbox', val:false},
  {title:'구분', width:'5%'},
  {title:'상태', width:'5%'},
  {title:'가입일', width:'10%'},
  {title:'아이디', width:'15%'},
  {title:'연락처', width:'15%'},
  {title:'이메일', width:'15%'},
  {title:'', width:'20%'},
];
const search_type_list = [
  { text: '아이디', value: 'id'},
  { text: '이메일', value: 'email'},
];
const page_block_list = [
  { text: '10개씩 보기', value: 10},
  { text: '5개씩 보기', value: 5},
];
const type_name_value_list = [
  { name: '일반', value: 1},
  { name: '강사', value: 2},
  { name: '파트너', value: 3},
];
const state_name_value_list = [
  { name: '강사 신청', value: 1},
  { name: '파트너 신청', value: 2},
  { name: '완료', value: 3},
  { name: '거절', value: 4},
];

export const useMemberStore = defineStore({
  id: "member",
  state: () => ({
    header:header,
    search_type_list:search_type_list,
    page_block_list:page_block_list,
    type_name_value_list:type_name_value_list,
    state_name_value_list:state_name_value_list,
    page:1,
    page_block:page_block_list[0].value,
    num_block:10,
    endPage:999999,
    start_page:999999,
    end_page:999999,
    pagesList:[],
    member_list: [],
    member_list_total:0,
    member: {},
    partner: {},
  }),
  actions: {
    async getAll(params) {
      try {
        this.member_list = [];
        await http.post(`${baseUrl}/list`, params).then(resp => {
          if (resp.data.code === 200) {
            this.member_list = resp.data.body;
            this.member_list_total = resp.data.total;
            //console.log("get member_list", resp.data)

            // 페이징 셋팅
            this.endPage = Math.ceil(this.member_list_total / this.page_block)
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
    async getById(id) {
      try {
        await http.get(`${baseUrl}/${id}`).then(resp => {
          if (resp.data.code === 200) {
            this.member = resp.data.body;
          }
        });
      } catch (error) {
        console.log(error)
      }
    },
    async removeAll(checkList) {
      return await http.post(`${baseUrl}/remove`, { memberList: checkList })
    },
    async updateStateAll(state, checkList) {
      return await http.post(`${baseUrl}/state`, { state:state, memberList: checkList })
    },
  },
});
