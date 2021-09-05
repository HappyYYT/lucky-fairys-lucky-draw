/**
 * 连接后台数据库的JackpotDB类
 * 继承自通用DB类
 */
import { DB } from "./DB.js";

export class JackpotDB extends DB {
  constructor() {
    super();
    this.getRandomNumURL = "https://qczebs.fn.thelarkcloud.com/getRandomNum";
    this.updateURL =
      "https://qczebs.fn.thelarkcloud.com/updateMainInJackpotTable";
    this.findAllURL =
      "https://qczebs.fn.thelarkcloud.com/findAllFromJackpotTable";
    this.findAll4CreatorURL =
      "https://qczebs.fn.thelarkcloud.com/findAll4CreatorFromJackpotTable";
  }

  // 获取抽奖结果
  getRandomNum = async (val) => {
    let res = await this._sendByPost(this.getRandomNumURL, {
      belongTo: val,
    });
    res = await res.json();
    return res;
  };

  // 获取所有静态资源
  getAssets = async (val) => {
    let res = await this._sendByPost(this.findAllURL, {
      belongTo: val,
    });
    res = await res.json();
    return res;
  };

  // 专门适用creator页面的获取所有静态资源
  getAssets4Creator = async (val) => {
    let res = await this._sendByPost(this.findAll4CreatorURL, {
      belongTo: val,
    });
    res = await res.json();
    return res;
  };

  // 只发一次请求，上传所有
  uploadAll = async (val, all) => {
    all.belongTo = val;
    console.log(all);
    let res = await this._sendByPost(this.updateURL, { ...all });
    res = await res.json();
    return res;
  };
}
