import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  contact?: Contact;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService
  ) {}

ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));

  this.contactService.getById(id).subscribe(contact => {
    this.contact = contact;
  });
}
}
