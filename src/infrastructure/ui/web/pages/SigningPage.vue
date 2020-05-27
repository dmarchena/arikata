<template>
  <div v-bem-block:signing-page>
    <h2 v-bem:heading>
      {{ heading }}
    </h2>
    <VUserForm
      v-bem:form
      :new-user="newUser"
      :redirect="true"
      @success="$router.push('katas')"
    />
    <picture v-bem:image>
      <source
        :srcset="bgImage.m"
        media="(min-width: 1024px)"
        alt=""
      >
      <img
        :src="bgImage.s"
        alt=""
      >
    </picture>
  </div>
</template>

<script>
import VUserForm from '../components/VUserForm';
import computerS from '../images/computer-s.jpg';
import computerM from '../images/computer-m.jpg';

export default {
  name: 'SigningPage',

  components: {
    VUserForm,
  },

  props: {
    newUser: {
      type: Boolean,
      default: false,
    },
    signedOut: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    bgImage: {
      s: computerM,
      m: computerM,
    },
  }),

  computed: {
    heading() {
      let text;
      if (this.signedOut) {
        text = 'See you soon!';
      } else if (this.newUser) {
        text = 'Welcome!';
      } else {
        text = 'Welcome back!';
      }
      return text;
    },
  },
};
</script>
