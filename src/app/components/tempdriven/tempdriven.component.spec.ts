import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempdrivenComponent } from './tempdriven.component';

describe('TempdrivenComponent', () => {
  let component: TempdrivenComponent;
  let fixture: ComponentFixture<TempdrivenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TempdrivenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TempdrivenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
