import { defineStore } from "pinia";
import { useAuthStore } from "@/_stores";
import { http } from "@/_services";

const baseUrl = `/field`;

export const useFieldStore = defineStore({
  id: "field",
  state: () => ({
    category_list: [],
    area_list: [],
    form_list: [],
    target_list: [],
  }),
  actions: {
    initList(){
      this.category_list = [];
    },
    async listCategory(option = { type:null, category_field: null },) {
      let params = {
        ...option,
      };
      return await http.post(`${baseUrl}/list`, params);
    },
    getFieldName(type, field){
      var result = 'error';

      if(field === 0){
      } else {
        switch (type){
          case 1 : this.categoryList.forEach((f, i) =>{
            if(f.field == field){
              result = f.name;
            }
          }); break;
        }
      }
      return result;
    }
  },
  persist: true,
});
