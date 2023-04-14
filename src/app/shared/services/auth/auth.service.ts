import { Injectable } from "@angular/core"
import * as auth from "firebase/auth"
import { AngularFireAuth } from "@angular/fire/compat/auth"
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/compat/firestore"
import { Router } from "@angular/router"
import { User } from "../crud/types"
@Injectable({
  providedIn: "root",
})
export class AuthService {
  userData: any
  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user
        localStorage.setItem("user", JSON.stringify(this.userData))
        JSON.parse(localStorage.getItem("user")!)
      } else {
        localStorage.setItem("user", "null")
        JSON.parse(localStorage.getItem("user")!)
      }
    })
  }

  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user)
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate([ "view-students" ])
          }
        })
      })
      .catch((error) => {
        window.alert(error.message)
      })
  }

  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail()
        this.SetUserData(result.user)
      })
      .catch((error) => {
        window.alert(error.message)
      })
  }

  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate([ "verify-email-address" ])
      })
  }

  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert("Un mail a été envoyé, vérifiez votre boite mail pour réinitialiser votre mot de passe.")
      })
      .catch((error) => {
        window.alert(error)
      })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user")!)
    return user !== null && user.emailVerified !== false
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then(() => {
      this.router.navigate([ "view-students" ])
    })
  }

  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate([ "view-students" ])
        this.SetUserData(result.user)
      })
      .catch((error) => {
        window.alert(error)
      })
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`,
    )
    const userData: User = {
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      uid: user.uid,
    }
    return userRef.set(userData, {
      merge: true,
    })
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem("user")
      this.router.navigate([ "sign-in" ])
    })
  }
}
