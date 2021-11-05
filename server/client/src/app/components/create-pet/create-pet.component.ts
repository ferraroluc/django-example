import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-pet',
  templateUrl: './create-pet.component.html',
  styleUrls: ['./create-pet.component.css']
})
export class CreatePetComponent implements OnInit {

  name:any = "";
  age:any = "";
  exact:any = true;

  constructor(
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async create() {
    await this.clientService.create({
      name: this.name,
      age: this.age,
      exact: this.exact
    }).toPromise();

    this.router.navigate(['/pet'])
  }

  back() {
    this.router.navigate(['/pet'])
  }
}
