import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;

  constructor(
    private _firebaseAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore
  ) {
    this.user = _firebaseAuth.authState;
  }

  async signInWithEmailPassword(email: string, password: string) {
    const resp = await this._firebaseAuth.auth.signInAndRetrieveDataWithEmailAndPassword(email, password);

    return this.db.collection('users')
      .doc(resp.user.uid)
      .set({})
      .then(() => {
        this.storeCurrentUser(resp.user);
        return resp.user;
      });
  }

  async signUpwithEmailPassword(email: string, password: string) {
    const resp = await this._firebaseAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(email, password);

    return this.db.collection('users')
      .doc(resp.user.uid)
      .set({})
      .then(() => {
        this.storeCurrentUser(resp.user);
        return resp.user;
      });
  }

  storeCurrentUser(user) {
    return localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getcurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  logout() {
    localStorage.removeItem('currentUser');

    return this._firebaseAuth.auth.signOut();
  }
}
