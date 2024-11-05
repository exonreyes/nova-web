import {Component, OnInit} from '@angular/core';
import {NgFor, NgIf} from "@angular/common";
import {menu} from "@nova/menu";
import {AppMenuitemComponent} from "@layout/app.menuitem.component";


@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
  standalone: true,
  imports: [NgFor, NgIf, AppMenuitemComponent]
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  ngOnInit() {
    this.model = menu
  }
}
