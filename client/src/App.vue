<template>
  <div id="app">
      <Navbar v-if="!adminLoggedIn()"></Navbar>
    <router-view/>
  </div>
</template>

<script>

import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    // LoginPage,
    Navbar,
  },
  methods: {
    adminLoggedIn() {
      return this.$store.state.adminStatus;
    },
  },
  created() {
    this.$store.dispatch('checkLogin');
    this.$store.dispatch('listProducts');
    this.$store.dispatch('checkAdmin');
  },
  beforeUpdate() {
    this.$store.dispatch('checkLogin');
  },
};
</script>

<style>
@font-face {
  font-family: "Genuine";
  src: url("../public/genuine-webfont.woff");
}

#app {
  font-family: 'Genuine';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
