import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsRecPage } from './details-rec.page';

describe('DetailsRecPage', () => {
  let component: DetailsRecPage;
  let fixture: ComponentFixture<DetailsRecPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRecPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
