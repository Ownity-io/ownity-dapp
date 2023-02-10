<template>
<div id="chart" v-if="render">
  <div id="centralPercentage">{{ 100-this.series[this.series.length-1] }}%</div>
  <apexchart type="donut" :options="chartOptions" :series="series">
  </apexchart>
</div>
</template>

<script>
import colors from './platet.js';
export default {
  props: ['chartData'],
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'donut',
        },
        legend: {
          show: false
        },
        tooltip:{
          fillSeriesColor: false
        },
        plotOptions:{
          pie: {
            startAngle: 90,
            endAngle:450,
            donut:{
              size:'40%'
            }
          }
          
        },
        colors: colors
      },
      centralPercentage:60,
      render:false
    }
  },
  mounted(){
    // //console.log(this.chartData);
    let tempSeries = [];
    let tempNames = [];
    for (let element of this.chartData){
      tempSeries.push(parseInt(element.val));
      tempNames.push(element.name);
    }
    this.series = tempSeries;
    this.chartOptions.labels = tempNames;
    if (this.series.length>1){
      this.chartOptions.colors[this.series.length-1] = 'rgba(248, 249, 253, 1)';
    }    
    // //console.log(tempNames)
    if (tempNames[0]=='You'){
      this.chartOptions.colors[0] = '#993CFC';
    }
    // //console.log(tempNames);
    this.render = true;
  }
};
</script>

<style>
#chart{
  width: 100%;
  position: relative;
  z-index: 1;
}

#centralPercentage{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 150%;
}

text {
  filter: none;
    box-shadow: none !important;
    font-family: 'Rubik', sans-serif !important;
    font-size: 60%;
}
.vue-apexcharts{
  transform: scale(1.15);
}
/* for customizing label text color */
.apexcharts-tooltip span {
    color: #ffffff;
}

@media (max-width: 991px) {
  
  .vue-apexcharts{
      transform: scale(1);
    }
}
</style>