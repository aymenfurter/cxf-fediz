import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from './../shared/http-client';
import { Observable } from 'rxjs/Observable';
import { Claim } from './claim';
import { Consts } from './../shared/consts';
import 'rxjs/Rx';
 
let entries = [],
    baseURL: string = Consts.URL_PREFIX,
    urlIdentifier: string = "claims",
    claimsURL: string = baseURL + urlIdentifier + '?size=' + Consts.LISTSIZE,
    claimURL: string = baseURL + urlIdentifier + '/';    
 
@Injectable()
export class ClaimsService {
   private httpClient : HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }
 
    findAll() {
        return this.httpClient.get(claimsURL)
            .map((res: any) => res = this.parseResult(res))
            .catch(this.handleError);
    }

    find(id: string) {
        return this.httpClient.get(claimURL + id)
            .map((res: any) => res = this.parseResult(res))
            .catch(this.handleError);            
    }

    persist(claim: Claim) {
        return this.httpClient.put(claimURL + claim.claimType, claim)
            .map((res: any) => res = this.parseResult(res))
            .catch(this.handleError);            
    }

    create(claim: Claim) {
        return this.httpClient.post(claimURL, claim)
            .map((res: any) => res = this.parseResult(res))
            .catch(this.handleError);            
    }

    remove (claim: Claim) {
         return this.httpClient.delete(claimURL + claim.claimType, claim)
            .map((res: any) => res = this.parseResult(res))
            .catch(this.handlePlaceboError);                               
    }

    parseResult(res) {
        let returnValue = null;
        try {
            returnValue = res.json();
        } catch (ex) {}

        if (returnValue != null) {
            return returnValue;
        }                 
    }

    // Fediz IDP returns 204 for DELETE Requests..
    handlePlaceboError(error) {
        return Observable.throw(error.json().error || 'Expected Error');      
    }

    handleError(error) {                
        return Observable.throw(error.json().error || 'Server error');
    } 
}