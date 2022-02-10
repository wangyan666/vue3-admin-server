/**
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-21 15:51:48
 * @LastEditors  : wy
 * @LastEditTime : 2022-02-07 17:47:45
 * @FilePath     : \\src\\utils\\formatter.js
 * @加油
 */

// 将扁平数组处理成树结构，方便 级联菜单使用
export const toTree = (arr) => {
  const newArr = []
  const map = new Map()
  for (let i = 0; i < arr.length; i++) {
    arr[i].children = []
    map.set(arr[i].id, i)
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].parentId === null) {
      newArr.push(arr[i])
    } else {
      const parentIndex = map.get(arr[i].parentId)
      arr[parentIndex].children.push(arr[i])
    }
  }

  return newArr
}

// mysql查询出来会产生“ [null] ” 这样的非空数组，该函数将其转化为真正的空数组，即[], 针对列表数据
/**
 * @description: function comments
 * @param {Array} arr 传入数组
 * @param {type} prop 数组每个元素中需要处理的属性
 * @return {void}
 */
export const removeNull = (arr, prop) => {
  arr.forEach(item => {
    if(item[prop][0] === null) {
      item[prop] = []
    }
  })
}
