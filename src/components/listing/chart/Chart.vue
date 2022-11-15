<template>
  <DxPieChart id="pie" :data-source="chartData" :palette="customPlate" type="doughnut">
    <!-- palette="Soft Pastel" -->
    <DxSeries argument-field="region">
      <DxLabel :visible="true" format="millions">
        <DxConnector :visible="true" />
      </DxLabel>
    </DxSeries>
  </DxPieChart>
</template>

<script>
// https://js.devexpress.com/Demos/WidgetsGallery/Demo/Charts/Doughnut/Vue/Light/

import DxPieChart, {
  // DxLegend,
  DxSeries,
  DxTooltip,
  DxFormat,
  // DxLabel,
  DxConnector,
  DxExport,
} from "devextreme-vue/pie-chart";

import { customPlate } from "./platet.js";

export default {
  components: {
    DxPieChart,
    // DxLegend,
    DxSeries,
    DxTooltip,
    DxFormat,
    // DxLabel,
    DxConnector,
    DxExport,
  },
  data() {
    return {
      customPlate,
    };
  },
  props:['chartData']
  // methods: {
  //   customizeTooltip({ valueText, percent }) {
  //     return {
  //       text: `${valueText} - ${(percent * 100).toFixed(2)}%`,
  //     };
  //   },
  // },
};
</script>
<style>
#pie {
  /* height: 440px; */
}
.dxc-legend,
.dxc-background,
.dxc-labels-group ,
.dxc-annotations,
.dxc-hole-template,


.dxc-legend g,
.dxc-background g,
.dxc-labels-group g ,
.dxc-annotations g,
.dxc-hole-template g{
  display: none;
  width: 0 !important;
  height: 0 !important;
  clip-path: none !important;
}
.dxc-series-group {
  width: 100%;
}
</style>
