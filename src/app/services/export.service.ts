import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  exportContacts(contacts: Contact[]): void {

    const header = [
      'First Name',
      'Last Name',
      'Phone',
      'Email',
      'Address'
    ];

    const rows = contacts.map(contact => [
      contact.firstName,
      contact.lastName,
      contact.phone,
      contact.email,
      contact.address
    ]);

    const csvContent = [
      header.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob(
      [csvContent],
      { type: 'text/csv;charset=utf-8;' }
    );

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'contacts.csv';
    link.click();

    window.URL.revokeObjectURL(url);
  }
}