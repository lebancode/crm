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
  <div class="offer-demo">
    <input id="Title" type="text" placeholder="Enter Title" />
    <textarea id="Quotation" placeholder="Enter quotation"></textarea>
    <div class="offer-demo-dates">
      <input id="Time_Stamp" type="date" />
      <input id="Deadline" type="date" />
    </div>
    <div class="offer-demo-footer">
      <input id="Pricing" type="text" placeholder="Price" />
      <span class="material-icons-round" @click="save"> done </span>
    </div>
  </div>
</template>
<script>

import msg from "@/components/msg.vue";
export default {
  data(){
    return {
      yes_msg: false,
      no_msg: false,
      net_err: false,
      show_spinner: false,
    }

  },
  components:{
    msg
  },
  methods: {
    red(x){
      return x.substr(0,10)
    },
    async save() {
      var data = {
        Title: document.getElementById("Title").value,
        Quotation: document.getElementById("Quotation").value,
        Time_Stamp:this.red(document.getElementById("Time_Stamp").value),
        Deadline:this.red(document.getElementById("Deadline").value),
        Pricing: document.getElementById("Pricing").value,
      };
      console.log(this.password);
      var api = this.api;
      var query = `?upoffer=1&pass=${this.password}&id=${this.id}`;
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
          this.show_spinner=false;
          if (res == "200") this.yes_msg= true;
          else this.no_msg = true
        })
        .catch(() => {
          this.show_spinner=false;
          this.net_err = true
        });
        this.$emit('refresh')
    },
  },
  props: ["api", "password", "id"],
};
</script>
<style scoped>
.offer-demo {
  width: 450px;
  min-height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 0.3rem;
  margin: 1rem auto;
}
.offer-demo > input {
  width: 90%;
  letter-spacing: 2px;
  color: #555b6e;
  font-family: "Comfortaa", cursive;
  font-size: 1.5rem;
  padding: 1rem;
  outline: none;
  border-style: none;
  border-radius: 0.3rem;
  box-shadow: 0px 0px 4px #8d99ae;
  background-color: #edf6f9;
}
.offer-demo > textarea {
  width: 90%;
  height: 200px;
  letter-spacing: 2px;
  color: #555b6e;
  box-shadow: 0px 0px 4px #8d99ae;
  background-color: #edf6f9;
  font-family: "Comfortaa", cursive;
  font-size: 1.5rem;
  padding: 1rem;
  outline: none;
  border-style: none;
  border-radius: 0.3rem;
  resize: none;
}
.offer-demo-dates,
.offer-demo-footer {
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.offer-demo-dates > input {
  width: 160px;
  background: transparent;
  outline: none;
  border-style: none;
  padding-bottom: 0.5rem;
  border-bottom-style: solid;
  text-align: center;
  color: #444;
  border-color: #444;
  font-size: 1.1rem;
}
.offer-demo-footer > input {
  width: 80%;
  background: transparent;
  outline: none;
  border-style: none;
  padding-bottom: 0.5rem;
  border-bottom-style: solid;
  text-align: center;
  color: #444;
  border-color: #444;
  font-size: 1.5rem;
  letter-spacing: 5px;
}
.offer-demo-footer > input::placeholder {
  color: #444;
}
.offer-demo-footer > span {
  color: #444;
  font-size: 2rem;
}
</style>