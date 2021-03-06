import { Gifts } from "./modules/Gifts.js";
import { Mineral } from "./modules/Mineral.js";
import { Core } from "./modules/Core.js";
import { CurrencyDB } from "./modules/CurrencyDB.js";
import { Percentage } from "./modules/Percentage.js";
import { Handle } from "./modules/Handle.js";

// 判断资源是否获取完毕
let isLoaded = false;
const IsLoaded = () => isLoaded;
// 初始图片路径
let defUrls;

// UI初始化
const initUI = async (gifts, mineral, handle) => {
  // 奖池相关资源初始显示
  const { rate: rates, url: urls, unit, total } = await gifts.show4Creator();
  // 记录初始图片路径
  defUrls = urls;
  // 矿石相关资源初始显示
  mineral.showTotal();
  mineral.showUnit();
  handle.showDefault(new Gifts().get(), rates, unit, total);
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
  const giftData = gifts.get();
  const luckyDraw = new Core(giftData);
  // 手柄相关业务封装
  const handle = new Handle();
  // 百分比加载
  loading();
  // 初始显示
  await initUI(gifts, mineral, handle);
  // 修改文本
  handle.handleBlur(giftData);
  // 选择图片、预览图片
  handle.previewImg(giftData);
  // 点击保存事件
  document.getElementById("save").addEventListener("click", async function () {
    if (handle.checkSumRateIs100()) {
      const isSucceed = await handle.uploadAll("default");
      if (isSucceed) {
        alert("操作成功！刷新即可使用");
      }
    } else {
      alert("所有中奖概率相加≠1，操作失败");
    }
  });
  // 抽奖逻辑
  const drawDom = document.querySelector(".luckyDraw");
  drawDom.addEventListener("click", () => {
    // 重新读取矿石数量信息
    const curTotal = parseFloat(document.querySelector(".curMin").innerText);
    const curUnit = parseFloat(document.querySelector(".perMin").innerText);
    const curMineral = new Mineral({ total: curTotal, unit: curUnit });
    handleRun(luckyDraw, curMineral);
  });

  // 重置图片
  const resetBtns = document.querySelectorAll(".fileReset");
  for (let i = 0; i < resetBtns.length; i++) {
    // 点击“重置”，图片预览还原至初始图片
    resetBtns[i].addEventListener("click", () => {
      if (giftData[i].querySelector("img").src !== defUrls[i]) {
        giftData[i].querySelector("img").src = defUrls[i];
      }
    });
  }
};

init();
