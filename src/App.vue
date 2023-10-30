<template>
  <Suspense>
    <MainPage />
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import MainPage from "@/views/MainPage.vue"

export default defineComponent({
  name: "App",
  components: {
    MainPage,
  },
})
</script>

<style></style>
