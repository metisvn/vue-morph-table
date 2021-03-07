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
  { hello_1: 5, hello_2: 1, hello_3: 3, hello_4: 4, hello_5: 5 },
  { hello_1: 7, hello_2: 2, hello_3: 3, hello_4: 4, hello_5: 5 },
  { hello_1: 8, hello_2: 5, hello_3: 3, hello_4: 4, hello_5: 5 },
  { hello_1: 3, hello_2: 7, hello_3: 3, hello_4: 4, hello_5: 5 },
  { hello_1: 2, hello_2: 8, hello_3: 3, hello_4: 4, hello_5: 5 },
  { hello_1: 7, hello_2: 3, hello_3: 3, hello_4: 4, hello_5: 5 },
  { hello_1: 4, hello_2: 2, hello_3: 3, hello_4: 4, hello_5: 5 },
  { hello_1: 8, hello_2: 1, hello_3: 3, hello_4: 4, hello_5: 5 },
  { hello_1: 9, hello_2: 1, hello_3: 3, hello_4: 4, hello_5: 5 },
  { hello_1: 6, hello_2: 4, hello_3: 3, hello_4: 4, hello_5: 5 },
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
  },
  methods: {
    sortHandle(e) {
      const { column, asc } = e
      this.items = this.items.sort(function (item1, item2) {
        return asc? item1[column] - item2[column] : item2[column] - item1[column]
      })
    }
  }
});
</script>

<template>
  <div id="app">
    <vue-morph-table
      :fields.sync="fields"
      :items="items"
      striped
      hover
      border
      sorter
      @sort="sortHandle($event)"
    />
  </div>
</template>
