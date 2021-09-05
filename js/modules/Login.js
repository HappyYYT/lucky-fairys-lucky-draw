/**
 * 首页类
 * 待升级为真正的登录
 */
export class Login {
  constructor() {}

  // 切换登录角色
  static switchRoles(role) {
    switch (role) {
      case "player":
        return "./player.html";
      case "creator":
        return "./creator.html";
      default:
        return;
    }
  }
}
