import {defineStore} from "pinia";
import {http} from "@/_services";
import router from '@/_router';

const baseUrl = `/admin/faq`;

const header = [
  {title:'', width:'3%', type:'checkbox', val:false},
  {title:'작성일', width:'25%'},
  {title:'제목', width:'40%'},
  {title:'', width:'10%'},
  {title:'', width:'10%'},
];
const search_type_list = [
  { text: '제목', value: 'title'},
];
const page_block_list = [
  { text: '10개씩 보기', value: 10},
  { text: '5개씩 보기', value: 5},
];

export const useFaqStore = defineStore({
  id: "faq",
  state: () => ({
    header:header,
    search_type_list:search_type_list,
    page_block_list:page_block_list,
    page:1,
    page_block:page_block_list[0].value,
    num_block:10,
    endPage:999999,
    start_page:999999,
    end_page:999999,
    pagesList:[],
    faq_list: [],
    faq_list_total:0,
    faq: {},
  }),
  actions: {
    async getAll(params) {
      try {
        await http.post(`${baseUrl}/list`, params).then(resp => {
          this.faq_list = [];
          if (resp.data.code === 200) {
            this.faq_list = resp.data.body;
            this.faq_list_total = resp.data.total;
            //console.log("get member_list", resp.data)

            // 페이징 셋팅
            this.endPage = Math.ceil(this.faq_list_total / this.page_block)
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
            this.faq = resp.data.body;
          }
        });
      } catch (error) {
        console.log(error)
      }
    },
    // 저장
    async save(params) {
      return await http.post(`${baseUrl}/save`, params);
    },
    // 수정
    async modify(id, params) {
      return await http.put(`${baseUrl}/${id}`, params);
    },
    async removeAll(checkList) {
      return await http.post(`${baseUrl}/remove`, { faqList: checkList })
    },
    goToModify(key){
      router.push({name:'FaqWrite', query: {key:key }});
    },
  },
});
