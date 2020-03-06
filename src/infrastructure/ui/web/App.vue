<template>
  <div id="app">
    Hello TFG
    <VKataList />
    <CodeEditor />
  </div>
</template>

<script>
import VKataList from './components/VKataList';
import CodeEditor from '@/components/CodeEditor.vue';

export default {
  name: 'App',

  components: {
    VKataList,
    CodeEditor,
  },
};
</script>
