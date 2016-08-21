import { Component } from '@angular/core';
import { Consts } from './shared/consts';

import { ClaimsComponent } from './claim/claims.component';
import { ClaimEditComponent } from './claim/claims.component.edit';

import { ApplicationsComponent } from './application/applications.component';
import { ApplicationEditComponent } from './application/applications.component.edit';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { HttpClient } from './shared/http-client';
import { NgForm }    from '@angular/common';

@Component({
	moduleId: module.id,
    selector: 'init-app',
    templateUrl: 'app.component.template.html' ,        
    directives: [DashboardComponent, ROUTER_DIRECTIVES, NavigationComponent, ClaimEditComponent, ApplicationEditComponent]
})

//TODO: Move Authentication Logic to diffrent place
export class AppComponent {
	private isLoggedIn: boolean = false;
	private httpClient : HttpClient;	
	private username : string;
	private password : string;	
	private userDataWrong : boolean = false;
  private errorMsg : string;

	onLogin(username, password) {

      // This works fine for the moment. However, for unsuccessful login attempts the browser shows the basic authentication dialog. 
      // Probably server side changes are required to fix this. (E.g. Switching to custom basic auth headers.)

  		this.httpClient.setUsernamePassword(this.username, this.password);  		
        this.httpClient.get(Consts.URL_PREFIX + Consts.TEST_URL)
        .toPromise()
        .then(() => this.handleSuccess())
        .catch(() => this.handleError());                                            
  	}

    constructor(httpClient: HttpClient, private router: Router) {
        this.httpClient = httpClient;
    }

	  ngOnInit() {

  	} 
  
  	handleSuccess() {          
  		this.userDataWrong = false;
  		this.isLoggedIn = true;            
  	}
	
	handleError() {            
		  this.userDataWrong = true;
      this.errorMsg = "An error occurred during the login process. Please check your credentials.";
    }
	    
}
