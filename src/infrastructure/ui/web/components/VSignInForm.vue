<template>
  <form
    class="form"
    action="/api/user/signin"
    method="post"
  >
    <VFieldText
      v-model="email"
      name="email"
    >
      Email
    </VFieldText>
    <VFieldText
      v-model="password"
      name="password"
    >
      Password
    </VFieldText>
    <VButtonAsync
      id="login"
      :loading="loading"
      @active="handleSubmit"
    >
      Login
    </VButtonAsync>
  </form>
</template>

<script>
import application from '../application';
import VButtonAsync from './VButtonAsync';
import VFieldText from './forms/VFieldText';

export default {
  name: 'VSignInForm',

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
    handleSubmit(evt) {
      evt.preventDefault();
      this.loading = true;
      const res = application.userService.signin(this.email, this.password);
      this.loading = false;
      console.log(res);
    },
  },
};
</script>
