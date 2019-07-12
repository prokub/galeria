<template>
<div class="" @mouseover="changeBackground">
  <router-link :to="'/gallery/' + name.path">
    <div class="album" @mouseover="active=true" @mouseleave="active=false">
      <img :src="'http://api.programator.sk/images/400x0/'+ name.image.fullpath" alt="" class="imgOfAlbum" v-if="name.image">
      <img src="@/assets/images/noImage.jpg" style="height:200px;" class="imgOfAlbum" v-else>
      <div class="bottomAlbum" v-bind:style="{ bottom: computedBottom }">
        <h2>{{ name.name.toUpperCase() }}</h2>
        <span v-if="numOfPhotos == 1" v-show="active">{{ numOfPhotos }} fotka</span>
        <span v-else-if="numOfPhotos > 1 && numOfPhotos < 6" v-show="active">{{ numOfPhotos }} fotky</span>
        <span v-else-if="numOfPhotos == 0 || numOfPhotos > 5" v-show="active">{{ numOfPhotos }} fotiek</span>
      </div>
    </div>
  </router-link>
</div>
</template>

<script>
export default {
  props: [
    'name'
  ],
  data: function() {
    return {
      active: false,
      numOfPhotos: 0,
      bottom: "0px"
    };
  },
  methods: {
    changeBackground: function() {
      if (this.name.image) {
        this.$emit("changeBackground", this.name.image.fullpath);
      }
    },
    resetBottom: function() {
      this.bottom = "0px";
    }
  },
  created() {
    this.$http.get("http://api.programator.sk/gallery/" + this.name.name).then(function(response) {
      this.numOfPhotos = response.body.images.length;
    })
  },
  computed: {
    computedBottom: function() {
      return this.bottom;
    }
  }

}
</script>

<style>
.album:hover {
  transform: scale(1.05);
}

.album {
  /*width: 100%;
  max-width: 250px;
  min-width: 250px;
  height: 200px;*/
  min-height: 200px;
  margin-bottom: 15px;
  box-sizing: border-box;
  display: table;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  float: left;
  -webkit-box-shadow: 4px 4px 30px -4px rgba(179, 179, 179, 1);
  -moz-box-shadow: 4px 4px 30px -4px rgba(179, 179, 179, 1);
  box-shadow: 4px 4px 30px -4px rgba(179, 179, 179, 1);
}

.imgOfAlbum {
  width: 100%;
}

.table {
  text-align: center;
}

.bottomAlbum {
  background-color: #fff;
  position: absolute;
  width: 100%;
  bottom: 0px;
}
</style>
