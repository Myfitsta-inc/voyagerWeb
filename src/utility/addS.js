function addS(string, num) {
  if (num === 1) {
    return string;
  } else if (string.endsWith("y")) {
    return string.slice(0, -1) + "ies";
  } else {
    return string + "s";
  }
}
export default addS;

const nFormatter = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num;
};
