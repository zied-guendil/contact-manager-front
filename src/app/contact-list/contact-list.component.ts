import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements AfterViewInit {

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'phone',
    'email',
    'address',
    'actions'
  ];

  dataSource = new MatTableDataSource<Contact>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private contactService: ContactService,
    private dialog: MatDialog
  ) {
    this.loadContacts();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  loadContacts(): void {
    this.dataSource.data = this.contactService.getAll();
  }

  applyFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  deleteContact(contact: Contact): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        name: contact.firstName + ' ' + contact.lastName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && contact.id) {
        this.contactService.delete(contact.id);
        this.loadContacts();
      }
    });
  }
}
