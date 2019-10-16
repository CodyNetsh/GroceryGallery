import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { PhotoService } from 'src/app/service/photo.service';
import { NavController, ActionSheetController } from '@ionic/angular';
import * as firebase from 'firebase'
import { finalize } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {
  galleryType = 'cameraGallery';
  photos: any;
  option: CameraOptions;
  id: any;
  ref;
  uploadState: any;
  downloadURL: any;
  key: string;
  chatRef: any;
  imag: any;  
  user: any;
  sub: any;
  image: any;
  values: any;
  photoURL: any;
  product: any;
  price: any;
  expDate: any;
  users: unknown[];
  ProName: any;
  Exp: any;
  mylist: any;
  ping: any;
  pong: any;

  picUrl:any;
  constructor(private socialSharing: SocialSharing,
    private Viewer:PhotoViewer,
   private route:ActivatedRoute,
   public Storage: AngularFireStorage,public afAuth: AngularFireAuth,  private fire:AngularFirestore
   ,public actionSheetController: ActionSheetController    ,public navCtrl: NavController,private camera:Camera, public photoService: PhotoService,
   private router:Router,) {
    this.imag = this.fire.collection('photoGalery').snapshotChanges().subscribe(data =>{
      this.users = data.map ( e => {

        return{ 
          key: e.payload.doc.id,
          ...e.payload.doc.data()
        } ;
      
      });
      console.log(this.users)
      

    })
     this.picUrl='https://lh3.googleusercontent.com/_0EOeOXx2WC-vkEwzhKHzhxeQjhgHIeHJKWljeUzAjos3QLfca8eWDCadZiBJ1mSY2hdx3lCaY8g6iUMDMQiz1b7T2ttpOkJSg=s750'

    }

  ngOnInit() {
  }

  upload(event) {
    const file= event.target.files[0];
  
     this.id = Math.random().toString(36).substring(2);
    const filepath=this.id;
    this.ref = this.Storage.ref(filepath);
    const task = this.Storage.upload(filepath, file);
    this.uploadState = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL().subscribe(urlfile=>{
          //  console.log(urlfile);
          this.picUrl=urlfile;
           this.fire.collection('').add({
            // Name: this.afAuth.auth.currentUser.displayName,
            image:urlfile,
            // UserID: this.afAuth.auth.currentUser.uid,
            TimeStamp:firebase.firestore.FieldValue.serverTimestamp(),
          });
          // this.afAuth.auth.currentUser.updateProfile({
          //   photoURL: urlfile
          // })
          });
        })
      ).subscribe();
    }
 
    add(this){
      this.fire.collection('photoGalery').add({
       ProName: this.product,
       Price: this.price,
       Exp:this.expDate,
       image:this.picUrl,
      //  UserID: this.afAuth.auth.currentUser.uid,
      })
      this.router.navigate(['/home'], { queryParams:{image:this.image, ProName:this.ProName, Price:this.Price, Exp:this.Exp}});

    }

  takePicture(){
    
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      
      this.camera.getPicture(options).then((urlfile) => {
      
       let base64Image = 'data:image/jpeg;base64,' + urlfile;
      
      
      this.fire.collection('photoGalery').add({
        // Name: this.afAuth.auth.currentUser.displayName,
        image:urlfile,
        // UserID: this.afAuth.auth.currentUser.uid,
        TimeStamp:firebase.firestore.FieldValue.serverTimestamp(),
      });
    }, (err) => {
    });
    }

}
