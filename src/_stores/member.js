import {defineStore} from "pinia";
import {http} from "@/_services";

const baseUrl = `/admin/member`;

export const useMemberStore = defineStore({
  id: "member",
  state: () => ({
    page:1,
    page_block:10,
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
        await http.post(`${baseUrl}/list`, params).then(resp => {
          this.member_list = [];
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
    // 회원 상태 변경
    async modifyType(id, type, cert) {
      return await http.put(`${baseUrl}/${id}/apply`, { type: type, cert: cert })
    },
    // 회원 삭제
    async remove(id) {
      return await http.delete(`${baseUrl}/${id}`);
    },
  },
});
