<template>
  <div class="table-wapper">
    <!-- 扩展工具栏 -->
    <div v-if="dataSource.tool" class="tool">
      <el-button
        v-for="(item, index) in dataSource.tool"
        :key="item.key || index"
        :style="{ background: item.bgColor, borderColor: item.bgColor }"
        :type="item.type || 'primary'"
        :size="item.size || 'small'"
        @click="item.handleClick(item.name, $event)"
      >
        {{ item.name }}
      </el-button>
    </div>

    <!-- 表格内容区 -->
    <el-table
      ref="table"
      v-loading="dataSource.loading"
      :border="dataSource.border ? true : false"
      style="width: 100%"
      :class="{ 'no-data': !dataSource.data || !dataSource.data.length }"
      :data="dataSource.data"
      @selection-change="dataSource.handleSelectionChange || (() => {})"
    >
      <!-- 是否有多选 -->
      <el-table-column
        v-if="dataSource.isSelection"
        :selectable="dataSource.selectable"
        type="selection"
        :width="dataSource.selectionWidth || 50"
        align="center"
      />

      <!-- 是否需要序号 -->
      <el-table-column
        v-if="dataSource.isIndex"
        type="index"
        label="序号"
        width="55"
        align="center"
        fixed
        :index="indexCal"
      />

      <!-- 列处理 -->
      <template v-for="item in dataSource.columns">
        <!-- 表格的列展示 特殊情况处理 比如要输入框 显示图片 -->
        <el-table-column v-if="item.isTemplate" :key="item.prop" v-bind="item">
          <template slot-scope="scope">
            <!-- 比如要输入框 显示图片等等 自己定义 -->
            <slot :name="item.prop" :scope="scope" />
          </template>
        </el-table-column>
        <!-- 需要特殊颜色显示字体-->
        <el-table-column
          v-if="item.isSpecial"
          :key="item.prop"
          v-bind="item"
          align="center"
        >
          <template slot-scope="scope">
            <span
              :class="item.isSpecialClass(scope.row[scope.column.property])"
              >{{ item.isSpecial(scope.row[scope.column.property]) }}</span
            >
          </template>
        </el-table-column>
        <!-- 需要带图标的某列，带回调事件-->
        <el-table-column
          v-if="item.isIcon"
          :key="item.prop"
          v-bind="item"
          align="center"
        >
          <template slot-scope="scope">
            <span>
              <span>{{ item.filter(scope.row[scope.column.property]) }}</span>
              <i
                v-if="item.icon"
                :class="[
                  item.icon(scope.row[scope.column.property]),
                  'icon-normal',
                ]"
                @click="item.handlerClick(scope.row)"
              />
            </span>
            <!-- 比如要输入框 显示图片等等 自己定义 -->
            <slot :name="item.prop" :scope="scope" />
          </template>
        </el-table-column>
        <!-- 图片带tooltip -->
        <el-table-column
          v-if="item.isImagePopover"
          :key="item.prop"
          v-bind="item"
          align="center"
        >
          <template slot-scope="scope">
            <el-popover placement="right" title="" trigger="hover">
              <img
                class="image-popover"
                :src="
                  scope.row[scope.column.property] +
                  '?x-oss-process=image/quality,q_60'
                "
                alt=""
              />
              <img
                slot="reference"
                class="reference-img"
                :src="
                  scope.row[scope.column.property] +
                  '?x-oss-process=image/quality,q_10'
                "
                alt=""
              />
            </el-popover>
          </template>
        </el-table-column>
        <!-- 大部分适用 -->
        <el-table-column
          v-if="
            !item.isImagePopover &&
            !item.isTemplate &&
            !item.isSpecial &&
            !item.isIcon
          "
          :key="item.prop"
          v-bind="
            item.formatter
              ? Object.assign({ formatter: item.formatter }, item)
              : item
          "
          align="center"
          show-overflow-tooltip
        />
      </template>

      <!-- 是否有操作列 -->
      <el-table-column
        v-if="dataSource.isOperation"
        :show-overflow-tooltip="dataSource.operation.overflowTooltip"
        v-bind="
          dataSource.data && dataSource.data.length ? { fixed: 'right' } : null
        "
        style="margin-right: 20px"
        class-name="handle-td"
        label-class-name="tc"
        :width="dataSource.operation.width || '120'"
        :label="dataSource.operation.label || '操作'"
        align="center"
      >
        <template slot-scope="scope">
          <template v-if="dataSource.operation.data.length > 0">
            <div class="btn">
              <div v-for="item in dataSource.operation.data" :key="item.label">
                <template v-if="item.type !== 'icon'">
                  <el-button
                    v-bind="item"
                    :type="item.type ? item.type : 'text'"
                    @click.native.prevent="
                      item.handleRow(scope.$index, scope.row, item.label)
                    "
                  >
                    {{ item.label }}
                  </el-button>
                </template>
                <template v-else>
                  <i
                    :class="[icon, item.icon]"
                    v-bind="item"
                    @click="item.handleRow(scope.$index, scope.row, item.label)"
                  />
                </template>
              </div>
            </div>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="page">
      <el-pagination
        v-if="pageData.total > 0"
        :current-page="pageData.pageNum"
        :page-sizes="
          pageData.pageSizes
            ? pageData.pageSizes
            : [5, 10, 15, 20]
        "
        :page-size="pageData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.total"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
