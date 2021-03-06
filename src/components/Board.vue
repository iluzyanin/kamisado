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
import {
  createBoard,
  createTowers,
  getMoves,
  getGameOver,
  getRandomMove,
} from '../board';
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

      const moves = getMoves(this.selectedPosition, this.towers);

      return moves;
    },
  },
  methods: {
    selectTile: function(position: number) {
      if (this.selectedPosition === -1) {
        const tower = this.towers[position];
        if (tower && tower.player > 0) {
          this.selectedPosition = position;
          this.player = tower.player;
          this.computerPlayer = this.player === 1 ? 2 : 1;
        }
      } else {
        if (this.moves.indexOf(position) > -1) {
          this.move(position);
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
    move: function(position: number) {
      const selectedTower = this.towers[this.selectedPosition];
      const indexTower = this.towers[position];
      this.$set(this.towers, position, selectedTower);
      this.$set(this.towers, this.selectedPosition, indexTower);
      this.$emit('move', position, this.player, this.towers[position].color);
      if (
        (position > 55 && this.player === 1) ||
        (position < 8 && this.player === 2)
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
          t => t.color === this.board[position] && t.player === this.player
        );
        if (movesTried.indexOf(nextPosition) > -1) {
          this.endGame(currentPlayer === 1 ? 2 : 1);
          return;
        }
        movesTried.push(nextPosition);

        nextMoves = getMoves(nextPosition, this.towers);
      }

      this.selectedPosition = nextPosition;

      if (this.player === this.computerPlayer) {
        let computerMove = nextMoves.find(m => m < 8 || m > 55);
        if (typeof computerMove === 'undefined') {
          computerMove = getRandomMove(this.selectedPosition, this.towers);
        }
        setTimeout(() => this.move(computerMove), 500);
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
.towers--gameOver .tower {
  opacity: 0.1;
  transition: opacity 1s, transform 1s;
}
.tower-move {
  transition: transform 1s;
}
</style>
