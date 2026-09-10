import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  contactForm!: FormGroup;
  contactId?: number;
  editMode = false;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
        this.contactId = Number(id);
        this.editMode = true;

        this.contactService.getById(this.contactId).subscribe(contact => {
        this.contactForm.patchValue(contact);
        });
    }
  }

  save(): void {
  if (this.contactForm.invalid) {
    return;
  }

  const contact: Contact = this.contactForm.value;

  if (this.editMode && this.contactId) {
    contact.id = this.contactId;

    this.contactService.update(contact).subscribe(() => {
      this.router.navigate(['/contacts']);
    });

  } else {

    this.contactService.create(contact).subscribe(() => {
      this.router.navigate(['/contacts']);
    });
  }
}

  cancel(): void {
    this.router.navigate(['/contacts']);
  }
}
