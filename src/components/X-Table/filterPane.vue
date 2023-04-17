<template>
  <el-form
    :inline="true"
    :model="params"
    size="small"
    class="filterpane"
  >
    <!-- 单个日期选择 -->
    <el-form-item
      :style="{ order: filterData.dateSelect.order }"
      :label="filterData.dateSelect.label"
      v-if="filterData.dateSelect && filterData.dateSelect.visible"
    >
      <el-date-picker
        v-model="params.date"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        :style="{
          width: filterData.dateSelect.width
            ? filterData.dateSelect.width + 'px'
            : '190px',
        }"
      />
    </el-form-item>

    <!-- 日期范围选择 -->
    <el-form-item
      :style="{ order: filterData.dateRangeSelect.order }"
      :label="filterData.dateRangeSelect.label"
      v-if="filterData.dateRangeSelect && filterData.dateRangeSelect.visible"
    >
      <el-date-picker
        v-model="params.dateRange"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['', '']"
        value-format="yyyy-MM-dd"
        :style="{
          width: filterData.dateRangeSelect.width
            ? filterData.dateRangeSelect.width + 'px'
            : '300px',
        }"
      />
    </el-form-item>

    <!-- 输入框 -->
    <template v-if="filterData.xInput">
      <el-form-item
        v-for="item in filterData.xInput"
        :label="item.label"
        :key="item.key"
        :style="{ order: item.order }"
      >
        <el-input
          v-model="params.listQuery[item.key]"
          :placeholder="item.label"
          clearable
          @clear="handleSearch"
          :style="{ width: item.width ? item.width + 'px' : '190px' }"
        />
      </el-form-item>
    </template>

    <!-- 下拉框 -->
    <template v-if="filterData.xSelect">
      <el-form-item
        v-for="item in filterData.xSelect"
        :label="item.label"
        :key="item.key"
        :style="{ order: item.order }"
      >
        <el-select
          v-model="params.listQuery[item.key]"
          :placeholder="item.label"
          :clearable="item.key !== 'id'"
          @clear="handleSearch"
          @change="handleSelectChange(item.key, $event)"
          :style="{ width: item.width ? item.width + 'px' : '190px' }"
        >
          <el-option
            v-for="(i, idx) in item.option"
            :key="idx"
            :label="i.label"
            :value="i.value"
          />
        </el-select>
      </el-form-item>
    </template>

    <el-form-item :style="{ order: 1000 }">
      <el-button type="primary" @click="handleSearch"> 搜索 </el-button>
      <el-button @click="handleRest"> 重置 </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// 搜索栏组件传参说明
// filterData:{
//   dateSelect: {            单个日期选择，默认visible为false，表示不开启
//      label: "日期选择",
//      width: 190,
//      visible: false,
//      order: 3,             自定义表单栏项顺序，参考flex布局项目的order属性，不传默认按照（日期选择、日期范围选择、输入框、下拉框）顺序展示
//   },
//   dateRangeSelect: {       日期范围选择，默认visible为false，表示不开启
//      label: "日期选择",
//      width: 300,
//      visible: false,
//      order: 4,
//   },
//   xInput:[                开启并循环展示输入框，xInput不为空即开启输入框展示，默认为空
//     {
//       label: '姓名',
//       width: 190,
//       key: 'userName'
//       order: 1,
//     }
//   ],
//   xSelect:[               开启并循环展示下拉框，xSelect不为空即开启下拉框展示，默认为空
//     {
//       label: '部门',
//       width: 190,
//       key: 'department',
//       defaultValue: 52,
//       order: 2,
//       option:[{
//         label: '技术部'
//         value: 1,
//       }]
//     }
//   ]
// }
export default {
  props: {
    filterData: {
      type: Object,
      default: () => {
        return {
          dateSelect: {
            label: "选择日期",
            visible: false,
            width: 190,
          },
          dateRangeSelect: {
            label: "选择日期范围",
            visible: false,
            width: 300,
          },
          xInput: [],
          xSelect: [],
        };
      },
    },
  },
  data() {
    return {
      params: {
        date: '',
        dateRange: ['', ''],
        listQuery: {},
      },
    };
  },
  watch: {
    filterData(val) {
      if (val.xInput.length > 0) {
        val.xInput.map((item) => {
          this.params.listQuery[item.key] = '';
        });
      }

      if (val.xSelect.length > 0) {
        val.xSelect.map((item) => {
          this.params.listQuery[item.key] = '';
        });
      }
    },
    "filterData.rest": {
      handler(val) {
        if (val) {
          this.handleRest();
        }
      },
      deep: true,
    },
  },
  created() {
    this.filterData.xSelect && this.filterData.xSelect.map(item => {
      this.params.listQuery[item.key] = item.defaultValue || '';
    })
    this.handleRest(1)
  },
  methods: {
    // 搜索栏搜索时触发 -- 派发组合传参
    handleSearch() {
      const data = JSON.parse(JSON.stringify(this.params.listQuery));

      // 处理单个日期
      this.params.date && (data.time = this.params.date);

      // 处理日期范围
      if (this.params.dateRange && this.params.dateRange[0] !== '') {
        [data.beginTime, data.endTime] = this.params.dateRange
      }

      // 处理其他（输入框、下拉框）
      Object.keys(data).forEach((key) => {
        if (data[key] === '') {
          delete data[key];
        }
      });

      this.$emit("filterChange", data);
    },

    // 搜索栏重置时触发 -- 组合传参初始化
    handleRest(type) {
      const data = JSON.parse(JSON.stringify(this.params.listQuery));
      Object.keys(data).forEach((key) => {
        if (key !== 'id') {
          data[key] = '';
        }
      });
      this.params.date = '';
      this.params.listQuery = data;
      this.params.dateRange = ['', ''];
      type !== 1 && this.$emit("filterChange", data);
    },

    // 下拉框改变时触发
    handleSelectChange(key, value) {
      this.$set(this.params.listQuery, key, value)
      this.handleSearch()
    }
  },
};
</script>

<style lang="less" scoped>
.filterpane {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
</style>