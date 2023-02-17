<template>
  <div class="board-filter-right-wrap">
    <select v-model="this.page_block">
      <option v-for="option in this.page_block_list" v-bind:value="option.value">{{option.text}}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: ['page_block_list'],
  setup() {
    return {
    }
  },
  data() {
    return {
      page_block:this.page_block_list[0].value
    }
  },
  watch:{
    page_block : {
      handler(newValue, oldValue) {
        this.$emit('getListAfterChangingPageBlock',this.page_block);
      },
    },
  },
  methods: {

  },
  components: {

  },
  created() {
  }
}
</script>