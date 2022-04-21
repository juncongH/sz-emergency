<template>
  <div>
    <div class="header">深圳市应急救援数据可视化平台</div>
    <div class="content">
      <div class="leftcontent">
        <div id="population"><population /></div>
        <div id="economy"><economy /></div>
      </div>
      <div class="middlecontent">
        <div id="map">map</div>
        <div id="air"><air /></div>
      </div>
      <div class="rightcontent">
        <div id="hospital">
          <span class="graph_title">风速(m/s)</span>
      <div id="windspeed" class="graph_content"></div>
        </div>
        <div id="shelter"><shelter/></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as echarts from "echarts";

export default {
  name: "HelloWorld",
  data() {
    return {
      windspeed: [],
      rainfall: [],
    };
  },
  components: {

  },
  mounted() {
    this.initMap();
  },
  methods: {
    //echarts风雨可视化
    echartsGraph(id, data) {
      var chartDom = document.getElementById(id);
      var myChart = echarts.init(chartDom);
      var option, xlength;
      if (data.length) {
        xlength = data.length;
      } else {
        xlength = 0;
      }
      option = {
        xAxis: {
          type: "category",
          data: Array(xlength)
            .fill(1)
            .map((v, i) => ++i),
        },
        yAxis: {
          type: "value",
          scale: true,
        },
        axisLabel:{
          color:'#ffffff'
        },
        series: [
          {
            data: data,
            type: "line",
            smooth: true,
          },
        ],
        grid: {
          top: "20px",
          left: "40px",
          right: "10px",
          bottom: "60px",
          width:"auto",
          height:'auto'
        },
      };
      myChart.setOption(option);
      myChart.resize();
    },

    initMap() {
      let url = "/scene.json";
      axios.get(url).then((res) => {
        let data = res.data;
        this.windspeed=data['windspeed'];
        this.rainfall=data['rainfall'];
        this.echartsGraph("windspeed", this.windspeed);
      })
    },
  }
};
</script>

<style>
.header {
  height: 8vh;
  line-height: 7vh;
  background: url("../assets/title.png") no-repeat;
  background-size: cover;
  text-align: center;
  color: white;
  font-size: 30px;
}
.content {
  height: 92vh;
  margin-top: 10px;
  /* background-color: brown; */
  display: flex;
}
.leftcontent {
  width: 27%;
  /* background-color: cadetblue; */
}
.middlecontent {
  flex: 1;
  /* background-color: coral; */
}
.rightcontent {
  width: 27%;
  /* background-color: darkgray; */
}
#population {
  height: 56vh;
  margin: 10px;
  background: url("../assets/line1.png") no-repeat;
  background-size: 100% 100%;
}
#economy {
  height: 30vh;
  margin: 10px;
  background: url("../assets/line1.png") no-repeat;
  background-size: 100% 100%;
}
#hospital,
#shelter {
  height: 43vh;
  margin: 10px;
  background: url("../assets/line1.png") no-repeat;
  background-size: 100% 100%;
}
#map {
  height: 56vh;
  margin: 10px;
  background: url("../assets/line.png") no-repeat;
  background-size: 100% 100%;
}
#air {
  height: 30vh;
  margin: 10px;
  background: url("../assets/line1.png") no-repeat;
  background-size: 100% 100%;
}
</style>