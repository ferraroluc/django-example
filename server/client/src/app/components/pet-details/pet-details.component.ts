import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css']
})
export class PetDetailsComponent implements OnInit {

  name:any = "";
  age:any = "";

  flagFilter:boolean = false;

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

  edit(id:any) {
    this.router.navigate(['/pet/', id]);
  }

  async delete(id:any) {
    await this.clientService.delete(id).toPromise();
    window.location.reload();
  }

  create() {
    this.router.navigate(['/pet/create']);
  }

  async search() {
    this.itemList = await this.clientService.findByValue(this.name, this.age).toPromise();
    this.flagFilter = true;
  }
  
  async clean() {
    this.clientService.getAll().subscribe(res => {
      this.itemList = res;
    })
    this.flagFilter = false;
  }
}
