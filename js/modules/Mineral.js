/**
 * 矿石类
 *
 */
export class Mineral {
  constructor({ total, unit }) {
    // 总矿石数
    this.totalMineral = total;
    // 抽奖一次耗费的矿石数
    this.oncePrice = unit;
  }

  // 剩余矿石数是否足够
  checkEnough() {
    return this.getTotal() >= this.oncePrice;
  }

  // 获取总矿石数
  getTotal() {
    return this.totalMineral;
  }

  // 设置总矿石数
  setTotal(all) {
    this.totalMineral = all;
  }

  // 获取单次消费矿石数
  getUnit() {
    return this.oncePrice;
  }

  // 设置单次消费矿石数
  setUnit(cost) {
    this.oncePrice = cost;
  }

  // 消费
  consume() {
    this.totalMineral -= this.oncePrice;
  }

  // 初始显示总矿石数
  showTotal(total = this.totalMineral) {
    document.querySelector(".curMin").innerHTML = total;
    if (total !== this.totalMineral) this.setTotal(total);
  }

  // 初始显示单次消费矿石数
  showUnit(unit = this.oncePrice) {
    document.querySelector(".perMin").innerHTML = unit;
    if (unit !== this.oncePrice) this.setUnit(unit);
  }
}
