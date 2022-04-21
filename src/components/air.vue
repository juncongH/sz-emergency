<template>
  <div class="weathertitle">
    <div class="weather">地区:{{ this.region }}</div>
    <div class="weather">天气:{{ this.weather }}</div>
    <div class="weather">空气质量:{{ this.air }}</div>
    <div class="weather">{{ this.wind }}</div>
  </div>
  <div class="weathercontent">
    <div id="humidity" style="float: left; width: 30%"></div>
    <div id="temp" style="float: right"></div>
  </div>
</template>

<script>
import axios from "axios";
import * as echarts from "echarts";

export default {
  data() {
    return {
      region: "深圳市",
      citycode: 169,
      weather: "",
      air: "",
      wind: "",
      humidity: 0,
      temp: {
        temp_high: [],
        temp_low: [],
      },
    };
  },
  mounted() {
    this.changeRegion();
    this.getWeather(this.citycode);
    this.humidityGraph(this.humidity);
    this.tempGraph(this.temp);
  },
  watch: {
    citycode: {
      handler: function (nVal, oVal) {
        if (this.citycode) {
          if (nVal) {
            this.getWeather(nVal);
          } else {
            this.getWeather(oVal);
          }
        } else {
          this.getWeather(this.citycode);
        }
      },
      deep: true,
    },
    humidity: {
      handler: function (nVal, oVal) {
        if (this.humidity) {
          if (nVal) {
            this.humidityGraph(nVal);
          } else {
            this.humidityGraph(oVal);
          }
        }
      },
      deep: true,
    },
    temp: {
      handler: function (nVal, oVal) {
        if (this.temp) {
          if (nVal) {
            this.tempGraph(nVal);
          } else {
            this.tempGraph(oVal);
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    changeRegion() {
      this.$bus.on("region", (data) => {
        this.region = data;
        switch (this.region) {
          case "福田区":
            this.citycode = 2893;
            break;
          case "南山区":
            this.citycode = 2894;
            break;
          case "宝安区":
            this.citycode = 2895;
            break;
          case "龙岗区":
            this.citycode = 2896;
            break;
          case "盐田区":
            this.citycode = 2897;
            break;
          case "罗湖区":
            this.citycode = 2964;
            break;
          case "龙华区":
            this.citycode = 8434;
            break;
          case "坪山区":
            this.citycode = 8435;
            break;
          case "光明区":
            this.citycode = 179;
            break;
          case "大鹏新区":
            this.citycode = 953;
            break;
        }
      });
    },
    getWeather(id) {
      axios
        .get(
          "/api/?app=weather.today&weaId=" +
            String(id) +
            "&appkey=61138&sign=1ed5504d79d5d8f09f8f352bd4379a3a&format=json"
        )
        .then((res) => {
          var data = res.data.result;
          //   console.log(data)
          this.weather = data.weather;
          this.air = data.aqi;
          this.wind = data.wind + " " + data.winp;
          this.humidity = Number(data.humidity.substring(0, 2));
        });
      // var day=new Date()
      // console.log(day.getUTCFullYear()+"-"+(day.getMonth()+1)+"-"+day.getUTCDate())
      axios
        .get(
          "/api/?app=weather.future&weaId=" +
            String(id) +
            "&appkey=61138&sign=1ed5504d79d5d8f09f8f352bd4379a3a&format=json"
        )
        .then((res) => {
          var data = res.data.result;
          for (var i in data) {
            this.temp.temp_high.push(data[i].temp_high);
            this.temp.temp_low.push(data[i].temp_low);
          }
        });
    },
    humidityGraph(humidity) {
      var myChart = echarts.init(document.getElementById("humidity"));
      var option = {
        title: {
          show: true,
        },
        series: [
          {
            type: "gauge",
            progress: {
              show: true,
              width: 10,
            },
            itemStyle: {
              color: "#0A7187",
            },
            axisLine: {
              lineStyle: {
                width: 10,
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              length: 10,
              lineStyle: {
                width: 2,
                color: "#0A7187",
              },
            },
            axisLabel: {
              show: false,
              distance: 10,
              color: "#0A7187",
              fontSize: 10,
            },
            anchor: {
              show: true,
              showAbove: true,
              size: 5,
              itemStyle: {
                borderWidth: 5,
              },
            },
            title: {
              offsetCenter: [0, "110%"],
              fontSize: 14,
              color: "#0A7187",
            },
            detail: {
              valueAnimation: true,
              fontSize: 24,
              color: "#0A7187",
              offsetCenter: [0, "70%"],
            },
            data: [
              {
                value: humidity,
                name: "空气湿度",
              },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
    tempGraph(temp) {
      var day = new Date();
      var month = day.getMonth() + 1;
      var date = day.getUTCDate();
      // console.log(day.getUTCFullYear()+"-"+(day.getMonth()+1)+"-"+day.getUTCDate())
      var myChart = echarts.init(document.getElementById("temp"));
      var option = {
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: "3%",
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          //   boundaryGap: false,
          data: [
            month + "-" + date,
            month + "-" + (date + 1),
            month + "-" + (date + 2),
            month + "-" + (date + 3),
            month + "-" + (date + 4),
            month + "-" + (date + 5),
            month + "-" + (date + 6),
          ],
          axisLabel: {
            textStyle: {
              color: "#0A7187",
            },
          },
        },
        yAxis: {
          type: "value",
          min: 20,
          max: 40,
          axisLine: {
            lineStyle: {
              color: "#0A7187",
            },
          },
          axisLabel: {
            formatter: "{value} °C",
          },
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            name: "最高温",
            type: "line",
            data: temp.temp_high,
            lineStyle: {
              color: "#DC143C",
            },
            itemStyle: {
              color: "#DC143C",
              normal: { label: { show: true, color: "#DC143C" } },
            },
          },
          {
            name: "最低温",
            type: "line",
            data: temp.temp_low,
            lineStyle: {
              color: "#1E90FF",
            },
            itemStyle: {
              color: "#1E90FF",
              normal: {
                label: { show: true, color: "#1E90FF", position: "bottom" },
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style>
.weathertitle {
  width: 100%;
  height: 20%;
  display: flex;
}
.weather {
  flex: 1;
  margin: 0 auto;
  color: #0A7187; 
  font-size: 20px;
  margin: 5px;
  text-align: center;
}
.weathercontent {
  height: 80%;
  display: flex;
}

#humidity,
#temp {
  width: 100%;
  height: 100%;
}
</style>