<template>
  <div id="app">
    <Board @gameOver="updateState" @move="appendMove" />
    <div class="move-log">
      <div class="move-log-entry" v-for="({ position, player, towerColor }, i) in moves" :key="i">
        <Tower
          :backColor="player === 1 ? 'black' : player === 2 ? 'white' : ''"
          :towerColor="towerColor"
        />
        <v-icon name="arrow-right" />
        <Tile :available="0" :tileColor="board[position]" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Board from './components/Board.vue';
import Tile from './components/Tile.vue';
import Tower from './components/Tower.vue';
import { createBoard } from './board';
import 'vue-awesome/icons/arrow-right';

interface MoveLog {
  player: number;
  position: number;
}

const App = Vue.extend({
  data() {
    return {
      playerWon: -1,
      moves: [],
      board: createBoard(),
    };
  },
  components: {
    Board,
    Tile,
    Tower,
  },
  methods: {
    updateState({ player }: any) {
      this.playerWon = player;
    },
    appendMove(position: number, player: number, towerColor: string) {
      this.moves.push({
        player,
        position,
        towerColor,
      });
    },
  },
});
export default App;
</script>

<style>
#app {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;
}
.move-log {
  margin: 5px 0 0 10px;
  width: 80px;
}
.move-log-entry {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  align-items: center;
}
.move-log-entry .tile,
.move-log-entry .tower {
  width: 30px;
  height: 30px;
}
</style>
