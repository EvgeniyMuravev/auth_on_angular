import {Observable} from 'rxjs/Observable';

export class ArrayService {
   user = [
      { login:"log", pass:"pass"},
      { login:"log1", pass:"pass"},
      { login:"log2", pass:"pass"}
   ];
   
   getRegisterUsers = () => {
      return this.user;
   }
   
   checkLoginData = (log, pass) => {
      for( let i=0; i<this.user.length; i++) {
         if (this.user[i].login === log && this.user[i].pass === pass) {
            return true
         }
      }
      return false
   }
   
   logIn = (log, pass) => {
      return new Observable( observer => {
         setTimeout(() => {
            observer.next(this.checkLoginData(log, pass));
         }, 5000)
      })
   }
}