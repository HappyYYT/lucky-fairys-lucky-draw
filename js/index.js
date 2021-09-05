import { Login } from "./modules/Login.js";

// 角色单选项
const roles = document.querySelectorAll("[name = ident]");
// “进入按钮”
const enterBtn = document.getElementById("enter");

// 点击单选框切换角色
function bindRolesEvent() {
  for (let i = 0; i < roles.length; i++) {
    roles[i].addEventListener("click", (e) => {
      if (e.target.checked) {
        enterBtn.href = Login.switchRoles(e.target.id);
      }
    });
  }
}

// 初始加载角色链接
function initRolesLink() {
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].checked) {
      enterBtn.href = Login.switchRoles(roles[i].id);
    }
  }
}

// 入口方法
function init() {
  window.addEventListener("load", () => initRolesLink());
  bindRolesEvent();
}

init();
