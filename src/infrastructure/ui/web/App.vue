<template>
  <div id="app">
    Hello TFG
    <VKataList />
    <VKataAdmin />
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
