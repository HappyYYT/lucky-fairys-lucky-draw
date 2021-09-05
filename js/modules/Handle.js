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
    // console.log(
    //   "this.giftRateInputs",
    //   this.giftRateInputs.reduce((ac, cu) => ac + parseFloat(cu.value), 0)
    // );
    this.total = document.getElementById("total");
    this.unit = document.getElementById("unit");
    this.total.value = total;
    this.unit.value = unit;
  }

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

  previewImg(gifts) {
    this.images = new Images();
    this.images.preview(gifts);
  }

  async uploadAll(val) {
    const res = await this.images.upload(
      this.giftNameInputs,
      this.giftRateInputs,
      this.total,
      this.unit
    );
    const jackpotDB = new JackpotDB();
    const success = await jackpotDB.uploadAll(val, res);
    console.log("success", success);
    return success;
  }
}
