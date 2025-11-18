import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookServiceDialogComponent } from './book-service-dialog.component';

describe('BookServiceDialogComponent', () => {
  let component: BookServiceDialogComponent;
  let fixture: ComponentFixture<BookServiceDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookServiceDialogComponent]
    });
    fixture = TestBed.createComponent(BookServiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
