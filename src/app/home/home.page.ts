import { Component, ViewChild ,ElementRef } from '@angular/core';
import { NavController, ActionSheetController ,ModalController} from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import {  AngularFireStorage } from '@angular/fire/storage';
import { PhotoService } from '../service/photo.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

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
  // @ViewChild('slider',{static: false })slider: ElementRef;
  // sliderOpts={
  //   zoom:{maxRario:3}
    
  // }
  // nativeElement
  constructor(private socialSharing: SocialSharing,
     private Viewer:PhotoViewer,
    private route:ActivatedRoute,
    public Storage: AngularFireStorage,public afAuth: AngularFireAuth,  private fire:AngularFirestore
    ,public actionSheetController: ActionSheetController    ,public navCtrl: NavController,private camera:Camera, public photoService: PhotoService,
    private router:Router,)
     {
      // this._imageViewerCtrl = imageViewerCtrl;
  // this.key =this.afAuth.auth.currentUser.uid;
    this.imag = this.fire.collection('photoGalery').snapshotChanges().subscribe(data =>{
      this.users = data.map ( e => {

        return{ 
          key: e.payload.doc.id,
          ...e.payload.doc.data()
        } ;
      
      });
      console.log(this.users)
      

    })


}
 
  ngOnInit() {
    // this.photoService.loadSaved();
  }


    async presentActionSheet(key) {
      console.log(key.image);
      const actionSheet = await this.actionSheetController.create({
        header: 'Albums',
        buttons: [
       
        {
          text: 'Zoom',
          icon: 'resize',
          handler: () => {
            console.log('Zoom clicked');
          // this.router.navigate(['/signin'], {queryParams:{uid: this.afAuth.auth.currentUser.uid,  displayName: this.chatRef.displayName, lastname:this.chatRef.lastname,photoURL: this.chatRef.photoURL}})
          this.zoom(key.image)
          }
        },  {
          text: 'Share',
          icon: 'share',
          handler: () => {
            console.log('share clicked');
          // this.router.navigate(['/signin'], {queryParams:{uid: this.afAuth.auth.currentUser.uid,  displayName: this.chatRef.displayName, lastname:this.chatRef.lastname,photoURL: this.chatRef.photoURL}})
          this.share(key.image)
          }
        },{
          text: 'Delete',
          icon: 'trash',
          handler: () => {
            console.log('Delete clicked' );
            this.onDelete(key.image);
          }
        }]
      });
      await actionSheet.present();
    }
    onDelete(key){
      this.photoService.delete(key);
      this.Storage.ref('photoGalery/' + key.image).delete();
      alert("Image deleted");
     
    }

     zoom(key){
       this.Viewer.show(key.image, "" ,{share:true, copyToReference: true});
//     let zoom = this.nativeElement.swiper.zoom
//     if (zoomIn)
//     {
//       zoom.in()
//     }else{
//       zoom.out()
//     }
//     }

//    close(){
// this.modalController.dismiss();
    }

    share(key){
      this.socialSharing.share(key.image).then(()=>{
      }).catch(()=>{
      })
    }
    produ(pic){
      this.router.navigate(['/prod'], { queryParams:{image:pic.image, ProName:pic.ProName, Price:pic.Price, Exp:pic.Exp}});

    }
}
