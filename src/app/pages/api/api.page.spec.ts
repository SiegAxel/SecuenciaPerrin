import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiPage } from './api.page';

describe('ApiPage', () => {
  let component: ApiPage;
  let fixture: ComponentFixture<ApiPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ApiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
