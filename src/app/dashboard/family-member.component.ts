import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ColDef, ModuleRegistry, AllCommunityModule} from 'ag-grid-community';
import {AgGridAngular} from 'ag-grid-angular';
import {HttpClient} from '@angular/common/http';
import {catchError, of} from 'rxjs';
import {AuthService} from '../auth/auth.service';

ModuleRegistry.registerModules([AllCommunityModule]);


@Component({
  selector: 'app-family-members',
  standalone: true,
  imports: [CommonModule, AgGridAngular],
  template: `
    <div class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-lg font-semibold mb-4">Family Members</h2>
      <ag-grid-angular
        class="ag-theme-quartz-dark"
        style="width: 100%; height: 800px"
        [rowData]="familyData()"
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [pagination]="true"
        [paginationPageSize]="10"
        [paginationPageSizeSelector] = "[10,20]"
        rowSelection="multiple"
        [domLayout]="'autoHeight'">
      </ag-grid-angular>
    </div>
  `
})
export class FamilyMemberComponent implements OnInit {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  familyData = signal<any[]>([]);


  defaultColDef: ColDef = {
    resizable: true,
    flex: 1,
    filter: true,
    floatingFilter: true, //it will give the searchbar for searching
  }

  columnDefs: ColDef[] = [
    { field: 'familyMemberId', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'city', headerName: 'City' },
    { field: 'homePhone', headerName: 'Phone' },
    { field: 'preferredContact', headerName: 'Preferred Contact' }
  ];

  ngOnInit(): void {
    const user = this.authService.user();
    const memberId = user?.memberLoginId;

    if (!memberId) {
      console.warn('No memberId found in AuthService');
      return;
    }

    this.http.get<any>(`/api/v1/authentication/familyGroup/${memberId}`)
      .pipe(
        catchError((err) => {
          console.error('Failed to fetch family group', err);
          return of({ familyMember: [] });
        })
      )
      .subscribe((response) => {
        this.familyData.set(response.familyMember || []);
      });
  }
}
