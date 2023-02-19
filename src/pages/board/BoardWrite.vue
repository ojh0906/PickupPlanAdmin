<template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">게시판 관리</span>
      </div>
      <div class="write-container">
        <div class="category-wrap">
          <select>
            <option>공지사항</option>
          </select>
          <select>
            <option>카테고리</option>
          </select>
          <select>
            <option>하위 카테고리</option>
          </select>
        </div>
        <div class="input-wrap-full">
          <input type="text" placeholder="제목을 입력해주세요." />
        </div>
        <div class="input-wrap-full">
          <textarea></textarea>
        </div>
        <div class="input-wrap">
          <div class="label">
            첨부파일
          </div>
          <div class="input">
            <input type="file" />
            <input type="file" />
          </div>
        </div>
        <div class="input-wrap">
          <div class="label">
            해시태그
          </div>
          <div class="input">
            <input type="text" placeholder="해시태그를 입력해주세요. 여러 개의 해시태그 입력 시 , 를 입력하면 됩니다." />
          </div>
        </div>
        <div class="submit-wrap">
          <span>완료</span>
          <span>취소</span>
        </div>
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
    this.$parent.$parent.$refs.gnb.activeBtn("board");
  }
}
</script>
