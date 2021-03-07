# vue-morph-table

Table Component for Vue 2.

## Install with NPM:
```
$ npm i vue-morph-table
```
## ...or with Yarn:
```
$ yarn add vue-morph-table
```

## Use:
```javascript
// script TAG
import VueMorphTable from 'vue-morph-table'
...
export default {
  data() {
    return {
      ...,
      fields: [...], // name can be different
      items: [...]  // name can be different
    }
  },
  ...
  components: {
    ...,
    VueMorphTable
  }
}
```
and:
```html
<template>
  <div>
    ...
    <VueMorphTable :fields.sync="field" :items="items" ...others />
  </div>
</template>
```

