<template>
  <section>
    <VPageTitle>{{ title }}</VPageTitle>
    <router-link :to="{ name: 'katas' }">
      All
    </router-link>
    <ul class="katalist__list">
      <li
        v-for="kata in katas"
        :key="kata.id"
        class="katalist__list-item"
      >
        {{ kata.name }}
        <router-link :to="{ name: 'editKata', params: { id: kata.id } }">
          edit
        </router-link>
        <ul>
          <li
            v-for="item in kata.tags"
            :key="`${kata.id}-${item}`"
          >
            <router-link :to="{ name: 'katas', query: { tag: item } }">
              {{ item }}
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script>
import app from '../application';
import VPageTitle from './VPageTitle.vue';

export default {
  name: 'VKataList',

  components: {
    VPageTitle,
  },

  props: {
    tag: {
      type: String,
      default: null,
    },
  },

  data: () => ({
    katas: [],
  }),

  computed: {
    title() {
      return this.tag !== null
        ? `Katas tagged with ${this.tag}`
        : 'Available katas';
    },
  },

  watch: {
    tag() {
      this.listKatas();
    },
  },

  created() {
    this.listKatas();
  },

  methods: {
    listKatas() {
      console.log({ tag: this.tag });
      if (this.tag !== null) {
        console.log({ tag: this.tag });
        this.listAllKatasWithTag(this.tag);
      } else {
        this.listAllKatas();
      }
    },
    async listAllKatasWithTag(tag) {
      this.katas = await app.browseService.getAllKatasWithTag(tag);
    },
    async listAllKatas() {
      this.katas = await app.browseService.getAllKatas();
    },
  },
};
</script>
