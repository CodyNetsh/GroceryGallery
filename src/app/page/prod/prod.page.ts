import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-prod',
  templateUrl: './prod.page.html',
  styleUrls: ['./prod.page.scss'],
})
export class ProdPage implements OnInit {

  pic={
    image:"",
    ProName:"",
    Price:"",
    Exp:""
  }
 
  ad=1;
 
  constructor(private route:ActivatedRoute,private router:Router) {
    this.route.queryParams
    .subscribe(params =>
 {
     
      this.pic.image = params.image;
      this.pic.ProName = params.ProName;
      this.pic.Price = params.Price
      this.pic.Exp=params.Exp
      console.log(this.pic.image,this.pic.ProName,this.pic.Price,this.pic.Exp)
  });
   }

  ngOnInit() {
  }

 back(){
   this.router.navigateByUrl("home")
 }

 minus() {
  console.log(this.ad -= 1)
  if(this.ad<=1){
    this.ad=1
  }
 }

plus() {
 console.log(this.ad += 1)
}

}
