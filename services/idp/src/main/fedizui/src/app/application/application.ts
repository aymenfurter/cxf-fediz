import { Claim } from './../claim/claim';

export class Application {   
  	constructor(
    	public realm: string,
    	public role: string,
    	public serviceDisplayName: string,
    	public serviceDescription: string,
    	public protocol: string,
    	public tokenType: string,
    	public lifeTime: string,
    	public passiveRequestorEndpointConstraint: string,
        public claims: Claim[]
  	) {  }

};