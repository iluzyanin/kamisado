<template>
  <div class="board">
    <div class="row" v-for="(row, i) in this.board" :key="row[0] + i">
      <Tile
        v-for="(cell, j) in row"
        :tileColor="cell"
        :backColor="getBackColor(i, j)"
        :towerColor="getTowerColor(i, j)"
        :key="cell + j"
        :selected="i === selectedRow && j === selectedColumn"
        v-on:select="() => selectTile(i,j)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Tile from './Tile.vue';
import board from '../board';
import Color from '../color';

interface Tower {
  player: Number;
  color: Color;
  row: Number;
  column: Number;
}

const towers: Tower[] = [
  ...board[0].map((cell, i) => ({ player: 0, color: cell, row: 0, column: i })),
  ...board[7].map((cell, i) => ({ player: 1, color: cell, row: 7, column: i })),
];

const getTower = (row: number, column: number) => {
  return towers.find(tower => tower.row === row && tower.column === column);
};

const HelloWorld = Vue.extend({
  components: {
    Tile,
  },
  data() {
    return {
      board: board,
      towers: towers,
      selectedRow: -1,
      selectedColumn: -1,
    };
  },
  methods: {
    getBackColor: function(row: number, column: number) {
      const tower = getTower(row, column);
      if (tower) {
        return tower.player === 0 ? 'black' : 'white';
      }

      return '';
    },
    getTowerColor: function(row: number, column: number) {
      const tower = getTower(row, column);

      return tower ? tower.color : '';
    },
    selectTile: function(row: number, column: number) {
      this.selectedRow = row;
      this.selectedColumn = column;
    },
  },
});

export default HelloWorld;
</script>

<style scoped>
.board {
  display: flex;
  flex-direction: column;
}
.row {
  display: flex;
}
</style>
