<template>
  <!-- eslint-disable-next-line vue-a11y/label-has-for -->
  <label v-bem-block="['field']">
    <span v-bem:label>Tags</span>
    <multiselect
      v-model="tags"
      v-bem:control
      tag-placeholder="Add this as new tag"
      placeholder="Search or add a tag"
      :options="options"
      :multiple="true"
      :taggable="true"
      @tag="addTag"
    />
  </label>
</template>

<script>
import Multiselect from 'vue-multiselect';

export default {
  name: 'FieldTags',

  components: {
    Multiselect,
  },

  model: {
    prop: 'value',
    event: 'tag',
  },

  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      tags: this.value,
      options: [],
    };
  },

  methods: {
    addTag(newTag) {
      this.options = [...this.options, newTag];
      this.tags = [...this.tags, newTag];
      this.$emit('tag', this.tags);
    },
  },
};
</script>
