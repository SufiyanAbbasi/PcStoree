import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemdetailsComponent } from './itemdetails.component';

describe('ItemdetailsComponent', () => {
  let component: ItemdetailsComponent;
  let fixture: ComponentFixture<ItemdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
