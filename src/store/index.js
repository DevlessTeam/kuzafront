import Vue from 'vue'
import Vuex from 'vuex'
import Devless from '../utils/devless'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    link: '',
    vues: {order: true, details: false, thankYou: false},
    formStructure: undefined,
    deliveryFee: 0,
    deliveryOptions: [],
    selectedProduct: [
      {name: 'Classic Assorted', price: 20.30, quantity: 1}
    ]
  },
  mutations: {
    getUrl (state) {
      state.link = location.pathname.substring(1)
    },
    addProduct (state, val) {
      state.selectedProduct.push(val)
    },
    removeProduct (state, val) {
      if (state.selectedProduct.length !== 1) {
        state.selectedProduct.splice(val, 1)
        return
      }
      alert('You must order at least one product')
    }
  },
  actions: {
    async fetchStructure (context) {
      context.commit('getUrl')
      if (context.state.link !== '') {
        const res = await Devless.queryData('kuzafront', 'form_structure', {
          where: `name,${context.state.link}`
        })
        console.log(res)
        if (res.status_code === 625 && res.payload.results.length !== 0) {
          context.state.formStructure = JSON.parse(res.payload.results[0].content)
          return
        }
        alert(`An unexpected error occurred`)
        console.log(res)
        return
      }
      alert(`Invalid url. Please get the right one`)
    },
    async fetchDelivery (context) {
      const res = await Devless.queryData('', '')
      if (res.status_code === 625) {
        context.state.deliveryOptions = res.payload.results
        return
      }
      alert('An error occurred')
      console.log(res)
    },
    async addOrders (context, val) {
      const res = await Devless.addData('', '', val)
      if (res.status_code === 609) {
        context.state.vues = {
          order: false,
          details: true,
          thankYou: false
        }
        alert('Order placed successfully')
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
      state.selectedProduct.map((v) => {
        total += v.price * v.quantity
      })
      return total
    }
  }
})

export default store
