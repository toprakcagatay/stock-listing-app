<template>
  <v-app>
    <search-modal/>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-btn class="ma-2" v-on:click="openSearchModal" v-if="!hasSelectedCoins">
        Add Stock
      </v-btn>
      <v-btn class="ma-2" v-on:click="openSearchModal" v-if="hasSelectedCoins">
        Add / Update
      </v-btn>
      <v-btn class="ma-2" v-on:click="refresh">
        Refresh
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import store from './store'
import SearchModal from './components/SearchModal.vue'

export default Vue.extend({
  name: 'App',
  store: store,
  data: () => ({
    showSearchModal: false,
    polling: 0
  }),
  mounted: function(){
    this.pollData();
  },
  methods: {
    pollData: function(){
      this.polling = setInterval(()=>{
        store.dispatch("fetchCoins");
      }, 1000*60*20);
      store.dispatch("fetchCoins")
    },
    openSearchModal: function(){
      store.commit("setSearchModal", true);
    },
    refresh: function(){
      clearInterval(this.polling);
      this.pollData();
    }
  },
  computed: {
    hasSelectedCoins: ()=>{
      return store.getters.getSelectedCoinList.length>0;
    }
  },
  components: {SearchModal}
});
</script>
