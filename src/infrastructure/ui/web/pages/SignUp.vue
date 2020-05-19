<template>
  <form
    class="form"
    action="/api/user/signup"
    method="post"
  >
    <VFieldText
      v-model="email"
      autocomplete="username"
      name="email"
    >
      Email
    </VFieldText>
    <VFieldText
      v-model="password"
      autocomplete="new-password"
      name="password"
      :password="true"
    >
      Password
    </VFieldText>
    <VFieldText
      v-model="passwordConfirmation"
      autocomplete="new-password"
      name="passwordConfirmation"
      :password="true"
    >
      Confirm your password
    </VFieldText>
    <VButtonAsync
      id="login"
      :loading="loading"
      @active="handleSubmit"
    >
      Sign up
    </VButtonAsync>
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
        const user = await application.userService.signup(
          this.email,
          this.password,
          this.passwordConfirmation
        );
        success = user !== null;
      } catch (e) {
        console.log(e.message);
      }
      if (success) {
        this.$router.push('katas');
      }
      this.loading = false;
    },
  },
};
</script>
