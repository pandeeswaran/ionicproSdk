import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Pro} from "@ionic/pro";

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  downloadProgress: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
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
}

