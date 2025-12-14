import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPanelComponent } from './post-panel.component';

describe('PostPanelComponent', () => {
  let component: PostPanelComponent;
  let fixture: ComponentFixture<PostPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
