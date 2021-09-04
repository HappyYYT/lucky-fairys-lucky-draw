import { JackpotDB } from "./JackpotDB.js";

export class Gifts {
  constructor() {
    // 奖品图片名字
    this.giftImgs = [
      "mineral.svg",
      "badge.jpg",
      "shirt.svg",
      "sugar.svg",
      "switch.svg",
      "pillow.jpg",
      "mac.svg",
      "cherry.svg",
    ];
    // 奖品名字
    this.giftNames = [
      "66💎矿石",
      "随机限量徽章",
      "新款T恤",
      "糖果",
      "Switch",
      "抱枕",
      "Mac",
      "Cherry",
    ];
  }

  get() {
    const gifts = Array.from(document.querySelectorAll(".gift")).sort(
      (el1, el2) => el1.getAttribute("order") - el2.getAttribute("order")
    );
    return gifts;
  }

  async show(gifts = this.get()) {
    const jackpotDB = new JackpotDB();
    const assets = await jackpotDB.getAssets("default");
    // console.log(assets);
    this.giftImgs = assets.url;
    // console.log(Array.from(this.giftImgs));
    this.giftNames = assets.name;
    // console.log(this.giftNames);
    for (let i = 0; i < gifts.length; i++) {
      const img = document.createElement("img");
      img.src = this.giftImgs[i];
      img.alt = this.giftNames[i];
      const p = document.createElement("p");
      p.innerText = this.giftNames[i];
      gifts[i].appendChild(img);
      gifts[i].appendChild(p);
    }
    // await new Promise(resolve => {});
  }
}
