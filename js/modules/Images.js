/**
 * 图片类
 *
 */
export class Images {
  constructor() {
    // 获取所有的input[type='file']的dom
    this.fileSelArr = Array.from(document.querySelectorAll(".fileSelect"));
    this.file = new Array();
    // 对this.file的历史记录
    this.history = new Array();
    // 预览的图片链接
    this.src = null;
    this.urls = {};
  }

  // 图片预览
  // https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL
  preview(gifts) {
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
          // 内存管理，释放URL对象
          window.URL.revokeObjectURL(this.src);
        };
      });
    }
  }

  /**
   * 上传资源到服务器的方法
   * 返回值格式为{
   *  gifts: [
   *    {
   *      name:"",
   *      content:"",
   *      rate:""
   *    },
   *    ...
   *  ],
   *  mineral: {
   *    total: 100,
   *    unit: 100,
   *  }
   * }
   */
  async upload(giftNameInputs, giftRateInputs, total, unit) {
    const urls = await this._uploadImgs();
    const names = this._uploadNames(giftNameInputs);
    const rates = this._uploadRates(giftRateInputs);
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

    return { gifts, mineral };
  }

  // FileReader读取指定的Blob或File（在本次抽奖业务场景中是图片路径）对象
  // 包含一个data:URL格式的字符串（base64编码）以表示所读取文件的内容
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

  // 获取奖品名字数组
  _uploadNames(giftNameInputs) {
    return giftNameInputs.map((item) => (item = item.value));
  }

  // 获取中奖概率数组
  _uploadRates(giftRateInputs) {
    return giftRateInputs.map((item) => (item = item.value));
  }
}
