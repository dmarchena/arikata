<template>
  <div>
    <span
      v-bem:avatar="{ signedin: isSignedIn }"
      role="img"
      :alt="email"
      :title="email"
    >{{ firstLetter }}</span>
    <button
      v-show="!isSignedIn"
      :to="{ name: 'signin' }"
      class="btn"
      @click.prevent="toggleForm"
      @keydown.enter.prevent="toggleForm"
      @keydown.space.prevent="toggleForm"
    >
      Sign in
    </button>
    <button
      v-show="isSignedIn"
      class="btn"
      @click="logout"
      @keyup.enter="logout"
      @keyup.space="logout"
    >
      Sign out
    </button>
    <VUserForm
      v-show="formShown"
      v-bem:form
      @success="closeForm"
    />
  </div>
</template>

<script>
import application from '../application';
import { getters } from '../store';
import VUserForm from './VUserForm';

export default {
  name: 'VUserInfo',

  components: {
    VUserForm,
  },

  data: () => ({
    formShown: false,
  }),

  computed: {
    email() {
      return this.user?.email;
    },
    firstLetter() {
      return this.isSignedIn ? this.email.charAt(0) : 'Mr. X';
    },
  },

  methods: {
    closeForm() {
      this.formShown = false;
    },
    logout(evt) {
      evt.preventDefault();
      application.userService.signOut();
      this.$router.push({ name: 'signin', query: { from: 'signout' } });
    },
    toggleForm() {
      this.formShown = !this.formShown;
    },
  },
};
</script>
