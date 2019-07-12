<template>
<div class="home">
  <div class="background-image">
    <div class="bckgrnd-img" :style="{ 'background-image': backgroundPictureName }">
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="header">
        <h1>FOTOGALÉRIA</h1>
        <h2><span class="glyphicon glyphicon-arrow-left" @click="$router.go(-1)"></span> &nbsp; {{ name.toUpperCase() }}</h2>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3 col-sm-4 albumDiv" v-for="(image, index) in images">
        <div class="gallery">
          <img v-lazy="image.thumb" @click="openGallery(index)">
        </div>
      </div>
      <div class="col-md-3 col-sm-4 albumDiv">
        <div>
          <div class="gallery text-center" @click="showModal = true">
            <div class="addContainer">
              <span class="glyphicon glyphicon-camera"></span>
              <p class="align-middle">PRIDAŤ FOTKY</p>
            </div>
          </div>
        </div>
        <modal v-if="showModal" @close="showModal = false">
          <div class="modal-header">
          </div>
          <h2 slot="header">PRIDAŤ FOTKY</h2>
          <add-photo :name="name" slot="body"></add-photo>
        </modal>
      </div>
    </div>
    </li>
    </ul>
  </div>
  <LightBox :images="images" ref="lightbox" :show-caption="true" :show-light-box="false"></LightBox>
</div>
</template>

<script>
// @ is an alias to /src
import AddPhoto from '@/components/AddPhoto.vue'
import Modal from '@/components/Modal.vue'
import LightBox from 'vue-image-lightbox'
require('vue-image-lightbox/dist/vue-image-lightbox.min.css')

export default {
  name: 'home',
  components: {
    AddPhoto,
    Modal,
    LightBox
  },
  data: function() {
    return {
      images: [],
      name: this.$route.params.name,
      backgroundPictureName: "",
      backgroundPicture: "",
      showModal: false
    }
  },
  created() {
    this.$http.get('http://api.programator.sk/gallery/' + this.name).then(function(response) {
      if (response.data.images.length > 0) {
        this.makeImages(response.data);
      }
    })
  },
  methods: {
    makeImages: function(response) {
      this.backgroundPictureName = 'url(http://api.programator.sk/images/400x0/' + response.images[0].fullpath + ')';
      for (var i in response.images) {
        var obj = {};
        obj.thumb = 'http://api.programator.sk/images/0x196/' + response.images[i].fullpath;
        obj.src = 'http://api.programator.sk/images/0x0/' + response.images[i].fullpath;
        this.images.push(obj);
      };
    },
    openGallery(index) {
      this.$refs.lightbox.showImage(index)
    }
  }
}
</script>

<style scoped>
img {
  top: -9999px;
  left: -9999px;
  right: -9999px;
  bottom: -9999px;
  margin: auto;
  position: absolute;
}


.gallery {
  margin-bottom: 15px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: table;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  height: 200px;
  width: 100%;
  float: left;
  -webkit-box-shadow: 4px 4px 30px -4px rgba(179, 179, 179, 1);
  box-shadow: 4px 4px 30px -4px rgba(179, 179, 179, 1);
  background: #fff;
}

.gallery:hover {
  transform: scale(1.05);
}

p {
  color: #000;
}

.glyphicon-camera {
  color: #000;
  font-size: 24px;
}

.glyphicon-arrow-left:hover {
  transform: scale(1.3);
}

.addContainer {
  position: absolute;
  display: inline-block;
  position: absolute;
  top: 36%;
  left: 31%;
}
</style>
