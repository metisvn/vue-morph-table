<script>
import Vue from 'vue';
import VueMorphTable from '@/vue-morph-table.vue';

let fields = [
  { key: "hello_1", label: "Hello 1", check: true },
  { key: "hello_2", label: "Hello 2", check: true },
  { key: "hello_3", label: "Hello 3", check: true },
  { key: "hello_4", label: "Hello 4", check: true },
  { key: "hello_5", label: "Hello 5", check: true }
];

let items = [
  { hello_1: 1, hello_2: 2, hello_3: 3, hello_4: 4, hello_5: 5 },
  { hello_1: 1, hello_2: 2, hello_3: 3, hello_4: 4, hello_5: 5 },
  { hello_1: 1, hello_2: 2, hello_3: 3, hello_4: 4, hello_5: 5 },
  { hello_1: 1, hello_2: 2, hello_3: 3, hello_4: 4, hello_5: 5 },
  { hello_1: 1, hello_2: 2, hello_3: 3, hello_4: 4, hello_5: 5 },
  { hello_1: 1, hello_2: 2, hello_3: 3, hello_4: 4, hello_5: 5 },
  { hello_1: 1, hello_2: 2, hello_3: 3, hello_4: 4, hello_5: 5 },
  { hello_1: 1, hello_2: 2, hello_3: 3, hello_4: 4, hello_5: 5 },
  { hello_1: 1, hello_2: 2, hello_3: 3, hello_4: 4, hello_5: 5 },
  { hello_1: 1, hello_2: 2, hello_3: 3, hello_4: 4, hello_5: 5 },
  { hello_1: 1, hello_2: 2, hello_3: 3, hello_4: 4, hello_5: 5 },
  { hello_1: 1, hello_2: 2, hello_3: 3, hello_4: 4, hello_5: 5 }
];

export default Vue.extend({
  name: 'ServeDev',
  data() {
    return {
      fields,
      items
    }
  },
  components: {
    VueMorphTable
  }
});
</script>

<template>
  <div id="app">
    <vue-morph-table
      :fields.sync="fields"
      :items="items"
      :striped="true"
      :hover="true"
      :border="true"
    />
  </div>
</template>
