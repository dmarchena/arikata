<template>
  <div id="app">
    <header v-bem:header>
      <h1 v-bem:name>
        <router-link :to="isSignedIn ? '/katas' : '/'">
          <svg><use xlink:href="#logo" /></svg>Arikata
        </router-link>
      </h1>
      <VUserInfo />
    </header>
    <main v-bem:main>
      <router-view />
    </main>
    <footer v-bem:footer>
      Arikata is an open source project by
      <a
        href="https://github.com/dmarchena"
        title="go to my GitHub"
      >David Marchena</a>.
    </footer>
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
