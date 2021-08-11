import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from '../share-data.service';
import userLoginCredentials from 'src/assets/Json/usersLoginCredentials.json';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'projectProperty';
  email = "";
  pass = "";
  validation = "";
  profileImage: any;
  profileName: string = "";
  

  userName: any;
  profileImg: any;
  
  constructor(private router: Router, private shareData:ShareDataService)
  {
  
  }


  goToDashboardPage()
  {
  
    var i = -1;
    userLoginCredentials.forEach((element: { Email: string; Password: string; img:string,name:string}) =>
    {
      if (this.email === element.Email && this.pass === element.Password) {
        this.profileImage = element.img;
        this.profileName = element.name;
        this.router.navigate(['dashboard']);
        this.shareData.emit<any>(element);
        i = 0;
      }
    });
    if (i === -1) {
      this.validation = "Invalid email ID or Password";
    }
    
  }

  onSubmit(data: any)
  {
    //console.warn(data);
    //console.log(this.email);
    //console.log(this.pass);
  }

  public userDetails: {
    name: string,
    Email: string,
    Password: string,
    img: string
  }[] = userLoginCredentials;


  ngOnInit(): void
  {
  
  }

}
