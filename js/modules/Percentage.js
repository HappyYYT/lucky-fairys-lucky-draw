/**
 * 百分比类
 * 参考来自https://github.com/bradtraversy/50projects50days/tree/master/blurry-loading
 */
export class Percentage {
  constructor(getIsLoad, loadText, bg) {
    this.getIsLoad = getIsLoad;
    this.loadText = loadText;
    this.bg = bg;
    this.load = 0;
    this.interval = 300;
    // 只要创建Percentage对象就会执行blurring方法
    this.blurring();
  }

  blurring = () => {
    this.load++;
    // 根据资源是否加载完毕来提升百分比递增速度
    if (this.load === 25 && this.getIsLoad()) {
      this.interval = 100;
    }
    if (this.load === 50 && this.getIsLoad()) {
      this.interval = 80;
    }
    if (this.load === 75 && this.getIsLoad()) {
      this.interval = 60;
    }
    if (this.load === 100) {
      this.loadText.style.display = "none";
      this.bg.style.display = "none";
      if (!this.getIsLoad()) {
        alert("电波没有到达哦，请刷新重试");
      }
    }
    if (this.load > 99) {
      return;
    }
    if (this.getIsLoad()) this.interval = 10;
    this.loadText.innerText = `${this.load}%`;
    this.loadText.style.opacity = this.scale(this.load, 0, 100, 1, 0);
    this.bg.style.opacity = this.scale(this.load, 0, 100, 1, 0);
    setTimeout(() => {
      this.blurring();
    }, this.interval);
  };

  // https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
  scale(num, in_min, in_max, out_min, out_max) {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  }
}
