<template>
  <div class="wrapper">
    <!-- Sidebar -->
    <div class="sidebar" :style="sidebarWidth">
      <a href="javascript:void(0)" class="close-btn" @click="closeSidebar">×</a>
      <div class="content">
        <template v-for="(field, index) in allFields">
          <div class="form-check-default box-checkbox" :key="index">
            <input
              class="form-checkbox-input"
              type="checkbox"
              :value="field.value"
              id="flexCheckDefault"
              :checked="field.check"
              @change="changeCheck(index)"
            />
            <label class="form-checkbox-label-2" for="flexCheckDefault">
              {{ field.label }}
            </label>
          </div>
        </template>
      </div>
    </div>
    <!-- Content -->
    <div class="utils">
      <button class="btn" @click="show = true">
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
    <div :class="`position-relative ${responsive ? 'table-responsive' : ''}`">
      <table :class="tableClasses">
        <thead>
          <tr v-if="header">
            <template v-for="(columnName, index) in columnNames">
              <th :key="index">
                <slot :name="`${rawColumnNames[index]}-header`">
                  <div>{{ columnName }}</div>
                </slot>
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
    items: Array,
    fields: Array,
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
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    allFields: {
      get: function () {
        return this.$props.fields;
      },
      set: function (newVal) {
        this.$emit("update:fields", newVal);
      },
    },
    filterFields() {
      let ret = [];
      this.allFields.forEach((f) => {
        if (f.check) ret.push(f);
      });
      return ret;
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
  methods: {
    pretifyName: function (name) {
      return name
        .replace(/[-_.]/g, " ")
        .replace(/ +/g, " ")
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    },
    closeSidebar() {
      this.show = false;
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
  },
};
</script>

<style lang="scss" scoped>
div.wrapper {
  font-family: Arial, Helvetica, sans-serif;
  div.sidebar {
    position: fixed;
    height: 100%;
    z-index: 1;
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
}

.utils {
  float: right;
}
</style>
