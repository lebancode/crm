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
  <div class="data-demo">
    <input type="text" :value="sheet.Client_Name" id="Client_Name" placeholder="Client Name" />
    <input type="text" :value="sheet.Company_Name"  id="Company_Name" placeholder="Client Company Name" />
    <input type="text" :value="sheet.B_Email"  id="B_Email"  placeholder="Business Email" />
    <input type="text" :value="sheet.B_Email_Pass"  id="B_Email_Pass"  placeholder="Business Email Pass" />
    <input type="text" :value="sheet.Gmail"  id="Gmail"  placeholder="Gmail" />
    <input type="text" :value="sheet.Gmail_Pass"  id="Gmail_Pass"  placeholder="Gmail Password" />
    <input type="text" :value="sheet.Godaddy_Username"  id="Godaddy_Username"  placeholder="Godaddy Username" />
    <input type="text" :value="sheet.Godaddy_Email"  id="Godaddy_Email"  placeholder="Godaddy Email" />
    <input type="text" :value="sheet.Godaddy_Pass"  id="Godaddy_Pass"  placeholder="Godaddy Password" />
    <input type="text" :value="sheet.Address"  id="Address"  placeholder="Address" />
    <input type="text" :value="sheet.Company_Number"  id="Company_Number"  placeholder="Company Number" />
    <input type="text" :value="sheet.Client_Number"  id="Client_Number"  placeholder="Client Number" />
    <input type="text" :value="sheet.Secretary_Number"  id="Secretary_Number"  placeholder="Secretary Number" />
    <input type="date" :value="sheet.Starting_Date"  id="Starting_Date"  placeholder="Starting Date" />

    <button @click="save">SAVE</button>
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
  props:['api','password' , 'sheet','id'],
  methods:{
    
    red(x){
      return x.substr(0,10)
    },
    async save(){
      var data = {
        Client_Name : document.getElementById('Client_Name').value,
        Company_Name : document.getElementById('Company_Name').value,
        B_Email : document.getElementById('B_Email').value,
        B_Email_Pass : document.getElementById('B_Email_Pass').value,
        Gmail : document.getElementById('Gmail').value,
        Gmail_Pass : document.getElementById('Gmail_Pass').value,
        Godaddy_Username : document.getElementById('Godaddy_Username').value,
        Godaddy_Email : document.getElementById('Godaddy_Email').value,
        Godaddy_Pass : document.getElementById('Godaddy_Pass').value,
        Address : document.getElementById('Address').value,
        Company_Number : document.getElementById('Company_Number').value,
        Client_Number : document.getElementById('Client_Number').value,
        Secretary_Number : document.getElementById('Secretary_Number').value,
        Starting_Date : this.red(document.getElementById('Starting_Date').value),
      }
      console.log(data)
      var api = this.api;
      var query = `?updata=1&pass=${this.password}&id=${this.id}`;
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
    }
  } 
}
</script>
<style scoped>
.data-demo {
  width: 450px;
  height: 450px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  overflow: auto;
  border-radius: 0.3rem;
  margin: 1rem;
}
.data-demo > input {
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
.data-demo>button{
    width: 25%;
    margin-top: 1rem;
    padding: .5rem;
    border-radius: .2rem;
    outline: none;
    border-style: none;
    font-size: 1rem;
    letter-spacing: 3px;
    transition: .3s;
}
.data-demo>button:hover{
    background-color: #dc0073;
    color: #ebebeb;
    width: 28%;
    letter-spacing: 4px;
    cursor: pointer;
}
</style>