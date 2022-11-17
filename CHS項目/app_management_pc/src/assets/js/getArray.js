export default {
  //  按照项目状态0-6过滤数组
  getToalNum(array, itemType) {
    let num = 0;
    // console.log(array instanceof Array);
    const needList = array.filter((item) => {
      return item.doctor_deaparment == itemType;
    });
    num = needList.length;
    return num;
  },
  //return新数组
  getList(array, typeList) {
    const newList = array.filter((item) => {
      return item.doctor_deaparment == typeList;
    });
    return newList;
  },
};
