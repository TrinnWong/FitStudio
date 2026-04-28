import { Component } from '@angular/core';
import { IonicModule, PopoverController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
})
export class TabsPage {
  productsOpen = true;

  constructor(private router: Router, private popoverController: PopoverController) {}

  toggleProducts() {
    this.productsOpen = !this.productsOpen;
  }

  logout() {
    localStorage.clear();
    this.popoverController.dismiss();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
