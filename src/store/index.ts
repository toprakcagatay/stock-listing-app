import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    coinList: [],
    selectedCoinList: [],
    searchModal: false
  },
  getters: {
    getCoinList: (state) => state.coinList,
    getSelectedCoinList: (state) => state.selectedCoinList,
    getSearchModal: (state) => state.searchModal,
    getSelectedCoinObjects: (state) => {
      const cs:any = [];
      for (const i in state.coinList){
        for (const j in state.selectedCoinList){
          if (state.coinList[i]["symbol"] == state.selectedCoinList[j]["symbol"])
            cs.push({obj: state.coinList[i], count: state.selectedCoinList[j]["count"]});
        }
      }
      return cs;
    }
  },
  mutations: {

    setCoinList(state, coinList) {
      state.coinList = coinList;
    },
    addCoin(state: any, payload: any) {
      state.selectedCoinList.push({symbol: payload.coin.symbol, count: parseInt(payload.count)});
    },
    updateCoin(state: any, payload: any) {
      for(const i in state.selectedCoinList){
        if (state.selectedCoinList[i]["symbol"] == payload.coin.symbol)
          state.selectedCoinList[i]["count"] = parseInt(payload.count);
      }
    },
    removeCoin(state: any, payload: any) {
      for(const i in state.selectedCoinList){
        if (state.selectedCoinList[i]["symbol"] == payload.coin.symbol)
          state.selectedCoinList.splice(i,1);
      }
    },
    setSearchModal(state, open) {
      state.searchModal = open;
    },
  },
  actions: {
    async fetchCoins({commit}){
      try {
        const data = await axios.get("https://api2.binance.com/api/v3/ticker/24hr");
        commit("setCoinList", data.data);
      } catch(error){
        console.error(error);
      }
    }
  },
  modules: {
  }
})
