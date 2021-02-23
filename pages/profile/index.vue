<template>
  <div>
    <h2>Merhaba {{ user }}</h2>
    <h2>Haydi Bir şarkı ekleyin</h2>
    <form>
      <input type="text" v-model="songName" v-on:input="getSong" />
      <input type="text" v-model="singer" />
      <a @click="getSong">submit</a>
    </form>

    <div v-if="singleUrl">
      <button @click="getid(item)">ekle</button>
      <iframe
        :src="'https://open.spotify.com/embed?uri=spotify:track:' + singleUrl"
        width="300"
        height="100"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
    </div>
    <div v-if="!singleUrl" :key="singer">
      <div v-for="(link, index) in urll" :key="index">
        <iframe
          :src="'https://open.spotify.com/embed?uri=spotify:track:' + link"
          width="300"
          height="100"
          frameborder="0"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
        <button class="add--btn" @click="getid(link)">+</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      singleUrl: "",
      songArray: [],
      urll: [],
      singer: "",
      songName: "",
      name: "",
      key: "",
      counter: 0,
    };
  },
  async asyncData({ $axios }) {
    try {
      const ip = await $axios.$get(`/api/me`);
      console.log("hello world");
      const user = ip.data.user.name;
      if (user) return { user };
      else {
        return false;
      }
    } catch (e) {
      console.log(e);
    }
  },

  methods: {
    getSong() {
      this.key = this.singer;
      this.singleUrl = "";
      this.songArray = [];
      const clientId = "0d6c6f4946d040a580489dfc8f0e0908";
      const clientSecret = "f58363e9eedf435598eb82a96b410edc";
      const _getToken = async () => {
        const token = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
          },
          body: "grant_type=client_credentials",
        });

        const tokendata = await token.json();
        const result = await fetch(
          `https://api.spotify.com/v1/search?q=${this.singer}%20${this.songName}&type=track%2Cartist&market=US&limit=10`,
          {
            method: "GET",
            headers: { Authorization: "Bearer " + tokendata.access_token },
          }
        );

        const data = await result.json();
        if (data.tracks.items.length > 1) {
          for (let i = 0; i < 10; i++) {
            this.songArray.push(data.tracks.items[i].id);
            console.log(this.songArray);
          }
          return this.songArray;
        } else {
          this.singleUrl = data.tracks.items[0].id;

          return this.singleUrl;
        }
      };

      (async () => {
        this.urll = await _getToken();
      })();
    },
    async getid(id) {
      if (this.counter >= 5) {
        setTimeout(() => {
          this.counter = 0;
          console.log("timer");
        }, 5000);
      } else {
        try {
          this.counter++;
          console.log(this.counter);

          console.log("time out cikis");

          const username = await this.$axios.$get(`/api/me`);

          const response = await this.$axios.$post("/api/music", {
            id,
            name: username.data.user.name,
          });
          console.log(response);
        } catch (e) {
          console.log(e);
        }
      }
    },
  },
};
</script>
<style>
.add--btn {
  background-color: green;
  border: none;
  border-radius: 50%;
  padding: 0.8rem;
  position: absolute;
  right: 74%;
}
</style>