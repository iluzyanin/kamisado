<template>
  <div
    :class="`tile color--${this.tileColor} ${this.selected ? 'selected' : ''}`"
    v-on:click="$emit('select')"
  >
    <div
      :class="`icon iconBack--${this.backColor} icon--${this.towerColor}`"
      v-if="towerColor && backColor"
    >
      <v-icon name="chess-rook" scale="1.5"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import 'vue-awesome/icons/chess-rook';

const TileProps = Vue.extend({
  props: {
    tileColor: String,
    backColor: String,
    towerColor: String,
    selected: Boolean,
  },
});

@Component
export default class Tile extends TileProps {}
</script>

<style scoped>
.tile {
  width: 50px;
  height: 50px;
  border: 2px transparent;
  border-radius: 3px;
  margin: 5px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
  transition: transform 100ms;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tile:hover {
  cursor: pointer;
  transform: scale(1.05);
}
.tile.selected {
  transform: scale(1.15);
}
.icon {
  box-shadow: rgba(0, 0, 0, 0.45) 0px 2px 7px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
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
.color--red {
  background: linear-gradient(100deg, #ddd -100%, #ff4136);
}
.color--orange {
  background: linear-gradient(100deg, #ddd -100%, #ff851b);
}
.color--blue {
  background: linear-gradient(100deg, #ddd -100%, #0074d9);
}
.color--purple {
  background: linear-gradient(100deg, #ddd -100%, #ba55d3);
}
.color--pink {
  background: linear-gradient(100deg, #ddd -100%, #ffb6c1);
}
.color--yellow {
  background: linear-gradient(100deg, #ddd -100%, #fab81e);
}
.color--green {
  background: linear-gradient(100deg, #ddd -100%, #2ecc40);
}
.color--brown {
  background: linear-gradient(100deg, #ddd -100%, #a0522d);
}
</style>

