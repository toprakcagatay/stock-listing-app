<template>

  <v-container>

    <v-row>
      <v-col>
        <portfolio-list />
      </v-col>
      <v-col>
        <portfolio-chart />
      </v-col>
    </v-row>
  </v-container>

</template>

<script lang="ts">
  import Vue from 'vue'
  import PortfolioList from '../components/PortfolioList.vue'
  import PortfolioChart from '../components/PortfolioChart.vue'

  export default Vue.extend({
    name: 'HomeView',
    props: ["showSearchModal"],
    components: {
      PortfolioList, PortfolioChart
    },
  })
</script>
