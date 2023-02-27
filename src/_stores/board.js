import {defineStore} from "pinia";
import {http} from "@/_services";
import router from '@/_router';

const baseUrl = `/admin/board`;

const header = [
  {title:'', width:'3%', type:'checkbox', val:false},
  {title:'구분', width:'15%'},
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
const type_name_value_list = [
  { name: '공지사항', value: 1},
  { name: '플랜이슈', value: 2},
];
const category_name_value_list = [
  { name: 'category1', value: 1},
  { name: 'category2', value: 2},
];
const sub_category_name_value_list = [
  { name: 'sub_category1', value: 1},
  { name: 'sub_category2', value: 2},
];

export const useBoardStore = defineStore({
  id: "board",
  state: () => ({
    header:header,
    search_type_list:search_type_list,
    page_block_list:page_block_list,
    type_name_value_list:type_name_value_list,
    category_name_value_list:category_name_value_list,
    sub_category_name_value_list:sub_category_name_value_list,
    page:1,
    page_block:page_block_list[0].value,
    num_block:10,
    endPage:999999,
    start_page:999999,
    end_page:999999,
    pagesList:[],
    board_list: [],
    board_list_total:0,
    board: {},
    b_board: null,
    a_board: null,
  }),
  actions: {
    async getAll(params) {
      try {
        await http.post(`${baseUrl}/list`, params).then(resp => {
          this.board_list = [];
          if (resp.data.code === 200) {
            this.board_list = resp.data.body;
            this.board_list_total = resp.data.total;
            //console.log("get member_list", resp.data)

            // 페이징 셋팅
            this.endPage = Math.ceil(this.board_list_total / this.page_block)
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
            this.board = resp.data.body;
            this.board.files = JSON.parse(this.board.files)
            this.getBeforeAfterById(this.board.b_board, this.board.a_board);
          }
        });
      } catch (error) {
        console.log(error)
      }
    },
    async getBeforeAfterById(b_board, a_board) {
      try {
        if(b_board == null){
          this.b_board = null;
        } else {
          await http.get(`${baseUrl}/${b_board}`).then(resp => {
            if (resp.data.code === 200) {
              this.b_board = resp.data.body;
            }
          });
        }
        if(a_board == null){
          this.a_board = null;
        } else {
          await http.get(`${baseUrl}/${a_board}`).then(resp => {
            if (resp.data.code === 200) {
              this.a_board = resp.data.body;
            }
          });
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getTags(id) {
      try {
        await http.post(`${baseUrl}/${id}/tag/list`,{}).then(resp => {
          if (resp.data.code === 200) {
            this.board.tags = resp.data.body;
          }
        });
      } catch (error) {
        console.log(error)
      }
    },
    // 저장
    async save(params) {
      return await http.post(`${baseUrl}/save`, params, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
    },
    // 수정
    async modify(id, params) {
      return await http.put(`${baseUrl}/${id}`, params, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
    },
    async removeAll(checkList) {
      return await http.post(`${baseUrl}/remove`, { removeBoardList: checkList })
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
