<template>
  <div class="board-filter-wrap">
    <div class="filter-container">
      <div class="filter-wrap" v-for="order in order_type_list">
        <p :class="this.orderType === order.value ? 'label active':'label'">
          <span class="filter-chk" @click="this.orderType = order.value"></span>
          {{ order.text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['order_type_list'],
  setup() {
    return {
    }
  },
  data() {
    return {
      orderType:this.order_type_list[0].value,
    }
  },
  watch:{
    orderType : {
      handler(newValue, oldValue) {
        this.getList();
      },
    },
  },
  methods: {
    getList(){
      this.$parent.$data.orderType = this.orderType;
      this.$parent.getList();
    },
  },
  components: {

  },
  created() {

  }
}
</script>