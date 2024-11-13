<template>
  <div id="app">
    <router-view></router-view> 
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'; 
export default defineComponent({
  name: 'App'
});
</script>