// 表格组件传参说明
// dataSource: {
//   tool:[                           // 扩展工具栏
//     {
//       key: 1,                      // 唯一标识符
//       name: '新增',                // 按钮名称
//       type: 'primary',             // 使用element自带按钮类型
//       bgColor: '#67c23a',          // 自定义背景色
//       handleClick: this.handleAdd  // 自定义事件
//     },
//   ],
//   data: [],                        // 表格数据
//   columns: [],                     // 表格列配置
//   isSelection: false,              // 表格有多选时设置
//   handleSelectionChange:(val)=>{}  // 表格多选回调函数
//   isIndex: true,                   // 显示表格序号
//   loading: true,                   // 开启loading
//   isOperation: true,               // 开启表格操作列
//   operation: {                     // 表格有操作列时设置
//     label: '操作',                 // 列名
//     width: '120',                  // 根据实际情况给宽度
//     data: [                        // 操作列每项
//       {
//         label: '编辑',             // 操作名称
//         type: 'default',           // 按钮类型
//         handleRow: function(){}    // 自定义事件
//       },
//     ]
//   },
// },
// pageData: {                        // 分页配置
//   total: 0,                        // 总条数
//   pageSize: 10,                    // 每页数量
//   pageNum: 1,                      // 页码
//   pageSize: [5,10,15,20]           // 每页数量调整
// },
// api: {                             // 表格接口相关配置
//   url: '',                         // 接口地址
//    params: {                       // 额外参数
//      id: 29
//    }
// }
export default {
  props: {
    dataSource: {
      type: Object,
      default: () => {}
    },
    pageData: {
      type: Object,
      default: () => {
        return {
          total: 0,
          pageSize: 10,
          pageNum: 1
        }
      }
    }
  },
  watch: {
    'dataSource.columns': {
      handler () {
        // 解决表格列变动的抖动问题
        this.$nextTick(this.$refs.table.doLayout)
      },
      deep: true
    }
  },
  methods: {
    // 分页size改变时触发
    handleSizeChange (val) {
      this.$emit('changeSize', val)
    },

    // 分页页码改变时触发
    handleCurrentChange (val) {
      this.$emit('changeNum', val)
    },

    // 根据page和size计算序号
    indexCal (index) {
      const { pageData } = this
      return (pageData.pageNum - 1) * pageData.pageSize + index + 1
    }
  }
}
</script>

<style lang="less" scoped>
.tool {
  margin-bottom: 16px;
}
.page {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
.btn {
  display: flex;
  justify-content: center;
}
.btn div {
  margin-left: 5px;
}
.reference-img {
  width: 40px;
  height: 40px;
  background-size: 100% 100%;
  border-radius: 4px;
}
.image-popover {
  width: 200px;
  height: 200px;
  background-size: 100% 100%;
}
.icon {
  width: 25px;
  font-size: 20px;
  font-weight: bold;
}
</style>
