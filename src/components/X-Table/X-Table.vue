<template>
  <div class="xtable">
    <filter-pane
      ref="filterPane"
      :filter-data="tableData.filterData"
      @filterChange="filterChange"
    />
    <table-pane
      :data-source="tableData.dataSource"
      :page-data="tableData.pageData"
      @changeSize="changeSize"
      @changeNum="changeNum"
    />
  </div>
</template>

<script>
import filterPane from "./filterPane";
import tablePane from "./tablePane";
import { getDemoList } from "@/api/user";

export default {
  name: "X-Table",
  components: {
    filterPane,
    tablePane
  },
  props: {
    tableData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      filterParams: {}
    }
  },
  mounted() {
    this.$refs.filterPane.filterData.xSelect && this.$refs.filterPane.filterData.xSelect.forEach(item => {
      if (item.label === '下拉框名称') {
        this.filterParams.id = item.defaultValue
      }
    })
    this.getList()
  },
  methods: {
    // 根据传参获取表格数据
    getList(type) {
      const { pageData, dataSource } = this.tableData
      const params = {
        size: pageData.pageSize,
        current: type === 'filter' ? 1 : pageData.pageNum,
        ...this.filterParams
      }

      const TIMEOUT = 10000
      dataSource.loading = true
      // this.$http({
      //   url: api?.url,
      //   method: 'post',
      //   data: {
      //     ...params
      //   }
      // })
      getDemoList(params).then(res => {
        const { total, records } = res.data
        pageData.total = total || 0
        dataSource.data = records || []
        dataSource.loading = false
      }).finally(() => {
        setTimeout(() => {
          dataSource.loading = false
        }, TIMEOUT)
      })
    },

    // 搜索栏改变时触发
    filterChange(filterParams) {
      this.filterParams = filterParams
      this.tableData.pageData.pageNum = 1
      this.getList('filter')
    },

    // 分页size改变时触发
    changeSize(size) {
      this.tableData.pageData.pageSize = size
      this.getList()
    },

    // 分页页码改变时触发
    changeNum(pageNum) {
      this.tableData.pageData.pageNum = pageNum
      this.getList()
    },
  },
};
</script>

<style lang="less" scoped>
.xtable {
  padding: 20px;
}
</style>
