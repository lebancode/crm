<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  
  <router-view/>
  -->

  <h1 class="desktop-mode">Desktop mode only !</h1>
  <div v-if="show_login">
    <login @login="loged" :api="api" />
  </div>
  <div v-else class="container">
    <div v-if="yes_msg" class="modal">
      <msg icon="thumb_up" text="meshe l7al">
        <button @click="this.yes_msg = !this.yes_msg">OK</button>
      </msg>
    </div>
    <div v-if="net_err" class="modal">
      <msg icon="wifi_off" text="network error !">
        <button @click="this.net_err = !this.net_err">ok</button>
      </msg>
    </div>
    <div v-if="show_spinner" class="modal">
      <msg spinner="true" text="yala . . ."></msg>
    </div>
    <div v-if="client_dont_exist" class="modal">
      <msg icon="no_accounts" :text="current_client.name + ' doesnt exist !'">
        <button @click="this.client_dont_exist = !this.client_dont_exist">
          OK
        </button>
      </msg>
    </div>
    <div v-if="client_already_exist" class="modal">
      <msg icon="group_add" :text="current_client.name + ' already exist !'">
        <button @click="this.client_already_exist = !this.client_already_exist">
          OK
        </button>
      </msg>
    </div>
    <div v-if="no_msg" class="modal">
      <msg icon="thumb_down" text="ma meshe l7al !">
        <button @click="this.no_msg = !this.no_msg">OK</button>
      </msg>
    </div>
    <div v-if="name_err" class="modal">
      <msg icon="spellcheck" text="name must include at least one letter !">
        <button @click="this.name_err = !this.name_err">OK</button>
      </msg>
    </div>
    <div v-if="add_msg" class="modal">
      <msg
        icon="error_outline"
        :text="'You want to add ' + current_client.name + ' ?'"
      >
        <div class="btn-box">
          <button @click="this.add_msg = !this.add_msg">Cancel</button>
          <button @click="create_client">ADD</button>
        </div>
      </msg>
    </div>
    <div v-if="del_msg" class="modal">
      <msg
        icon="error_outline"
        :text="'You want to delete ' + current_client.name + ' ?'"
      >
        <div class="btn-box">
          <button @click="this.del_msg = !this.del_msg">Cancel</button>
          <button @click="delete_client">DEL</button>
        </div>
      </msg>
    </div>

    <!-- navigation  -->
    <nav>
      <h1 @click="test">>Lebancode CRM_</h1>
      <div class="nav-tools-box">
        <span
          @click="load_client"
          class="material-icons-round"
          :title="'load ' + current_client.name + ' data '"
        >
          search
        </span>
        <input
          v-on:keyup.enter="load_client"
          v-model="current_client.name"
          list="clients"
          type="search"
          placeholder="Type a client name"
        />

        <datalist id="clients">
          <option v-for="c in clients" :key="c.id">{{ c.name }}</option>
        </datalist>

        <div class="nav-icons">
          <span
            @click="this.add_msg = !this.add_msg"
            class="material-icons-round"
            title="Create new client"
          >
            person_add
          </span>
          <span
            @click="this.del_msg = !this.del_msg"
            class="material-icons-round"
            title="Delete this client"
          >
            person_remove
          </span>
        </div>
      </div>
    </nav>
    <main>
      <section class="data-sheet-box">
        <DataSheet
          @refresh="refresh"
          :api="api"
          :id="current_client.id"
          :password="password"
          :sheet="current_client.data"
        />
      </section>
      <section class="payments-sheet-box">
        <OfferSheet
          @refresh="refresh"
          :id="current_client.id"
          :password="password"
          :api="api"
          :offers="current_client.offers"
        />
      </section>
      <section class="offers-sheet-box">
        <PaymentsSheet
          @refresh="refresh"
          :id="current_client.id"
          :api="api"
          :password="password"
          :payments="current_client.payments"
        />
      </section>
    </main>
  </div>
</template>
<script>
import DataSheet from "./components/datasheet.vue";
import PaymentsSheet from "./components/paymentssheet.vue";
import login from "./components/login.vue";
import msg from "./components/msg.vue";

