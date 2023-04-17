<template>
  <x-table :table-data="tableData" />
</template>

<script>
import xTable from '@/components/X-Table/X-Table.vue'
import { formatDate } from '@/utils/source'

export default {
  name: 'xTableDemo',
  components: { xTable },
  data () {
    return {
      tableData: {
        // 搜索栏配置
        filterData: {
          dateSelect: {
            label: '统计时间',
            visible: true,
            order: 3
          },
          dateRangeSelect: {
            label: '统计周期',
            visible: true,
            order: 4
          },
          xInput: [
            {
              label: '脸影号',
              key: 'userId',
              order: 1
            },
            {
              label: '呢称',
              key: 'nickName',
              order: 5
            }
          ],
          xSelect: [
            {
              label: '部门',
              key: 'department',
              order: 2,
              option: [
                {
                  label: '技术部',
                  value: 1
                },
                {
                  label: '运营部',
                  value: 2
                }
              ]
            }
          ]
        },
        // 表格配置
        dataSource: {
          // 工具栏配置
          tool: [
            {
              key: 1,
              name: '新增',
              handleClick: this.handleAdd
            },
            {
              key: 2,
              name: '刷新',
              handleClick: this.handleRefresh,
              bgColor: '#873bf4' // 自定义按钮背景色
            },
            {
              key: 3,
              name: '批量删除',
              handleClick: this.handleDelete,
              type: 'danger'
            }
          ],
          // 表格数据
          data: [],
          // 表格列配置项
          columns: [
            {
              label: '动态id',
              prop: 'dynamicId',
              width: 100
            },
            {
              label: '分享id',
              prop: 'id',
              width: 100
            },
            {
              label: '分享人脸影号',
              prop: 'userId',
              width: 150
            },
            {
              label: '分享人昵称',
              prop: 'nickName',
              width: 150
            },
            {
              label: '分享的时间',
              prop: 'shareTime',
              width: 170,
              formatter: val => formatDate(val.shareTime)
            },
            {
              label: '过期时间',
              prop: 'expireTime',
              width: 170,
              formatter: val => formatDate(val.expireTime)
            },
            {
              label: '分享渠道',
              prop: 'shareChannel',
              width: 120,
              formatter: function (val) {
                if (val.shareChannel === 1) {
                  return 'IOS'
                } else {
                  return 'Android'
                }
              }
            },
            {
              label: '分享平台',
              prop: 'shareToWhere',
              width: 120,
              formatter: function (val) {
                if (val.shareToWhere === 1) {
                  return '朋友圈'
                } else if (val.shareToWhere === 2) {
                  return '微信好友'
                } else if (val.shareToWhere === 3) {
                  return 'qq空间'
                } else if (val.shareToWhere === 4) {
                  return 'qq好友'
                } else if (val.shareToWhere === 5) {
                  return '新浪微博'
                } else if (val.shareToWhere === 6) {
                  return '脸影好友'
                }
              }
            }
          ],
          isSelection: true, // 开启表格多选
          handleSelectionChange: this.handleSelectionChange, // 表格多选回调函数，isSelection为false时不传
          isIndex: true, // 开启列表序号
          loading: true, // 开启loading
          isOperation: true, // 开启行操作列
          // 表格有操作列时设置，isOperation为false时不传
          operation: {
            label: '操作', // 列名
            width: '100', // 根据实际情况给宽度
            data: [
              {
                label: '编辑', // 操作名称
                handleRow: this.handleRow
              },
              {
                label: '删除', // 操作名称
                handleRow: this.handleRow
              }
            ]
          }
        },
        // 分页配置
        pageData: {
          total: 0, // 总条数
          pageSize: 10, // 每页数量
          pageNum: 1 // 页码
        }
        // 表格接口相关配置
        // api: {
        //   url: '/data/collect/outpatient/patient/list', // 接口地址
        //   params: { // 额外参数
        //     id: 52 // 52仅用于数据源id测试联调，后续患者信息页面需要下拉框与表格数据联动，下拉框提供数据源id
        //   }
        // }
      }
    }
  },

  methods: {
    // 操作栏项点击时触发
    handleRow (index, row, label) {
      console.log(index, row, label)
    },

    // 选中表格行时触发
    handleSelectionChange (val) {
      console.log(val)
    },

    // 新增时触发
    handleAdd (name, e) {
      console.log(name, e)
    },

    // 刷新时触发
    handleRefresh (name, e) {
      console.log(name, e)
    },

    // 批量删除时触发
    handleDelete (name, e) {
      console.log(name, e)
    }
  }
}
</script>
