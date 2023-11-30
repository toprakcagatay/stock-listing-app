<template>
  <v-dialog v-model="show"
  v-on:click:outside="clickOutside"
      transition="dialog-bottom-transition">
      <v-card>
        <v-card-title>
          <v-text-field v-model="searchText"
          v-on:click:prepend-inner="removeSearchText"
          label="Coin Name"
          outlined
          clearable
          placeholder="Search coins..."/>
        </v-card-title>
        <v-card-text>
          <v-virtual-scroll
          height="300"
          item-height="64"
          :bench="0"
          :items="coinList"
        >
            <template v-slot:default="{ item }" >
              <add-list-item v-if="!isCoinSelected(item)" v-bind:key="item.symbol" v-bind:coin="item"/>
              <update-list-item v-if="isCoinSelected(item)" v-bind:key="item.symbol" v-bind:coin="item"/>
            </template>
          </v-virtual-scroll>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            v-on:click="clickDone">
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>
<script lang="ts">
  import Vue from 'vue'
  import store from '../store'
  import AddListItem from './AddListItem.vue'
  import UpdateListItem from './UpdateListItem.vue'
  export default Vue.extend({
    name: "SearchModal",
    data: () => ({
      searchText: "",
    }),
    computed: {
      coinList: function(){
        let coinList = [];
        
        if (this.searchText==null)
          coinList = store.getters.getCoinList;
        else
          for(let i in store.getters.getCoinList)
            if (store.getters.getCoinList[i].symbol.toLowerCase().includes(this.searchText?.toLowerCase()))
              coinList.push(store.getters.getCoinList[i])
        return coinList;
      },
      show: function(){
        return store.getters.getSearchModal;
      }
    },
    methods: {
      isCoinSelected: (coin: any)=>{
        for (const i in store.getters.getSelectedCoinList){
          if (store.getters.getSelectedCoinList[i]["symbol"] == coin.symbol) return true;
        }

        return false;
      },
      clickDone: ()=>{
        store.commit("setSearchModal", false);
      },
      clickOutside: ()=>{
        store.commit("setSearchModal", false);
      },
      removeSearchText: function(){
        console.log("remove");
        this.searchText = "";
      }
    },
    components: {AddListItem, UpdateListItem}

  });
</script>
