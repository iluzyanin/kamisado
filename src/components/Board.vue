<template>
  <div class="board">
    <div class="tiles">
      <Tile
        v-for="(cell, i) in board"
        :available="moves.indexOf(i) > -1 ? player : 0"
        :tileColor="cell"
        :key="'key' + i"
        :selected="i === selectedPosition"
        :char="boardText[i]"
      />
    </div>
    <transition-group
      tag="div"
      name="tower"
      :class="`towers ${isGameOver ? 'towers--gameOver' : ''}`"
    >
      <Tower
        v-for="(tower, i) in towers"
        :key="tower.id"
        :backColor="tower.player === 1 ? 'black' : tower.player === 2 ? 'white' : ''"
        :towerColor="tower.color"
        :selected="i === selectedPosition"
        @select="() => selectTile(i)"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Tile from './Tile.vue';
import Tower from './Tower.vue';
import { createBoard, createTowers, getMoves, getGameOver } from '../board';
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
      selectedPosition: -1,
      player: -1,
      computerPlayer: -1,
      isGameOver: false,
      boardText: [],
    };
  },
  computed: {
    moves() {
      if (this.selectedPosition === -1 || this.isGameOver) {
        return [];
      }

      const moves = getMoves(this.selectedPosition, this.player, this.towers);

      return moves;
    },
  },
  methods: {
    selectTile: function(index: number) {
      if (this.selectedPosition === -1) {
        const tower = this.towers[index];
        if (tower && tower.player > 0) {
          this.selectedPosition = index;
          this.player = tower.player;
          this.computerPlayer = this.player === 1 ? 2 : 1;
        }
      } else {
        if (this.moves.indexOf(index) > -1) {
          this.move(index);
        }
      }
    },
    togglePlayer() {
      this.player = this.player === 1 ? 2 : 1;
    },
    endGame(winner: number) {
      setTimeout(() => {
        this.$emit('gameOver', { player: winner });
        this.isGameOver = true;
        this.boardText = getGameOver(winner !== this.computerPlayer);
      }, 500);
    },
    move: function(index: number) {
      const selectedTower = this.towers[this.selectedPosition];
      const indexTower = this.towers[index];
      this.$set(this.towers, index, selectedTower);
      this.$set(this.towers, this.selectedPosition, indexTower);
      if (
        (index > 55 && this.player === 1) ||
        (index < 8 && this.player === 2)
      ) {
        this.endGame(this.player);

        return;
      }

      let nextMoves: number[] = [];
      let nextPosition = -1;
      let movesTried: number[] = [];
      let currentPlayer = this.player;

      while (nextMoves.length === 0) {
        this.togglePlayer();
        nextPosition = this.towers.findIndex(
          t => t.color === this.board[index] && t.player === this.player
        );
        if (movesTried.indexOf(nextPosition) > -1) {
          this.endGame(currentPlayer === 1 ? 2 : 1);
          return;
        }
        movesTried.push(nextPosition);

        nextMoves = getMoves(nextPosition, this.player, this.towers);
      }

      this.selectedPosition = nextPosition;

      if (this.player === this.computerPlayer) {
        let moveIndex = nextMoves.findIndex(move => move < 8 || move > 55);
        if (moveIndex === -1) {
          moveIndex = Math.floor(Math.random() * nextMoves.length);
        }
        setTimeout(() => this.move(nextMoves[moveIndex]), 500);
      }
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
.towers--gameOver .icon-container {
  opacity: 0.1;
  transition: opacity 1s, transform 1s;
}
.tower-move {
  transition: transform 1s;
}
</style>
