/**
 * 手柄类
 *
 */
import { Images } from "./Images.js";
import { JackpotDB } from "./JackpotDB.js";

export class Handle {
  constructor() {
    this.giftNameInputs = [];
    this.giftRateInputs = [];
    this.total;
    this.unit;
    this.images;
  }

  // 判断总概率是否为100%
  checkSumRateIs100() {
    const sum = this.giftRateInputs.reduce(
      (ac, cu) => ac + parseFloat(cu.value),
      0
    );
    if (sum !== 100) {
      return false;
    }
    return true;
  }

  // 显示数据库所有的原有配置
  showDefault(gifts, rates, unit, total) {
    const giftsNames = gifts.map((item) => item.querySelector("p").innerText);
    this.giftNameInputs = Array.from(document.querySelectorAll(".giftName"));
    this.giftNameInputs.map((item, index) => {
      item.value = giftsNames[index];
    });
    this.giftRateInputs = Array.from(document.querySelectorAll(".rate"));
    this.giftRateInputs.map((item, index) => {
      item.value = rates[index];
    });
    this.total = document.getElementById("total");
    this.unit = document.getElementById("unit");
    this.total.value = total;
    this.unit.value = unit;
  }

  // blur事件，对应显示修改的文本
  handleBlur(gifts) {
    this.giftNameInputs.map((item, index) => {
      item.addEventListener("input", (e) => {
        gifts[index].querySelector("p").innerText = e.target.value;
      });
    });
    this.total.addEventListener("input", (e) => {
      document.querySelector(".curMin").innerText = e.target.value;
    });
    this.unit.addEventListener("input", (e) => {
      document.querySelector(".perMin").innerText = e.target.value;
    });
  }

  // 图片预览
  previewImg(gifts) {
    this.images = new Images();
    this.images.preview(gifts);
  }

  // 上传资源
  async uploadAll(val) {
    const res = await this.images.upload(
      this.giftNameInputs,
      this.giftRateInputs,
      this.total,
      this.unit
    );
    const jackpotDB = new JackpotDB();
    const success = await jackpotDB.uploadAll(val, res);
    return success;
  }
}
