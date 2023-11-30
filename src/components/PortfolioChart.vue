<template>
  <apexchart type="pie" width="380" :options="chartOptions" :series="series" ref="realtimeChart"></apexchart>
</template>
<script lang="ts">
  import Vue from 'vue'
  import VueApexCharts from 'vue-apexcharts'
  import store from '../store'
  Vue.use(VueApexCharts)
  export default Vue.extend({
    name: "PortfolioChart",
    data: () => ({
      series: [],
      chartOptions: {}
    }),
    watch: {
      chartSeries: function(){
        this.series = this.chartSeries;
      },
      chartLabels: function(){
        this.chartOptions = {
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: this.chartLabels,
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        };
        /*
        console.log(this, this.chartLabels);
        Vue.set(this.chartOptions,"labels", this.chartLabels);
        console.log(this.$refs?.realtimeChart)
        this?.$refs?.realtimeChart?.*/
        //this?.$refs?.realtimeChart?.updateOptions({ labels: this.chartLabels });
      }
    },
    computed: {
      chartSeries: function():any{
        let series = [];

        for (const i in store.getters.getSelectedCoinList)
          series.push(store.getters.getSelectedCoinList[i].count);

        return series;
      },
      chartLabels: function():any{
        let labels = [];

        for (const i in store.getters.getSelectedCoinList)
          labels.push(store.getters.getSelectedCoinList[i].symbol);

        return labels;
      }
    },
    components: {
      apexchart: VueApexCharts,
    },
  });
</script>
