<script setup>
import Gnb from './components/common/Gnb.vue'

</script>

<template>
  <div class="container">
    <Gnb ref="gnb" />
    <router-view />
  </div>
</template>
