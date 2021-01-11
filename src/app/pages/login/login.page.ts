import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/auth';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private fbAuth: AngularFireAuth
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  async submit() {
    const loading = await this.loadingCtrl.create({ message: "Autenticando..." });
    loading.present();

    let email = this.form.controls['email'].value;
    let password = this.form.controls['password'].value;

    this.fbAuth.signInWithEmailAndPassword(email, password).then(
      (data) => {
        loading.dismiss();
        localStorage.setItem('devgram.user', JSON.stringify(new User('', data.user.email, '')));
        this.navCtrl.navigateRoot('home');
      }).catch(
        (err) => {
          console.log(err);
          loading.dismiss();
          this.showMessage("Usuário ou senha inválidos");
        }
      )
  }

  async showMessage(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present;
  }

  async goToSignup() {
    this.navCtrl.navigateForward('signup');
  }

  async signInWithGoogle() {
    this.fbAuth.signInWithPopup(new auth.GoogleAuthProvider()).then(
      (data) => {
        console.log(data);
        localStorage.setItem('devgram.user', JSON.stringify(new User(data.user.displayName, data.user.email, data.user.photoURL)));
        this.navCtrl.navigateRoot('home');
      }).catch(
        (err) => {
          console.log(err);
          this.showMessage('Usuário ou senha inválidos');
        }
      )

  }

}
