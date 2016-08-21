import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from './../shared/http-client';
import { Observable } from 'rxjs/Observable';
import { Role } from './role';
import { Consts } from './../shared/consts';
import 'rxjs/Rx';
 
let entries = [],
    baseURL: string = Consts.URL_PREFIX,
    urlIdentifier: string = "roles",
    rolesURL: string = baseURL + urlIdentifier + '?size=' + Consts.LISTSIZE,
    roleURL: string = baseURL + urlIdentifier + '/';    
 
@Injectable()
export class RolesService {
   private httpClient : HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }
 
    findAll() {
        return this.httpClient.get(rolesURL)
            .map((res: any) => res = this.parseResult(res))
            .catch(this.handleError);
    }

    find(id: string) {
        return this.httpClient.get(roleURL + id)
            .map((res: any) => res = this.parseResult(res))
            .catch(this.handleError);            
    }

    persist(role: Role) {
        return this.httpClient.put(roleURL + role.name, role)
            .map((res: any) => res = this.parseResult(res))
            .catch(this.handleError);            
    }

    create(role: Role) {
        return this.httpClient.post(roleURL, role)
            .map((res: any) => res = this.parseResult(res))
            .catch(this.handleError);            
    }

    remove (role: Role) {
         return this.httpClient.delete(roleURL + role.name, role)
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