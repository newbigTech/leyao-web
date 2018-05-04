<template>
  <div class="_form-input">
    <slot></slot>
    <p class="_form-input-error" v-show="message">{{message}}</p>
  </div>
</template>

<script>
  export default {
    name: "formInput",
    props: {
      rule: {
        type: Object,
        default: () => {
          return {
            message: "",
          }
        }
      }
    }
  }
</script>
