<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ori-input v-model="val"></ori-input>
    <h3>{{val}}</h3>
    <rich-editor></rich-editor>
  </div>
</template>

<script>
import Input from './Input'
import RichEditor from './RichEditor'
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      val:''
    }
  },
  components:{
    'ori-input':Input,
    'rich-editor':RichEditor
  }
}
</script>


<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
