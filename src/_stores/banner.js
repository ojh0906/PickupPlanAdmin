import {defineStore} from "pinia";
import {http} from "@/_services";

const baseUrl = `/admin/banner`;

const header = [
  {title:'', width:'3%', type:'checkbox', val:false},
  {title:'타입', width:'15%'},
  {title:'노출순서', width:'25%'},
  {title:'배너명', width:'40%'},
  {title:'', width:'20%'},
];
const search_type_list = [
  { text: '배너명', value: 'name'},
];
const page_block_list = [
  { text: '10개씩 보기', value: 10},
  { text: '5개씩 보기', value: 5},
];
const type_name_value_list = [
  { name: '메인', value: 1},
];

export const useBannerStore = defineStore({
  id: "banner",
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
    banner_list: [],
    banner_list_total:0,
    banner: {},
  }),
  actions: {
    async getAll(params) {
      try {
        await http.post(`${baseUrl}/list`, params).then(resp => {
          this.banner_list = [];
          if (resp.data.code === 200) {
            this.banner_list = resp.data.body;
            this.banner_list_total = resp.data.total;
            //console.log("get member_list", resp.data)

            // 페이징 셋팅
            this.endPage = Math.ceil(this.banner_list_total / this.page_block)
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
            this.banner = resp.data.body;
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
      return await http.post(`${baseUrl}/remove`, { removeBannerList: checkList })
    },
  },
});
