import { defineStore } from 'pinia';
import { http } from '@/_services';
import router from '@/_router';

const baseUrl = `/admin/project`;

const header = [
  {title:'', width:'3%', type:'checkbox', val:false},
  {title:'작성일', width:'15%'},
  {title:'제목', width:'30%'},
  {title:'모집현황', width:'20%'},
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
const day_list = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const category_name_value_list = [
  { name: 'category1', value: '1'},
  { name: 'category2', value: '2'},
  { name: 'category3', value: '3'},
  { name: 'category4', value: '4'},
];
const header_apply = [
  {title:'순번', width:'10%'},
  {title:'신청일', width:'20%'},
  {title:'아이디', width:'30%'},
  {title:'', width:'20%'},
];

export const useProjectStore = defineStore({
  id: "project",
  state: () => ({
    header:header,
    search_type_list:search_type_list,
    page_block_list:page_block_list,
    day_list:day_list,
    category_name_value_list:category_name_value_list,
    header_apply:header_apply,
    page:1,
    page_block:page_block_list[0].value,
    num_block:10,
    endPage:999999,
    start_page:999999,
    end_page:999999,
    pagesList:[],
    project_list: [],
    project_list_total:0,
    project: {},
    project_apply_list: [],
  }),
  actions: {
    async getAll(params) {
      try {
        await http.post(`${baseUrl}/list`, params).then(resp => {
          //console.log("list :::::::::::: ",resp);
          this.project_list = [];
          if (resp.data.code === 200) {
            this.project_list = resp.data.body;
            this.project_list_total = resp.data.total;

            // 페이징 셋팅
            this.endPage = Math.ceil(this.project_list_total / this.page_block)
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
            this.getTags(id);
            this.project = resp.data.body;
            this.project.filesJson = JSON.parse(this.project.files);
          }
        });
      } catch (error) {
        console.log(error)
      }
    },
    async getTags(id) {
      try {
        await http.post(`${baseUrl}/${id}/tag/list`,{}).then(resp => {
          if (resp.data.code === 200) {
            this.project.tags = resp.data.body;
          }
        });
      } catch (error) {
        console.log(error)
      }
    },
    async getApply(id) {
      try {
        await http.post(`${baseUrl}/${id}/apply/list`,{}).then(resp => {
          if (resp.data.code === 200) {
            this.project.applyList = resp.data.body;
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
    // 삭제
    async removeApply(id) {
      return await http.delete(`${baseUrl}/apply/${id}`)
    },
    // 삭제
    async removeAll(checkList) {
      return await http.post(`${baseUrl}/remove`, { removeProjectList: checkList })
    },
    goToMemberDetail(key){
      router.push({name:'MemberDetail', query: {key:key }});
    },
    goToProjectModify(key){
      router.push({name:'ExhibitionWrite', query: {key:key }});
    }
  },
});
