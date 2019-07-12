<template>
<div class="home">
  <div class="background-image">
    <div class="bckgrnd-img" :style="{ 'background-image': computedBackground }">
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="header">
        <h1>FOTOGALÉRIA</h1>
        <h2>KATEGÓRIE</h2>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3 col-sm-4 albumDiv" v-for="album in albums">
        <album :name="album" v-on:changeBackground="updateBackground"></album>
      </div>
      <div class="col-md-3 col-sm-4">
        <div class="album albumDiv add">
          <div @click="showModal = true" class="addContainer">
            <span class="glyphicon glyphicon-plus-sign"></span>
            <p class="nameOfAlbum">PRIDAŤ KATEGÓRIU</p>
          </div>
          <!-- use the modal component, pass in the prop -->
        </div>
      </div>
    </div>
    <modal v-if="showModal" @close="close">
      <h2 slot="header">PRIDAŤ KATEGÓRIU</h2>
      <add-gallery slot="body"></add-gallery>
    </modal>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import Album from '@/components/Album.vue'
import AddGallery from '@/components/AddGallery.vue'
import Modal from '@/components/Modal.vue'


export default {
  name: 'home',
  components: {
    Album,
    Modal,
    AddGallery
  },
  data: function() {
    return {
      albums: [],
      background: "url(../img/jedlo.69425433.jpg)",
      showModal: false
    }
  },
  computed: {
    computedBackground: function() {
      return this.background;
    }
  },
  methods: {
    updateBackground: function(path) {
      this.background = "url(http://api.programator.sk/images/0x0/" + path + ")"
    },
    close: function() {
      this.showModal = false;
    }
  },
  created() {
    this.$http.get('http://api.programator.sk/gallery').then(function(response) {
      this.albums = response.data.galleries;
    })
  }
}
</script>

<style scoped>
.imgOfAlbum {
  width: 100%;
  height: 60%;
}


.bottomAlbum {
  background-color: #fff;
  position: absolute;
  width: 100%;
}

.albumDiv {
  margin-top: 15px;
}

.add {
  border: 2px solid #eee;
  color: #aaa;
  width: 100%;
  vertical-align: middle;
}

.addContainer {
  display: inline-block;
  position: absolute;
  top: 30%;
  left: 27%;
}

.glyphicon-plus-sign {
  font-size: 3em;
}
</style>
