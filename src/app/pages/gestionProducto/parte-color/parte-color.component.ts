import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
@Component({
  selector: 'app-parte-color',
  templateUrl: './parte-color.component.html',
  styleUrls: ['./parte-color.component.css']
})
export class ParteColorComponent implements AfterViewInit{
  @ViewChild('scroll1') scroll1!: ElementRef;
  @ViewChild('scroll2') scroll2!: ElementRef;

  producto: string = "";

  ngAfterViewInit() {
    const scroll1Element = this.scroll1.nativeElement;
    const scroll2Element = this.scroll2.nativeElement;

    scroll1Element.addEventListener('scroll', () => {
      scroll2Element.scrollLeft = scroll1Element.scrollLeft;
    });

    scroll2Element.addEventListener('scroll', () => {
      scroll1Element.scrollLeft = scroll2Element.scrollLeft;
    });

    this.addHorizontalScroll(scroll1Element);
    this.addHorizontalScroll(scroll2Element);
  }

  addHorizontalScroll(element: HTMLElement) {
    element.addEventListener('wheel', (event: WheelEvent) => {
      if (event.deltaY !== 0) {
        event.preventDefault(); 
        element.scrollLeft += event.deltaY; 
      }
    });
  }
}
