import { DB } from "./DB.js";

export class JackpotDB extends DB {
  constructor() {
    super();
    this.getRandomNumURL = "https://qczebs.fn.thelarkcloud.com/getRandomNum";
    this.updateURL = "https://qczebs.fn.thelarkcloud.com/updateInJackpotTable";
    this.findAllURL =
      "https://qczebs.fn.thelarkcloud.com/findAllFromJackpotTable";
    this.findAll4CreatorURL =
      "https://qczebs.fn.thelarkcloud.com/findAll4CreatorFromJackpotTable";
  }

  getRandomNum = async (val) => {
    let res = await this._sendByPost(this.getRandomNumURL, {
      belongTo: val,
    });
    res = await res.json();
    return res;
  };

  getAssets = async (val) => {
    let res = await this._sendByPost(this.findAllURL, {
      belongTo: val,
    });
    res = await res.json();
    return res;
  };

  getAssets4Creator = async (val) => {
    let res = await this._sendByPost(this.findAll4CreatorURL, {
      belongTo: val,
    });
    res = await res.json();
    return res;
  };

  // updateImg = async (val) => {
  //   let res = await this._uploadFile(this.updateURL, {
  //     belongTo: "default",
  //     urls: val,
  //   });
  //   res = await res.json();
  //   return res;
  // };
}
