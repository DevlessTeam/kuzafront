<template>
  <div>
    <h3 class="mr-b-20">Customer information</h3>
    <form @submit.prevent="advance">
      <div class="row">
        <div class="form-group col-sm-12">
          <label for="" class="control-label">Name</label>
          <input type="text" class="form-control" id="" placeholder="Enter your full name" v-model="name" required>
        </div>
        <div class="form-group col-sm-12">
          <label for="" class="control-label">Contact</label>
          <input type="number" class="form-control" id="" placeholder="Enter your phone number" v-model="phone" required>
        </div>
      </div>
      <div class="row">
        <div class="form-group col-md-12 mr-t-20 text-center">
          <button type="submit" class="btn btn-primary" v-if="!loading">Sumbit Order</button>
          <button type="submit" class="btn btn-primary" disabled v-else>Loading</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: '',
    phone: '',
    loading: false
  }),
  methods: {
    async advance () {
      this.loading = true
      let data = this.$store.state.order
      data.name = this.name
      data.contact = this.phone

      const res = await this.$devless.addData('SocialSell', 'place_order', data)
      this.loading = false
      if (res.status_code === 609) {
        this.$store.commit('changeVues', 2)
        if (res.payload.payment_link !== null) {
          this.$store.commit('SET_LINK', res.payload.payment_link)
        }
        return
      }
      alert('An error occurred')
      console.log(res)
    }
  }
}

</script>
