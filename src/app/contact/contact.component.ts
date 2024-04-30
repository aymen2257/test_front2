import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'] // Note: Correct property name is styleUrls
})
export class ContactComponent implements AfterViewInit {

  mail ="mae.assurances@mae.tn"
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.setupInputs();
  }

  private setupInputs() {
    const inputs = this.elementRef.nativeElement.querySelectorAll(".input");
  
    const focusFunc = (event: FocusEvent) => {
      const parent = (event.target as HTMLElement)?.parentNode as HTMLElement;
      if (parent) {
        parent.classList.add("focus");
      }
    };
  
    const blurFunc = (event: FocusEvent) => {
      const parent = (event.target as HTMLElement)?.parentNode as HTMLElement;
      if (parent && !(event.target as HTMLInputElement).value) {
        parent.classList.remove("focus");
      }
    };
  
    inputs.forEach((input: HTMLElement) => {
      input.addEventListener("focus", focusFunc);
      input.addEventListener("blur", blurFunc);
    });
  }
  

}
