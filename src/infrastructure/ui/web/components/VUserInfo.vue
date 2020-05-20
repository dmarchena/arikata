<template>
  <div>
    <span
      v-bem:avatar="{ signedin: isSignedIn }"
      role="img"
      :alt="email"
      :title="email"
    >{{ firstLetter }}</span>
    <router-link
      v-show="!isSignedIn"
      :to="{ name: 'signin' }"
      class="btn"
    >
      Sign in
    </router-link>
    <button
      v-show="isSignedIn"
      class="btn"
      @click="logout"
      @keyup.enter="logout"
      @keyup.space="logout"
    >
      Sign out
    </button>
  </div>
</template>

<script>
import application from '../application';
import { getters } from '../store';

export default {
  name: 'VUserInfo',

  computed: {
    email() {
      return this.user?.email;
    },
    firstLetter() {
      return this.isSignedIn ? this.email.charAt(0) : 'Mr. X';
    },
  },

  methods: {
    logout(evt) {
      evt.preventDefault();
      application.userService.signOut();
      this.$router.push({ name: 'signin' });
    },
  },
};
</script>
