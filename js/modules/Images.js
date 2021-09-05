export class Images {
  constructor() {
    this.fileSelArr = Array.from(document.querySelectorAll(".fileSelect"));
    this.file = new Array();
    this.history = new Array();
    this.src = null;
    this.dataURL = null;
    this.urls = {};
  }

  preview(gifts) {
    let res;
    let giftImgs = gifts.map((item) => item.querySelector("img"));
    for (let i = 0; i < this.fileSelArr.length; i++) {
      this.fileSelArr[i].addEventListener("change", (e) => {
        if (!e.target.files[0]) {
          if (this.history[i]) e.target.files = this.history[i];
          return;
        }
        this.file[i] = e.target.files[0];
        this.history[i] = e.target.files;
        this.src = window.URL.createObjectURL(this.file[i]);
        giftImgs[i].src = this.src;
        giftImgs[i].width = 64;
        giftImgs[i].onload = function () {
          window.URL.revokeObjectURL(this.src);
        };
      });
    }
  }

  async upload(giftNameInputs, giftRateInputs, total, unit) {
    const urls = await this._uploadImgs();
    console.log(urls);
    const names = this._uploadNames(giftNameInputs);
    const rates = this._uploadRates(giftRateInputs);
    console.log(names, rates);
    const totalVal = total.value;
    const unitVal = unit.value;
    let gifts = new Array(8).fill(null);
    gifts = gifts.map((item, index) => ({
      name: names[index],
      content: urls[index] === undefined ? "" : urls[index],
      rate: rates[index],
    }));
    const mineral = {};
    mineral.total = totalVal;
    mineral.unit = unitVal;

    // {
    //   gifts: [
    //     {
    //       name:"",
    //       content:"",
    //       rate:""
    //     },
    //     ...
    //   ],
    //   mineral: {
    //     total: 100,
    //     unit: 100,
    //   }
    // }
    return { gifts, mineral };
  }

  async _uploadImgs() {
    const tasks = this.file.map(
      (file, i) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (e) => {
            this.urls[i] = e.target.result;
            resolve();
          };
        })
    );
    await Promise.all(tasks);
    return this.urls;
  }

  _uploadNames(giftNameInputs) {
    return giftNameInputs.map((item) => (item = item.value));
  }

  _uploadRates(giftRateInputs) {
    return giftRateInputs.map((item) => (item = item.value));
  }
}
