<template>
  <div id="app">
    <header v-bem:header>
      <h1 v-bem:name>
        <router-link
          v-bem:home-link
          to="/"
        >
          Arikata
        </router-link>
      </h1>
      <VUserInfo />
    </header>
    <main v-bem:main>
      <router-view />
    </main>
  </div>
</template>

<script>
import VUserInfo from './components/VUserInfo';

export default {
  name: 'App',

  components: {
    VUserInfo,
  },
};
</script>
