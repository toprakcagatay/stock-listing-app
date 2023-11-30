<template>
  <v-list-item two-line>
    <v-list-item-content>
      <v-list-item-title>{{coin.symbol}}</v-list-item-title>
      <v-list-item-subtitle>{{coin.lastPrice}}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-container>
        <v-row>
          <v-col><v-text-field v-model="count" type="number"/></v-col>
          <v-col cols="4">
            <v-btn v-on:click="updateSelected">Update</v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn v-on:click="removeSelected">Remove</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-list-item-action>
  </v-list-item>
</template>
<script lang="ts">
  import Vue from 'vue'
  import store from '../store'

  export default Vue.extend({
    name: "UpdateListItem",
    props: ["coin"],
    data: () => ({
      count: 0
    }),
    methods: {
      updateSelected: function() {
        store.commit("updateCoin", {coin: this.coin, count: this.count as number});
      },
      removeSelected: function() {
        store.commit("removeCoin", {coin: this.coin});
      }
    },
    computed:{
      computedCount: function(){
        let count = 0;
        for (const i in store.getters.getSelectedCoinList){
          if (store.getters.getSelectedCoinList[i]["symbol"] == this.coin.symbol)
            count = store.getters.getSelectedCoinList[i]["count"];
        }
        return count;
      }
    },
    watch:{
      computedCount: function(){
        this.count = this.computedCount;
      }
    },
    created:function(){
      for (const i in store.getters.getSelectedCoinList){
        if (store.getters.getSelectedCoinList[i]["symbol"] == this.coin.symbol)
          this.count = store.getters.getSelectedCoinList[i]["count"];
      }

    }

  });
</script>
