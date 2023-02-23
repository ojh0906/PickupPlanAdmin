<template>
  <div class="table-wrap">
    <table>
      <thead>
      <tr class="table-head">
        <th :width="h.width" v-for="h in this.header">
          {{ h.title }}
          <input type="checkbox" v-if="h.type === 'checkbox'" v-model="h.val" @change="checkAll"/>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="td in this.list">
        <td :class="data.class" v-for="data in td">
          {{ data.t }}
          <router-link :to="{ name: link.href, query: {key:link.key } }" class="view-detail" v-if="data.type === 'link'" v-for=" link in data.param.link">
            {{ link.text }}
          </router-link>
          <input type="checkbox" v-if="data.type === 'checkbox'" v-model="data.param.check" @change="checkState"/>
          <span class="btn view-detail" v-if="data.type === 'button'" v-for=" func in data.param.func" @click="func.value(func.key)">{{func.text}}</span>
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
      var allCheck = false;
      this.header.forEach((h, idx) => {
        if(h.type === 'checkbox'){
          allCheck = h.val;
        }
      });

      this.list.forEach((tr, idx) => {
        tr.forEach((td, index) => {
          if(td.type === 'checkbox'){
            td.param.check = allCheck;
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

      this.header.forEach((h, idx) => {
        if(h.type === 'checkbox'){
          h.val = result;
        }
      });
    }
  },
  components: {

  },
  created() {
  }
}
</script>