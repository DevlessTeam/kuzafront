<template>
  <div class="container">
    <div class="row text-center dead-center">
      <div class="pd-tb-mini mr-b-30">
        <img src="static/success.png">
        <h2>Thank You.</h2>
        <p style="font-size:16px; color:#5C5C5C; margin-top: 20px">You have successfully submitted your meals for the week.</p>
        <a v-if="$store.state.payment_link" :href="$store.state.payment_link" target="_blank" class="btn btn-success mr-t-20">Click here to Pay</a>
        <a v-else :href="url" class="btn btn-success mr-t-20">Shop again</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    url () {
      return `${location.origin}/f/#/${this.$store.state.link}`
    }
  }
}
</script>
