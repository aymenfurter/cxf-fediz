import {Component} from '@angular/core';
import {IDPsService} from './idps-service';
import {IDP} from './idp';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

@Component({
    selector: 'idps',  
    templateUrl: 'app/idp/idps.component.template.list.html' ,    
    providers: [IDPsService],
    directives: [ROUTER_DIRECTIVES]
})
export class IdpsComponent {
    private entries: IDP;    
    private errorMsg: string;

    constructor(private service:IDPsService, private router: Router) {        

    } 
 
    ngOnInit() {
        this.service.findAll().subscribe(
            data => this.entries = data.idps
        );
    }    

    onMapClaims (idp:IDP) {
        this.router.navigate(['/claims2idp', encodeURIComponent(idp.realm)]);
    }

    onMapApplications (idp:IDP) {
        this.router.navigate(['/applications2idp', encodeURIComponent(idp.realm)]);
    }

    onMapTrustedIdps (idp:IDP) {
        this.router.navigate(['/trustedIdps2idp', encodeURIComponent(idp.realm)]);        
    }
 

    onSelect(idp: IDP) {
        this.router.navigate(['/idp', encodeURIComponent(idp.realm)]);
    }
  
    onRemove(idp: IDP) {
        this.service.remove(idp)
            .toPromise()
            .then(() => this.ngOnInit())
            .catch(() => this.handleError());  
    }      

    onCreate() {
        this.router.navigate(['/create-idp']);
    }

    handleError() {
          this.errorMsg = "An error occurred while processing your request. Please verify your inputs.";
    }
 
}