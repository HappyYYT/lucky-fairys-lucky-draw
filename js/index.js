import { Login } from "./modules/Login.js";

function bindEvent() {
  const enter = new Login();
  const roles = document.querySelectorAll("[name = ident]");
  for (let i = 0; i < roles.length; i++) {
    document
      .querySelectorAll("[name=ident]")
      [i].addEventListener("click", (e) => {
        if (e.target.checked) {
          document.getElementById("enter").href = enter.switchRoles(
            e.target.id
          );
        }
      });
  }
}

bindEvent();
