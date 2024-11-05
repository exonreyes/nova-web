import {Component, ElementRef, ViewChild} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MenuItem} from "primeng/api";
import {NgClass, NgOptimizedImage} from "@angular/common";
import {AppName} from "@nova/app.info";
import {LayoutService} from '@layout/app.layout.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterLink, NgClass, NgOptimizedImage],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  items!: MenuItem[];
  @ViewChild('menubutton') menuButton!: ElementRef;
  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
  @ViewChild('topbarmenu') menu!: ElementRef;
  protected readonly appname = AppName;

  constructor(public layoutService: LayoutService) {
  }
}
