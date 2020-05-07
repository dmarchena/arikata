<template>
  <div id="app">
    <header>
      <h1>Arikata</h1>
    </header>
    <main>
      <VKataList />
      <VKataAdmin />
    </main>
  </div>
</template>

<script>
import VKataList from './components/VKataList';
import VKataAdmin from './components/VKataAdmin';

export default {
  name: 'App',

  components: {
    VKataList,
    VKataAdmin,
  },
};
</script>
