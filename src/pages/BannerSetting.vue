<template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">배너 관리</span>
      </div>
      <div class="bannerSetting-container">
        <table>
          <tr>
              <td class="title">배너위치</td>
              <td>
                <select>
                  <option>메인</option>
                </select>
              </td>
              <td class="title">노출 순서</td>
              <td>
                <select>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </td>
          </tr>
          <tr>
            <td class="title">배너명</td>
            <td colspan="3">
              <input type="text" placeholder="배너명을 입력하세요." readonly />
            </td>
          </tr>
          <tr>
            <td class="title">URL</td>
            <td colspan="3"></td>
          </tr>
          <tr>
            <td class="title">이미지 등록</td>
            <td colspan="3"></td>
          </tr>
        </table>
      </div>
    </div>
  </div>

</template>
<script>
import Header from '/src/components/common/Header.vue';

export default {
  components: {
    Header,
  },
  data() {

  },
  watch:{

  },
  methods: {
  },
  created() {
    this.$parent.$parent.$refs.gnb.setGnbInfo(8);
  }
}
</script>
