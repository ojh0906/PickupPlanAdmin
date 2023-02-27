<script setup>
import Gnb from './components/common/Gnb.vue'
import {storeToRefs} from 'pinia';
import {useAuthStore} from '@/_stores';
import dayjs from "dayjs";

const authStore = useAuthStore();
const { isAuthenticated, expiryTime } = storeToRefs(authStore);
const isExpiryAuth = dayjs().isAfter(expiryTime);

</script>

<template>
  <div class="container">
    <Gnb ref="gnb" v-if="isAuthenticated"/>
    <router-view />
  </div>
</template>
