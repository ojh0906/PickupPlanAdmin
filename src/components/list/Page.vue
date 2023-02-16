<template>
  <div class="paging-wrap">
    <a @click="this.onChangePage(1);"
       v-if="this.start_page !== 1">
      <i class="fas fa-angle-double-left"></i>
    </a>
    <a @click="this.onChangePage(this.start_page - 1);"
       v-if="this.start_page !== 1">
      <i class="fas fa-angle-left"></i>
    </a>
    <a :class="this.page == page ? 'active':''" v-for="page in pagesList"
       @click="onChangePage(page)">
      {{ page }}
    </a>
    <a @click="this.onChangePage(this.start_page + this.num_block);"
       v-if="this.end_page !== this.endPage + 1">
      <i class="fas fa-angle-right"></i>
    </a>
    <a @click="this.onChangePage(this.endPage);"
       v-if="this.end_page !== this.endPage + 1">
      <i class="fas fa-angle-double-right"></i>
    </a>
  </div>
</template>

<script>
export default {
  props: ['totalCnt','page','page_block','num_block','endPage','start_page','end_page','pagesList'],
  setup() {
    return {
    }
  },
  data() {
    return {
    }
  },
  methods: {
    onChangePage(page){
      if(this.page == page) return;
      this.$emit('getListOtherPage',page);
    },
  },
  components: {

  },
  created() {
    //this.setPageList();
  }
}
</script>