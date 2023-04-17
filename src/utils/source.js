export function getSourceData() {
  return [
    {
      name: "John Brown",
      age: 18,
      address: "New York No. 1 Lake Park",
      date: "2016-10-03",
    },
    {
      name: "Jim Green",
      age: 24,
      address: "London No. 1 Lake Park",
      date: "2016-10-01",
    },
    {
      name: "Joe Black",
      age: 30,
      address: "Sydney No. 1 Lake Park",
      date: "2016-10-02",
    },
    {
      name: "Jon Snow",
      age: 26,
      address: "Ottawa No. 2 Lake Park",
      date: "2016-10-04",
    },
  ];
}

export function searchData(params = {}) {
  const source = getSourceData();

  const isEmpty = (val) => ["", null, undefined].includes(val);

  const isMatch = (item) => {
    const entrys = Object.entries(params);
    const idxOf = (str, sub) => String.prototype.indexOf.call(str, sub);

    for (let [key, value] of entrys) {
      if (!isEmpty(value) && item[key] && idxOf(item[key], value) < 0) {
        return false;
      }
    }
    return true;
  };

  return source.filter((item) => isMatch(item));
}

export function formatDate(date) {
  if (date == "" || !date) {
    return "";
  }
  date = new Date(date);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  var d = date.getDate();
  d = d < 10 ? "0" + d : d;
  var h = date.getHours();
  h = h < 10 ? "0" + h : h;
  var minute = date.getMinutes();
  minute = minute < 10 ? "0" + minute : minute;
  var second = date.getSeconds();
  second = second < 10 ? "0" + second : second;
  return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
}
