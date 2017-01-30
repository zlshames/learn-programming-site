/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InviteformComponent } from './inviteform.component';

describe('InviteformComponent', () => {
  let component: InviteformComponent;
  let fixture: ComponentFixture<InviteformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
