import { defineStore } from "pinia";
import { ref } from "vue";

export const useRouteHistoryStore = defineStore("route_history", {
  state: () => ({
    history: ref([]),
  }),
  getters: {
    getLastHistoryPath (){
      return this.history.pop()
    } 
  },
  actions: {
    // getLastHistoryPath(){
    //   this.history.pop();
    // },
    async push(path) {
      this.history.push(path);
    },
  },
  persist: true,
});
