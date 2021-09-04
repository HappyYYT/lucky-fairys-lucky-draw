export class Percentage {
  constructor(getIsLoad, loadText, bg) {
    this.getIsLoad = getIsLoad;
    this.loadText = loadText;
    this.bg = bg;
    this.load = 0;
    this.interval = 300;
    this.blurring();
  }

  blurring = () => {
    this.load++;
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
    // this.bg.style.filter = `blur(${this.scale(this.load, 0, 100, 30, 0)}px)`;
    setTimeout(() => {
      this.blurring();
    }, this.interval);
  };

  scale(num, in_min, in_max, out_min, out_max) {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  }
}
