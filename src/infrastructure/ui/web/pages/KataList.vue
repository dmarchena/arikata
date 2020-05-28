<template>
  <section>
    <header v-bem:header>
      <VPageTitle v-bem:heading>
        {{ title }}
      </VPageTitle>
      <router-link
        v-show="tag || filterByUser"
        class="btn btn--ghost"
        :to="{ name: 'katas' }"
      >
        view all katas
      </router-link>
      <router-link
        v-show="isSignedIn && !isAdmin && !filterByUser"
        :to="{ name: 'trainings' }"
        class="btn btn--ghost"
      >
        view my trainings
      </router-link>
      <router-link
        v-show="isAdmin"
        class="btn btn--ghost"
        :to="{ name: 'newKata' }"
      >
        new kata
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
          v-if="!isAdmin && !kata.trainings"
          class="btn-set"
        >
          <router-link
            :to="{ name: 'training', query: { kataId: kata.id } }"
            class="btn"
          >
            try it
          </router-link>
        </div>
        <div
          v-if="isAdmin && !kata.trainings"
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
        <ul
          v-if="!kata.trainings"
          v-bem:tags
        >
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
        <ul
          v-if="kata.trainings"
          v-bem:trainings
        >
          <li
            v-for="(item, index) in kata.trainings"
            :key="`${kata.id}-${item.id}`"
            v-bem:training
          >
            <router-link :to="{ name: 'training', params: { id: item.id } }">
              <VIconSuccess :success="item.success" />Training #{{ index + 1 }}
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script>
import '../css/pages/kata-list.css';
import app from '../application';
import VButtonAsync from '../components/VButtonAsync.vue';
import VIconSuccess from '../components/VIconSuccess.vue';
import VTag from '../components/VTag.vue';
import VPageTitle from '../components/VPageTitle.vue';
import { actions, mutations, getters } from '../store';
import { mapGetters } from 'vuex';

export default {
  name: 'KataList',

  components: {
    VButtonAsync,
    VIconSuccess,
    VTag,
    VPageTitle,
  },

  props: {
    tag: {
      type: String,
      default: null,
    },
    filterByUser: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters({
      katas: getters.kataList.getKatas,
    }),
    title() {
      let text;
      if (this.filterByUser === true) {
        text = 'My trainings';
      } else if (this.tag !== null) {
        text = `Katas tagged with "${this.tag}"`;
      } else {
        text = 'Available katas';
      }
      return text;
    },
  },

  watch: {
    $route(to, from) {
      this.listKatas();
    },
  },

  created() {
    this.listKatas();
  },

  methods: {
    deleteKata(kataId) {
      return app.manageKataService.remove(kataId).then((res) => {
        this.listKatas(); // refresh the list
        return res;
      });
    },
    listKatas() {
      if (this.filterByUser === true) {
        this.listAllKatasDoneByUser();
      } else if (this.tag !== null) {
        this.listAllKatasWithTag(this.tag);
      } else {
        this.listAllKatas();
      }
    },
    async listAllKatas() {
      this.$store.dispatch(actions.global.listAllKatas, {
        app,
      });
    },
    async listAllKatasDoneByUser() {
      this.$store.dispatch(actions.global.listAllKatasDoneByUser, {
        app,
      });
    },
    async listAllKatasWithTag(tag) {
      this.$store.dispatch(actions.global.listAllKatasWithTag, {
        app,
        tag: this.tag,
      });
    },
  },
};
</script>
