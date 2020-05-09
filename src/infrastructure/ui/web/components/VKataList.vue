<template>
  <section>
    <button
      @click="listAll()"
      @keydown.enter="listAll()"
    >
      All
    </button>
    <ul class="katalist__list">
      <li
        v-for="kata in katas"
        :key="kata.id"
        class="katalist__list-item"
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
    async filterByTag(tag) {
      this.katas = await app.browseService.getAllKatasWithTag(tag);
    },
    async listAll() {
      this.katas = await app.browseService.getAll();
    },
  },
};
</script>
