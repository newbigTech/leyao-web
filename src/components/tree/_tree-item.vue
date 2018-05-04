<template>
  <li class="_tree-item" :class="[{'_open': open}, checkedState]" :state="this.model.checked">
    <div class="_padding-line"></div>
    <div class="_tree-item-bar" href="#">
      <div class="_tree-toggle-icon" v-show="hasChildren" @click.stop="toggleTree" :class="{'open': open}"></div>
      <a href="javascript:;" class="_tree-item-a" @click.prevent="treeClick($event, 'checked')" :class="{'active': type == 'treeSelect' ? false : 0 == this.model[id]}">
        <div class="_tree-item-checkbox" v-show="type == 'treeSelect'">
          <!-- <svg class="icon" width="16px" height="16.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M832 928.00086l-640 0c-52.9288 0-96.00086-43.07206-96.00086-95.99914l0-640c0-52.9288 43.07206-96.00086 96.00086-96.00086l640 0c52.92708 0 95.99914 43.07206 95.99914 96.00086l0 640C928.00086 884.9288 884.9288 928.00086 832 928.00086zM192 160.00086c-17.632039 0-32.00086 14.368821-32.00086 32.00086l0 640c0 17.664722 14.368821 31.99914 32.00086 31.99914l640 0c17.664722 0 31.99914-14.336138 31.99914-31.99914l0-640c0-17.632039-14.336138-32.00086-31.99914-32.00086L192 160.00086z"  /></svg> -->
          <svg class="icon icon-check"><use xlink:href="#icon-check"></use></svg>
          <!-- <svg class="icon icon-span"><use xlink:href="#icon-span"></use></svg> -->
          <div class="icon-span"></div>
        </div>
        <div class="_tree-item-icon"></div>
        <div class="_tree-item-label">
          <span>{{model[label]}}</span>
        </div>
      </a>
      <div class="_tree-item-actions" v-show="1" @click.stop=";" v-if="type !== 'treeSelect'">
        <div class="_tree-actions-icon">
          <svg class="icon"><use xlink:href="#icon-more"></use></svg>
          <ul class="_tree-actions">
            <li class="_tree-actions-item"><a href="javascript:;" @click.stop="rename">重命名</a></li>
            <li class="_tree-actions-item"><a href="javascript:;" @click.stop="add(0)">增加同级</a></li>
            <li class="_tree-actions-item"><a href="javascript:;" @click.stop="add(1)">增加子类</a></li>
            <li class="_tree-actions_line"></li>
            <li class="_tree-actions-item _tree-actions-danger"><a href="#" @click.prevent.stop="remove()">删除此类</a></li>
          </ul>
        </div>
      </div>
    </div>
    <ul class="_tree-children" v-show="open && hasChildren">
      <tree-item 
        :model="m" v-for="(m, i) in model.children" 
        :index="i" 
        :class="{'has-children': m.children && !!m.children.length}"
        :e="e"
        :d="d"
        :key="m[id]"
        :cid="m[id]"
        :type="type"
        :label="label"
        :id="id"
      ></tree-item>
    </ul>
  </li>
</template>

