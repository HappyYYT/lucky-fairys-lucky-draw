/**
 * 通用方法
 */
const formatterMap = {
  YYYY: (date) => date.getFullYear(),
  MM: (date) => date.getMonth() + 1,
  DD: (date) => date.getDate(),
  HH: (date) => date.getHours(),
  mm: (date) => date.getMinutes(),
  ss: (date) => date.getSeconds(),
};

// 时间格式变换
export const dateFormatter = (date, str) => {
  Object.keys(formatterMap).forEach((format) => {
    str = str.replaceAll(format, formatterMap[format](date));
  });
  return str;
};

export const getBase64 = (obj) => {
  const image = obj;
  let reader = new FileReader();
  let dataURL;
  reader.readAsDataURL(image);
  reader.onload = function (e) {
    dataURL = e.target.result;
  };
  return dataURL;
};
