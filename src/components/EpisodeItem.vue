<template>
  <div class="row">
    <div class="box">{{ episode.name }}</div>
    <div class="box">{{ episode.air_date }}</div>
    <div class="box">{{ episode.episode }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue"
import { Episode } from "@/components/types"

export default defineComponent({
  name: "EpisodeItem",
  props: {
    episode: {
      type: Object as PropType<Episode>,
      required: true,
    },
  },
})
</script>
