import { provideRouter, RouterConfig } from '@angular/router';
import { DashboardComponent } from './../dashboard/dashboard.component';

import { ClaimsComponent } from './../claim/claims.component';
import { ClaimEditComponent } from './../claim/claims.component.edit';

import { ApplicationsComponent } from './../application/applications.component';
import { ApplicationEditComponent } from './../application/applications.component.edit';
import { ApplicationMapClaimsComponent } from './../application/applications.component.mapClaims';

import { RolesComponent } from './../role/roles.component';
import { RoleEditComponent } from './../role/roles.component.edit';

import { TrustedIdpsComponent } from './../trustedIdp/trustedIdp.component';
import { TrustedIdpEditComponent } from './../trustedIdp/trustedIdps.component.edit';

import { IdpsComponent } from './../idp/idps.component';
import { IDPEditComponent } from './../idp/idps.component.edit';
import { IdpMapClaimsComponent } from './../idp/idps.component.mapClaims';
import { IdpMapApplicationsComponent } from './../idp/idps.component.mapApplications';
import { IdpMapTrustedIdpComponent } from './../idp/idps.component.mapTrustedIdps';


export const routes: RouterConfig = [  
  	/* Claims */
	{ path: 'claims', component: ClaimsComponent },  
	{ path: 'claim/:id', component: ClaimEditComponent },  
	{ path: 'create-claim', component: ClaimEditComponent},

	/* Applications */
	{ path: 'applications', component: ApplicationsComponent },  
	{ path: 'application/:id', component: ApplicationEditComponent },  
	{ path: 'claims2application/:id', component: ApplicationMapClaimsComponent },  	
	{ path: 'create-application', component: ApplicationEditComponent},

	/* Trusted IDPs */
	{ path: 'trustedIdps', component: TrustedIdpsComponent },  
	{ path: 'trustedIdp/:id', component: TrustedIdpEditComponent },  	
	{ path: 'create-trustedIdp', component: TrustedIdpEditComponent},

	/* IDPs */
	{ path: 'idps', component: IdpsComponent },  
	{ path: 'idp/:id', component: IDPEditComponent },  
	{ path: 'claims2idp/:id', component: IdpMapClaimsComponent },  	
	{ path: 'applications2idp/:id', component: IdpMapApplicationsComponent },  		
	{ path: 'trustedIdps2idp/:id', component: IdpMapTrustedIdpComponent },  		
	{ path: 'create-idp', component: IDPEditComponent},

	/* Roles */
	{ path: 'roles', component: RolesComponent },  
	{ path: 'role/:id', component: RoleEditComponent },  
	{ path: 'create-role', component: RoleEditComponent },

	/* General */
	{ path: 'dashboard', component: DashboardComponent },  
	{ path: '', component: DashboardComponent }, 
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];