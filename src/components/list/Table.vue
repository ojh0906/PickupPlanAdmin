<template>
  <div class="table-wrap">
    <table>
      <thead>
      <tr class="table-head">
        <th :width="h.width" v-for="h in this.header">
          {{ h.title }}
          <input type="checkbox" v-if="h.type === 'checkbox'" v-model="this.allCheck" @change="checkAll"/>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="td in this.list">
        <td :class="data.class" v-for="data in td">
          {{ data.t }}
          <router-link :to="{ name: link.href, query: {key:link.key } }" class="view-detail" v-if="data.type === 'button'" v-for=" link in data.param.link">
            {{ link.text }}
          </router-link>
          <input type="checkbox" v-if="data.type === 'checkbox'" v-model="data.param.check" @change="checkState"/>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['header', 'list'],
  setup() {
    return {
    }
  },
  data() {
    return {
      allCheck:false,
    }
  },
  methods: {
    checkAll(){
      this.list.forEach((tr, idx) => {
        tr.forEach((td, index) => {
          if(td.type === 'checkbox'){
            td.param.check = this.allCheck;
          }
        });
      });
    },
    checkState(){
      var result = true;
      this.list.forEach((tr, idx) => {
        tr.forEach((td, index) => {
          if(td.type === 'checkbox' && !td.param.check){
            result = false;
          }
        });
      });
      this.allCheck = result;
    }
  },
  components: {

  },
  created() {
  }
}
</script>