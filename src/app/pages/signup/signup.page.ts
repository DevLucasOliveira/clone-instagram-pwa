import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
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
    const loading = await this.loadingCtrl.create({ message: "Cadastrando..." });
    loading.present();

    let email = this.form.controls['email'].value;
    let password = this.form.controls['password'].value;

    this.fbAuth.createUserWithEmailAndPassword(email, password).then(
      (data) => {
        this.showMessage('Bem-vindo');
        loading.dismiss();
        this.navCtrl.navigateRoot('login');
      })
      .catch((err) => {
        loading.dismiss();
        this.showMessage('Não foi possível realizar seu cadastro');
      });
  }

  async showMessage(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present;
  }

  async cancel() {
    this.navCtrl.navigateBack('login');
  }

}
