const data = {
  success: true,
  data: {
    total: 12,
    records: [
      {
        dynamicId: 1,
        id: 123,
        userId: 123,
        nickName: '测试',
        shareTime: '2023-3-29 22:06:55',
        expireTime: '2023-3-30 22:06:55',
        shareChannel: 1,
        shareToWhere: 2
      },
      {
        dynamicId: 2,
        id: 123,
        userId: 123,
        nickName: '测试',
        shareTime: '2023-3-29 22:06:55',
        expireTime: '2023-3-30 22:06:55',
        shareChannel: 2,
        shareToWhere: 3
      },
      {
        dynamicId: 2,
        id: 123,
        userId: 123,
        nickName: '测试',
        shareTime: '2023-3-29 22:06:55',
        expireTime: '2023-3-30 22:06:55',
        shareChannel: 2,
        shareToWhere: 3
      },
      {
        dynamicId: 2,
        id: 123,
        userId: 123,
        nickName: '测试',
        shareTime: '2023-3-29 22:06:55',
        expireTime: '2023-3-30 22:06:55',
        shareChannel: 2,
        shareToWhere: 3
      },
      {
        dynamicId: 2,
        id: 123,
        userId: 123,
        nickName: '测试',
        shareTime: '2023-3-29 22:06:55',
        expireTime: '2023-3-30 22:06:55',
        shareChannel: 2,
        shareToWhere: 3
      },
      {
        dynamicId: 2,
        id: 123,
        userId: 123,
        nickName: '测试',
        shareTime: '2023-3-29 22:06:55',
        expireTime: '2023-3-30 22:06:55',
        shareChannel: 2,
        shareToWhere: 3
      },
      {
        dynamicId: 2,
        id: 123,
        userId: 123,
        nickName: '测试',
        shareTime: '2023-3-29 22:06:55',
        expireTime: '2023-3-30 22:06:55',
        shareChannel: 2,
        shareToWhere: 3
      },
      {
        dynamicId: 2,
        id: 123,
        userId: 123,
        nickName: '测试',
        shareTime: '2023-3-29 22:06:55',
        expireTime: '2023-3-30 22:06:55',
        shareChannel: 2,
        shareToWhere: 3
      },
      {
        dynamicId: 2,
        id: 123,
        userId: 123,
        nickName: '测试',
        shareTime: '2023-3-29 22:06:55',
        expireTime: '2023-3-30 22:06:55',
        shareChannel: 2,
        shareToWhere: 3
      },
      {
        dynamicId: 2,
        id: 123,
        userId: 123,
        nickName: '测试',
        shareTime: '2023-3-29 22:06:55',
        expireTime: '2023-3-30 22:06:55',
        shareChannel: 2,
        shareToWhere: 3
      },
      {
        dynamicId: 2,
        id: 123,
        userId: 123,
        nickName: '测试',
        shareTime: '2023-3-29 22:06:55',
        expireTime: '2023-3-30 22:06:55',
        shareChannel: 2,
        shareToWhere: 3
      },
      {
        dynamicId: 2,
        id: 123,
        userId: 123,
        nickName: '测试',
        shareTime: '2023-3-29 22:06:55',
        expireTime: '2023-3-30 22:06:55',
        shareChannel: 2,
        shareToWhere: 3
      }
    ]
  }
}

export function getDemoList ({ size, current }) {
  let filterData = JSON.parse(JSON.stringify(data))
  filterData.data.records = filterData.data.records.slice(0, size)
  return new Promise((resolve, reject) => {
    resolve(filterData)
  })
}
