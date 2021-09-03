export class Percentage {
  constructor() {
    this.loadText = document.querySelector(".loadingText");
    this.bg = document.querySelector("main");
    this.load = 0;
    this.int = setInterval(this.blurring, 30);
  }

  blurring = () => {
    this.load++;
    if (this.load > 99) {
      clearInterval(this.int);
    }

    this.loadText.innerText = `${this.load}%`;
    this.loadText.style.opacity = this.scale(this.load, 0, 100, 1, 0);
    this.bg.style.filter = `blur(${this.scale(this.load, 0, 100, 30, 0)}px)`;
  };

  scale(num, in_min, in_max, out_min, out_max) {
    // 99, 0, 100, 30, 0
    // 99 * 30 / 100 + 30
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  }
}
