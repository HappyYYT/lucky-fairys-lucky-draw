import { Gifts } from "./OOP/Gifts.js";
import { Mineral } from "./OOP/Mineral.js";
import { Core } from "./OOP/Core.js";
import { CurrencyDB } from "./OOP/CurrencyDB.js";
import { Percentage } from "./OOP/Percentage.js";

// 所有的礼物业务封装
const gifts = new Gifts();
// 连接远程数据库相关封装
const currencyDB = new CurrencyDB();
// 矿石相关业务封装
const mineral = new Mineral(await currencyDB.getMinerInfo("default"));
// 抽奖相关业务封装
const luckyDraw = new Core(new Gifts().get());

// UI初始化
const initUI = async () => {
  await gifts.show();
  mineral.showTotal();
  mineral.showUnit();
};

// 百分比加载
const loading = () => {
  new Percentage();
};

// 抽奖逻辑
const startLuckyDraw = () => {
  // 进行抽奖
  luckyDraw.run();
  // 消费矿石
  mineral.consume();
  // 更新矿石数量
  mineral.showTotal();
};

const handleRun = (e) => {
  // 如果正在运行，则不再次开启
  if (!luckyDraw.checkRunning()) return;
  // 如果矿石数量足够，则开启抽奖
  if (mineral.checkEnough()) {
    startLuckyDraw();
  } else {
    alert("当前矿石数不足！");
  }
};

const init = () => {
  initUI();
  loading();
  const drawDom = document.querySelector(".luckyDraw");
  drawDom.addEventListener("click", handleRun);
};

init();
