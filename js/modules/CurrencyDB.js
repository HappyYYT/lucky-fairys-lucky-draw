/**
 * 连接后台数据库的CurrencyDB类
 * 继承自通用DB类
 */
import { DB } from "./DB.js";

export class CurrencyDB extends DB {
  constructor() {
    super();
    this.findOneFromCurrencyTableURL =
      "https://qczebs.fn.thelarkcloud.com/findOneFromCurrencyTable";

    this.updateTotalInCurrencyTableURL =
      "https://qczebs.fn.thelarkcloud.com/updateTotalInCurrencyTable";

    this.updateUnitInCurrencyTableURL =
      "https://qczebs.fn.thelarkcloud.com/updateUnitInCurrencyTable";
  }

  // 获取矿石相关资源
  getMinerInfo = async (val) => {
    const res = await this._sendByPost(this.findOneFromCurrencyTableURL, {
      belongTo: val,
    });
    const { total, unit } = (await res.json()).result;
    return { total, unit };
  };
}
