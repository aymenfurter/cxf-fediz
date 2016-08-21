
import { Component } from '@angular/core';
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { NavigationComponent } from './app/navigation/navigation.component';
import { HTTP_PROVIDERS } from '@angular/http'; 
import { HttpClient } from './app/shared/http-client';
import { APP_ROUTER_PROVIDERS } from './app/shared/app.routes';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import { AppComponent, environment } from './app/';

bootstrap(AppComponent, [HTTP_PROVIDERS, HttpClient, APP_ROUTER_PROVIDERS,  disableDeprecatedForms(), provideForms()]);



