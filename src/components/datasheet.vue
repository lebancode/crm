<template>
  <div class="client-data-sheet">
    <div class="client-data-bar">
      <h1 class="client-data-title">Data sheet</h1>
      <span
        class="material-icons-round"
        title="Edit this client"
        @click="this.edit_mode = !this.edit_mode"
      >
        edit
      </span>
    </div>
    <div v-if="edit_mode">
      <datademo
        :id="id"
        :sheet="sheet"
        :api="api"
        :password="password"
        @refresh="this.$emit('refresh')"
      />
    </div>
    <div v-else class="client-data-list">
      <div class="client-data-pot">
        <h3>Client_Name ></h3>
        <h1>{{ sheet.Client_Name }}</h1>
      </div>
      <div class="client-data-pot">
        <h3>Company_Name ></h3>
        <h1>{{ sheet.Company_Name }}</h1>
      </div>
      <div class="client-data-pot">
        <h3>B_Email ></h3>
        <h1>{{ sheet.B_Email }}</h1>
      </div>
      <div class="client-data-pot">
        <h3>B_Email_Pass ></h3>
        <h1>{{ sheet.B_Email_Pass }}</h1>
      </div>
      <div class="client-data-pot">
        <h3>Gmail ></h3>
        <h1>{{ sheet.Gmail }}</h1>
      </div>
      <div class="client-data-pot">
        <h3>Gmail_Pass ></h3>
        <h1>{{ sheet.Gmail_Pass }}</h1>
      </div>
      <div class="client-data-pot">
        <h3>Godaddy_Username ></h3>
        <h1>{{ sheet.Godaddy_Username }}</h1>
      </div>
      <div class="client-data-pot">
        <h3>Godaddy_Email ></h3>
        <h1>{{ sheet.Godaddy_Email }}</h1>
      </div>
      <div class="client-data-pot">
        <h3>Godaddy_Pass ></h3>
        <h1>{{ sheet.Godaddy_Pass }}</h1>
      </div>
      <div class="client-data-pot">
        <h3>Address ></h3>
        <h1>{{ sheet.Address }}</h1>
      </div>
      <div class="client-data-pot">
        <h3>Company_Number ></h3>
        <h1>{{ sheet.Company_Number }}</h1>
      </div>
      <div class="client-data-pot">
        <h3>Client_Number ></h3>
        <h1>{{ sheet.Client_Number }}</h1>
      </div>
      <div class="client-data-pot">
        <h3>Secretary_Number ></h3>
        <h1>{{ sheet.Secretary_Number }}</h1>
      </div>
      <div class="client-data-pot">
        <h3>Starting_Date ></h3>
        <h1>{{ red(sheet.Starting_Date) }}</h1>
      </div>
      <div class="client-data-pot">
        <h3>Github_Email ></h3>
        <h1>{{ sheet.Github_Email }}</h1>
      </div>
      <div class="client-data-pot">
        <h3>Github_Password ></h3>
        <h1>{{ sheet.Github_Password }}</h1>
      </div>
    </div>
  </div>
</template>
<script>
import Datademo from "./datademo.vue";
export default {
  data() {
    return {
      edit_mode: false,
    };
  },
  methods: {
    red(x) {
      if(!x){
        x=''
      }
      return x.substr(0, 10);
    },
  },
  props: ["sheet", "api", "password", "id"],
  components: {
    Datademo,
  },
};
</script>
<style >
@import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@300&display=swap");
.client-data-sheet {
  width: 100%;
  height: 100%;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.client-data-bar {
  width: 95%;
  height: 10%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 0.3rem;
  box-shadow: 0px 0px 4px #8d99ae;
  background-color: #edf6f9;
}
.client-data-title {
  width: 80%;
  color: #004e98;
  font-family: "Comfortaa", cursive;
  font-size: 1.2rem;
}
.client-data-list {
  width: 95%;
  height: 450px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  overflow: auto;
  box-shadow: 0px 0px 4px #8d99ae;
  background-color: #edf6f9;
  border-radius: 0.3rem;
  margin: 1rem;
}
.client-data-list > .client-data-pot {
  width: 90%;
  font-size: 0.9rem;
  padding: 1rem;
  letter-spacing: 1px;
  color: #555b6e;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-style: none;
  outline: none;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  background: transparent;
  border-color: #555b6e;
  font-family: "Comfortaa", cursive;
}

.client-data-pot > h1 {
  margin-top: 1rem;
  letter-spacing: 3px;
  padding-left: 1rem;
  font-weight: 300;
}
.client-data-pot > h3 {
  font-size: 0.7rem;
  width: 100%;
  font-weight: bolder;
}
.client-data-list > .client-data-pot > h1:hover {
  /*border-bottom-style: dashed;*/

  color: #dc0073;
}
</style>











