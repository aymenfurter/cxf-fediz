import { Claim } from './../claim/claim';

export class IDP { 
  	
  	constructor(
  		public realm: string,    	
    	public uri: string,    	
    	public serviceDisplayName: string,
    	public serviceDescription: string,    	
    	public idpUrl: string,
    	public stsUrl: string,    	
    	public certificate: string,
    	public certificatePassword: string,    	
    	public provideIdpList: boolean,
    	public useCurrentIdp: boolean,    	
    	public rpSingleSignOutCleanupConfirmation: boolean,        	
    	public rpSingleSignOutConfirmation: boolean,
  	    public claimTypesOffered: Claim[]

  	) {  }

};
