import { Component } from '@angular/core';
import { NgForm }    from '@angular/common';
import { Claim }    from './claim';
import { Router, ActivatedRoute }       from '@angular/router';
import { ClaimsService } from './claims-service';

@Component({
  	selector: 'claim-form',
	templateUrl: 'app/claim/claims.component.template.edit.html',
	providers: [ClaimsService]
})
export class ClaimEditComponent {  	
	model = new Claim("", "", "");
	createEntry = false;
	submitted = false; 	
  	private sub: any;
	private errorMsg: string;

	constructor(private route: ActivatedRoute, private router: Router, private service: ClaimsService) {

	}

 	ngOnInit() {
	    this.sub = this.route.params.subscribe(params => {
	       let id = decodeURIComponent(params['id']);

	       if (id != "undefined") {
		       this.service.find(id).subscribe(
	            	claim => this.model = claim
	        	);
	       	} else {
	       		this.createEntry = true;	       		
	       	}
	     });
  	}

  	onPersist() {  		
  		this.submitted = true;  		  
  		// Maybe it would be better to have such logic in the Service; Since this would result in an additional request we leave it here for now.
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
  		this.router.navigate(['/claims'])
  	}

	onSubmit() { this.submitted = true; }  
	get diagnostic() { return JSON.stringify(this.model); }

	handleError() {
          this.errorMsg = "An error occurred while processing your request. Please verify your inputs.";
    }
}