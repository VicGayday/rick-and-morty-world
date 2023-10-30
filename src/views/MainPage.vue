<template>
  <div class="content">
    <MainHeader />
    <TableHeader
      :sortCharactersbyName="sortCharactersbyName"
      :sortCharactersbyOrigin="sortCharactersbyOrigin"
      :sortCharactersbyId="sortCharactersbyId"
    />
    <div v-if="!isLoading">
      <CharacterItem
        v-for="item in listOfCharacters"
        :key="item.id"
        :character="item"
        @select="selectCharacter"
      />
    </div>
    <div class="center" v-else><TheLoader /></div>
    <CharacterModal v-model:visible="visible">
      <CharacterCard :character="character" />
    </CharacterModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from "vue"
import { Character, SelectCharacter } from "@/components/types"
import CharacterItem from "@/components/CharacterItem.vue"
import CharacterModal from "@/components/UI/CharacterModal.vue"
import CharacterCard from "@/components/CharacterCard.vue"
import TableHeader from "@/components/TableHeader.vue"
import MainHeader from "@/components/MainHeader.vue"
import TheLoader from "@/components/UI/TheLoader.vue"

import { fetchAllPages } from "@/components/helper"

export default defineComponent({
  name: "MainPage",
  components: {
    CharacterItem,
    CharacterModal,
    TableHeader,
    CharacterCard,
    MainHeader,
    TheLoader,
  },

  async setup() {
    const listOfCharacters: Ref<Character[]> = ref([])
    const character: Ref<SelectCharacter> = ref()
    const isLoading = ref(false)
    const page: Ref<number> = ref(1)
    const totalPage: Ref<number> = ref(42)
    const visible: Ref<boolean> = ref(false)
    const sortAsc: Ref<boolean> = ref(false)

    type name = "gender" | "name" | "status" | "species" | "type" | "created"
    async function mainFetch() {
      try {
        isLoading.value = true

        listOfCharacters.value = await fetchAllPages()
      } catch (error) {
        console.error("Глобальная ошибка:", error)
      } finally {
        isLoading.value = false
      }
    }

    const selectCharacter = (it: Character) => {
      character.value = it
      visible.value = true
    }

    const sortCharactersbyName = (s: string, name: name) => {
      if (s === "asc") {
        listOfCharacters.value.sort((a, b) => a[name].localeCompare(b[name]))
      } else {
        listOfCharacters.value.sort((a, b) => b[name].localeCompare(a[name]))
      }
    }

    const sortCharactersbyId = (s: string) => {
      if (s === "asc") {
        listOfCharacters.value.sort((a, b) => a.id - b.id)
      } else {
        listOfCharacters.value.sort((a, b) => b.id - a.id)
      }
    }

    const sortCharactersbyOrigin = (s: string) => {
      if (s === "asc") {
        listOfCharacters.value.sort((a, b) =>
          a.origin.name.localeCompare(b.origin.name)
        )
      } else {
        listOfCharacters.value.sort((a, b) =>
          b.origin.name.localeCompare(a.origin.name)
        )
      }
    }

    onMounted(() => {
      mainFetch()
    })

    return {
      mainFetch,
      listOfCharacters,
      character,
      selectCharacter,
      isLoading,
      page,
      totalPage,
      visible,
      sortAsc,
      sortCharactersbyName,
      sortCharactersbyId,
      sortCharactersbyOrigin,
    }
  },
})
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
}
.center {
  display: flex;
  padding-top: 100px;
  align-items: center;
  justify-content: center;
}
</style>
