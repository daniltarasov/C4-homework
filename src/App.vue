<template>
  <div id="app">
    <!-- <p>Welcome to Your Vue.js App</p> -->
    <!-- <img src="https://images.dog.ceo/breeds/briard/n02105251_8643.jpg" alt="dog"> -->
    <router-view/>
  </div>
</template>
<!-- <template>
  <div id="app">
    <p>Хай!</p>
    <router-view/>
  </div>
</template>
 -->
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
