<template>
  <div class="char">
    <div class="container">
      <router-link to="/" class="btn comeback">Come back</router-link>
      <div v-if="char" class="char__info">
          <div class="char__left">
            <img :src="char.image" alt="" class="responsive-img">
          </div>
          <div class="char__right">
            <h1>{{char.name}}</h1>
            <p>Status: {{char.status}}</p>
            <p>Gender: {{char.gender}}</p>
            <p>Location: {{char.location.name}}</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      char: null
    }
  },
  async created() {
    this.char = await fetch(`https://rickandmortyapi.com/api/character/${this.$route.params.id}`)
      .then((resp) => {
        if (!resp.ok) {
          this.$router.push('/')
        }
        return resp.json();
      })
    console.log(this.char);
  }
}
</script>

<style>
  .comeback {
    margin: 15px 0;
  }
  .char__info {
    display: flex;
  }
  .char__left {
    max-width: 300px;
    margin-right: 30px;
  }
  h1 {
    margin-top: 0;
    font-size: 50px;
  }

</style>