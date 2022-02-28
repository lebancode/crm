<template>
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
  <div v-if="no_msg" class="modal">
    <msg icon="thumb_down" text="ma meshe l7al !">
      <button @click="this.no_msg = !this.no_msg">OK</button>
    </msg>
  </div>
  <div class="payment-demo">
    <input type="text" id="Payment_Value" placeholder="Enter Price" />
    <input type="date" id="Time_Stamp" placeholder="Enter Date"  />
    <input type="text" id="Banknote_Number" placeholder="Enter Banknote NB" />
    <button @click="save">SAVE</button>
  </div>
</template>
<script>
import msg from "@/components/msg.vue";

export default {
  data() {
    return {
      yes_msg: false,
      no_msg: false,
      net_err: false,
      show_spinner: false,
    };
  },
  components: {
    msg,
  },
  props: ["api", "password", "id"],
  methods: {
    red(x){
      return x.substr(0,10)
    },
    async save() {
      var data = {
        Banknote_Number: document.getElementById("Banknote_Number").value,
        Payment_Value: document.getElementById("Payment_Value").value,
        Time_Stamp: this.red(document.getElementById("Time_Stamp").value),
      };
      
      var api = this.api;
      var query = `?uppayments=1&pass=${this.password}&id=${this.id}`;
      api += query;

      this.show_spinner = true;
      await fetch(api, {
        method: "POST",

        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          this.show_spinner = false;
          if (res == "200") this.yes_msg = true;
          else this.no_msg = true;
        })
        .catch(() => {
          this.show_spinner = false;
          this.net_err = true;
        });
      this.$emit("refresh");
    },
  },
};
</script>
<style scoped>
.payment-demo {
  width: 450px;
  min-height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0.3rem;
  margin: 1rem auto;
}
.payment-demo > input {
  width: 90%;
  letter-spacing: 3px;
  color: #555b6e;
  font-family: "Comfortaa", cursive;
  font-size: 1.5rem;
  padding: 1rem;
  outline: none;
  border-style: none;
  border-radius: 0.3rem;
  background: #ebebeb;
  margin-top: 1rem;
}
.payment-demo > button {
  width: 25%;
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 0.2rem;
  outline: none;
  border-style: none;
  font-size: 1rem;
  letter-spacing: 3px;
  transition: 0.3s;
}
.payment-demo > button:hover {
  background-color: #dc0073;
  color: #ebebeb;
  width: 28%;
  letter-spacing: 4px;
  cursor: pointer;
}
</style>