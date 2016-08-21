import { Component } from '@angular/core';
import { NgForm }    from '@angular/common';
import { IDP }    from './idp';
import { Application }    from './../application/application';
import { Router, ActivatedRoute }       from '@angular/router';
import { IDPsService } from './idps-service';
import { ApplicationsService } from './../application/applications-service';

@Component({
  	selector: 'idpmapform',
	templateUrl: 'app/idp/idps.component.template.mapApplications.html',
	providers: [IDPsService, ApplicationsService]
})
export class IdpMapApplicationsComponent {  		
	private applications: Application[];
	private chosenApplication: string;	
  	private sub: any;
  	model = new IDP("", "", "", "", "", "", "", "", false, false, false, false, []);
	private errorMsg: string;

	constructor(private route: ActivatedRoute, private router: Router, private service: IDPsService, private applicationsService: ApplicationsService) {
	}

 	ngOnInit() {
 		this.applicationsService.findAll().subscribe(
            data => this.applications = data.applications
        );

	    this.sub = this.route.params.subscribe(params => {
	       let id = decodeURIComponent(params['id']);

	       if (id != "undefined") {
		       this.service.find(id).subscribe(
	            	data => this.model = data
	        	);
	       	} 
	     });
  	}

  	onUnmap(entry, model) {
  		this.errorMsg = "";
  		this.service.removeApplicationMapping(model, entry.realm)
  				.toPromise()
	    	    .then(() => this.ngOnInit())
	            .catch(() => this.handleError());  
  	}

	onMapNewApplication() {
		this.errorMsg = "";
		this.service.addApplicationMapping(this.model, this.chosenApplication)
				.toPromise()
	    	    .then(() => this.ngOnInit())
	            .catch(() => this.handleError());  
	}

	handleError() {
          this.errorMsg = "An error occurred while processing your request. Please verify your inputs.";
    }
}