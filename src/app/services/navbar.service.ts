import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showNavbarSource = new BehaviorSubject<boolean>(true);
  showNavbar = this.showNavbarSource.asObservable();

  setShowNavbar(visible: boolean): void {
    this.showNavbarSource.next(visible);
  }
}
