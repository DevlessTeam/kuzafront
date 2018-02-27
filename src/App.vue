<template>
  <div id="app">
      <!-- Twitter Card Meta -->
    <meta name="twitter:card" :content="details.desc" />
    <meta name="twitter:site" :content="`https://kuzaforms.com/${$store.state.link}`" />
    <meta name="twitter:title" :content="details.name" />
    <meta name="twitter:description" :content="details.desc" />
    <meta name="twitter:image" :content="details.image" />

    <!-- Facebook Meta Tags -->
    <meta property="og:title" :content="details.name" />
    <meta property="og:type" :content="details.desc" />
    <meta property="og:url" :content="`https://kuzaforms.com/${$store.state.link}`" />
    <meta property="og:image" :content="details.image" />
    <title>{{ details.name }}</title>
    <div class="container-fluid">
      <div class="row">
        <div class="leftPage col-md-7 pd-tb-mini pd-r-50" :style="{ 'background': 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)),' + `url('${details.image}')` + '0 / cover' }">
          <div v-if="details.name !== ''">
            <h1 class="text-white text-center">{{details.name}}</h1>
            <h5 class="text-white text-center">{{details.desc}}</h5>
          </div>
          <spinner message="Loading..." v-else></spinner>
        </div>
        <div class="rightPage col-md-5">
          <div class="rightContent">
            <transition-group name="fade" v-if="$store.state.link !== ''">
              <order-form :key="0" v-if="$store.state.vues === 0"></order-form>
              <details-view :key="1" v-else-if="$store.state.vues === 1"></details-view>
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
  data: () => ({
    details: {
      name: '',
      image: '',
      desc: ''
    }
  }),
  methods: {
    async fetchStoreDetails () {
      const res = await this.$devless.queryData('SocialSell', 'shops', {
        where: `shop_id,${this.$store.state.link}`
      })
      if (res.payload.results[0].shop_id === this.$store.state.link) {
        this.details = res.payload.results[0]
        return
      }
      alert('Error! Invalid url provided')
      console.log(res)
    }
  },
  mounted () {
    this.fetchStoreDetails()
  },
  created () {
    this.$store.dispatch('fetchStructure')
  }
}
</script>

<style src="@/assets/css/custom.css"></style>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
