<template>
  <div>
    <h3 class="mr-b-20">Customer information</h3>
    <form @submit.prevent="advance">
      <div class="row">
        <div class="form-group col-sm-12">
          <label for="" class="control-label">Name</label>
          <input type="text" class="form-control" id="" placeholder="Enter your full name" v-model="name">
        </div>
        <div class="form-group col-sm-12">
          <label for="" class="control-label">Contact</label>
          <input type="tel" class="form-control" id="" placeholder="Enter your phone number" v-model="phone">
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
      console.log(JSON.stringify(data))

      const res = await this.$devless.addData('SocialSell', 'place_order', data)
      console.log(res)
      this.loading = false
      if (res.status_code === 609) {
        this.$store.commit('changeVues', 2)
        return
      }
      alert('An error occurred')
      console.log(res)
    }
  }
}

</script>
