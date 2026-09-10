import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contacts: Contact[] = [
    {
      id: 1,
      firstName: 'Emma',
      lastName: 'Martin',
      phone: '06 11 22 33 44',
      email: 'emma.martin@example.com',
      address: '12 rue de Paris'
    },
    {
      id: 2,
      firstName: 'Lucas',
      lastName: 'Bernard',
      phone: '06 55 66 77 88',
      email: 'lucas.bernard@example.com',
      address: '8 avenue Victor Hugo'
    }
  ];

  getAll(): Contact[] {
    return this.contacts;
  }

  getById(id: number): Contact | undefined {
    return this.contacts.find(contact => contact.id === id);
  }

  create(contact: Contact): void {
    const maxId = this.contacts.length
      ? Math.max(...this.contacts.map(c => c.id || 0))
      : 0;

    contact.id = maxId + 1;
    this.contacts.push(contact);
  }

  update(contact: Contact): void {
    const index = this.contacts.findIndex(c => c.id === contact.id);

    if (index !== -1) {
      this.contacts[index] = contact;
    }
  }

  delete(id: number): void {
    this.contacts = this.contacts.filter(contact => contact.id !== id);
  }
}
