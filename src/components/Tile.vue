<template>
  <div
    :class="`tile color--${this.tileColor} ${this.selected ? 'selected' : ''} ${this.hover ? 'hover' : ''}`"
    v-on:click="$emit('select')"
  >
    <span
      v-if="available > 0"
      :class="`available available--${available === 1 ? 'first' : 'second'}`"
    />
    <span v-if="char" class="char">{{ char }}</span>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import 'vue-awesome/icons/chess-rook';

const Tile = Vue.extend({
  props: {
    tileColor: String,
    selected: Boolean,
    hover: Boolean,
    available: Number,
    char: String,
  },
});

export default Tile;
</script>

<style scoped>
.tile {
  width: 10.417%;
  height: 10.417%;
  margin: 1.04%;
  border: 2px transparent;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
  transition: transform 100ms;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tile.hover {
  cursor: pointer;
  transform: scale(1.05);
  border-color: green;
}

.tile.selected {
  transform: scale(1.15);
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

.available {
  width: 30%;
  height: 30%;
  border-radius: 50%;
  opacity: 0.7;
}

.available--first {
  background-color: #555;
}

.available--second {
  background-color: #eee;
}

.char {
  font-family: monospace;
  font-size: 3em;
  font-weight: bold;
  color: #7b002a;
}

@media (max-width: 450px) {
  .char {
    font-size: 2em;
  }
}
</style>

