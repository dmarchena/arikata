<template>
  <div>
    <span
      v-bem:avatar
      role="img"
      :alt="email"
    >{{ firstLetter }}</span>
    <button
      v-show="isSignedIn"
      id="logout"
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
  name: 'VSignInForm',

  computed: {
    user() {
      return this.$store.getters[getters.auth.getUser];
    },
    email() {
      return this.user?.email;
    },
    firstLetter() {
      return this.isSignedIn ? this.email.charAt(0) : 'Mr.X';
    },
    isSignedIn() {
      return !!(this.user ?? false);
    },
  },

  methods: {
    logout(evt) {
      evt.preventDefault();
      application.userService.logout();
    },
  },
};
</script>
