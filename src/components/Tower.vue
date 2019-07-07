<template>
  <div class="icon-container" v-on:click="$emit('select')" v-on:mouseover="$emit('hover')">
    <div
      :class="`icon iconBack--${this.backColor} icon--${this.towerColor}`"
      v-if="towerColor && backColor"
    >
      <v-icon name="chess-rook" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import 'vue-awesome/icons/chess-rook';

const Tower = Vue.extend({
  props: {
    backColor: String,
    towerColor: String,
    selected: Boolean,
  },
});

export default Tower;
</script>

<style scoped>
.icon-container {
  width: 10.417%;
  height: 10.417%;
  margin: 1.04%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.icon {
  box-shadow: rgba(0, 0, 0, 0.45) 0px 2px 7px;
  border-radius: 50%;
  width: 83%;
  height: 83%;
  line-height: 83%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon svg {
  width: 65%;
  height: 65%;
}

.icon--red {
  color: #de453c;
}

.icon--orange {
  color: #ff851b;
}

.icon--blue {
  color: #0068c3;
}

.icon--purple {
  color: #ba55d3;
}

.icon--pink {
  color: #e698a4;
}

.icon--yellow {
  color: #e6a610;
}

.icon--green {
  color: #25ab34;
}

.icon--brown {
  color: #a0522d;
}

.iconBack--black {
  background: radial-gradient(#333, #555);
}

.iconBack--white {
  background: radial-gradient(#ccc, #fff);
}
</style>

