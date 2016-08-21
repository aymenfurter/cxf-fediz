import { Component } from '@angular/core';
import { NgForm }    from '@angular/common';
import { Application }    from './application';
import { Router, ActivatedRoute }       from '@angular/router';
import { ApplicationsService } from './applications-service';

@Component({
  	selector: 'application-form',
	templateUrl: 'app/application/applications.component.template.edit.html',
	providers: [ApplicationsService]
})
export class ApplicationEditComponent {  	
	model = new Application("", "", "", "", "http://docs.oasis-open.org/wsfed/federation/200706", "http://docs.oasis-open.org/wss/oasis-wss-saml-token-profile-1.1#SAMLV2.0", "3600", "https://localhost:?(\d)*/.*", []);
	createEntry = false;
	submitted = false; 	
  	private sub: any;
	private errorMsg: string;

	constructor(private route: ActivatedRoute, private router: Router, private service: ApplicationsService) {

	}

 	ngOnInit() {
	    this.sub = this.route.params.subscribe(params => {
	       let id = decodeURIComponent(params['id']);

	       if (id != "undefined") {
		       this.service.find(id).subscribe(
	            	data => this.model = data
	        	);
	       	} else {
	       		this.createEntry = true;	       		
	       	}
	     });
  	}

  	onPersist() {  		
  		this.submitted = true;  		
  	
  		if (!this.createEntry) {
	  		this.service.persist(this.model)
	  			.toPromise()
	            .then(() => this.navigateToListView())
	            .catch(() => this.handleError());  
        } else {
        	this.service.create(this.model)
        		.toPromise()
	            .then(() => this.navigateToListView())
	            .catch(() => this.handleError());  
        }

  	}

  	navigateToListView() {
  		this.router.navigate(['/applications'])
  	}

	onSubmit() { this.submitted = true; }  
	get diagnostic() { return JSON.stringify(this.model); }

	handleError() {
          this.errorMsg = "An error occurred while processing your request. Please verify your inputs.";
    }
}