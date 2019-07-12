<template>
<div id="app">

  <router-view />
</div>
</template>

<script>
export default {

}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  color: #fff;
}

#app {
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}

hr {
  opacity: 0.5;
  border-top: 2px solid #eee;
}

.header {
  padding-top: 60px;
  text-align: left;
  margin: 15px;
}

.bckgrnd-img {
  background-image: url(../src/assets/images/jedlo.jpg);
  height: 400px;
  width: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0.8;
  filter: blur(4px);
  position: absolute;
  z-index: -2;
}


ul {
  display: block;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  flex-basis: 300px;
  text-align: center;
  padding: 30px;
  margin: 10px;
}
</style>
