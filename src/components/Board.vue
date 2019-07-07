<template>
  <div class="board">
    <div class="tiles">
      <Tile
        v-for="(cell, i) in board"
        :available="moves.indexOf(i) > -1 ? player : 0"
        :tileColor="cell"
        :key="'key' + i"
        :selected="i === selectedIndex"
      />
    </div>
    <transition-group tag="div" name="tower" class="towers">
      <Tower
        v-for="(tower, i) in towers"
        :key="tower.id"
        :backColor="tower.player === 1 ? 'black' : tower.player === 2 ? 'white' : ''"
        :towerColor="tower.color"
        :selected="i === selectedIndex"
        @hover="() => setHover(i)"
        @select="() => selectTile(i)"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Tile from './Tile.vue';
import Tower from './Tower.vue';
import { createBoard, createTowers, getMoves } from '../board';
import Color from '../color';

const HelloWorld = Vue.extend({
  components: {
    Tile,
    Tower,
  },
  data() {
    return {
      board: createBoard(),
      towers: createTowers(),
      selectedIndex: -1,
      hoverIndex: -1,
      player: -1,
    };
  },
  computed: {
    moves() {
      if (this.selectedIndex === -1) {
        return [];
      }

      const moves = getMoves(this.selectedIndex, this.player, this.towers);

      return moves;
    },
  },
  methods: {
    selectTile: function(index: number) {
      if (this.selectedIndex === -1) {
        const tower = this.towers[index];
        if (tower && tower.player > 0) {
          this.selectedIndex = index;
          this.player = tower.player;
        }
      } else {
        if (this.moves.indexOf(index) > -1) {
          this.move(index);
        }
      }
    },
    setHover: function(index: number) {
      if (index !== this.hoverIndex) {
        this.hoverIndex = index;
      }
    },
    move: function(index: number) {
      const selectedTower = this.towers[this.selectedIndex];
      const indexTower = this.towers[index];
      this.$set(this.towers, index, selectedTower);
      this.$set(this.towers, this.selectedIndex, indexTower);
      const otherPlayer = this.player === 1 ? 2 : 1;
      const otherPlayerTower = this.towers.find(
        t => t.color === this.board[index] && t.player === otherPlayer
      );

      this.selectedIndex = this.towers.indexOf(otherPlayerTower);
      this.player = otherPlayer;
    },
  },
});

export default HelloWorld;
</script>

<style scoped>
.board {
  display: inline-block;
  position: relative;
  width: 90%;
  max-width: 600px;
}
.board:before {
  content: '';
  display: block;
  margin-top: 100%;
}
.tiles {
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.towers {
  position: absolute;
  top: 0;
  display: flex;
  flex-wrap: wrap;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.tower-move {
  transition: transform 1s;
}
</style>