<script>
  import treeItem from "./_tree-item"
  import traverse from "lib/utils/traverse"

  export default {
    name: "treeItem",
    props: {
      model: {
        type: Object,
        default: () => {}
      },
      label: {
        type: String,
        default: "name",
      },
      id: {
        type: String,
        default: "cid"
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
      }
    },
    components: { treeItem },
    computed: {
      hasChildren() {
        return this.model.children && this.model.children.length > 0
      },
      checkedState() {
        if (this.model.checked == 0) return ''            //没有选中
        if (this.model.checked == 1) return 'partial'     //部分选中
        if (this.model.checked == 2) return 'all'         // 全部选中
        return undefined
      },
    },

    data() {
      return {
        open: true,
        cid: 0,
        dd: this.d.slice(),
        model_: this.model,
      }
    },
    methods: {
      toggleTree() {
        this.open = !this.open
      },
      treeClick(ev, type) { 
        if (this.type !== 'treeSelect') {
          this.cid = this.model[this.id]
          // console.log({ name: this.model.name, cid: this.model[this.id], parentId: this.model.parentId })
          this.e.$emit('treeClick', { name: this.model.name, cid: this.model[this.id], parentId: this.model.parentId, tree: this.dd })
          // console.log(this.$el)

          let $all = document.querySelectorAll("._tree ._tree-item-a")

          Array.prototype.forEach.call($all, (e, i) => {
            e.classList.remove("active")
          })

          Array.prototype.forEach.call(this.$el.children, (e, i) => {
            if (e.classList.contains('_tree-item-bar')) {
              e.querySelector("._tree-item-a").classList.add("active")
            }
          })
        }
        
        
        if (this.type == 'treeSelect') {
          let currrent, parent, sublings
          let model__ = this.model_
          let td = traverse(this.dd)

          td.forEach(function(t) {
            // 获取同级元素
            if (Array.isArray(t)) {
              sublings = t
            }
            // 获取当前元素
            if(!this.isRoot && this.notLeaf && !Array.isArray(t)) {
              // 挂载父元素
              // t.parent = Array.isArray(this.parent.node) ? this.parent.parent : this.parent
              if (t == model__) {
                t.checked = t.checked !== 0 ? 0 : 2
                // 设置该元素下的所有子元素状态
                traverse(t.children).forEach(function(tt) {
                  if (!Array.isArray(tt) && this.notLeaf) {
                    tt.checked = t.checked
                  }
                })

                // 向上遍历父元素
                while (this.parent) {
                  this.parent = this.parent.parent
                  if (Array.isArray(this.parent && this.parent.node)) continue
                  let checkStatus = 0
                  let children = this.parent && this.parent.node && this.parent.node.children
                  if (children) {
                    children.forEach(tt => checkStatus += tt.checked)
                    if (checkStatus === 0) this.parent.node.checked = 0
                    else if (checkStatus === children.length * 2) this.parent.node.checked = 2
                    else this.parent.node.checked = 1
                  }
                }
                this.stop()
              }
            }
          })
          this.e.$emit('treeCheck', { name: this.model.name, cid: this.model[this.id], parentId: this.model.parentId, tree: this.dd })
        }
        
      },
      rename() {
        this.$prompt('请输入类别名称', '重命名分类', {
          inputPattern: /^([\u4e00-\u9fa5]|[a-zA-Z0-9_]){1,15}$/,
          inputErrorMessage: '请输入1~15位不包含特殊字符的组合'
        })
        .then( ({ value }) => {
          console.log("rename: ", { name: value, cid: this.model[this.id], parentId: this.model.parentId })
          // this.$emit("treeRename", { name: value, cid: this.model[this.id], parentId: this.model.parentId })
          // this.$root.$emit("treeRename", { name: value, cid: this.model[this.id], parentId: this.model.parentId })
          this.e.$emit("treeRename", { name: value, cid: this.model[this.id], parentId: this.model.parentId, tree: this.dd })

        })
        .catch(() => {})
      },
      add(type) {
        this.$prompt('请输入类别名称', type == 1 ? '新增子类' : '新增同级', {
          inputPattern: /^([\u4e00-\u9fa5]|[a-zA-Z0-9_]){1,15}$/,
          inputErrorMessage: '请输入1~15位不包含特殊字符的组合'
        })
        .then(({ value }) => {
          console.log("add",{ name: value, cid: this.model[this.id], parentId: this.model.parentId })
          // this.$emit('treeAdd', { name: value, cid: this.model[this.id], parentId: this.model.parentId })
          // this.$root.$emit('treeAdd', { name: value, cid: this.model[this.id], parentId: this.model.parentId })
          this.e.$emit('treeAdd', { name: value, cid: this.model[this.id], parentId: this.model.parentId, tree: this.dd,type })
        })
        .catch(() => {})
      },
      remove() {
        this.$confirm(`确定删除 ${this.model.name}?`, '', {type: 'warning'})
        .then(() => {
          // console.log("remove", { name: this.model.name, cid: this.model[this.id], parentId: this.model.parentId})
          // this.$emit('treeRemove', { name: this.model.name, cid: this.model[this.id], parentId: this.model.parentId})
          // this.$root.$emit('treeRemove', { name: this.model.name, cid: this.model[this.id], parentId: this.model.parentId})
          this.e.$emit('treeRemove', { name: this.model.name, cid: this.model[this.id], parentId: this.model.parentId, tree: this.dd})
        })
        .catch(() => {
          // 取消
        })
      },
    }
  }
</script>
