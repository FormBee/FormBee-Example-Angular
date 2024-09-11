import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  contactForm: FormGroup;
  messageElement: HTMLElement | null = null;
  emailElement: HTMLElement | null = null;

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient, 
    private elRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.messageElement = this.elRef.nativeElement.querySelector('#message');
    this.emailElement = this.elRef.nativeElement.querySelector('#email');
  }

  onSubmit(): void {
    console.log(this.contactForm.value);
    this.http.post('http://localhost:3000/formbee/b27ed43d-5d46-469e-a99b-d656991e0c05', this.contactForm.value).subscribe(response => {
      console.log(response);
    });
  }
}
