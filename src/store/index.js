import Vue from 'vue'
import Vuex from 'vuex'
import Devless from '../utils/devless'
import formStruct from '@/assets/form.json'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    link: '',
    order: '',
    loading: true,
    vues: 0,
    formStructure: undefined,
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
      state.formStructure = val
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
    fetchStructure (context) {
      context.commit('getUrl')
      if (context.state.link !== '') {
        if (formStruct[context.state.link]) {
          context.commit('setFormStructure', formStruct[context.state.link])
          return
        }
        alert(`An unexpected error occurred`)
        return
      }
      alert(`Invalid url. Please get the right one`)
    },
    async fetchDelivery (context) {
      const res = await Devless.queryData('SocialSell', '')
      if (res.status_code === 625) {
        context.state.deliveryOptions = res.payload.results
        return
      }
      alert('An error occurred')
      console.log(res)
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
