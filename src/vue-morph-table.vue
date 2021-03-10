<template>
  <div class="wrapper">
    <div class="overlay" :style="overlayStyle" @click="closeSidebar"></div>
    <!-- Sidebar -->
    <div class="sidebar" :style="sidebarWidth">
      <a href="javascript:void(0)" class="close-btn" @click="closeSidebar">×</a>
      <div class="content">
        <!-- Check All Fields -->
        <div class="form-check-default box-checkbox">
          <input
            class="form-checkbox-input"
            type="checkbox"
            value="all"
            id="flexCheckDefault"
            :checked="checkAll"
            @change="changeCheckAll"
            :disabled="checkAll"
          />
          <label class="form-checkbox-label" for="flexCheckDefault"> All</label>
        </div>
        <template v-for="(field, index) in allFields">
          <div class="form-check-default box-checkbox" :key="index">
            <input
              class="form-checkbox-input"
              type="checkbox"
              :value="field.value"
              :id="`flexCheckDefault-${index}`"
              :checked="field.check"
              @change="changeCheck(index)"
              :disabled="lastFields === index"
            />
            <label
              class="form-checkbox-label"
              :for="`flexCheckDefault-${index}`"
            >
              {{ field.label }}
            </label>
          </div>
        </template>
      </div>
    </div>
    <!-- Content -->
    <div class="utils">
      <button class="btn" @click="openSidebar">
        <svg
          height="10pt"
          viewBox="0 -53 384 384"
          width="10pt"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
          />
          <path
            d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
          />
          <path
            d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
          />
        </svg>
      </button>
    </div>
    <div :class="`${responsive ? 'table-responsive' : ''}`">
      <table :class="tableClasses">
        <thead>
          <tr v-if="header">
            <template v-for="(columnName, index) in columnNames">
              <th
                :key="index"
                @click="changeSort(rawColumnNames[index], index)"
              >
                <slot :name="`${rawColumnNames[index]}-header`">
                  <span>{{ columnName }}</span>
                </slot>
                <slot
                  v-if="isSortable(index)"
                  name="sorting-icon"
                  :state="getIconState(index)"
                >
                  <div :class="iconClasses(index)">
                    <svg
                      width="1rem"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 512 512"
                      style="enable-background: new 0 0 512 512"
                      xml:space="preserve"
                    >
                      <path
                        style="fill: #4caf50"
                        d="M263.432,3.136c-4.16-4.171-10.914-4.179-15.085-0.019c-0.006,0.006-0.013,0.013-0.019,0.019
	l-192,192c-4.093,4.237-3.975,10.99,0.262,15.083c4.134,3.992,10.687,3.992,14.82,0L245.213,36.416v464.917
	c0,5.891,4.776,10.667,10.667,10.667c5.891,0,10.667-4.776,10.667-10.667V36.416l173.781,173.781
	c4.093,4.237,10.845,4.355,15.083,0.262c4.237-4.093,4.354-10.845,0.262-15.083c-0.086-0.089-0.173-0.176-0.262-0.262L263.432,3.136
	z"
                      />
                      <path
                        d="M447.88,213.333c-2.831,0.005-5.548-1.115-7.552-3.115L255.88,25.749L71.432,210.219c-4.237,4.093-10.99,3.975-15.083-0.262
	c-3.992-4.134-3.992-10.687,0-14.82l192-192c4.165-4.164,10.917-4.164,15.083,0l192,192c4.159,4.172,4.149,10.926-0.024,15.085
	C453.409,212.214,450.702,213.333,447.88,213.333z"
                      />
                      <path
                        d="M255.88,512c-5.891,0-10.667-4.776-10.667-10.667V10.667C245.213,4.776,249.989,0,255.88,0
	c5.891,0,10.667,4.776,10.667,10.667v490.667C266.546,507.224,261.771,512,255.88,512z"
                      />
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                    </svg>
                  </div>
                </slot>
              </th>
            </template>
            <template v-for="(action, index) in actions">
              <th :key="`action_${index}`">
                <slot :name="`${action['key']}-header`">_</slot>
              </th>
            </template>
          </tr>
        </thead>
        <tbody class="position-relative">
          <template v-for="(item, itemIndex) in items">
            <tr :key="itemIndex">
              <template v-for="(colName, colNameIndex) in rawColumnNames">
                <slot
                  v-if="$scopedSlots[colName]"
                  :name="colName"
                  :item="item"
                  :index="itemIndex"
                />
                <td v-else :key="colNameIndex">{{ String(item[colName]) }}</td>
              </template>
              <template v-for="(actionInRow, indexActionInRow) in actions">
                <slot
                  v-if="$scopedSlots[actionInRow['key']]"
                  :name="actionInRow['key']"
                  :item="item"
                  :index="itemIndex"
                />
                <td v-else :key="`action_${indexActionInRow}`"></td>
              </template>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "vue-morph-table",
  props: {
    alias: String,
    items: Array,
    fields: Array,
    actions: {
      type: Array,
      default: () => [],
    },
    addTableClasses: [String, Array, Object],
    responsive: {
      type: Boolean,
      default: true,
    },
    size: String,
    dark: Boolean,
    striped: Boolean,
    fixed: Boolean,
    hover: Boolean,
    border: Boolean,
    outlined: Boolean,
    header: {
      type: Boolean,
      default: true,
    },
    sorter: [Object, Boolean],
    sorterValue: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      show: false,
      overlayStyle: {
        width: "0%",
        opacity: 0,
      },
      sorterState: {
        column: null,
        asc: true,
      },
      checkAll: false,
      lastFields: -1,
    };
  },
  computed: {
    allFields: {
      get: function () {
        let showFieldsLength = 0;
        this.$props.fields.forEach((f) => {
          if (this.alias)
            localStorage.setItem(`${f.key}.${this.alias}.morph`, f.check);
          if (f.check) showFieldsLength++;
        });
        if (showFieldsLength === this.$props.fields.length) {
          this.checkAll = true;
        } else {
          this.checkAll = false;
        }
        return this.$props.fields;
      },
      set: function (newVal) {
        this.$emit("update:fields", newVal);
      },
    },
    filterFields() {
      let ret = [];
      let idx = -1;
      this.allFields.forEach((f, index) => {
        if (f.check) {
          ret.push(f);
          idx = index;
        }
      });
      this.lastFields = ret.length === 1 ? idx : -1;
      return ret !== [] ? ret : null;
    },
    tableClasses() {
      return [
        "table",
        this.addTableClasses,
        {
          "table-striped": this.striped,
          "table-hover": this.hover,
          "table-bordered": this.border,
          border: this.outlined,
        },
      ];
    },
    itemsDataColumns() {
      return this.rawColumnNames.filter((name) => {
        return this.generatedColumnNames.includes(name);
      });
    },
    generatedColumnNames() {
      return Object.keys(this.items[0] || {}).filter(
        (el) => el.charAt(0) !== "_"
      );
    },
    columnNames() {
      if (this.filterFields) {
        return this.filterFields.map((f) => {
          return f.label !== undefined ? f.label : this.pretifyName(f.key || f);
        });
      }
      return this.rawColumnNames.map((el) => this.pretifyName(el));
    },
    rawColumnNames() {
      if (this.filterFields) {
        return this.filterFields.map((el) => el.key || el);
      }
      return this.generatedColumnNames;
    },
    sidebarWidth() {
      const value = this.show ? "250px" : 0;
      return { width: value };
    },
  },
  watch: {
    sorterValue: {
      immediate: true,
      handler(val) {
        const asc = val.asc !== false;
        this.sorterState = Object.assign({}, { asc, column: val.column });
      },
    },
    checkAll(val) {
      if (val === true) {
        this.allFields.forEach((f) => {
          f.check = true;
        });
      }
    },
  },
  methods: {
    changeSort(column, index) {
      if (!this.isSortable(index)) {
        return;
      }
      const state = this.sorterState;
      const columnRepeated = state.column === column;
      state.column = column;
      state.asc = !(columnRepeated && state.asc);
      this.$emit("update:sorter-value", this.sorterState);
      this.$emit("sort", this.sorterState);
    },
    getIconState(index) {
      const direction = this.sorterState.asc ? "asc" : "desc";
      return this.rawColumnNames[index] === this.sorterState.column
        ? direction
        : 0;
    },
    iconClasses(index) {
      const state = this.getIconState(index);
      return [
        "arrow",
        {
          transparent: !state,
          "rotate-icon": state === "desc",
        },
      ];
    },
    pretifyName: function (name) {
      return name
        .replace(/[-_.]/g, " ")
        .replace(/ +/g, " ")
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    },
    isSortable(index) {
      return (
        this.sorter &&
        (!this.fields || this.fields[index].sorter !== false) &&
        this.itemsDataColumns.includes(this.rawColumnNames[index])
      );
    },
    openSidebar() {
      this.show = true;
      this.overlayStyle.width = "100%";
      this.overlayStyle.opacity = 0.8;
    },
    closeSidebar() {
      this.show = false;
      this.overlayStyle.width = "0%";
      this.overlayStyle.opacity = 0;
    },
    changeCheck(index) {
      this.$emit("update:fields", [
        ...this.fields.slice(0, index),
        {
          ...this.fields[index],
          check: !this.fields[index].check,
        },
        ...this.fields.slice(index + 1),
      ]);
    },
    changeCheckAll() {
      this.checkAll = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.rotate-icon {
  transform: rotate(180deg);
  top: -0.3rem;
}

div.arrow {
  display: inline-block;
  position: relative;
  margin-left: 0.1rem;
  vertical-align: middle;
  font-size: 27;
  img.sort-icon {
    padding: 0;
    width: 1rem;
  }
}

.position-relative {
  position: relative;
}

div.wrapper {
  font-family: Arial, Helvetica, sans-serif;
  div.overlay {
    position: fixed;
    height: 100vh;
    z-index: 100;
    left: 0;
    top: 0;
    background-color: #111;
  }
  div.sidebar {
    position: fixed;
    height: 100%;
    z-index: 100;
    top: 0;
    right: 0;
    background-color: #fff;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
    a {
      padding: 8px 8px 8px 32px;
      text-decoration: none;
      font-size: 25px;
      color: #616161;
      display: block;
      transition: 0.3s;
      &:hover {
        color: #a1a1a1;
      }
    }
    .close-btn {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 24px;
      margin-left: 10px;
    }
    .content {
      margin: 0 0 0 2rem;
    }
  }
}

.table {
  border-collapse: collapse;
  width: 100%;
  td,
  th {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 8px;
  }
  &.table-bordered {
    td,
    th {
      border: 1px solid #ddd;
      padding: 8px;
    }
  }
  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #fff;
  }
  &.table-striped {
    tr {
      &:nth-child(odd) {
        background-color: #f2f2f2;
      }
    }
  }
  &.table-hover {
    tr {
      &:hover {
        background-color: #ddd;
      }
    }
  }
}

.btn {
  border: none;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  background-color: #fff;
}

.utils {
  float: right;
}
</style>
