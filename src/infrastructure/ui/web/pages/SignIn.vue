<template>
  <form
    v-bem-block:form
    action="/api/user/signin"
    method="post"
  >
    <VFieldText
      v-model="email"
      v-bem:field
      autocomplete="username"
      name="email"
    >
      Email
    </VFieldText>
    <VFieldText
      v-model="password"
      v-bem:field
      autocomplete="current-password"
      name="password"
      :password="true"
    >
      Password
    </VFieldText>
    <div
      v-show="error"
      v-bem:error
    >
      {{ error }}
    </div>
    <div v-bem:actions>
      <VButtonAsync
        :loading="loading"
        @active="handleSubmit"
      >
        Sign in
      </VButtonAsync>
      <router-link
        v-bem:sign-up-link
        :to="{ name: 'signup' }"
      >
        create new account
      </router-link>
    </div>
  </form>
</template>

<script>
import application from '../application';
import VButtonAsync from '../components/VButtonAsync';
import VFieldText from '../components/forms/VFieldText';

export default {
  name: 'SignIn',

  components: {
    VButtonAsync,
    VFieldText,
  },

  data() {
    return {
      email: '',
      error: undefined,
      password: '',
      loading: false,
    };
  },

  methods: {
    async handleSubmit(evt) {
      evt.preventDefault();
      this.loading = true;
      let success = false;
      try {
        const user = await application.userService.signIn(
          this.email,
          this.password
        );
        success = user !== null;
      } catch (e) {
        this.printError(e.message);
      }
      if (success) {
        this.$router.push('katas');
      }
      this.loading = false;
    },
    cleanError() {
      this.error = undefined;
    },
    printError(message) {
      this.error = message;
    },
  },
};
</script>
