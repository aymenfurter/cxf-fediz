import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class HttpClient {
  private http;  
  private userPasswordBase64;

  constructor(http: Http) {
    this.http = http;
  }

  setUsernamePassword(username:string, password: string) {
    this.userPasswordBase64 = btoa(username +':' + password)
  }

  createAuthorizationHeader(headers:Headers) {
    headers.append('Authorization', 'Basic ' +
      this.userPasswordBase64); 
    headers.append('Accept', 'application/json');      
  }

  get(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);    
    return this.http.get(url, {
      headers: headers
    });
  }

  post(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }


  put(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(url, data, {
      headers: headers
    });
  }

  delete(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.delete(url, data, {
      headers: headers
    });
  }
}