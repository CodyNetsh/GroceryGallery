import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireModule } from '@angular/fire';
import * as firebase from 'firebase';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { IonicImageViewerModule } from 'ionic-img-viewer';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { finalize } from 'rxjs/operators';

const firebaseConfig = {
  apiKey: "AIzaSyC-oqKo3QpGL0Hgv-yWoJTO3eXw3UHdpt8",
  authDomain: "gallery-fee10.firebaseapp.com",
  databaseURL: "https://gallery-fee10.firebaseio.com",
  projectId: "gallery-fee10",
  storageBucket: "gallery-fee10.appspot.com",
  messagingSenderId: "688921330006",
  appId: "1:688921330006:web:f44e4ad2aebd94eb4456f7",
  measurementId: "G-BTRF9Z7388"
};
firebase.initializeApp(firebaseConfig);


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),AngularFireStorageModule,
    AngularFireAuthModule,AppRoutingModule,AngularFirestoreModule,
    AngularFireModule.initializeApp(firebaseConfig ,'gallery-3ae4f'),
    IonicStorageModule.forRoot(),   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    SocialSharing,
    PhotoViewer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
