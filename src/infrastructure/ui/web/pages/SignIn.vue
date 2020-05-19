<template>
  <form
    class="form"
    action="/api/user/signin"
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
      autocomplete="current-password"
      name="password"
      :password="true"
    >
      Password
    </VFieldText>
    <VButtonAsync
      id="login"
      :loading="loading"
      @active="handleSubmit"
    >
      Sign in
    </VButtonAsync>
    <p>
      <router-link :to="{ name: 'signup' }">
        create new account
      </router-link>
    </p>
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
        const user = await application.userService.signin(
          this.email,
          this.password
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
