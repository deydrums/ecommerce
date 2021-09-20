import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryProductComponent } from './inventory-product.component';

describe('InventoryProductComponent', () => {
  let component: InventoryProductComponent;
  let fixture: ComponentFixture<InventoryProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
