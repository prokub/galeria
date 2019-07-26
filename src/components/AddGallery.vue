<template lang="html">
<form v-on:submit.prevent>
<div class="form-group">
<div class="row">
  <div class="col-md-6 col-12">
    <input type="text" v-model="nameOfNewGallery" class="form-control" placeholder="ZADAJTE NÁZOV KATEGÓRIE"></input>
  </div>
  <div class="col-md-6 col-12">
  <button @click="checkForm" class="btn btn-success"><span class="glyphicon glyphicon-plus"></span> PRIDAŤ</button>
</div>
</div>
</div>
</form>
</template>

<script>
export default {
  methods: {
    checkForm: function() {
      if (typeof this.nameOfNewGallery === "string" && this.nameOfNewGallery.length >= 1) {
        this.addNewGallery();
      } else {
        alert("Názov galérie je povinné pole. Názov galérie musí byť string s minimálnou dĺžkou 1");
      }
    },
    addNewGallery: function() {
      this.$http.post("http://api.programator.sk/gallery", {
        name: this.nameOfNewGallery
      }).then(response => {
        this.$router.go();
      }, response => {
        if (response.status == 409) {
          alert("Galéria s takýmto názvom už existuje");
        };
        if (response.status == 400) {
          alert("Názov galérie je povinné pole. Názov galérie musí byť string s minimálnou dĺžkou 1");
        };
        if (response.status == 500) {
          alert("Error");
        };
      });
    }

  },
  data: function() {
    return {
      nameOfNewGallery: ""
    }
  }

}
</script>

<style lang="css" scoped>
input[type=text] {
border: none;
}
input[type=text]:focus{
    outline: none;
}

</style>
