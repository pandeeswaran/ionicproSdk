import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {Pro} from "@ionic/pro";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  downloadProgress: any;

  private email_id: any;
  private password_id: any;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {

  }

  checkVersion() {
    console.log("update check");
    Pro.deploy.getCurrentVersion().then((versionInfo) => {
      console.log(versionInfo);
    })

    this.performManualUpdate();
  }

  async performManualUpdate() {

    /*
     Here we are going through each manual step of the update process:
     Check, Download, Extract, and Redirect.

     Ex: Check, Download, Extract when a user logs into your app,
     but Redirect when they logout for an app that is always running
     but used with multiple users (like at a doctors office).
     */

    try {

      const update = await Pro.deploy.checkForUpdate();
      console.log("update available", update);
      if (update.available) {
        this.downloadProgress = 0;

        await Pro.deploy.downloadUpdate((progress) => {
          this.downloadProgress = progress;
        })
        await Pro.deploy.extractUpdate();
        await Pro.deploy.reloadApp();
      }
    } catch (err) {
      // We encountered an error.
      // Here's how we would log it to Ionic Pro Monitoring while also catching:
      console.log(err);
      // Pro.monitoring.exception(err);
    }

  }

  private submitAction() {
    let alert = this.alertCtrl.create({
      title: 'User input',
      subTitle: this.email_id + "/" + this.password_id,
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
