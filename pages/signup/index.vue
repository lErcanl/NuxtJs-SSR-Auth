<template>
  <div>
    <form>
      <input type="text" placeholder="username" v-model="username" />
      <input type="text" placeholder="password" v-model="password" />
      <input
        type="text"
        placeholder="passwordConfirm"
        v-model="passwordConfirm"
      />
      <input type="text" placeholder="email" v-model="email" />
    </form>
    <button @click="userAdd">Ekle</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      passwordConfirm: "",
      email: "",
    };
  },
  methods: {
    async userAdd() {
      try {
        await this.$axios.$post(`/api/signup`, {
          username: this.username,
          password: this.password,
          passwordConfirm: this.passwordConfirm,
          email: this.email,
        });
        console.log("user logged in");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style>
</style>