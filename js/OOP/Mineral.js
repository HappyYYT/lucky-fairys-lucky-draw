export class Mineral {
  constructor({total, unit}) {
    // 总矿石数
    this.totalMineral = total;
    // 抽奖一次耗费的矿石数
    this.oncePrice = unit;
  }

  checkEnough() {
    return this.getTotal() >= 200;
  }

  getTotal() {
    return this.totalMineral;
  }

  setTotal(all) {
    this.totalMineral = all;
  }

  getUnit() {
    return this.oncePrice;
  }

  setUnit(cost) {
    this.oncePrice = cost;
  }

  consume() {
    this.totalMineral -= this.oncePrice;
  }

  showTotal(total = this.totalMineral) {
    document.querySelector(".curMin").innerHTML = total;
    if (total !== this.totalMineral) this.setTotal(total);
  }

  showUnit(unit = this.oncePrice) {
    document.querySelector(".perMin").innerHTML = unit;
    if (unit !== this.oncePrice) this.setUnit(unit);
  }
}
