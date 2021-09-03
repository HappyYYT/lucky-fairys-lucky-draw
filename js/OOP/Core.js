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

  checkRunning() {
    return !this.isRunning;
  }

  _run(start = 0, end) {
    this.isRunning = true;
    const speed = Math.round((20 / 12) ** 6) * 5 + 25; // 130
    setTimeout(() => {
      const nextPointer = start & this.base; // (0, 7)
      // 重置
      this.grids.forEach((grid) => (grid.style.background = ""));
      this.grids[nextPointer].style.background = "#005479";
      if (start < end) {
        this._run(start + 1, end);
      } else {
        setTimeout(() => {
          console.log(nextPointer);
          const name = this.grids[nextPointer].querySelector("p").innerText;
          alert(`恭喜你获得了${name}！请联系管理员兑换。`);
          this.isRunning = false;
          this.map.set(Date.now(), name);
          this.showGainList();
        }, speed + 400);
      }
    }, speed);
  }

  async run() {
    const res = await this.jackpotDB.getRandomNum();
    this._run(0, res);
  }

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

  showGainList() {
    if (this.map.size !== 0) {
      const gainListContainer = document.querySelector(".gainList");
      const gainList = this.createGainList();
      gainListContainer.innerHTML = "";
      gainListContainer.appendChild(gainList);
    }
  }
}
