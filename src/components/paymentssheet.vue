<template>
  <div class="clients-payments-sheet">
    <div class="payments-bar">
      <h2>Payments Sheet</h2>
      <span class="material-icons-round" @click="this.edit_mode = ! this.edit_mode">
        playlist_add
      </span>
    </div>
    <div v-if="edit_mode">
      <paymentdemo :id="id" :api="api" :password="password" @refresh="this.$emit('refresh')" />
    </div>
    <div v-else class="payments-list">
      <div v-for="p in payments" :key="p.Payment_Value" class="payment">
        <div class="payment-pot">
          <span class="material-icons-round"> attach_money </span>
          <h2>{{ p.Payment_Value }}</h2>
        </div>

        <div class="payment-pot">
          <span class="material-icons-round"> schedule </span>
          <h2>{{ red(p.Time_Stamp) }}</h2>
        </div>

        <div class="payment-pot">
          <span class="material-icons-round"> tag </span>
          <h2>{{ p.Banknote_Number }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Paymentdemo from './paymentdemo.vue';

export default {
  props: ["payments",'api','password','id'],
  data() {
    return {
      edit_mode: false,
    };
  },
  methods: {
    red(x){
      return x.substr(0,10)
    },
    edit() {
      this.edit_mode = true;
    },
  },
  components: {
    Paymentdemo
    
  },
};
</script>
<style>
.clients-payments-sheet {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.payments-bar {
  width: 95%;
  height: 10%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0px 0px 4px #8d99ae;
  background-color: #edf6f9;
  border-radius: 0.3rem;
}
.payments-bar > h2 {
  width: 80%;
  letter-spacing: 2px;
  color: #004e98;
  font-family: "Comfortaa", cursive;
  font-size: 1.2rem;
  padding: 0.4rem;
}
.payments-list {
  width: 100%;
  height: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  overflow: auto;
}
.payment {
  min-width: 180px;
  width: fit-content;
  min-height: 100px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #ebebeb;
  border-radius: 0.3rem;
  margin: 1rem;
  padding: 0.5rem;
}
.payment-pot:first-child {
  border-style: none;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-color: #003a61;
  padding-bottom: 5px;
}
.payment-pot {
  min-width: 100%;
  width: fit-content;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 5px;
}
.payment-pot > h2 {
  min-width: 80%;
  width: fit-content;
  letter-spacing: 2px;

  color: #70798c;
  font-family: "Comfortaa", cursive;
  font-size: 1rem;
  text-align: left;
}
.payment-pot > span {
  margin-right: 0.8rem;

  color: #dc0073;
}
.payment-pot > span:hover {
  cursor: default;
  transform: none;
}
</style>



















