<template>
  <div class="_container">
    <card-panel>
      <h3 slot="title">blur directive</h3>
      <div slot="panel-body">
        <!-- <input type="text" :value="(price == 0 ? '0.00' : price) + ''" @blur="price = (isNaN(Number($event.target.value)) ? price : Number($event.target.value))" > -->
        <input type="text" v-blur-price="price">
        <h3>price: {{(price == 0 ? '0.00' : price) + ''}}</h3>
      </div>
    </card-panel>
  </div>
</template>

<script>
  import Vue from "vue"
  // Vue.directive('blur-price', {
  //   inserted: function (el, binding, vnode) {
  //     let _this = vnode.context.$data
  //     let _price = binding.value
  //     if (Number.isInteger(_price)) _price += ".00"
  //     el.value = _price

  //     el.oninput = function() {
  //       let val = Number(el.value)
  //       if (isNaN(val)) return
  //       _this.price = Number(el.value)
  //     }

  //     el.onblur = function() {
  //       let val = Number(el.value)
  //       if (isNaN(val)) return
  //       if (Number.isInteger(val)) {
  //         el.value = val + ".00"
  //       } else {
  //         el.value += ''
  //       }
  //       _this.price = Number(el.value)
  //     }
  //   }
  // })
  export default {
    data() {
      return {
        price: 0.00
      }
    },
  }
</script>
