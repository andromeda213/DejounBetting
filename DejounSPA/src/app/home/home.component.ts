import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode: boolean = false;
  values: any;

  constructor(private http: HttpClient, private alertify: AlertifyService,
    private auth: AuthService, private router: Router) { }

  ngOnInit() {
    if(this.auth.loggedIn()){
      this.router.navigate(['/members'])
    }

    this.getValues();
  }

  getValues(){
    this.http.get("http://localhost:5000/api/values").subscribe(response => {
      this.values = response;
    }, error => {
      console.log(error);
    });
  }
  
  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  cancelRegister(registerMode: boolean){
    this.registerMode = registerMode;
  }

}
