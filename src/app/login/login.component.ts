import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    return this.auth.signInWithEmailPassword(f.value.email, f.value.password)
      .catch(() => this.auth.signUpwithEmailPassword(f.value.email, f.value.password))
      .then(() => console.log('logged in!'));
  }

}
