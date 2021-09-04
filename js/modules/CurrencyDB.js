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

  // _sendByPost = async (url, obj) => {
  //   const res = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify(obj),
  //   });
  //   return res;
  // };

  getMinerInfo = async (val) => {
    const res = await this._sendByPost(this.findOneFromCurrencyTableURL, {
      belongTo: val,
    });
    const { total, unit } = (await res.json()).result;
    return { total, unit };
  };

  updateTotalBy = async (cod, val) => {
    const res = await this._sendByPost(this.updateTotalInCurrencyTableURL, {
      belongTo: cod,
      total: val,
    });
    return res;
  };

  updateUnitBy = async (cod, val) => {
    const res = await this._sendByPost(this.updateUnitInCurrencyTableURL, {
      belongTo: cod,
      unit: val,
    });
    return res;
  };
}
