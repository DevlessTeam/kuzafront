<template>
  <div v-if="$store.state.formStructure.type === 'select'">
    <div v-if="inventory.length !== 0">
      <form role="form" @submit.prevent="submitOrder">
      <div class="products-wrap mr-t-30">
        <div class="row sm-gutter product-item" v-for="(item, i) in selectedProduct" :key="i">
          <div class="form-group col-xs-5">
            <label for="" class="control-label">Product</label>
            <select class="form-control prod-list" required="required" v-model="item.SocialSell_inventory_id" @input="changeInput($event, i)">
              <option value="">-- Select Product --</option>
              <option :value="option.id" v-for="(option, index) in inventory" :key="index">{{ option.name }}</option>
            </select>
          </div>
          <div class="form-group col-xs-3">
            <label for="" class="control-label">Qty</label>
            <input type="number" class="form-control prod-quant" min="1" v-model="item.quantity">
          </div>
          <div class="form-group col-xs-3">
            <label for="" class="control-label">Ghc</label>
            <input type="number" readonly class="form-control" :value="item.quantity * item.buying_price">
          </div>
          <div class="form-group col-xs-1 dyn-btn">
            <label for="" class="control-label">&nbsp;</label>
            <button type="button" class="btn btn-danger removeRow" @click="removeItem(i)">x</button>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-6">
          <a class="btn btn-success addRow" @click="addProduct">+ Add Product</a>
        </div>
        <div class="col-xs-6 text-right">
          <h5 class="mr-t-10">Sub Total: Gh&#8373; {{ getSubTotal }}</h5>
        </div>
      </div>
      <hr class="mr-tb-20">

      <div class="row" v-if="$store.state.formStructure.notes">
        <div class="form-group col-xs-12">
          <textarea name="" class="form-control" placeholder="Additional notes or description." rows="5" v-model="notes"></textarea>
        </div>
      </div>

      <div class="row" v-if="$store.state.formStructure.delivery">
        <div class="col-md-12 ">
          <label for="">Delivery Location</label>
        </div>
        <div class="form-group col-xs-6">
          <select class="form-control" required="required" v-model="deliver.id" @input="selectDelivery($event)">
            <option value="">-- Delivery Location --</option>
            <option :value="index" v-for="(delivery, index) in deliveries" :key="index">{{ delivery.location }}</option>
          </select>
        </div>
        <div class="col-xs-6 text-right">
          <h5 class="mr-t-10 fs16 bold-4">Delivery: Gh&#8373; {{ deliver.charge }}</h5>
        </div>
      </div>
      <div class="row">
        <div class="form-group col-md-12 mr-t-20 text-center">
          <button type="submit" class="btn btn-primary">Pay (Gh&#8373; {{ getTotal }})</button>
        </div>
      </div>
    </form>
    </div>
    <spinner v-else message='loading inventory'></spinner>
  </div>
</template>

<script>
import Spinner from 'vue-simple-spinner'
import Devless from '@/utils/devless'

export default {
  components: {
    Spinner
  },
  data: () => ({
    selectedProduct: [{
      shop_id: '',
      quantity: 1,
      buying_price: '',
      SocialSell_orders_id: '',
      SocialSell_inventory_id: ''
    }],
    deliveries: [],
    inventory: [],
    notes: '',
    deliver: {
      id: '',
      charge: 0,
      location: ''
    }
  }),
  methods: {
    changeInput (e, i) {
      let _id = parseInt(e.target.value)
      let _self = this
      this.inventory.map((v) => {
        if (v.id === _id) {
          _self.selectedProduct[i].buying_price = 12
        }
      })
    },
    selectDelivery (e) {
      this.deliver = this.deliveries[e.target.value]
    },
    addProduct () {
      this.selectedProduct.push({
        shop_id: '',
        quantity: 1,
        buying_price: '',
        SocialSell_orders_id: '',
        SocialSell_inventory_id: ''
      })
    },
    removeItem (index) {
      if (this.selectedProduct.length !== 1) {
        this.selectedProduct.splice(index, 1)
        return
      }
      alert('You must order at least one product')
    },
    async fetchInventory () {
      const res = await Devless.queryData('SocialSell', 'inventory', {
        where: `shop_id,${this.$store.state.link}`
      })
      if (res.status_code === 625) {
        const _self = this
        res.payload.results.map(function (v) {
          let singleItem = {
            price: v.price,
            id: v.id,
            name: v.name
          }
          _self.inventory.push(singleItem)
        })
        this.deliveries = res.payload.properties.delivery_locations
        return
      }
      alert('An error occurred')
      console.log(res)
    },
    submitOrder () {
      const _self = this
      this.selectedProduct.map((v) => {
        v.shop_id = _self.$store.state.link
      })
      let data = {
        'name': '',
        'contact': '',
        'total_price': '',
        'date': '',
        'status': 'pending',
        'notes': this.notes,
        'location': this.deliver.location,
        'shop_id': this.$store.state.link,
        'purchases': this.selectedProduct
      }
      this.$store.commit('addOrder', data)
      this.$store.commit('changeVues', 1)
    }
  },
  computed: {
    getSubTotal () {
      let subTotal = 0
      this.selectedProduct.map((v) => {
        subTotal += v.quantity * v.buying_price
      })
      return subTotal
    },
    getTotal () {
      return this.deliver.charge + this.getSubTotal
    }
  },
  created () {
    this.fetchInventory()
  }
}
</script>
