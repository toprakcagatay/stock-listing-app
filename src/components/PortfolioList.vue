<template>
  <v-card v-if="coinList.length>0">
    <v-card-title>
      Coin Portfolio
    </v-card-title>
    <v-card-text>
      <v-list-item three-line v-for="coin in coinList" v-bind:key="coin.symbol">
        <v-list-item-content >
          <v-container>
            <v-list-item-title>{{coin.obj.symbol}}</v-list-item-title>
            <v-list-item-subtitle>{{coin.obj.lastPrice}} - {{coin.obj.weightedAvgPrice}} <v-text-field v-model="coin.count" type="number"/></v-list-item-subtitle>

          </v-container>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn class="ma-2" x-small v-on:click="updateSelected(coin.obj, coin.count)">Update</v-btn>
          <v-btn class="ma-2" x-small v-on:click="removeSelected(coin.obj)">Remove</v-btn>

        </v-list-item-action>
      </v-list-item>
    </v-card-text>

  </v-card>
</template>
<script lang="ts">
  import Vue from 'vue'
  import store from '../store'
  export default Vue.extend({
    name: "PortfolioList",
    data: () => ({

    }),
    methods: {
      updateSelected: function(coin: any, count:number) {
        store.commit("updateCoin", {coin: coin, count: count as number});
      },
      removeSelected: function(coin: any) {
        store.commit("removeCoin", {coin: coin});
      }
    },
    computed: {
      coinList: ()=>{
        return store.getters.getSelectedCoinObjects;
      }
    }
  });
</script>
