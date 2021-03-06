import { Router } from "@angular/router";
import * as firebase from "firebase";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router) {}

  signupUser(email: string, password: string) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(["/signin"]);
      })
      .catch((error: any) => window.alert(error));
  }

  signinUser(email: string, password: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(["/"]);
        firebase
          .auth()
          .currentUser.getIdToken()
          .then((token: string) => (this.token = token))
          .then(() => localStorage.setItem("token", this.token));
      })
      .catch((error: any) => window.alert(error));
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
    localStorage.setItem("token", "");
  }

  getIdToken() {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token: string) => (this.token = token));
    return this.token;
  }

  isAuthenticated() {
    const xo = localStorage.getItem("token");
    return this.token != null || xo != "";
  }
}
