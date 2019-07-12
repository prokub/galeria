<template lang="html">
  <div id="file-drag-drop">
      <form ref="fileform" v-on:submit.prevent>
        <div class="divAddFiles" @click="$refs.files.click()">
          <div class="textInAddFiles">
        <span class="glyphicon glyphicon-camera"></span>
        <p>SEM PRESUŇTE FOTKY</p>
        <p>alebo</p>
        <p>VYBERTE SÚBORY</p>
        </div>
        <input type="file" ref="files" if="files" multiple v-on:change="handleFilesUpload()" style="display: none">
      </div>
      </form>
      <div class="container">
        <div class="row">
      <div v-for="(file, key) in files" class="file-listing col-sm-3">
        {{ file.name }}
      </div>
    </div>
    </div>
      <button class="btn btn-success" v-on:click="submitFiles()"><span class="glyphicon glyphicon-plus"></span> PRIDAŤ</button>
    </div>
</template>

<script>
export default {
  methods: {
    handleFilesUpload() {
      this.files = this.$refs.files.files;
    },
    determineDragAndDropCapable() {
      var div = document.createElement('div');
      return (('draggable' in div) ||
          ('ondragstart' in div && 'ondrop' in div)) &&
        'FormData' in window &&
        'FileReader' in window;
    },
    getImagePreviews() {
      for (let i = 0; i < this.files.length; i++) {
        if (/\.(jpe?g|png|gif)$/i.test(this.files[i].name)) {
          let reader = new FileReader();
          reader.addEventListener("load", function() {
            this.$refs['preview' + parseInt(i)][0].src = reader.result;
          }.bind(this), false);
          reader.readAsDataURL(this.files[i]);
        } else {
          this.$nextTick(function() {
            this.$refs['preview' + parseInt(i)][0].src = '/images/file.png';
          });
        }
      }
    },
    submitFiles() {
      let formData = new FormData();
      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        formData.append('files[' + i + ']', file);
      }
      this.$http.post("http://api.programator.sk/gallery/" + this.name, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      }).then(function(data) {
        this.$router.go();
      });
    },
    removeFile(key) {
      this.file.splice(key, 1);
    }
  },
  props: [
    'name'
  ],
  data: function() {
    return {
      dragAndDropCapable: false,
      files: []
    }
  },
  mounted() {
    this.dragAndDropCapable = this.determineDragAndDropCapable();
    if (this.dragAndDropCapable) {
      ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function(evt) {
        this.$refs.fileform.addEventListener(evt, function(e) {
          e.preventDefault();
          e.stopPropagation();
        }.bind(this), false);
      }.bind(this));
      this.$refs.fileform.addEventListener('drop', function(e) {
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
          this.files.push(e.dataTransfer.files[i]);
        }
      }.bind(this));
    }
  }
}
</script>

<style scoped>
form {
  display: block;
  height: 200px;
  width: 70%;
  border: 3px dashed #aaa;
  margin: auto;
  text-align: center;
  border-radius: 4px;
}

.btn {
  margin: 10px;
}

div.file-listing {
  margin: auto;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

a.submit-button {
  display: block;
  margin: auto;
  text-align: center;
  width: 200px;
  padding: 10px;
  text-transform: uppercase;
  background-color: #CCC;
  color: white;
  font-weight: bold;
  margin-top: 20px;
}

.divAddFiles {
  height: 100%;
}

.glyphicon-camera {
  font-size: 24px;
}


.textInAddFiles {
  margin: 0 auto;
  top: 25%;
  position: relative;
}
</style>
