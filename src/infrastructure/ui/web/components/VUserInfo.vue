<template>
  <div>
    <span
      v-bem:avatar
      role="img"
      :alt="email"
    >{{ firstLetter }}</span>
    <button
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

export default {
  name: 'VSignInForm',

  data() {
    return {
      email: '',
    };
  },

  computed: {
    firstLetter() {
      return this.email?.length > 0 ? email.charAt(0) : 'X';
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
