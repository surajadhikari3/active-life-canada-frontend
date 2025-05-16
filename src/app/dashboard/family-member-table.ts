import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ColDef} from 'ag-grid-community';
import {AgGridAngular} from 'ag-grid-angular';

@Component({
  selector: 'app-family-members',
  standalone: true,
  imports: [CommonModule, AgGridAngular],
  template: `
    <div class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-lg font-semibold mb-4">Family Members</h2>
      <ag-grid-angular
        class="ag-theme-alpine"
        style="width: 100%; height: 500px"
        [rowData]="familyData"
        [columnDefs]="columnDefs"
        [defaultColDef]="{ resizable: true, flex: 1 }">
      </ag-grid-angular>
    </div>
  `
})
export class FamilyMembersComponent {
  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'city', headerName: 'City' },
    { field: 'phone', headerName: 'Phone' },
    { field: 'preferredContact', headerName: 'Preferred Contact' }
  ];

  familyData = [
    { id: 33, name: 'pp', city: 'kk', phone: '4373325652', preferredContact: 'sms' },
    { id: 34, name: 'submem', city: 'TRT', phone: '4373325652', preferredContact: 'sms' },
    { id: 35, name: 'men2', city: 'TRT', phone: '4373325652', preferredContact: 'sms' },
    { id: 36, name: 'dsfds', city: 'Mississauga', phone: '4373325652', preferredContact: 'sms' }
  ];
}
