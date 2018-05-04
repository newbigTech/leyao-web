<template>
  <div class="style-demo _container">
    <card-panel v-show="0">
      <span slot="title">图片选择-与展示</span>
      <div slot="panel-body">
        <div class="_img-groups">
          <div class="_img-groups-container">
            <div class="_img-group">
              <div class="_img-box">
                <div class="_img-box-icon"><i class="el-icon-upload"></i></div>
                <div class="_img-box-text">选择/上传图片</div>
                <div class="_img-box-view">
                  <img src="http://192.168.1.227/pot/show/094681ed2f4d7dfffd69843ec8635676.jpg">
                  <div class="_img-box-view-mask">
                    <!-- <span>更改图片</span> -->
                    <button class="btn btn-xs btn-warning">更换</button>
                    <button class="btn btn-xs btn-danger">移除</button>
                  </div>
                </div>
              </div>
              <div class="_img-group-text">LOGO大图</div>
            </div>
            <div class="_img-group">
              <div class="_img-box">
                <div class="_img-box-icon"><i class="el-icon-upload"></i></div>
                <div class="_img-box-text">选择/上传图片</div>
                <div class="_img-box-view">
                  <img src="http://192.168.1.227/pot/show/094681ed2f4d7dfffd69843ec8635676.jpg">
                  <div class="_img-box-view-mask">
                    <!-- <span>更改图片</span> -->
                    <button class="btn btn-xs btn-warning">更换</button>
                    <button class="btn btn-xs btn-danger">移除</button>
                  </div>
                </div>
              </div>
              <div class="_img-group-text">LOGO小图</div>
            </div>
          </div>
          <div class="_img-groups-info">
            <!-- <p>图片大小不能超过500kb,格式只能为jpg,png,gif</p> -->
            <el-alert title="图片大小不能超过500kb,格式只能为jpg,png,gif" type="info" show-icon :closable="false" style="width: 331px;"> </el-alert>
          </div>
        </div>
      </div>
    </card-panel>

    <card-panel v-show="0">
      <div slot="panel-body">
        <el-upload v-for="n in 3"
          action="/pub/pubController/uploadPic"
          :show-upload-list="false"
          :before-upload="uploadBefore"
          :on-success="uploadSuccess(n)"
          :on-error="uploadError" 
          :on-progress="uploadProgress" 
          :default-file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
    </card-panel>

    <card-panel>
      <h3 slot="title">魔方</h3>
      <div slot="panel-body">
        <div class="_table-magic-card">
          <ul class="mul">
            <li
              v-for="(li, i) in tds" class="mli"
              :data-a="li.a"
              :data-b="li.b"
              :class="{'active': li.s, 'hover': li.h}"
              @click="clickLi(li)"
              @mouseenter="mouseenterLi(li)"
            >
             <i class="el-icon-plus"></i> 
            </li>
          </ul>
          <ul class="mul2">
            <li class="mli2" v-for="(li2, i2) in tds2"></li>
          </ul>
        </div>
      </div>
    </card-panel>
  </div>
</template>

<script>
  import prettysize from "lib/utils/prettysize"
  export default {
    data() {
      return {
        tds: [],
        tds2: [],
        tdsActive: [],
        tdsClick: [],
        tdsLast: {}
      }
    },
    methods: {
      // 大图标
      uploadBefore(file) {
        console.log('file.size: ', prettysize(file.size))
        // 限制文件大小 (大图标200kb一下)
        if (parseInt(prettysize(file.size)) > 600) {
          this.$message.error('大图标不能超过600kb, 请重新上传!')
          // return false
        }

        this.loading = 1
        try {
          this.previewPic = URL.createObjectURL(file)
          console.log('previewPic: ', this.previewPic)
        } catch(err) {
          this.previewPic = false
          console.log('URL.createObjectURL', err)
        }
      },

      uploadSuccess(n) {
        // console.log("n: ", n)
        return function(response, file, fileList) {
          console.log("success: ", n)
          console.log(arguments)
          if (response.success) {
            this.loading = 0
            this.picMD5_0 = response.result.picMD5
          }
        }
      },

      uploadProgress(e, f) {
        console.log(e, f)
      },

      uploadError (err, response, file) {
        console.log(`${file.name}上传失败!`)
        this.loading = 2
      },


      createMagicCard(num = 4) {
        let tds = []
        for (let i = 0; i < num; i++) {
          for (let ii = 0; ii < num; ii++) {
            tds.push({
              a: [ii * num, i * num],
              b: [(ii + 1) * num, (i + 1) * num],
              s: 0,
              h: 0
            })
          }
        }
        return tds
      },

      mouseenterLi(li) {
        let p = li.b

        // init
        if (this.tdsClick.length == 0) {
          this.tdsActive = this.tds.filter(td => {
            if (td.b[0] <= p[0] && td.b[1] <= p[1] && !td.s) {
              td.h = 1
              return true
            } else {
              td.h = 0 
              return false
            }
          })
          return
        }

        // right
        this.tdsActive = this.tds.filter(td => {
          if (td.b[0] <= p[0] && td.b[1] <= p[1] && !td.s) {
            td.h = 1
            return true
          } else {
            td.h = 0 
            return false
          }
        })
      },

      clickLi(li) {
        this.tdsActive.forEach(td => td.s = 1)
        this.tdsLast = li
        this.tdsClick.push(this.tdsActive)
      },

      getLis(p) {
        return this.tds.filter(td => {
          if (td.b[0] <= p[0] && td.b[1] <= p[1] && !td.s && this.tdsClick.length == 0) { 
            td.h = 1
            return true
          }

          if (td.b[0] <= p[0] && td.b[1] <= p[1] && !td.s && this.tdsLast.b[0] <= td.b[0] && this.tdsLast.b[1] >= td.b[1]) {
            td.h = 1
            return true
          }

          if (td.b[0] <= p[0] && td.b[1] <= p[1] && !td.s && this.tdsLast.b[0] >= td.b[0] && this.tdsLast.b[1] <= td.b[1]) {
            td.h = 1
            return true
          }

          if (td.b[0] <= p[0] && td.b[1] <= p[1] && !td.s && this.tdsLast.b[0] <= td.b[0] && this.tdsLast.b[1] <= td.b[1]) {
            td.h = 1
            return true
          }


          else {
            td.h = 0
            return false
          }
        })
      },
      
    },
    created() {
      this.tds = this.createMagicCard(4)
    }
  }
</script>

<style scope lang="sass">
  ._table-magic-card {
    width: 240px;
    height: 240px;

    table {
      width: 100%;
      height: 100%;
      background: #f8f8f8;
    }

    tr td{
      border: 2px solid #fff;
      cursor: pointer;
    }

    .mul {
      width: 100%;
      height: 100%;
      background: #f8f8f8;
    }
    .mli {
      width: 25%;
      height: 25%;
      float: left;
      border: 1px solid #fff;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ccc;
      font-size: 12px;
    }
    .mli.hover {
      background: #ddeafb;
    }




  }

</style>
