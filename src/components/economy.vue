<template>
<div style="height: 15%;color: white; font-size: 24px;margin:10px">经济</div>
  <div class="parent">
    <!-- <div class="row">
      <div class="item">
        
      </div>
      <div class="item"><div id="gender" /></div>
    </div>
    <div class="row">
      <div class="item"><div id="age" /></div>
      <div class="item"><div id="know" /></div>
    </div> -->
    <div>总产值:{{ this.eco.eco_sum }}</div>
    <div :style="'color:'+[this.eco.eco_sumPecent>'0'?'#FF6347':'green']">{{ this.eco.eco_sumPecent }}%</div>
    <div>第一产业:{{ this.eco.eco_first }}</div>
    <div :style="'color:'+[this.eco.eco_firsPecent>'0'?'#FF6347':'green']">{{ this.eco.eco_firsPecent }}%</div>
    <div>第二产业:{{ this.eco.eco_second }}</div>
    <div :style="'color:'+[this.eco.eco_secondPecent>'0'?'#FF6347':'green']">{{ this.eco.eco_secondPecent }}%</div>
    <div>第三产业:{{ this.eco.eco_third }}</div>
    <div :style="'color:'+[this.eco.eco_thirdPecent>'0'?'#FF6347':'green']">{{ this.eco.eco_thirdPecent }}%</div>
  </div>
</template>

<script>
import axios from "axios";
// import * as echarts from "echarts";
export default {
  data() {
    return {
      region: "深圳市",
      eco: {
        eco_sum: 27670.24,
        eco_sumPecent: 3.1,
        eco_first: 25.79,
        eco_firsPecent: -3.1,
        eco_second: 10454.01,
        eco_secondPecent: 1.9,
        eco_third: 17190.44,
        eco_thirdPecent: 3.9
      },
    };
  },
  mounted() {
    this.changeRegion();
  },
  // watch: {
  //   eco: {
  //     handler: function (nVal, oVal) {
  //       if (this.eco) {
  //         if (nVal) {
  //           this.EcoGraph(nVal.eco_first,nVal.eco_second,nVal.eco_third)
  //         } else {
  //           this.EcoGraph(oVal.eco_first,oVal.eco_second,oVal.eco_third)
  //         }
  //       } else {
  //         this.EcoGraph(this.eco_first,this.eco_second,this.eco_third)
  //       }
  //     },
  //     deep: true,
  //   },
  // },
  methods: {
    changeRegion() {
      this.$bus.on("region", (data) => {
        this.region = data;
        axios.get("/data/popeco.json").then((result) => {
          for (var i in result.data) {
            if (result.data[i].name === this.region) {
              // console.log(result.data[i])
              this.eco.eco_sum = result.data[i].eco_sum;
              this.eco.eco_sumPecent = result.data[i].eco_sumPecent;
              this.eco.eco_first = result.data[i].eco_first;
              this.eco.eco_firsPecent = result.data[i].eco_firsPecent;
              this.eco.eco_second = result.data[i].eco_second;
              this.eco.eco_secondPecent = result.data[i].eco_secondPecent;
              this.eco.eco_third = result.data[i].eco_third;
              this.eco.eco_thirdPecent = result.data[i].eco_thirdPecent;
            }
          }
        });
      });
    },
  },
};
</script>

<style>
.parent {
  height: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-rows: 20% 20% 20% 20%;
  grid-template-columns: 2fr 1fr;
  font-size: 20px;
  text-align: center;
  color:#0A7187;
}

</style>