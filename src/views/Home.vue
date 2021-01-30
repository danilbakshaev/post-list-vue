<template>
  <div class="rickandmorty">
    <div class="container">
      <div class="rickandmorty__search">
        <input v-model="search" @keyup.enter="charFilter()" placeholder="Filter" id="first_name" type="text" class="validate">
        <button v-if="search" class="btn" @click="clearFilter()">Clear</button>
      </div>
      <div class="rickandmorty__items">
        <div v-for="char in charasters" :key="char.id" class="rickandmorty__item card-panel grey lighten-5 z-depth-1">
          <div class="rickandmorty__img">
            <img  :src="char.image" alt="" class="responsive-img">
          </div>
          <div class="rickandmorty__text">
            <h2 class="rickandmorty__name">
              {{char.name}}
            </h2>
            <button class="btn">Подробнее</button>
          </div>
        </div>
      </div>
      <div class="center" v-if="this.$store.state.next === null">
        <p>No more characters</p>
      </div>
      <div class="center" v-if="this.$store.state.next === 'error'">
        <p>No results</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: ''
    }
  },
  computed: {
    charasters() {
      return this.$store.state.data
    }
  },
  async mounted() {
    await this.$store.dispatch('getFirstData')
  },
  methods: {
    charFilter() {
      this.$store.dispatch('getFirstData', `?name=${this.search}`)
    },
    clearFilter() {
      this.search = ''
      this.$store.dispatch('getFirstData')
    },
    async onScroll() {
      if(window.scrollY+1 >= document.documentElement.scrollHeight-document.documentElement.clientHeight){
        if (this.$store.state.next) {
          await this.$store.dispatch('getNextPage', this.$store.state.next)
        }
      }
    }
  },
  created () {
    window.addEventListener('scroll', this.onScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.onScroll);
  },
}
</script>

<style>
  .rickandmorty__search {
    display: flex;
    align-items: center;
    margin: 30px 0;
  }
  .rickandmorty__items {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .rickandmorty__item {
    display: flex;
    align-items: center;
    padding: 0;
    width: 49%;
  }
 .rickandmorty__img{
    max-width: 100px;
    display: flex;
 }
 .rickandmorty__text {
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
 }
 .rickandmorty__name {
    font-size: 20px;
    margin: 0;
    margin-right: 10px;
 }
</style>