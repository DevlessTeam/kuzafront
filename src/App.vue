<template>
  <div id="app">
    <title>{{`name`}}</title>
    <div class="container-fluid">
      <div class="row">
        <div class="leftPage col-md-7 pd-tb-mini pd-r-50">
          <h1 class="text-white text-center">{{`Name details goes here`}}</h1>
        </div>
        <div class="rightPage col-md-5">
          <div class="rightContent">
            <transition-group name="fade" v-if="$store.state.formStructure">
              <order-form :key="0" v-if="$store.state.vues.order"></order-form>
              <details-view :key="1" v-else-if="$store.state.vues.details"></details-view>
              <thank-you :key="2" v-else></thank-you>
            </transition-group>
            <spinner message="Loading..." v-else></spinner>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ThankYou from '@/components/ThankYou'
import OrderForm from '@/components/OrderForm'
import DetailsView from '@/components/DetailsView'
import Spinner from 'vue-simple-spinner'

export default {
  name: 'App',
  components: {
    Spinner,
    ThankYou,
    OrderForm,
    DetailsView
  },
  created () {
    this.$store.dispatch('fetchStructure')
  }
}
</script>

<style src="@/assets/css/custom.css"></style>
