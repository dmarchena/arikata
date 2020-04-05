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
import listKatas from '@app/listKatasFactory';
import kataRepo from '@infra/db/kataRepo';

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
      listKatas(kataRepo, tag)
        .execute()
        .then((data) => (this.katas = data));
    },
    listAll() {
      listKatas(kataRepo)
        .execute()
        .then((data) => (this.katas = data));
    },
  },
};
</script>
