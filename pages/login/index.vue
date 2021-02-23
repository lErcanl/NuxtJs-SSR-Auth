<template>
  <div>
    <h2>login form</h2>

    <form>
      <input type="text" placeholder="email" v-model="email" />
      <input type="text" placeholder="password" v-model="password" />
    </form>
    <button @click="login">login</button>
  </div>
</template>


<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        console.log(this.email);
        console.log(this.password);
        await this.$axios.$post(`/api/login`, {
          email: this.email,
          password: this.password,
        });
        console.log("selamlarr");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style>
</style>