<template>
  <div class="content">
    <TableHeader
      :sortCharactersbyName="sortCharactersbyName"
      :sortCharactersbyGender="sortCharactersbyGender"
      :sortCharactersbyOrigin="sortCharactersbyOrigin"
    />
    <CharacterItem
      v-for="item in listOfCharacters"
      :key="item.uuid"
      :character="item"
      @select="selectCharacter"
    />
    <CharacterModal v-model:visible="visible">
      <CharacterCard :character="character" />
    </CharacterModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, Ref } from "vue"
import { Character, SelectCharacter} from "@/components/types"
import CharacterItem from "@/components/CharacterItem.vue"
import CharacterModal from "@/components/CharacterModal.vue"
import CharacterCard from "@/components/CharacterCard.vue"
import TableHeader from "@/components/TableHeader.vue"

import axios from "axios"
import { v4 as uuidv4 } from "uuid"

export default defineComponent({
  name: "MainPage",
  components: { CharacterItem, CharacterModal, TableHeader, CharacterCard },

  async setup() {
    const listOfCharacters: Ref<Character[]> = ref([])
    const character: Ref<SelectCharacter> = ref()
    const visible: Ref<boolean> = ref(false)
    const genderOrder = {
      "unknown": 0,
      "Female": 1,
      "Male": 2
    }
    let nextPage: string | null = "https://rickandmortyapi.com/api/character";

      async function fetchAllPages() {
        let url = "https://rickandmortyapi.com/api/character";
        let responses = [];

        while(url) {
          const response = await axios.get(url);
          responses.push(response.data);
          url = response.data.info.next;
        }

        return responses;
      }

      // async function fetchCharacters() {
      //   const responses = await fetchAllPages();
      //   responses.forEach(response => {
      //     const characters = response.results.map((character: Ref<SelectCharacter>) => ({
      //       ...character,
      //       uuid: uuidv4(),
      //     }));
      //     listOfCharacters.value = [...listOfCharacters.value, ...characters];
      //   });
      // }


    async function fetchCharacters() {
      if (nextPage) {
        try {
          const response = await axios(nextPage);
          const characters = response.data.results.map((character:  Ref<SelectCharacter>) => ({
            ...character,
            uuid: uuidv4(),
          }));
          listOfCharacters.value = [...listOfCharacters.value, ...characters];
           if (response.data.info.next) {
        nextPage = response.data.info.next;
        setTimeout(fetchCharacters, 1000);
          } else {
            nextPage = null;
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    // const handleScroll = () => {
    //   const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    //   const distanceUntilScreenEnds = 200;

    //   if (clientHeight + scrollTop >= scrollHeight - distanceUntilScreenEnds) {
    //     fetchCharacters();
    //   }
    // };

    const selectCharacter = (it: Character) => {
      // if (character.value !== undefined) {

      character.value = it
      console.log("1111", character.value)
      visible.value = true
      // }
    }

    const sortCharactersbyName = async () => {
      await fetchCharacters();
      listOfCharacters.value.sort((a, b) => a.name.localeCompare(b.name));
    };

    const sortCharactersbyOrigin = async () => {
       await fetchCharacters();
       listOfCharacters.value.sort((a, b) => a.origin.name.localeCompare(b.origin.name, undefined, { sensitivity: "base" }));
    };

    const sortCharactersbyGender = async () => {
        await fetchCharacters();
        listOfCharacters.value.sort((a, b) => {
        const keyA = a.gender as keyof typeof genderOrder;
        const keyB = b.gender as keyof typeof genderOrder;
        return genderOrder[keyA] - genderOrder[keyB];
      });
    };



    onMounted(() => {
      fetchCharacters()
      //  window.addEventListener("scroll", handleScroll);
    })

    // onUnmounted(() => {
    //   window.removeEventListener("scroll", handleScroll);
    // });

    return {
      fetchCharacters,
      listOfCharacters,
      character,
      selectCharacter,
      // selectedCharacter,
      visible,
      // handleScroll,
      sortCharactersbyName,
      genderOrder,
      sortCharactersbyGender,
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
</style>
