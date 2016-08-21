import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {ApplicationsService} from './../application/applications-service';
import {ClaimsService} from './../claim/claims-service';
import {RolesService} from './../role/roles-service';
import {TrustedIdpsService} from './../trustedIdp/trustedIdps-service';
import {IDPsService} from './../idp/idps-service';

@Component({ 
    selector: 'dashboard',    
    templateUrl: 'app/dashboard/dashboard.component.template.html',    
    providers: [ClaimsService, ApplicationsService, RolesService, TrustedIdpsService, IDPsService],
    directives: [ROUTER_DIRECTIVES]
})
export class DashboardComponent {
    private sizeClaims;
    private sizeApps;
    private sizeRoles;
    private sizeTrustedIdps;
    private sizeIdps;

    constructor(private idpService: IDPsService, private claimsService:ClaimsService, private applicationsService:ApplicationsService, private rolesService:RolesService, private trustedIdpsService:TrustedIdpsService) {

    }

    ngOnInit() {
        this.claimsService.findAll().subscribe(
            data => this.sizeClaims = data.claims.length
        );    

        this.idpService.findAll().subscribe(
            data => this.sizeIdps = data.idps.length
        );    

        this.trustedIdpsService.findAll().subscribe(
            data => this.sizeTrustedIdps = data.trustedIdps.length
        );    

        this.applicationsService.findAll().subscribe(
            data => this.sizeApps = data.applications.length
        );    

        this.rolesService.findAll().subscribe(
            data => this.sizeRoles = data.roles.length
        );    
    }    
}