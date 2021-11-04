import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css']
})
export class PetDetailsComponent implements OnInit {

  constructor(
    private clientService: ClientService,
    private router:Router
  ) {    
  }

  itemList: any[] = []
  
  ngOnInit(): void {
    this.clientService.getAll().subscribe(res => {
      this.itemList = res;
    })
  }

  edit = (id:any) => {
    this.router.navigate(['/pet/', id]);
  }

  delete = (id:any) => {
    this.clientService.delete(id);
  }
}
