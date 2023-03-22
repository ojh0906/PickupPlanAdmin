import {defineStore} from "pinia";
import {http} from "@/_services";
import router from '@/_router';

const baseUrl = `/admin/contents`;

const header = [
  {title:'', width:'3%', type:'checkbox', val:false},
  {title:'상태', width:'8%'},
  {title:'아이디', width:'10%'},
  {title:'구분', width:'15%'},
  {title:'등록일', width:'15%'},
  {title:'콘텐츠 명', width:'35%'},
  {title:'', width:'20%'},
];
const header2 = [
  {title:'', width:'3%', type:'checkbox', val:false},
  {title:'아이디', width:'10%'},
  {title:'콘텐츠 명', width:'35%'},
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

export const useContentsStore = defineStore({
  id: "contents",
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
    contents_list: [],
    contents_list_total:0,
    contents: {},
    contents_modal_list: [],
  }),
  actions: {
    async getAll(params) {
      try {
        await http.post(`${baseUrl}/list`, params).then(resp => {
          this.contents_list = [];
          if (resp.data.code === 200) {
            this.contents_list = resp.data.body;
            this.contents_list_total = resp.data.total;

            // 페이징 셋팅
            this.endPage = Math.ceil(this.contents_list_total / this.page_block)
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
        await http.post(`${baseUrl}/list`, params).then(resp => {
          this.contents_modal_list = [];
          if (resp.data.code === 200) {
            this.contents_modal_list = resp.data.body;
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
            this.contents = resp.data.body;
            //this.contact.files = JSON.parse(this.contact.files)
            //this.getReply(id);
          }
        });
      } catch (error) {
        console.log(error)
      }
    },
    async removeAll(checkList) {
      return await http.post(`${baseUrl}/remove`, { contentsList: checkList })
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
      return await http.post(`${baseUrl}/column/all`, { confirm:confirm, contentsList: checkList })
    },
    async updateRecommendAll(recommend, checkList) {
      return await http.post(`${baseUrl}/column/all`, { recommend:recommend, contentsList: checkList })
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
