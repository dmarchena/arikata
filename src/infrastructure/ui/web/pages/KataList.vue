<template>
  <section>
    <header v-bem:header>
      <VPageTitle>{{ title }}</VPageTitle>
      <router-link
        v-show="tag"
        class="btn"
        :to="{ name: 'katas' }"
      >
        view all
      </router-link>
    </header>
    <ul v-bem:katas>
      <li
        v-for="kata in katas"
        :key="kata.id"
        v-bem:kata
      >
        <strong v-bem:kata-name>{{ kata.name }}</strong>
        <div
          v-if="isAdmin"
          class="btn-set"
        >
          <router-link
            :to="{ name: 'editKata', params: { id: kata.id } }"
            class="btn"
          >
            edit
          </router-link>
          <VButtonAsync
            class="btn--delete"
            @active="deleteKata(kata.id)"
          >
            delete
          </VButtonAsync>
        </div>
        <ul v-bem:tags>
          <li
            v-for="item in kata.tags"
            :key="`${kata.id}-${item}`"
            v-bem:tag
          >
            <router-link :to="{ name: 'katas', query: { tag: item } }">
              <VTag>
                {{ item }}
              </VTag>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script>
import app from '../application';
import VButtonAsync from '../components/VButtonAsync.vue';
import VTag from '../components/VTag.vue';
import VPageTitle from '../components/VPageTitle.vue';

export default {
  name: 'KataList',

  components: {
    VButtonAsync,
    VTag,
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
        ? `Katas tagged with "${this.tag}"`
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
    deleteKata(kataId) {
      return app.manageKataService.remove(kataId);
    },
    listKatas() {
      if (this.tag !== null) {
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
