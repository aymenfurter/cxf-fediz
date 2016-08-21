import {Component} from '@angular/core';
import {ApplicationsService} from './applications-service';
import {Application} from './application';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

@Component({
    selector: 'applications',  
    templateUrl: 'app/application/applications.component.template.list.html' ,    
    providers: [ApplicationsService],
    directives: [ROUTER_DIRECTIVES]
})
export class ApplicationsComponent {
    private entries: Application;    
    private errorMsg: string;

    constructor(private service:ApplicationsService, private router: Router) {        

    } 

    onMapClaims (application:Application) {
        this.router.navigate(['/claims2application', encodeURIComponent(application.realm)]);
    }
 
    ngOnInit() {
        this.service.findAll().subscribe(
            data => this.entries = data.applications
        );
    }    

    onSelect(application: Application) {
        this.router.navigate(['/application', encodeURIComponent(application.realm)]);
    }
  
    onRemove(application: Application) {
        this.service.remove(application)
            .toPromise()
            .then(() => this.ngOnInit())
            .catch(() => this.handleError());  
    }      

    onCreate() {
        this.router.navigate(['/create-application']);
    }

    handleError() {
          this.errorMsg = "An error occurred while processing your request. Please verify your inputs.";
    }
 
}