import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecconPage } from './reccon.page';

describe('RecconPage', () => {
  let component: RecconPage;
  let fixture: ComponentFixture<RecconPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecconPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
