<template>
  <div class="search-container">
    <select v-model="this.searchType">
      <option v-for="option in this.search_type_list" v-bind:value="option.value">{{option.text}}</option>
    </select>
    <input type="text" placeholder="검색어 입력" v-model="this.searchKeyword" @keypress.enter="onSubmit"/>
    <span class="search-icon" @click="onSubmit"><i class="fas fa-search"></i></span>
  </div>
</template>

<script>
export default {
  props: ['search_type_list'],
  setup() {
    return {
    }
  },
  data() {
    return {
      searchType:this.search_type_list[0].value,
      searchKeyword:'',
    }
  },
  methods: {
    onSubmit(){
      this.$emit('getListAfterSearching',this.searchType, this.searchKeyword);
    },
  },
  components: {

  },
  created() {

  }
}
</script>