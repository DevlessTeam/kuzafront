import Vue from 'vue'
import Vuex from 'vuex'
import Devless from '../utils/devless'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    link: '',
    order: '',
    loading: true,
    vues: 0,
    shop: undefined,
    inventory: [],
    deliveryFee: 0,
    deliveryOptions: [],
    selectedProduct: []
  },
  mutations: {
    getUrl (state) {
      state.link = location.pathname.substring(1)
    },
    addOrder (state, val) {
      state.order = val
    },
    changeVues (state, val) {
      state.vues = val
    },
    setFormStructure (state, val) {
      state.shop = val
    },
    setInventory (state, val) {
      state.inventory = val
    },
    addProduct (state) {
      state.selectedProduct.push(state.inventory[0])
    },
    changeLoading (state) {
      state.loading = !state.loading
    }
  },
  actions: {
    async fetchStructure ({commit, state}) {
      commit('getUrl')
    },
    async fetchInventory (context) {
      const res = await Devless.queryData('SocialSell', 'inventory', {
        where: `shop_id,${context.state.link}`
      })
      if (res.status_code === 625) {
        context.commit('changeLoading')
        context.commit('setInventory', res.payload.results)
        context.commit('addProduct', res.payload.results[0])
        return
      }
      alert('An error occurred')
      console.log(res)
    }
  },
  getters: {
    getTotal (state, context) {
      return context.getSubTotal + state.deliveryFee
    },
    getSubTotal (state) {
      let total = 0
      state.selectedProduct.map(v => {
        total += v.price * v.quantity
      })
      return total
    }
  }
})

export default store
