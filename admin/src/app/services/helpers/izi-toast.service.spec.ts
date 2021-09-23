import { TestBed } from '@angular/core/testing';

import { IziToastService } from './izi-toast.service';

describe('IziToastService', () => {
  let service: IziToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IziToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
