<template lang="html">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click.self="$emit('close')">
        <div class="close">
          <span @click="$emit('close')">X ZAVRIEŤ</span>
        </div>
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
export default {

}
</script>

<style lang="css">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 80%;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  color:#555;
  overflow-y: auto;

}
.modal-header{
  border:none;

}
.modal-header h2 {
  margin-top: 0;
  text-align: left;
  padding: 10px;
}

.modal-body {
  margin: 20px 0;
border-bottom: 1px solid #e5e5e5;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.close{
  text-align:right;
  font-size: 21px;
    font-weight: 500;
    line-height: 1;
    color: #fff;
    filter: alpha(opacity=20);
    opacity: 0.8;
    width: 80%;
    margin: 0 auto;
    padding-bottom: 10px;
    text-shadow: none;
    float: none;
}



</style>
