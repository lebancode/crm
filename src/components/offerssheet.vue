<template>
  <div class="client-offers-sheet">
    <div class="offers-sheet-bar">
      <h2>Offers List</h2>
      <span
        class="material-icons-round"
        @click="this.edit_mode = !this.edit_mode"
      >
        maps_ugc
      </span>
    </div>
    <div v-if="edit_mode">
      <offerdemo
        :id="id"
        :api="api"
        :password="password"
        @refresh="this.$emit('refresh')"
      />
    </div>
    <div v-else class="offers-list">
      <div v-for="o in offers" :key="o.Title" class="offer">
        <div class="offer-title-box">
          <h1 class="offer-title">{{ o.Title }}</h1>
          <h2 class="offer-pricing">{{ o.Pricing }} $</h2>
        </div>
        <h3 class="offer-quotation">
          {{ o.Quotation }}
        </h3>
        <div class="offer-footer">
          <div class="offer-start">
            <span class="material-icons-round"> hourglass_top </span>
            <h2>{{ red(o.Time_Stamp) }}</h2>
          </div>
          <div class="offer-end">
            <span class="material-icons-round"> hourglass_bottom </span>
            <h2>{{ red(o.Deadline) }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Offerdemo from "./offerdemo.vue";
export default {
  data() {
    return {
      edit_mode: false,
    };
  },
  methods: {
    red(x) {
      return x.substr(0, 10);
    },
  },
  props: ["offers", "api", "password", "id"],
  components: {
    Offerdemo,
  },
};
</script>
<style>
.client-offers-sheet {
  width: 100%;
  height: 100%;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.offers-sheet-bar {
  width: 95%;
  height: 10%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #d9d9d9;
  border-radius: 0.3rem;
}
.offers-sheet-bar > h2 {
  width: 80%;
  letter-spacing: 2px;
  color: #004e98;
  font-family: "Comfortaa", cursive;
  font-size: 1.2rem;
  padding: 0.4rem;
}
.offers-list {
  width: 100%;
  height: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  overflow: auto;
}
.offer {
  width: 95%;
  min-height: 450px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #ebebeb;
  border-radius: 0.3rem;
  margin: 1rem;
}
.offer-title-box {
  width: 95%;
  border-style: none;
  border-bottom-style: solid;
  border-color: #003a61;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.offer-title {
  width: 70%;
  font-family: "Comfortaa", cursive;
  font-size: 1.4rem;
  text-align: left;
  font-weight: bold;
  color: #dc0073;
}
.offer-quotation {
  width: 80%;
  height: fit-content;
  font-family: "Comfortaa", cursive;
  font-size: 1.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #555b6e;
  margin: 1rem;
  line-height: 2rem;
  text-align: center;
}
.offer-pricing {
  min-width: 20%;
  width: fit-content;
  font-family: "Comfortaa", cursive;
  letter-spacing: 1px;
  font-size: 1rem;
  text-align: center;
  font-weight: bold;
  color: #ebebeb;
  background-color: #dc0073;
  padding: 0.5rem;
  border-radius: 0.3rem;
}
.offer-footer {
  width: 90%;
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 1rem;
}
.offer-start,
.offer-end {
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}
.offer-start > h2,
.offer-end > h2 {
  font-family: "Comfortaa", cursive;
  font-size: 0.8rem;
  text-align: center;
  font-weight: bold;
  color: #003a61;
  letter-spacing: 4px;
}
.offer-start > span:hover {
  cursor: default;
  transform: none;
}

.offer-end > span:hover {
  transform: none;
  cursor: default;
}
</style>