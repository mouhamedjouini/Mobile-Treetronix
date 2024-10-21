import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../reclamation.service';

@Component({
  selector: 'app-list-rec',
  templateUrl: './list-rec.page.html',
  styleUrls: ['./list-rec.page.scss'],
})
export class ListRecPage implements OnInit {
deleteReclamation(arg0: any) {
throw new Error('Method not implemented.');
}

  reclamations: any[] = []; // List of reclamations from backend
  filteredReclamations: any[] = []; // Filtered list to display
  selectedStatus: string = 'ALL';
  public url = 'http://localhost:5000';
  approvedCount: number = 0;
  pendingCount: number = 0;
  rejectedCount: number = 0;
  resolvedCount: number = 0;

  constructor(private reclamationService: ReclamationService) {}

  // Method to filter reclamations by status
  filterByStatus(status: string) {
    this.selectedStatus = status;
    
    if (status === 'ALL') {
      this.filteredReclamations = this.reclamations;
    } else {
      this.filteredReclamations = this.reclamations.filter(reclamation => reclamation.status === status);
    }
  }

  // Method to count the number of reclamations by status
  countByStatus() {
    this.approvedCount = this.reclamations.filter(rec => rec.status === 'APPROVED').length;
    this.pendingCount = this.reclamations.filter(rec => rec.status === 'PENDING').length;
    this.rejectedCount = this.reclamations.filter(rec => rec.status === 'REJECTED').length;
    this.resolvedCount = this.reclamations.filter(rec => rec.status === 'RESOLVED').length;
  }

  // Method to return the appropriate CSS class for a status
  getStatusClass(status: string): string {
    switch (status) {
      case 'APPROVED':
        return 'success'; // Ionic uses color attributes
      case 'PENDING':
        return 'warning';
      case 'REJECTED':
        return 'danger';
      case 'RESOLVED':
        return 'primary';
      default:
        return 'medium';
    }
  }

  ngOnInit() {
    this.reclamationService.getall().subscribe(
      (res) => {
        this.reclamations = res;
        this.filteredReclamations = this.reclamations;
        this.countByStatus();
      },
      (err) => {
        console.error(err); // Handle errors
      }
    );
  }
}
