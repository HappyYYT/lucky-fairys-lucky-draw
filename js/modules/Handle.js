import { Images } from "./Images.js";

export class Handle {
  constructor() {
    this.giftNameInputs = [];
    this.giftRateInputs = [];
    this.total;
    this.unit;
    this.images;
  }

  showDefault(gifts, rates, unit, total) {
    const giftsNames = gifts.map((item) => item.querySelector("p").innerText);
    this.giftNameInputs = Array.from(document.querySelectorAll(".giftName"));
    this.giftNameInputs.map((item, index) => (item.value = giftsNames[index]));
    this.giftRateInputs = Array.from(document.querySelectorAll(".rate"));
    this.giftRateInputs.map((item, index) => (item.value = rates[index]));
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

  async uploadAll() {
    const res = await this.images.upload(
      this.giftNameInputs,
      this.giftRateInputs,
      this.total,
      this.unit
    );
    console.log(res);
  }
}
