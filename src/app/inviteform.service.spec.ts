/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InviteformService } from './inviteform.service';

describe('InviteformService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InviteformService]
    });
  });

  it('should ...', inject([InviteformService], (service: InviteformService) => {
    expect(service).toBeTruthy();
  }));
});
