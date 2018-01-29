<template>
  <div class="container">
    <div class="row text-center dead-center">
      <div class="pd-tb-mini mr-b-30">
        <img src="/static/success.png">
        <h2>Thank You.</h2>
        <p style="font-size:16px; color:#5C5C5C; margin-top: 20px">You have successfully submitted your meals for the week.</p>
        <a :href="url" class="btn btn-success mr-t-20">Back to Home Page</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    url () {
      return `${location.origin}/${this.$store.state.link}`
    }
  }
}
</script>
