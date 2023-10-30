<template>
  <div class="row" @click="selectCharacter">
    <div class="box img">
      <img class="character-img" :src="character.image" />
    </div>
    <div class="box">{{ character.id }}</div>
    <div class="box">{{ character.name }}</div>
    <div class="box">{{ character.status }}</div>
    <div class="box">{{ character.species }}</div>
    <div class="box">{{ character.type ? character.type : "No type" }}</div>
    <div class="box">{{ character.gender }}</div>
    <div class="box">{{ character.origin.name }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import { Character } from "@/components/types"

export default defineComponent({
  name: "CharacterItem",
  props: {
    character: {
      type: Object as PropType<Character>,
      required: true,
    },
  },
  setup(props: { character: Character }, { emit }) {
    function selectCharacter() {
      emit("select", props.character)
    }
    return {
      selectCharacter,
    }
  },
})
</script>

<style scoped>
/* .box:nth-child(1) {
  flex-basis: 50px;
}

.box:nth-child(2) {
  border-left: 0;
  flex-basis: 163px;
}

.box:nth-child(3) {
  border-left: 0;
  flex-basis: 119px;
}
.box:nth-child(4) {
  border-left: 0;
  flex-basis: 147px;
}

.box:nth-child(5) {
  border-left: 0;
  flex-basis: 88px;
}
.box:nth-child(6) {
  border-left: 0;
  flex-basis: 162px;
} */
</style>
