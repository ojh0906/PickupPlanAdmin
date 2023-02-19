<template>
  <div id="content-container">
    <Header />
    <div class="main-container">
      <div class="top-container">
        <span class="tit">기획전 관리</span>
      </div>
      <div class="write-container">
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
            썸네일
          </div>
          <div class="input">
            <input type="file" />
          </div>
        </div>
        <div class="input-wrap">
          <div class="label">
            모집기간
          </div>
          <div class="input date">
            연도
            <select>
              <option>2022</option>
            </select>
            월
            <select>
              <option>12</option>
            </select>
            일
            <select>
              <option>31</option>
            </select>
            <span class="gap">~</span>
            연도
            <select>
              <option>2022</option>
            </select>
            월
            <select>
              <option>12</option>
            </select>
            일
            <select>
              <option>31</option>
            </select>
          </div>
        </div>
        <div class="input-wrap input-double">
          <div class="input-wrap">
            <div class="label">
              모집인원수
            </div>
            <div class="input">
              <input type="text" />
            </div>
          </div>
          <div class="input-wrap">
            <div class="label">
              카테고리
            </div>
            <div class="input">
              <select>
                <option>카테고리를 선택하세요</option>
              </select>
            </div>
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
        <div class="input-wrap">
          <div class="label">
            유료/무료
          </div>
          <div class="input">
            <span class="select-btn selected">유료</span>
            <span class="select-btn">무료</span>
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
    this.$parent.$parent.$refs.gnb.activeBtn("exhibition");
  }
}
</script>
