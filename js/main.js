import { Gifts } from "./modules/Gifts.js";
import { Mineral } from "./modules/Mineral.js";
import { Core } from "./modules/Core.js";
import { CurrencyDB } from "./modules/CurrencyDB.js";
import { Percentage } from "./modules/Percentage.js";

// 判断资源是否获取完毕
let isLoaded = false;
const IsLoaded = () => isLoaded;

// UI初始化
const initUI = async (gifts, mineral) => {
  // 奖池相关资源初始显示
  await gifts.show();
  // 矿石相关资源初始显示
  mineral.showTotal();
  mineral.showUnit();
  // 资源获取完毕
  isLoaded = true;
};

// 百分比加载
const loading = () => {
  new Percentage(
    IsLoaded,
    document.querySelector(".loadingText"),
    document.querySelector(".mask")
  );
};

// 抽奖逻辑
const startLuckyDraw = (luckyDraw, mineral) => {
  // 进行抽奖
  luckyDraw.run();
  // 消费矿石
  mineral.consume();
  // 更新矿石数量
  mineral.showTotal();
};

const handleRun = (luckyDraw, mineral) => {
  // 如果正在运行，则不再次开启
  if (!luckyDraw.checkRunning() || !IsLoaded()) return;
  // 如果矿石数量足够，则开启抽奖
  if (mineral.checkEnough()) {
    startLuckyDraw(luckyDraw, mineral);
  } else {
    alert("当前矿石数不足！");
  }
};

// 入口方法
const init = async () => {
  // 奖池相关业务封装
  const gifts = new Gifts();
  // 连接远程数据库相关封装
  const currencyDB = new CurrencyDB();
  // 矿石相关业务封装
  const mineral = new Mineral(await currencyDB.getMinerInfo("default"));
  // 抽奖相关业务封装
  const luckyDraw = new Core(new Gifts().get());
  // 百分比加载
  loading();
  // 初始显示
  initUI(gifts, mineral);
  // 抽奖逻辑
  const drawDom = document.querySelector(".luckyDraw");
  drawDom.addEventListener("click", () => handleRun(luckyDraw, mineral));
};

init();
