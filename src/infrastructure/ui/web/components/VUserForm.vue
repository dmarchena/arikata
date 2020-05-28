<template>
  <div v-bem-block:form>
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
      :autocomplete="newAccountForm ? 'new-password' : 'current-password'"
      name="password"
      :password="true"
    >
      Password
    </VFieldText>
    <VFieldText
      v-show="newAccountForm"
      v-model="passwordConfirmation"
      v-bem:field
      autocomplete="new-password"
      name="passwordConfirmation"
      :password="true"
    >
      Confirm your password
    </VFieldText>
    <div
      v-show="error"
      v-bem:error
    >
      {{ errorMessage }}
    </div>
    <div v-bem:actions>
      <router-link
        v-show="newAccountForm"
        class="link-signin btn btn--ghost"
        :to="{ name: 'signin' }"
        :event="''"
        @click.native.prevent="goToSignIn"
        @keydown.enter.native.prevent="goToSignIn"
      >
        Sign in
      </router-link>
      <VButtonAsync
        class="btn btn--primary"
        @active="handleSubmit"
      >
        {{ newAccountForm ? 'Sign up' : 'Sign in' }}
      </VButtonAsync>
      <router-link
        v-show="!newAccountForm"
        class="link-signup"
        :to="{ name: 'signup' }"
        :event="''"
        @click.native.prevent="goToSignUp"
        @keydown.enter.native.prevent="goToSignUp"
      >
        create new account
      </router-link>
    </div>
  </div>
</template>

<script>
import application from '../application';
import { events, publish } from '../event-bus';
import VButtonAsync from '../components/VButtonAsync';
import VFieldText from '../components/forms/VFieldText';

export default {
  name: 'VUserForm',

  components: {
    VButtonAsync,
    VFieldText,
  },

  props: {
    newUser: {
      type: Boolean,
      default: false,
    },
    redirect: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      email: '',
      error: false,
      errorMessage: undefined,
      password: '',
      passwordConfirmation: '',
      newAccountForm: false,
    };
  },

  watch: {
    newUser(value) {
      this.newAccountForm = value;
    },
  },

  mounted() {
    this.newAccountForm = this.newUser;
  },

  methods: {
    clearForm() {
      this.email = '';
      this.error = false;
      this.password = '';
      this.passwordConfirmation = '';
    },
    goToSignIn() {
      if (this.redirect) {
        this.$router.push({ name: 'signin' });
      } else {
        this.newAccountForm = false;
      }
    },
    goToSignUp() {
      if (this.redirect) {
        this.$router.push({ name: 'signup' });
      } else {
        this.newAccountForm = true;
      }
    },
    handleSubmit(evt) {
      evt.preventDefault();
      this.loading = true;
      let success = false;
      const request = this.newAccountForm ? this.signUp() : this.signIn();
      return request
        .then(() => {
          this.clearForm();
          const routeName = this.$router.currentRoute?.name;
          if (routeName !== 'training') {
            this.$router.push({ name: 'katas' });
          }
        })
        .catch((err) => {
          this.printError(err.message);
          this.$emit('error', err.message);
          return Promise.reject(err);
        });
    },
    printError(message) {
      this.error = true;
      this.errorMessage = message;
      setTimeout(() => {
        this.error = false;
      }, 4000);
      setTimeout(() => {
        this.errorMessage = undefined;
      }, 7000);
    },
    signIn() {
      return application.userService
        .signIn(this.email, this.password)
        .then((user) => {
          publish(events.SIGNED_IN, user);
          this.$emit('success', user);
          return user;
        });
    },
    signUp() {
      return application.userService
        .signUp(this.email, this.password, this.passwordConfirmation)
        .then((user) => {
          publish(events.SIGNED_UP, user);
          this.$emit('success', user);
          return user;
        });
    },
  },
};
</script>
