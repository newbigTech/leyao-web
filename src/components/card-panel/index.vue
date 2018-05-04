<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <div class="panel-title"><slot name="title"></slot></div>
      <div class="_panel-heading-right">
        <div class="panel-btns"><slot name="panel-btns"></slot></div>
      </div>
    </div>
    <div class="panel-body"><slot name="panel-body"></slot></div>
    <div class="panel-table"><slot name="panel-table"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "card-panel",
    props: {
      title: { type: String, default: "" }
    }
  }
</script>

<style lang="sass">
  body {
    .panel .panel-heading .panel-title{
      font-size: 14px;
    }
    .panel .panel-body:empty { display: none; }
    .panel .panel-heading {
      display: flex;
      align-items: center;
      // justify-content: space-between;
      // padding: 5px 15px;
      padding: 0 15px;
      min-height: 36px;
      height: 36px;
      .panel-title {
        width: auto;
        margin-right: 10px;
      }
      ._panel-heading-right {
        flex: 1;
        .panel-btns {
          display: flex;
          justify-content: flex-end;
        }
      }

    }
    .panel .panel-actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .panel .panel-actions > * {
      margin-left: 5px;
    }
    .panel._panel-outer {
      border-width: 0 0 1px 0;
      > .panel-heading {
        height: 41px;
      }
    }
    .panel._normal {
      > .panel-heading { height: 41px; }
    }
    .panel._big {
      > .panel-heading { height: 50px; }
    }
    .panel._small {
      > .panel-heading {
        height: 32px; min-height: 30px;
        padding: 0 7px;
        .panel-title { font-size: 13px; }
      }
    }
    .panel._center {
      > .panel-heading ._panel-heading-right .panel-btns {
        justify-content: center;
      }
    }
    .panel._left {
      > .panel-heading ._panel-heading-right .panel-btns {
        justify-content: flex-start;
      }
    }
    .panel { margin-bottom: 0;}
    // .panel-table table._clean-border{
    //   border: 0px;
    //   > tbody tr, > thead tr {
    //     > td:first-child, > th:first-child {
    //       border-left: 0;
    //     }
    //   }
    //   > tbody tr:last-child > td {
    //     border-bottom: 0;
    //   }
    // }
    .panel-table ._table-list { margin: -1px; }
  }
</style>
