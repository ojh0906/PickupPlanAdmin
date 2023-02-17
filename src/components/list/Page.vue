<template>
  <div class="paging-wrap">
    <a @click="this.onChangePage(1);"
       v-if="this.storeInfo.start_page !== 1">
      <i class="fas fa-angle-double-left"></i>
    </a>
    <a @click="this.onChangePage(this.storeInfo.start_page - 1);"
       v-if="this.storeInfo.start_page !== 1">
      <i class="fas fa-angle-left"></i>
    </a>
    <a :class="this.storeInfo.page == page ? 'active':''" v-for="page in storeInfo.pagesList"
       @click="onChangePage(page)">
      {{ page }}
    </a>
    <a @click="this.onChangePage(this.storeInfo.start_page + this.storeInfo.num_block);"
       v-if="this.storeInfo.end_page !== this.storeInfo.endPage + 1">
      <i class="fas fa-angle-right"></i>
    </a>
    <a @click="this.onChangePage(this.storeInfo.endPage);"
       v-if="this.storeInfo.end_page !== this.storeInfo.endPage + 1">
      <i class="fas fa-angle-double-right"></i>
    </a>
  </div>
</template>

<script>
export default {
  props: ['storeInfo'],
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
      if(this.storeInfo.page == page) return;
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