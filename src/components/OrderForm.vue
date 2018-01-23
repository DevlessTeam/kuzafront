<template>
  <div v-if="$store.state.formStructure.form_type === 'select_options'">
    <form role="form" @submit.prevent>
      <div class="products-wrap mr-t-30">
        <div class="row sm-gutter product-item" v-for="(item, index) in $store.state.selectedProduct" :key="index">
          <div class="form-group col-xs-5">
            <label for="" class="control-label">Product</label>
            <select class="form-control prod-list" required="required" :disabled="$store.state.formStructure.form_content.product_options.disabled" v-model="item.name">
              <option value="" data-p="0">-- Select Doughnut --</option>
              <!-- <option value="" data-p="8">Classic Assorted</option>
              <option value="" data-p="7">Premium Assorted</option>
              <option value="" data-p="15">Creamy Deluxe</option>
              <option value="" data-p="3">Rainbow Storm</option> -->
            </select>
          </div>
          <div class="form-group col-xs-3">
            <label for="" class="control-label">Qty</label>
            <input :type="$store.state.formStructure.form_content.quantity_options.type"
              class="form-control prod-quant" placeholder="1"
              v-if="$store.state.formStructure.form_content.quantity === 'input'"
              :disabled="$store.state.formStructure.form_content.quantity_options.disabled">
          </div>
          <div class="form-group col-xs-3">
            <label for="" class="control-label">Ghc</label>
            <input :type="$store.state.formStructure.form_content.price_options.type"
              :readonly="$store.state.formStructure.form_content.price_options.disabled" class="form-control" placeholder="20.30"
              v-if="$store.state.formStructure.form_content.price === 'input'" >
          </div>
          <div class="form-group col-xs-1 dyn-btn">
            <label for="" class="control-label">&nbsp;</label>
            <button type="button" class="btn btn-danger removeRow" @click="$store.commit('removeProduct', index)">x</button>
            <!-- <a href="#" class="text-danger removeRow"><i class="fa fa-times-circle"></i> x</a> -->
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-6">
          <a class="btn btn-success addRow" @click="addProduct">+ Add Product</a>
        </div>
        <div class="col-xs-6 text-right">
          <h5 class="mr-t-10">Sub Total: Gh&#8373; {{ $store.getters.getSubTotal }}</h5>
        </div>
      </div>
      <hr class="mr-tb-20">

      <div class="row" v-if="$store.state.formStructure.order_notes">
        <div class="form-group col-xs-12">
          <textarea name="" class="form-control" placeholder="Additional notes or description." rows="5"></textarea>
        </div>
      </div>

      <div class="row" v-if="$store.state.formStructure.delivery">
        <div class="col-md-12 ">
          <label for="">Delivery Location</label>
        </div>
        <div class="form-group col-xs-6">
          <select class="form-control" required="required">
            <option value="">-- Delivery Location --</option>
            <!-- <option value="">Accra</option>
            <option value="">Tema</option>
            <option value="">Nungua</option>
            <option value="">East Legon</option>
            <option value="">Madina</option> -->
          </select>
        </div>
        <div class="col-xs-6 text-right">
          <h5 class="mr-t-10 fs16 bold-4">Delivery: Gh&#8373; {{ $store.state.deliveryFee }}</h5>
        </div>
      </div>
      <div class="row">
        <div class="form-group col-md-12 mr-t-20 text-center">
          <button type="submit" class="btn btn-primary">Pay (Gh&#8373; {{ $store.getters.getTotal }})</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    addProduct () {
      const data = {
        name: '',
        price: 0,
        quantity: 0
      }
      this.$store.commit('addProduct', data)
    }
  }
}
</script>
