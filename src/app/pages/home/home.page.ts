import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  posts: Observable<any[]>;

  constructor(
    private db: AngularFirestore,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {
    this.posts = db.collection('posts').valueChanges();
   }

  ngOnInit() {
    const img = localStorage.getItem('devgram.post');
    if (img) this.showMessage('Você tem uma publicação não salva');
  }

  async showMessage(message: string){
    const toast = await this.toastCtrl.create({
      message: message, duration: 3000, buttons: [
        {
          icon: "send",
          handler: () => {
            this.navCtrl.navigateForward("/post");
          }
        }
      ]
    });
    toast.present();
  } 

  showOptions(){

  }

}
