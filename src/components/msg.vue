<template>
  <div class="msg-box">
    <div class="msg-icon">
      <div v-if="spinner" class="loader"></div>
      <span class="material-icons-outlined"> {{icon}} </span>
    </div>
    <div class="msg-text">{{ text }}</div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: ["text","icon","spinner"],
};
</script>
<style >
.msg-box {
  width: 500px;
  min-height: 300px;
  height: fit-content;
  margin: 7rem auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  background: #ebebeb;
  border-radius: 0.4rem;
}
.msg-icon > span {
  color: #dc0073;
  font-size: 2rem;
}
.msg-text {
  width: 90%;
  font-size: 1.5rem;
  color: #555b6e;
  font-family: "Comfortaa", cursive;
  letter-spacing: 3px;
  text-align: center;
  line-height: 2.5rem;
}
</style>