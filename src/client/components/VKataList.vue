<template>
  <section>
    <button
      @click="listAll()"
      @keydown.enter="listAll()"
    >
      All
    </button>
    <ul>
      <li
        v-for="kata in katas"
        :key="kata.id"
      >
        {{ kata.name }}
        <ul>
          <li
            v-for="tag in kata.tags"
            :key="`${kata.id}-${tag}`"
          >
            <button
              @click="filterByTag(tag)"
              @keydown.enter="filterByTag(tag)"
            >
              {{ tag }}
            </button>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script>
import app from '../application';

export default {
  name: 'VKataList',

  data: () => ({
    katas: [],
  }),

  created() {
    this.listAll();
  },

  methods: {
    filterByTag(tag) {
      app.kataService
        .getAllKatasWithTag(tag)
        .then((data) => (this.katas = data));
    },
    listAll() {
      app.kataService.getAll().then((data) => (this.katas = data));
    },
  },
};
</script>
