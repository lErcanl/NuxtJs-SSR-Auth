<template>
  <div class="container">
    <div v-if="!username.name">
      <NuxtLink to="/signup">kayıt ol</NuxtLink>
      <NuxtLink to="/login">giriş yap</NuxtLink>
    </div>
    <div v-else-if="username.name">
      <h2>welcome {{ username.name }}</h2>
      <NuxtLink to="/profile">profil</NuxtLink>
    </div>
    <button @click="logout">Cıkıs yap</button>
    <div v-for="item in pushedArray" :key="item">
      <iframe
        :src="'https://open.spotify.com/embed?uri=spotify:track:' + item"
        width="300"
        height="100"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
    };
  },

  async asyncData({ $axios }) {
    console.log("we inside");
    let pushedArray = [];

    try {
      const ip = await $axios.$get(`/api/LoggedIn`);
      const musics = await $axios.$get(`/api/getMusics`);
      console.log(musics);
      for (let i = 0; i < musics.data.user.length; i++) {
        let array = [];
        array = musics.data.user[i].songs;
        array = array[array.length - 1];
        console.log(array);
        pushedArray.push(array);
      }
      const username = ip.data.currentUser;
      if (username) return { username, pushedArray };
      else {
        console.log("we outside");
        return false;
      }
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    async logout() {
      console.log("girdik");
      try {
        const res = await this.$axios.$get(`/api/logout`);
        console.log(res);
        this.username = "";
        this.$forceUpdate();
      } catch (err) {}
    },
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
