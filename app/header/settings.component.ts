﻿import { Component, Input, ViewChild, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Selector } from '../common/selector';

@Component({
    selector: 'settings',
    template: `
        <div title="Options" class="s-container hover-primary2" [class.background-primary2]="settingsMenu && settingsMenu.isOpen()" (click)="onClickSettings()">
            <i class="fa fa-cog"></i>
        </div>
        <selector #settingsMenu class="color-normal" [right]="true">
            <ul>
                <li class="hover-editing">
                    <a class="color-normal server " [routerLink]="['/get']">Add or Remove Servers</a>
                </li>
                <li class="hover-editing">
                    <a class="color-normal download" [routerLink]="['/get']">Download Microsoft IIS Administration</a>
                </li>
                <li class="hover-editing">
                    <a class="color-normal dev" href="https://github.com/microsoft/iis.administration">Developers</a>
                </li>
            </ul>
        </selector>
    `,
    styles: [`
        .s-container {
            display: inline-block;
            vertical-align: middle;
            min-width: 25px;
            cursor: pointer;
            padding: 0 15px;
            font-size: 120%;
            height: 55px;
        }

        .s-container i {
            line-height: 55px;
        }

        selector {
            position: absolute;
            right: 0;
            top: 54px;
        }

        ul {
            margin-bottom: 0;
        }

        li {
            white-space: nowrap;
        }

        a {
            padding: 7px 5px;
            display: block;
        }

        a:before {
            font-family: FontAwesome;
            font-size: 120%;
            line-height: 22px;
            width: 25px;
            display: inline-block;
        }

        .server:before {
            content: "\\f233";
        }

        .dev:before {
            content: "\\f121";
        }

        .download:before {
            content: "\\f019";
        }
    `]
})
export class SettingsComponent implements OnDestroy {
    @ViewChild('settingsMenu')
    private _settingsMenu: Selector;
    private _subscriptions: Array<Subscription> = [];

    constructor(private _router: Router) {
        this._subscriptions.push(this._router.events.subscribe(e => {
            if (e instanceof NavigationStart) {
                this._settingsMenu.close();
            }
        }));
    }

    public ngOnDestroy() {
        this._subscriptions.forEach(sub => sub.unsubscribe());
    }

    private onClickSettings(): void {
        this._settingsMenu.toggle();
    }
}