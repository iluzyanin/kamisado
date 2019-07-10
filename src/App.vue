<template>
  <div id="app">
    <Board @gameOver="updateState" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Board from './components/Board.vue';
import Tile from './components/Tile.vue';

const App = Vue.extend({
  data() {
    return {
      playerWon: -1,
    };
  },
  components: {
    Board,
  },
  methods: {
    updateState({ player }: any) {
      this.playerWon = player;
    },
  },
});
export default App;
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
