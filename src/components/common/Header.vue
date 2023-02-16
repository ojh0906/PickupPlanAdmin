<template>
  <div class="content-head-container">
    <div class="content-head-wrap">
      <div class="item">
        <span>{{ this.member.id }}</span>
      </div>
      <div class="item">
        <span @click="logout">로그아웃</span>
      </div>
    </div>
  </div>
</template>

<script>
import {useRouteHistoryStore} from '@/_stores/route_history'
import {useAuthStore} from '@/_stores';

export default {
  setup() {
    const history_store = useRouteHistoryStore()
    const authStore = useAuthStore();
    const member = authStore.member;
    return {
      history_store,
      authStore,
      member,
    }
  },
  data() {
    return {
    }
  },
  methods: {
    logout() {
      this.authStore.logout();
    },
  },
  components: {

  },
  computed: {
    getCurrentRoutePath() {
      return this.$route.path
    },
    getCurrentRouteName() {
      return this.$route.meta.title
    },
  }
}
</script>
