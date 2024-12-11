export default function toMoneyString(string) {
  var s = "" + string;
  var part = s.split("-");
  var sign = "";

  var num;
  if (part[0] === "") {
    sign = "-";
    num = part[1];
  } else {
    num = part[0];
    if (num[0] == "+") {
      sign = "+";
      num = num.split("+")[1];
    }
  }
  if (parseInt(num) < 3) {
    return num;
  }
  num = num.split("").reverse().join("");
  var result = "";
  var i = 0;
  for (i; i < num.length - 3; i += 3) {
    result += num.substring(i, i + 3) + ",";
  }
  result += num.substring(i, i + 3);
  result = result.split("").reverse().join("");
  return sign + result + " VNĐ";
}

export function toMoneyStringWithoutVND(string) {
  var s = "" + string;
  var part = s.split("-");
  var sign = "";

  var num;
  if (part[0] === "") {
    sign = "-";
    num = part[1];
  } else {
    num = part[0];
    if (num[0] == "+") {
      sign = "+";
      num = num.split("+")[1];
    }
  }
  if (parseInt(num) < 3) {
    return num;
  }
  num = num.split("").reverse().join("");
  var result = "";
  var i = 0;
  for (i; i < num.length - 3; i += 3) {
    result += num.substring(i, i + 3) + ",";
  }
  result += num.substring(i, i + 3);
  result = result.split("").reverse().join("");
  return sign + result + " VNĐ";
}

export const FloatToMoney = (num) => {
  const world = num?.toFixed(2)?.replace(/\d(?=(\d{3})+\.)/g, "$&,");
  return (
    world?.replace(/,/g, "_")?.replace(/\./g, ",")?.replace(/_/g, ".") + " VNĐ"
  );
};

export const FloatToIntMoney = (num) => {
  return num
    ?.toFixed(2)
    ?.replace(/\d(?=(\d{3})+\.)/g, "$&,")
    ?.slice(0, -3);
};

const operators = ["+", "-", "*", "/"];

export const stringToTypingMoney = (text) => {
  let input = text;
  let endWithNum = false;
  if (!operators.includes(input[input.length - 1])) {
    endWithNum = true;
    input += "+";
  }

  let res = "";
  let last = 0;
  for (let i = 0; i < input.length; i++) {
    if (operators.includes(input[i])) {
      res += FloatToIntMoney(parseFloat(input.slice(last, i)));
      res += input[i];
      last = i + 1;
    }
  }
  if (endWithNum) return res.slice(0, -1);
  return res;
};
