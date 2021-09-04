export class Login {
  constructor() {
    // this.roles = document.querySelectorAll("[name = ident]");
  }

  switchRoles(role) {
    switch (role) {
      case "player":
        return "./player.html";
      case "creator":
        return "./creator.html";
      default:
        return;
    }
  }

  //   toggleLink() {
  //     for (let i = 0; i < this.roles.length; i++) {
  //       if (this.roles[i].checked) {
  //         return this._switchRoles(this.roles[i].id);
  //       }
  //     }
  //   }
}
