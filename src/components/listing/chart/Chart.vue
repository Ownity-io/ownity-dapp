<template>
<div id="chart" v-if="render">
  <div id="centralPercentage">{{ this.series[this.series.length-1] }}%</div>
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
    console.log(this.chartData);
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
    console.log(tempNames);
    this.render = true;
  }
};
</script>

<style>
#chart{
  width: 300px;
}

/* for customizing label text color */
.apexcharts-tooltip span {
    color: #ffffff;
}
</style>