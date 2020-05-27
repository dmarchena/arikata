<template>
  <button
    :id="id"
    v-bem="{
      error: hasError,
      success: isSuccess,
    }"
    class="btn"
    :class="computedClasses"
    :disabled="loadingState"
    v-on="listeners"
  >
    <slot />

    <VSpinner
      v-if="loadingState"
      v-bem:spinner
    />
    <VIcon
      v-if="isSuccess"
      id="checkmark"
      class="icon icon--success"
    />
    <VIcon
      v-if="hasError"
      id="cross"
      class="icon icon--error"
    />
  </button>
</template>
<script>
const VSpinner = () =>
  import(/* webpackChunkName: "vue-spinner" */ './VSpinner.vue');
import VIcon from './VIcon';

export default {
  name: 'VButtonAsync',
  components: {
    VSpinner,
    VIcon,
  },
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      default: '',
    },
    /**
     * How much time should the error or success state stay visible
     */
    time: {
      type: Number,
      default: 2000,
    },
    /**
     * Override the loading state, if promise is not possible to be passed
     */
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    isLoading: false,
    hasError: false,
    isSuccess: false,
  }),
  computed: {
    listeners() {
      // spread the listeners passed from the parent, but override the click one
      return {
        ...this.$listeners,
        active: this.handleClick,
        click: this.handleClick,
        keyup: {
          enter: this.handleClick,
          space: this.handleClick,
        },
      };
    },
    computedClasses() {
      return {
        'is-danger': this.hasError,
        'is-success': this.isSuccess,
        'is-loading': this.loadingState,
      };
    },
    // uses the loading state from the prop or the internal one
    loadingState() {
      return this.loading || this.isLoading;
    },
  },
  methods: {
    async handleClick(e) {
      try {
        // set the internal loading state
        this.isLoading = true;
        // call the parent click listener and await it
        // Using Async/Await lets us await even none promises
        // pass the Event so modifiers can work
        await this.$listeners.active(e);
        // set the isSuccess state and revert it back after this.time period
        this.resetDelayed('isSuccess');
      } catch (error) {
        console.log(error);
        // set the hasError state and revert it back after this.time period
        this.resetDelayed('hasError');
      } finally {
        this.isLoading = false;
      }
    },
    resetDelayed(property) {
      // if loading prop is passed, dont set the internal states
      if (this.$options.propsData.hasOwnProperty('loading')) {
        return;
      }
      this[property] = true;
      setTimeout(() => {
        this[property] = false;
      }, this.time);
    },
  },
};
</script>
