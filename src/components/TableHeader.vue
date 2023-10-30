<template>
  <div class="row">
    <div class="box">
      <span>{{ header.hero }}</span>
    </div>
    <div class="box">
      <span>{{ header.id }}</span>
      <div class="btn-inner">
        <button class="btn" @click="() => sortCharactersbyId('asc')">
          <ArrowUp />
        </button>
        <button class="btn" @click="() => sortCharactersbyId('desc')">
          <ArrowDown />
        </button>
      </div>
    </div>
    <div class="box">
      <span>{{ header.name }}</span>
      <div class="btn-inner">
        <button class="btn" @click="() => sortCharactersbyName('asc', 'name')">
          <ArrowUp />
        </button>
        <button class="btn" @click="() => sortCharactersbyName('desc', 'name')">
          <ArrowDown />
        </button>
      </div>
    </div>
    <div class="box">
      <span>{{ header.status }}</span>
      <div class="btn-inner">
        <button
          class="btn"
          @click="() => sortCharactersbyName('asc', 'status')"
        >
          <ArrowUp />
        </button>
        <button
          class="btn"
          @click="() => sortCharactersbyName('desc', 'status')"
        >
          <ArrowDown />
        </button>
      </div>
    </div>
    <div class="box">
      <span>{{ header.species }}</span>
      <div class="btn-inner">
        <button
          class="btn"
          @click="() => sortCharactersbyName('asc', 'species')"
        >
          <ArrowUp />
        </button>
        <button
          class="btn"
          @click="() => sortCharactersbyName('desc', 'species')"
        >
          <ArrowDown />
        </button>
      </div>
    </div>
    <div class="box">
      <span>{{ header.type }}</span>
      <div class="btn-inner">
        <button class="btn" @click="() => sortCharactersbyName('asc', 'type')">
          <ArrowUp />
        </button>
        <button class="btn" @click="() => sortCharactersbyName('desc', 'type')">
          <ArrowDown />
        </button>
      </div>
    </div>
    <div class="box">
      <span>{{ header.gender }}</span>
      <div class="btn-inner">
        <button
          class="btn"
          @click="() => sortCharactersbyName('asc', 'gender')"
        >
          <ArrowUp />
        </button>
        <button
          class="btn"
          @click="() => sortCharactersbyName('desc', 'gender')"
        >
          <ArrowDown />
        </button>
      </div>
    </div>
    <div class="box">
      <span>{{ header.origin }}</span>
      <div class="btn-inner">
        <button class="btn" @click="() => sortCharactersbyOrigin('asc')">
          <ArrowUp />
        </button>
        <button class="btn" @click="() => sortCharactersbyOrigin('desc')">
          <ArrowDown />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import ArrowUp from "@/components/svg/ArrowUp.vue"
import ArrowDown from "@/components/svg/ArrowDown.vue"

export default defineComponent({
  name: "TableHeader",
  components: { ArrowUp, ArrowDown },
  props: {
    sortCharactersbyName: {
      type: Function,
      required: true,
    },
    sortCharactersbyOrigin: {
      type: Function,
      required: true,
    },
    sortCharactersbyId: {
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
.btn-inner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.btn {
  border: none;
  width: 20px;
  height: 20px;
  background-color: transparent;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn:hover {
  background-color: whitesmoke;
}
</style>
