<template>
  <div class="card-wrapper">
    <div class="card-img"><img :src="character.image" alt="" /></div>
    <div class="card-inner">
      <div class="name">
        <h2>{{ character.name }}</h2>
        <hr />
        <div class="type" v-show="isType">{{ character.type }}</div>
      </div>
      <div class="card-content">
        <div class="title">Status:</div>
        <div class="status">{{ character.status }}</div>
        <div class="title">Species:</div>
        <div class="species">{{ character.species }}</div>
        <div class="title">Gender:</div>
        <div class="gender">{{ character.gender }}</div>
        <div class="title">Last known location:</div>
        <div class="gender">{{ character.location.name }}</div>
      </div>
      <h3>Episodes</h3>
      <div class="table-episode" v-if="!isLoading">
        <EpisodeItem
          v-for="item in listOfEpisodes"
          :key="item.id"
          :episode="item"
        />
      </div>
      <div class="center" v-else><TheLoader /></div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, computed, ref, Ref, onMounted } from "vue"
import { Character, Episode } from "@/components/types"
import EpisodeItem from "./EpisodeItem.vue"
import TheLoader from "@/components/UI/TheLoader.vue"

import axios from "axios"

export default defineComponent({
  name: "CharacterModal",
  components: { EpisodeItem, TheLoader },
  props: {
    character: { type: Object as PropType<Character>, required: true },
  },
  setup(props) {
    const listOfEpisodes: Ref<Episode[]> = ref([])
    const isLoading = ref(false)

    async function fetchEpisodes() {
      const episodePromises = props.character.episode.map(async (it) => {
        try {
          isLoading.value = true
          const response = await axios(it)
          return { data: response.data, error: null }
        } catch (error) {
          console.log(error)
          return { data: null, error: error }
        } finally {
          isLoading.value = false
        }
      })

      listOfEpisodes.value = (await Promise.all(episodePromises))
        .filter((episode) => episode.data !== null)
        .map((episode) => episode.data)
    }
    const isType = computed(() => {
      return props.character.type === "no type" ? false : true
    })

    onMounted(() => {
      fetchEpisodes()
    })
    return {
      isType,
      fetchEpisodes,
      listOfEpisodes,
      isLoading,
    }
  },
})
</script>

<style scoped>
.card-wrapper {
  display: flex;
  gap: 50px;
}
.card-img {
  width: 500px;
}
.name {
  margin-bottom: 30px;
}
.title {
  color: var(--text-secondary);
}
.card-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.table-episode {
  overflow-y: scroll;
  max-height: 500px;
}
.center {
  display: flex;
  padding-top: 50px;
  align-items: center;
  justify-content: center;
}
</style>
