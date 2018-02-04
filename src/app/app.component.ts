import { Component, Input, OnInit } from '@angular/core';
import {ArrayService} from './arr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ArrayService]
})
export class AppComponent implements OnInit {
   view: boolean = false;
   nonvisibility: boolean = true;
   visibility: boolean = false;
   userName: '';
   
   constructor(private ArrayService: ArrayService) {}
      
   user = {
      login : '',
      pass : '',
      load : () => {
         let ls = window.localStorage;
         let st_login = ls.getItem("login");
         let st_pass = ls.getItem("pass");
         
         if (this.ArrayService.checkLoginData(st_login, st_pass)) {
            this.success([st_login, st_pass])
         }
      },
      save : () => {
         let ls = window.localStorage;
         ls.setItem("login", this.user.login);
         ls.setItem("pass", this.user.pass);
      },
      
      logout : () => {
         let ls = window.localStorage;
         let login, pass;
         
         ls.setItem("login", this.user.login);
         ls.setItem("pass", "");
         this.toggle();
      }
    };
   
    logIn = (login, password) => {
       console.log(login + " " + password);
       this.view = true;
       this.ArrayService.logIn( login, password)
          .subscribe( result => {            
             this.view = false;
             if (result) {
                this.success([login, password]);
             }
          })
    }
    
    getView = () => {
       if (this.view) {
          return "block";
       }   
       return "none";
    }
    
   toggle = () =>{
      this.visibility=!this.visibility;
      this.nonvisibility=!this.nonvisibility;
   }
    
    success = (res) => {
       //скрываем форму авторизации, проходим внутрь
       console.log("Успешня авторизация");
       this.userName = res[0];
       this.toggle();
       this.user.login = res[0];
       this.user.pass = res[1];
       this.user.save();
    }
   
   ngOnInit() {
       console.log("Инициализация компонента");
       this.user.load();
    }
}
