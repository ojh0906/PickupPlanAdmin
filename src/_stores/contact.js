import {defineStore} from "pinia";
import {http} from "@/_services";
import router from '@/_router';

const baseUrl = `/admin/contact`;

const header = [
  {title:'', width:'3%', type:'checkbox', val:false},
  {title:'구분', width:'15%'},
  {title:'작성일', width:'25%'},
  {title:'제목', width:'40%'},
  {title:'', width:'20%'},
];
const search_type_list = [
  { text: '제목', value: 'title'},
];
const page_block_list = [
  { text: '10개씩 보기', value: 10},
  { text: '5개씩 보기', value: 5},
];
const type_name_value_list = [
  { name: '콘텐츠문의', value: 1},
  { name: '플랜문의', value: 2},
  { name: '지원센터문의', value: 3},
  { name: '플랜의뢰하기', value: 4},
];

export const useContactStore = defineStore({
  id: "contact",
  state: () => ({
    header:header,
    search_type_list:search_type_list,
    page_block_list:page_block_list,
    type_name_value_list:type_name_value_list,
    page:1,
    page_block:page_block_list[0].value,
    num_block:10,
    endPage:999999,
    start_page:999999,
    end_page:999999,
    pagesList:[],
    contact_list: [],
    contact_list_total:0,
    contact: {},
  }),
  actions: {
    async getAll(params) {
      try {
        this.contact_list = [];
        await http.post(`${baseUrl}/list`, params).then(resp => {
          if (resp.data.code === 200) {
            this.contact_list = resp.data.body;
            this.contact_list_total = resp.data.total;
            //console.log("get member_list", resp.data)

            // 페이징 셋팅
            this.endPage = Math.ceil(this.contact_list_total / this.page_block)
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
            this.contact = resp.data.body;
            this.contact.files = JSON.parse(this.contact.files)
            this.getReply(id);
          }
        });
      } catch (error) {
        console.log(error)
      }
    },
    async removeAll(checkList) {
      return await http.post(`${baseUrl}/remove`, { contactList: checkList })
    },
    async getReply(id) {
      try {
        await http.post(`${baseUrl}/${id}/reply/list`,{}).then(resp => {
          if (resp.data.code === 200) {
            this.contact.replyList = resp.data.body;
          }
        });
      } catch (error) {
        console.log(error)
      }
    },
    // 저장
    async saveRply(id, member, reply) {
      let params = {
        member:member,
        reply:reply
      }
      return await http.post(`${baseUrl}/${id}/reply/save`, params)
    },
    goToBoardModify(key){
      router.push({name:'BoardWrite', query: {key:key }});
    },
    goToBoardDetail(key){
      router.push({name:'BoardDetail', query: {key:key }});
      this.getById(key);
    }
  },
});
