export class TrustedIdp { 
  	
  	constructor(
  		public realm: string,    	
    	public url: string,	
    	public name: string,        	
    	public description: string,
    	public protocol: string,   
    	public trustType: string,     
    	public certificate: string,     
    	public federationType: string,     
    	public cacheTokens: boolean
  	) {  }

};
