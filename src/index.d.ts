import Vue from 'vue'

export declare class VueMorphTable extends Vue {
  items?: Array<any>
  fields?: Array<any>
  action?: Array<any>
  addTableClasses?: string | Array<any> | object
  responsive?: boolean
  size?: string
  dark?: boolean
  striped?: boolean
  fixed?: Boolean
  hover?: Boolean
  border?: Boolean
  outlined?: Boolean
  header?: boolean
  sorter?: boolean
  sorterValue?: { column: string, asc?: boolean }
  bulkAction?: boolean
  pagination?: boolean
  numOfRows?: Array<any>
  itemsLength?: number
  loading?: boolean
}
