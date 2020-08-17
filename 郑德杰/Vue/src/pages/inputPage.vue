<template>
  <form novalidate v-submit="doSubmit">
    <div class="row">
      <label>姓名</label>
      <ep-input v-model="params.personName" v-valid-required></ep-input>
    </div>
    <div class="row">
      <label>备注</label>
      <ep-input v-model="params.remark" v-valid-required></ep-input>
    </div>
    <div class="row">
      <label>出生年月</label>
      <ep-calendar v-model="params.birthDate"></ep-calendar>
    </div>
    <div class="row">
      <label>国籍</label>
      <ep-select v-model="params.nation" :list="selectList.nations"></ep-select>
    </div>
    <div class="row">
      <label>是否自贸区</label>
      <ep-radio v-model="params.isFTA"></ep-radio>
    </div>
    <div class="btn-list">
      <input type="button" @click="doReset()" value="重置" class="btn btn-reset" />
      <input type="submit"  value="提交" class="btn btn-submit" />
      <input type="button" @click="doChange()" value="改变数据" class="btn btn-change"/>
    </div>
    <div class="line">
      <label>{{params.datalist}}</label>
      <ep-line v-model='params.datalist'></ep-line>
    </div>
    
  </form>
</template>
<script>
export default {
  data() {
    return {
      params: {
        personName: "zdj",
        remark:"真的帅",
        birthDate: "19971213",
        nation: "1",
        isFTA: false,
        datalist:[820, 932, 901, 934, 1290, 1330, 1320]
      },
      selectList: {
        nations: {
          1: "A国",
          2: "B国",
          3: "C国",
          4: "D国",
          5: "E国",
          6: "F国",
          7: "G国",
        },
      },
    };
  },
  methods: {
    doChange(){
      // debugger
      this.params.datalist=[
      +(Math.random()*1500).toFixed(0),
      +(Math.random()*1500).toFixed(0),
      +(Math.random()*1500).toFixed(0),
      +(Math.random()*1500).toFixed(0),
      +(Math.random()*1500).toFixed(0),
      +(Math.random()*1500).toFixed(0),
      +(Math.random()*1500).toFixed(0)
    ];
    },
    // 表单提交方法
    doSubmit() {
      this.$router.push({
        // 第一种方式
        // path: "/output",
        // query:{
        //   paramsData:this.params
        // }
        // 第二种方式
        name: "output",
        params: {
          paramsData: this.params,
        },
      });
    },
    // 重置方法
    doReset() {
      console.warn("表单重置方法触发了");
    },
  },
};
</script>
<style lang="scss" scoped>
form {
  width: 800px;
  padding: 10px 0;
  &.ep-invalid div.btn-list > .btn.btn-submit {
    background-color: red;
  }
  div {
    &.row {
      & > label {
        width: 6em;
        display: inline-block;
        text-align: right;
      }
      line-height: 1.6em;
    }
    &.btn-list {
      text-align: center;
      margin-top: 14px;
      & > .btn {
        padding: 3px 10px;
        border-radius: 6px;
        color: white;
        &.btn-submit {
          background-color: rgb(25, 186, 235);
        }
        &.btn-reset {
          background-color: rgb(214, 210, 204);
        }
        &.btn-change {
          background-color: rgb(218, 39, 77);
        }
      }
    }
  }
}
</style>