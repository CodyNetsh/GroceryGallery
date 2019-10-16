import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photos: Photo[] = []; 
  option: CameraOptions;

  constructor(private camera: Camera, private storage: Storage,private fire:AngularFirestore) { 
    this.camera.getPicture(this.option).then((imageData) => {
      // Add new photo to gallery
      this.photos.unshift({
        data: 'data:image/jpeg;base64,' + imageData
      });
    
      // Save all photos for later viewing
      this.storage.set('photos', this.photos);
    }, (err) => {
      // Handle error
      console.log("Camera issue: " + err);
    });
  }
  loadSaved() {
    this.storage.get('photos').then((photos) => {
      this.photos = photos || [];
    });
  }
  delete(key){
    this.fire.doc('photoGalery/' + key.image).delete();
   
   }
}