import OfferSheet from "./components/offerssheet.vue";
export default {
  data() {
    return {
      show_login: true,
      name_err: false,
      client_dont_exist: false,
      client_already_exist: false,
      add_msg: false,
      del_msg: false,
      yes_msg: false,
      no_msg: false,
      net_err: false,
      show_spinner: false,
      password: "",
      api: "https://script.google.com/macros/s/AKfycbxTBmbBWmPrOqhV1gHvQ7eDqcsT4pYzSDXxoDkXAsIReKb7tKHZ5H6FfiefqABSVL01/exec",
      clients: [],
      current_client: {
        name: "",
        id: "",
        fid: "",
        data: {},
        payments: [],
        offers: [],
      },
    };
  },
  methods: {
    async refresh() {
      var api = this.api;
      var query = `?read=1&pass=${this.password}`;
      api += query;
      this.show_spinner = true;
      await fetch(api)
        .then((res) => res.json())
        .then((res) => {
          this.show_spinner = false;
          if (res != "500") {
            //remove spinner
            //show yes msg

            this.clients = res;
            this.yes_msg = true;
          } else this.no_msg = true;
        })
        .catch(() => {
          this.show_spinner = false;
          this.net_err = true;
        });
      this.load_client();
    },
    delete_client() {
      this.del_msg = !this.del_msg;
      //this.load_client();
      if (this.load_client("-")) {
        var api = this.api;
        var query = `?del=1&pass=${this.password}&fid=${this.current_client.fid}`;
        api += query;
        this.show_spinner = true;
        fetch(api)
          .then((res) => res.json())
          .then((res) => {
            this.show_spinner = false;
            if (res == "200") {
              //remove spinner
              //show yes msg
              this.yes_msg = true;
              this.refresh();
            } else this.no_msg = true;
          })
          .catch((err) => {
            this.show_spinner = false;
            this.net_err = true;
            console.log(err);
          });
      }
    },
    create_client() {
      if (this.load_client()) {
        this.client_already_exist = true;
        this.add_msg = !this.add_msg;
      } else {
        //check if the input contains at least one letter
        if (!/[a-z]/i.test(this.current_client.name)) {
          this.name_err = true;
          this.add_msg = !this.add_msg;
          return "false";
        }
        this.add_msg = !this.add_msg;
        var api = this.api;
        var query = `?create=1&pass=${this.password}&name=${this.current_client.name}`;
        api += query;
        this.show_spinner = true;
        fetch(api)
          .then((res) => res.json())
          .then((res) => {
            this.show_spinner = false;
            if (res == "200") {
              //remove spinner
              //show yes msg
              this.yes_msg = true;
              this.refresh();
            } else {
              this.no_msg = true;
            }
          })
          .catch(() => {
            this.show_spinner = false;
            this.net_err = true;
          });
      }
    },
    loged(e) {
      if (e.res == "200") {
        this.show_login = false;
        this.password = e.password;
        this.clients = e.clients;
        //console.log(this.clients);
      }
    },

    load_client(x) {
      // returns false if the client doesnot exist
      //if x = '-' it shows the not exist message
      let c;

      for (c of this.clients) {
        if (this.current_client.name === c.name) {
          this.current_client.id = c.id;
          this.current_client.fid = c.FID;
          this.current_client.data = c.Data;
          this.current_client.payments = c.Payments;
          this.current_client.offers = c.Offers;
          //console.log("current client : " + this.current_client);
          return true;
        } else {
          if (x === "-") {
            this.client_dont_exist = true;
            return false;
          }
        }
      }
      return false;
    },
  },
  components: {
    DataSheet,
    OfferSheet,
    PaymentsSheet,
    login,
    msg,
  },
};
</script>


<style>
@import url("https://fonts.googleapis.com/css2?family=Jura:wght@300&display=swap");


.desktop-mode {
  display: none;
  width: 90%;
  font-size: 1.5rem;
  color: #ebebeb;
  font-family: "Comfortaa", cursive;
  letter-spacing: 3px;
  text-align: center;
  line-height: 2.5rem;
  margin: 5rem auto;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container,
body {
  width: 100%;
  height: 100%;
  background-color: #4b525e;  
  background-image: url('./assets/wallpaper.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
nav {
  width: 100%;
  height: 10vh;
  background: #4885ed;

  overflow: hidden;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  filter: drop-shadow(0px 1px 5px #3c4953);
}
main {
  width: 99%;
  height: 80vh;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
}
nav > h1 {
  width: 20%;
  font-family: "Jura", sans-serif;
  text-align: center;
  font-size: 1.5rem;
  color: #ebebeb;
  font-weight: bold;
  letter-spacing: 4px;
}
.nav-tools-box {
  width: 70%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ebebeb;
  padding: 0.5rem;
  border-radius: 0.3rem;
}

.nav-tools-box > input {
  width: 60%;
  font-size: 1.2rem;
  outline: none;
  background-color: #ebebeb;
  padding: 0.5rem;
  border-style: none;
  color: #3a6ea5;
  letter-spacing: 3px;
}

.nav-icons {
  width: 25%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.material-icons-round {
  font-size: 1.6rem;
  color: #ff6700;
  color: #70798c;

  cursor: pointer;
  transition: 0.4s;
}
.material-icons-round:hover {
  transform: scale(1.3, 1.3);
}

.data-sheet-box,
.payments-sheet-box,
.offers-sheet-box {
  width: 450px;
  height: 80vh;
  border-radius: 0.3rem;
  background-color: transparent;

  margin: 1rem;
}

/* width */
::-webkit-scrollbar {
  width: 0px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.btn-box {
  width: 90%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.loader {
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 50px;
  height: 50px;
  -webkit-animation: spin 1s linear infinite; /* Safari */
  animation: spin 1s linear infinite;
  margin-bottom: 0.5rem;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

button {
  width: 20%;
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
.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

@media (max-width: 1290px) {
  nav > h1 {
    width: 20%;
    font-family: "Jura", sans-serif;
    text-align: center;
    font-size: 1.2rem;
    color: #ebebeb;
    font-weight: bold;
    letter-spacing: 4px;
  }
}
@media (max-width: 1110px) {
  nav > h1 {
    width: 20%;
    font-family: "Jura", sans-serif;
    text-align: center;
    font-size: 1.1rem;
    color: #ebebeb;
    font-weight: bold;
    letter-spacing: 4px;
  }
}
@media (max-width: 1038px) {
  nav > h1 {
    width: 20%;
    font-family: "Jura", sans-serif;
    text-align: center;
    font-size: 1rem;
    color: #ebebeb;
    font-weight: bold;
    letter-spacing: 4px;
  }
}
@media (max-width: 1000px) {
  .container {
    display: none;
  }
  .desktop-mode {
    display: block;
  }
}
input::-webkit-search-cancel-button{
  
  font-size: 1.3rem !important;
  cursor: pointer !important;
}
</style>
