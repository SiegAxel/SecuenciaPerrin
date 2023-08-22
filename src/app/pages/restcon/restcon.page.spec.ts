import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestconPage } from './restcon.page';

describe('RestconPage', () => {
  let component: RestconPage;
  let fixture: ComponentFixture<RestconPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RestconPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
