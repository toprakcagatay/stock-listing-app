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
          <v-col cols="4"><v-btn v-on:click="addSelected">Add</v-btn></v-col>
        </v-row>
      </v-container>



    </v-list-item-action>
  </v-list-item>
</template>
<script lang="ts">
  import Vue from 'vue'
  import store from '../store'

  export default Vue.extend({
    name: "AddListItem",
    props: ["coin"],
    data: () => ({
      count: 0
    }),
    methods: {
      addSelected: function() {
        if (this.count>0)
          store.commit("addCoin", {coin: this.coin, count: this.count as number});
      }
    }

  });
</script>
