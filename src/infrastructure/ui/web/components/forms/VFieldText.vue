/* eslint-disable vue-a11y/label-has-for */
<template>
  <p v-bem-block="['field']">
    <label
      v-bem:label
      :for="uid"
    ><slot /></label>
    <input
      :id="uid"
      v-bem:control
      :type="password ? 'password' : 'text'"
      :autocomplete="autocomplete"
      :disabled="disabled"
      :required="required"
      :name="name"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
  </p>
</template>

<script>
import { nanoid } from 'nanoid';

const stringProp = () => ({
  type: String,
  default: '',
});

export default {
  name: 'FieldText',

  model: {
    prop: 'value',
    event: 'input',
  },

  props: {
    autocomplete: stringProp(),
    id: stringProp(),
    name: stringProp(),
    value: stringProp(),
    disabled: {
      type: Boolean,
      default: false,
    },
    password: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    uid() {
      return this.id === '' ? nanoid() : this.id;
    },
  },
};
</script>
