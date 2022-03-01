<template>
  <div class="login-container">
    <div class="login-box">
      <h1 class="title">
        <span style="color: #2196f3">></span> Lebancode CRM
        <span style="color: #2196f3">_</span>
      </h1>
      <div class="username">
        <input id="username" type="text" placeholder="Username" />
      </div>
      <div class="password">
        <input
          type="password"
          v-on:keyup.enter="login"
          id="password"
          placeholder="Password"
        />
      </div>
      <div v-if="spinner" class="loader"></div>
      <button v-else @click="login">login</button>
    </div>
  </div>
</template>
<script>
//import msg from '../components/msg.vue'
export default {
  props: ["api"],
  data() {
    return {
      spinner: false,
      //api: "https://script.google.com/macros/s/AKfycbzAvYD3j5ulPLsQVOr0VydgFq0NsATh6gf2zwZ8itgrxa6CH-HXQHsifUq_L-YOXbHw/exec",
    };
  },
  methods: {
    login() {
      //var username = document.getElementById('username');
      var password = document.getElementById("password");
      this.spinner = true;
      var api = this.api;
      var query = `?read=1&pass=${password.value}`;
      api += query;
      fetch(api)
        .then((res) => res.json())
        .then((res) => {
          if (res != "500") {
            this.$emit("login", {
              res: "200",
              clients: res,
              password: password.value,
            });
          }

          this.spinner = false;
        })
        .catch(() => {
          this.spinner = false;
        });
    },
  },
  components: {
    //msg
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Jura:wght@300&display=swap");
.login-container{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  background-image: url('../assets/wallpaper.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
.login-box {
  width: 500px;
  height: 400px;
  margin: 7rem auto;
  background: #ebebeb;
  border-radius: 0.4rem;
  display: flex;  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  opacity: .75;
}
.title {
  width: 100%;
  font-family: "Jura", sans-serif;
  text-align: center;
  font-size: 1.8rem;
  color: #4a4e69;
  font-weight: bold;
  letter-spacing: 4px;
}
.username,
.password {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.username > input[type="text"],
.password > input[type="password"] {
  width: 75%;
  font-size: 1.5rem;
  letter-spacing: 3px;
  padding: 0.5rem;
  background: transparent;
  border-style: none;
  outline: none;
  border-bottom-style: solid;
  border-color: #dc0073;
}
button {
  min-width: 20%;
  width: fit-content;
  font-size: 1.2rem;
  letter-spacing: 3px;
  margin: 0.5rem;
  padding: 0.5rem;
  border: solid;
  outline: none;
  border-color: #dc0073;
  border-radius: 0.3rem;
  border-width: 1px;
  transition: 0.3s;
  cursor: pointer;
}
button:hover {
  background: #dc0073;
  color: #ebebeb;
  width: 25%;
  letter-spacing: 4px;
}
</style>









