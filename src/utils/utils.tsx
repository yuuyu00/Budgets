/* eslint-disable function-paren-newline */

/**
 * 数値を金額のフォーマットの文字列に変換します。
 * @param moneyNum 変換対象の数値
 */
export const formatNumToMoney = (moneyNum: number) => {
  console.log(moneyNum);
  return moneyNum ? `¥${moneyNum.toLocaleString()}` : '¥0';
};

/**
 * 金額のフォーマットの文字列を数値に変換します。
 * 全角数字は半角数字に変換されます。
 * @param plainMoneyString 変換対象の文字列
 */
export const formatMoneyToNum = (plainMoneyString: string) => {
  // 入力された数値が¥の左側にある場合末尾に移動する
  const illigalPlaceNum = plainMoneyString.match(/[0-9](?=¥)/);
  const validMoneyString = illigalPlaceNum
    ? plainMoneyString.concat(illigalPlaceNum[0]).replace(/[0-9](?=¥)/, '')
    : plainMoneyString;

  const moneyString = validMoneyString.replace(/[０-９]/g, (s: string) =>
    String.fromCharCode(s.charCodeAt(0) - 0xfee0),
  );
  return parseInt(moneyString.replace(/(¥|,)/g, ''));
};
