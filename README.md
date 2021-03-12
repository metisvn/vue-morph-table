# Vue Morph Table

Table Component for Vue

[Vue Morph Table [Github]](https://github.com/simidoc/vue-morph-table/)

## Install with NPM:
```shell
$ npm i vue-morph-table
```
## ... or with Yarn:
```shell
$ yarn add vue-morph-table
```

## Use:
Sample Data:
```javascript
let fields = [
  { key: "id", label: "Id", check: true },
  { key: "name", label: "Name", check: true },
  { key: "age", label: "Age", check: true },
  { key: "class", label: "Class", check: true }
];

let items = [
  { id: 1, name: "John", age: 21, class: "class 1"},
  { id: 2, name: "Alex", age: 21, class: "class 1"},
  { id: 3, name: "Rose", age: 21, class: "class 2"},
  { id: 4, name: "Liz", age: 21, class: "class 2"},
]

let actions = [
  { key: "edit", name: "Edit" },
  { key: "delete", name: "Delete" },
];
```
```javascript
// script TAG
<script>
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
</script>
```
and:
```html
<!-- template TAG -->
<template>
  <div>
    ...
    <VueMorphTable
      :fields.sync="field"
      :items="items"
      ...others
      alias="your_alias_here" />
  </div>
</template>
```
```alias``` specify all key belongs to it in localstorage.

> key name is ```${column_key}.${alias}.morph```

If you have some actions fields. It has ```actions```:
```html
<!-- template TAG -->
<template>
  <div>
    ...
    <VueMorphTable
      :fields.sync="field"
      :items="items"
      :actions="actions"
      ...others
      alias="your_alias_here" />
  </div>
</template>
```

## Props
```javascript
// data
alias [String]
items [Array]
fields [Array]
actions [Array]
addTableClasses [String, Array, Object]
pagination [Boolean]
numOfRows [Array]
// css
responsive [Boolean]
striped [Boolean]
hover [Boolean]
border [Boolean]
sorter [Object, Boolean]
itemsLength [Number]
loading [Boolean]
```

## Slots
If you want to customize table, we provide some slots
| Name                  | Description                         |
|-----------------------|-------------------------------------|
|`${key}-header`        |Customize header fields              |
|`sorting-icon`         |Customize icon sort in header        |
|`${action_key}-header` |Customize action-header fields       |
|`${key}`               |Customize column cell in row         |
|`${action_key}`        |Customize action cell in row         |
|`loading`              |Customize loading                    |

#### Use:
```html
<!-- template TAG -->
<template>
  <div>
    ...
    <VueMorphTable
      :fields.sync="field"
      :items="items"
      :actions="actions"
      ...others
      alias="your_alias_here">
      <template #slot_name_here="{item_data_here}">
        ...
      </template>
    </VueMorphTable>
  </div>
</template>
```

## Use Sort Feature:

In template:
```html
<template>
    <VueMorphTable
      :fields.sync="field"
      :items="items"
      :actions="actions"
      ...others
      alias="your_alias_here"
      @sort="sort_function_here" />
</template>
```
In script:
```javascript
import VueMorphTable from 'vue-morph-table'
...
export default {
  ...
  // define a sort method
  methods: {
    sortMethod() {
      //do somthing
    }
  }
}
```

You must define ```sort``` method.
It's useful for you to sort with REST API


## Use Pagination

If you want to use pagination feature you have to assign ```pagination``` and ```numOfRows``` props
and define ```changeCurrentPage``` and ```changeNumOfRows``` methods.
It's useful for you to paginate with REST API

In template:
```html
<template>
    <VueMorphTable
      ...
      pagination
      numOfRows="arrayOptions"
      :items-length="items.length"
      @changeCurrentPage="define_this_method"
      @changeNumOfRows="define_this_method" />
</template>
```
In script:
```javascript
import VueMorphTable from 'vue-morph-table'
...
export default {
  data() {
    arrayOptions: [10, 20, 30, 50, 100]
  },
  ...
  // define a sort method
  methods: {
    changeCurrentPage() {
      //do something
    },
    changeNumOfRows() {
      //do something
    }
  }
}
```

# All Done
