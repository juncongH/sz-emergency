<template>
  <div id="parent">
    <div style="height: 10%; color: white; font-size: 24px;margin:10px 0 0 10px">人口</div>
    <div class="row">
      <div class="item">
        <div style="margin:25px;color: #0A7187; font-size: 20px">区域:<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ this.region }}</div>
        <div style="margin:25px;color: #0A7187; font-size: 20px">总数:<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ this.pop.pop_sum }}</div>
        <!-- <div>比例:{{ this.pop_pecent }}</div> -->
      </div>
      <div class="item"><div id="gender" /></div>
    </div>
    <div class="row">
      <div class="item"><div id="age" /></div>
      <div class="item"><div id="know" /></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as echarts from "echarts";
export default {
  data() {
    return {
      region: "深圳市",
      pop: {
        pop_sum: 17560061,
        pop_age1: 15.11,
        pop_age2: 79.53,
        pop_age3: 5.36,
        pop_age4: 3.22,
        pop_college: 25849,
        pop_gender: 55.04,
        pop_high: 20860,
        pop_junior: 31835,
        pop_none: 8662,
        pop_primary: 12794,
      },
    };
  },
  mounted() {
    this.changeRegion();
    this.GenderGraph(this.pop.pop_sum, this.pop.pop_gender);
    this.AgeGraph(
      this.pop.pop_sum,
      this.pop.pop_age1,
      this.pop.pop_age2,
      this.pop.pop_age3,
      this.pop.pop_age4
    );
    this.KnowGraph(
      this.pop.pop_college,
      this.pop.pop_high,
      this.pop.pop_junior,
      this.pop.pop_primary
    );
  },
  watch: {
    pop: {
      handler: function (nVal, oVal) {
        if (this.pop) {
          if (nVal) {
            this.GenderGraph(nVal.pop_sum, nVal.pop_gender);
            this.AgeGraph(
              nVal.pop_sum,
              nVal.pop_age1,
              nVal.pop_age2,
              nVal.pop_age3,
              nVal.pop_age4
            );
            this.KnowGraph(
              nVal.pop_college,
              nVal.pop_high,
              nVal.pop_junior,
              nVal.pop_primary
            );
          } else {
            this.GenderGraph(oVal.pop_sum, oVal.pop_gender);
            this.AgeGraph(
              oVal.pop_sum,
              oVal.pop_age1,
              oVal.pop_age2,
              oVal.pop_age3,
              oVal.pop_age4
            );
            this.KnowGraph(
              oVal.pop_college,
              oVal.pop_high,
              oVal.pop_junior,
              oVal.pop_primary
            );
          }
        } else {
          this.GenderGraph(this.pop.pop_sum, this.pop.pop_gender);
        }
      },
      deep: true,
    },
  },
  methods: {
    changeRegion() {
      this.$bus.on("region", (data) => {
        this.region = data;
        axios.get("/data/popeco.json").then((result) => {
          for (var i in result.data) {
            if (result.data[i].name === this.region) {
              // console.log(result.data[i])
              this.pop.pop_sum = result.data[i].pop_sum;
              this.pop.pop_age1 = result.data[i].pop_age1;
              this.pop.pop_age2 = result.data[i].pop_age2;
              this.pop.pop_age3 = result.data[i].pop_age3;
              this.pop.pop_age4 = result.data[i].pop_age4;
              this.pop.pop_college = result.data[i].pop_college;
              this.pop.pop_gender = result.data[i].pop_gender;
              this.pop.pop_high = result.data[i].pop_high;
              this.pop.pop_junior = result.data[i].pop_junior;
              this.pop.pop_none = result.data[i].pop_none;
              this.pop.pop_primary = result.data[i].pop_primary;
            }
          }
        });
      });
    },
    GenderGraph(pop_sum, pop_gender) {
      var myChart = echarts.init(document.getElementById("gender"));
      var option = {
        title: {
          text: "性别比例",
          textStyle: {
            fontSize: 16,
            color: "#0A7187",
          },
          bottom:"5%",
          right:"30%"
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            type: "pie",
            radius: ["40%", "60%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
            },
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: Math.floor((pop_sum * pop_gender) / 100),
                name: "男性",
                itemStyle: { color: "#4169E1" },
              },
              {
                value: pop_sum - Math.floor((pop_sum * pop_gender) / 100),
                name: "女性",
                itemStyle: { color: "#FFC0CB" },
              },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
    AgeGraph(pop_sum, pop_age1, pop_age2, pop_age3, pop_age4) {
      var myChart = echarts.init(document.getElementById("age"));
      var option = {
          title: {
          text: "年龄分布",
          textStyle: {
            fontSize: 16,
            color: "#0A7187",
          },
          bottom:"10%",
          right:"30%"
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
          position: "right",
        },
        series: [
          {
            type: "pie",
            radius: ["40%", "60%"],
            top:"-20%",
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },

            data: [
              {
                value: Math.floor((pop_sum * pop_age1) / 100),
                name: "0-14周岁",
              },
              {
                value: Math.floor((pop_sum * pop_age2) / 100),
                name: "15-59周岁",
              },
              {
                value: Math.floor((pop_sum * pop_age3) / 100),
                name: "60-65周岁",
              },
              {
                value: Math.floor((pop_sum * pop_age4) / 100),
                name: "65周岁以上",
              },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
    KnowGraph(pop_college, pop_high, pop_junior, pop_primary) {
      var myChart = echarts.init(document.getElementById("know"));
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}/10万人",
          position: "right",
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          show: false,
        },
        yAxis: {
          type: "category",
          data: ["大学", "高中", "初中", "小学"],
          axisLabel: {
            textStyle: {
              color: "#0A7187",
            },
          },
        },
        grid: {
          top: "10%",
          left: "3%",
          right: "4%",
          bottom: "-3%",
          containLabel: true,
        },
        series: [
          {
            data: [pop_college, pop_high, pop_junior, pop_primary],
            type: "bar",
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style>
#parent {
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
.row {
  display: flex;
  flex: 1;
}
.item {
  flex: 1;
  /* border: 1px solid #000; */
}

#gender,
#age,
#know {
  width: 100%;
  height: 100%;
}
</style>