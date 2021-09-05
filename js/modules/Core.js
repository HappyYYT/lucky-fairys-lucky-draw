/**
 * 核心类（实在不会取名字了）
 *
 */
import { JackpotDB } from "./JackpotDB.js";
import { dateFormatter } from "../common.js";

export class Core {
  constructor(grids) {
    this.base = 7;
    // 最小圈数
    this.minTurn = 6;
    // 最大圈数
    this.maxTurn = 7;
    // 历史中奖列表
    this.map = new Map();
    this.grids = grids;
    // 是否正在抽奖中标志
    this.isRunning = false;
    // 连接数据库相关
    this.jackpotDB = new JackpotDB();
  }

  // 判断抽奖是否在运行中
  checkRunning() {
    return !this.isRunning;
  }

  // 抽奖内部逻辑
  _run(start = 0, end) {
    this.isRunning = true;
    const speed = Math.round((20 / 12) ** 6) * 5 + 25; // 130
    setTimeout(() => {
      const nextPointer = start & this.base; // 结果范围为(0, 7)
      // 重置
      this.grids.forEach((grid) => (grid.style.background = ""));
      this.grids[nextPointer].style.background = "#005479";
      if (start < end) {
        this._run(start + 1, end);
      } else {
        setTimeout(() => {
          const name = this.grids[nextPointer].querySelector("p").innerText;
          alert(`恭喜你获得了${name}！请联系管理员兑换。`);
          this.isRunning = false;
          this.map.set(Date.now(), name);
          this.showGainList();
        }, speed + 400);
      }
    }, speed);
  }

  // 运行抽奖逻辑
  async run() {
    const res = await this.jackpotDB.getRandomNum();
    this._run(0, res);
  }

  // 生成中奖历史列表
  createGainList() {
    const ul = document.createElement("ul");
    for (let [key, value] of this.map) {
      const li = document.createElement("li");
      const date = new Date(key);
      const dateFormattedStr = dateFormatter(
        date,
        "YYYY年MM月DD日 HH时mm分ss秒"
      );
      li.innerText = `获得了${value}，${dateFormattedStr}`;
      ul.appendChild(li);
    }
    return ul;
  }

  // 显示中奖历史列表
  showGainList() {
    if (this.map.size !== 0) {
      const gainListContainer = document.querySelector(".gainList");
      const gainList = this.createGainList();
      gainListContainer.innerHTML = "";
      gainListContainer.appendChild(gainList);
    }
  }
}
