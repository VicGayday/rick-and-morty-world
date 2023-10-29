<template>
  <div class="row">
    <div>{{ header.hero }}</div>
    <div>{{ header.id }}</div>
    <div>{{ header.name }} <button @click="() => sortCharactersbyName()">Sort</button></div>
    <div>{{ header.status }}</div>
    <div>{{ header.species }}</div>
    <div>{{ header.type }}</div>
    <div>{{ header.gender }} <button @click="() => sortCharactersbyGender()">Sort</button></div>
    <div>{{ header.origin }} <button @click="() => sortCharactersbyOrigin()">Sort</button></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "TableHeader",
    props: {
      sortCharactersbyName: {
        type: Function,
        required: true,
      },
      sortCharactersbyGender: {
        type: Function,
        required: true,
      },
       sortCharactersbyOrigin: {
        type: Function,
        required: true,
      },
    },
  setup() {
    const header = {
      hero: "hero",
      id: "id",
      name: "name",
      status: "status",
      species: "species",
      type: "type",
      gender: "gender",
      origin: "origin",
    }
    return { header }
  },
})
</script>

<style scoped>
.row {
  display: flex;
}
.row:last-child .box {
  border-bottom: 1px solid var(--text-primary);
}
.row div {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  border: 1px solid black;
  border-bottom: none;
  padding: 10px;
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 16px;
}
</style>
