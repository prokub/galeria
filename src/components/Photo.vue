<template>
<div class="row">
  <div class="col-md">
    <div class="album" @click="showModal = true">
      <img :src="'http://api.programator.sk/images/200x0/'+ this.name.fullpath" alt="" class="imgOfAlbum">
    </div>
  </div>
  <modal v-if="showModal" @close="showModal = false">
    <div class="modal-header">
    </div>
    <img :src="'http://api.programator.sk/images/0x0/'+ this.name.fullpath" alt="" class="imgOfAlbum" slot="body">
  </modal>
</div>
</template>

<script>
import Modal from '@/components/Modal.vue'


export default {
  props: [
    'name', 'album'
  ],
  components: {
    Modal
  },
  data: function() {
    return {
      showModal: false
    };
  },
  methods: {

  },
  created() {

  }

}
</script>

<style>
.album {
  width: 100%;
  max-width: 250px;
  min-width: 250px;
  margin: 40px auto;
  box-sizing: border-box;
  height: 200px;
  border: 1px solid #000;
  display: table;
  min-height: 250px;
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

.imgOfAlbum {
  width: 100%;
}

.table {
  text-align: center;
}
</style>
