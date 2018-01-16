import { TestBed, inject } from '@angular/core/testing';

import { GraphReaderService } from './graph-reader.service';

describe('GraphReaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GraphReaderService]
    });
  });

  it('should be created', inject([GraphReaderService], (service: GraphReaderService) => {
    expect(service).toBeTruthy();
  }));
});
