import {Component} from '@angular/core';
import {ClaimsService} from './claims-service';
import {Claim} from './claim';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

@Component({
    selector: 'claims',  
    templateUrl: 'app/claim/claims.component.template.list.html' ,    
    providers: [ClaimsService],
    directives: [ROUTER_DIRECTIVES]
})
export class ClaimsComponent {
    private entries: Claim;
    private errorMsg: string;

    constructor(private claimsService:ClaimsService, private router: Router) {        
    }
 
    ngOnInit() {
        this.claimsService.findAll().subscribe(
            data => this.entries = data.claims
        );
    }    

    onSelect(claim: Claim) {
        this.router.navigate(['/claim', encodeURIComponent(claim.claimType)]);
    }
  
    onRemove(claim: Claim) {        
        this.claimsService.remove(claim)            
            .toPromise()
            .then(() => this.ngOnInit())
            .catch(() => this.handleError());  
    }      

    onCreate() {
        this.router.navigate(['/create-claim']);
    }

    handleError() {
          this.errorMsg = "An error occurred while processing your request. Please verify your inputs.";
    }
 
}