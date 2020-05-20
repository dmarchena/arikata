<template>
  <form
    v-bem-block:form
    action="/api/user/signup"
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
      autocomplete="new-password"
      name="password"
      :password="true"
    >
      Password
    </VFieldText>
    <VFieldText
      v-model="passwordConfirmation"
      v-bem:field
      autocomplete="new-password"
      name="passwordConfirmation"
      :password="true"
    >
      Confirm your password to avoid spelling mistakes
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
        Sign up
      </VButtonAsync>
    </div>
  </form>
</template>

<script>
import application from '../application';
import VButtonAsync from '../components//VButtonAsync';
import VFieldText from '../components/forms/VFieldText';

export default {
  name: 'SignUp',

  components: {
    VButtonAsync,
    VFieldText,
  },

  data() {
    return {
      email: '',
      error: undefined,
      password: '',
      passwordConfirmation: '',
      loading: false,
    };
  },

  methods: {
    async handleSubmit(evt) {
      evt.preventDefault();
      this.loading = true;
      let success = false;
      try {
        const user = await application.userService.signUp(
          this.email,
          this.password,
          this.passwordConfirmation
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
