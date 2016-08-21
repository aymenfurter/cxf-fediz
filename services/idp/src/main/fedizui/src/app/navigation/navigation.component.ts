import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {ClaimsComponent} from './../claim/claims.component';
import {ApplicationsComponent} from './../application/applications.component';
import {DashboardComponent} from './../dashboard/dashboard.component';

@Component({
    selector: 'main-nav',  
    templateUrl: 'app/navigation/navigation.component.template.html' ,  
    directives: [ROUTER_DIRECTIVES]      
})
export class NavigationComponent {
    
    ngOnInit() {
        
    }    
 
}