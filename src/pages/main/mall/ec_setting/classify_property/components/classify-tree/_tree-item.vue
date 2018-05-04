<template>
  <li class="_tree-item" :class="[{'_open': open}]">
    <div class="_padding-line"></div>
    <div class="_tree-item-bar" href="#">
      <div class="_tree-toggle-icon" v-show="hasChildren" @click.stop="toggleTree"></div>
      <a href="javascript:;" class="_tree-item-a" @click.prevent="treeClick($event, 'checked')">
        <div class="_tree-item-icon"></div>
        <div class="_tree-item-label">
          <span>{{model[label]}}</span>
        </div>
      </a>
    </div>
    <ul class="_tree-children" v-show="open && hasChildren">
      <tree-item 
        :model="m" v-for="(m, i) in model.children" 
        :index="i" 
        :class="{'has-children': m.children && !!m.children.length}"
        :e="e"
        :d="d"
        :type="type"
        :label="label"
        :id="id" 
      ></tree-item>
    </ul>
  </li>
</template>

<script>
  import treeItem from "./_tree-item"
  export default {
    name: "treeItem",
    props: {
      model: {
        type: Object,
        default: () => {}
      },
      id: {
        type: String,
        default: 'id',
      },
      label: {
        type: String,
        default: '',
      },
      d: {
        type: Array,
        default: () => []
      },
      e: {
        type: Object,
        default: () => {
          return {
            $emit: function() {},
            $on: function() {}
          }
        }
      },
      type: {
        type: String,
        default: ''
      },
    },
    components: { treeItem },
    computed: {
      hasChildren() {
        return this.model.children && this.model.children.length > 0
      },
    },
    data() {
      return {
        open: true,
      }
    },
    methods: {
      toggleTree() {
        this.open = !this.open
      },
      treeClick(ev, type) { 

        this.cid = this.model.cid
        this.e.$emit('treeClick', { [this.label]: this.model[this.label], [this.id]: this.model[this.id], parentId: this.model.parentId })
        
        let $all = document.querySelectorAll("._tree ._tree-item-a")
        Array.prototype.forEach.call($all, (e, i) => {
          e.classList.remove("active")
        })

        Array.prototype.forEach.call(this.$el.children, (e, i) => {
          if (e.classList.contains('_tree-item-bar')) {
            e.querySelector("._tree-item-a").classList.add("active")
          }
        })     
      },
    }
  }
</script>
