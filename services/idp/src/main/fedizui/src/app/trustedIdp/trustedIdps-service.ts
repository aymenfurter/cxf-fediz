import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from './../shared/http-client';
import { Observable } from 'rxjs/Observable';
import { TrustedIdp } from './trustedIdp';
import { Consts } from './../shared/consts';
import 'rxjs/Rx';
 
let entries = [],
    baseURL: string = Consts.URL_PREFIX,
    urlIdentifier: string = "trusted-idps",
    trustedIdpsURL: string = baseURL + urlIdentifier + '?size=' + Consts.LISTSIZE,
    trustedIdpURL: string = baseURL + urlIdentifier + '/';    
 
@Injectable()
export class TrustedIdpsService {
   private httpClient : HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }
 
    findAll() {
        return this.httpClient.get(trustedIdpsURL)
            .map((res: any) => res = this.parseResult(res))
            .catch(this.handleError);
    }

    find(id: string) {
        return this.httpClient.get(trustedIdpURL + id)
            .map((res: any) => res = this.parseResult(res))
            .catch(this.handleError);            
    }

    persist(trustedIdp: TrustedIdp) {
        return this.httpClient.put(trustedIdpURL + trustedIdp.realm, trustedIdp)
            .map((res: any) => res = this.parseResult(res))
            .catch(this.handleError);            
    }

    create(trustedIdp: TrustedIdp) {
        return this.httpClient.post(trustedIdpURL, trustedIdp)
            .map((res: any) => res = this.parseResult(res))
            .catch(this.handleError);            
    }

    remove (trustedIdp: TrustedIdp) {
         return this.httpClient.delete(trustedIdpURL + trustedIdp.realm, trustedIdp)
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

       
    handlePlaceboError(error) {      
        return Observable.throw(error.json().error || 'Expected Error');
    }

    handleError(error) {                
        return Observable.throw(error.json().error || 'Server error');
    } 
}