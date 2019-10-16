import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdPage } from './prod.page';

describe('ProdPage', () => {
  let component: ProdPage;
  let fixture: ComponentFixture<ProdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
