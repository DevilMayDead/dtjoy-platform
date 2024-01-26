<template>
  <div>
    this is analysis
    <a @click="router.push({ name: 'workbench' })">go to workbench</a>
  </div>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";

const router = useRouter();
</script>

<style scoped>

</style>