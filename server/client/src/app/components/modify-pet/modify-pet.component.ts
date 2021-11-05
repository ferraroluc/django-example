import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-modify-pet',
  templateUrl: './modify-pet.component.html',
  styleUrls: ['./modify-pet.component.css']
})
export class ModifyPetComponent implements OnInit {

  pet: Client = {}

  id:any = 0;
  name:any = "";
  age:any = "";
  exact:any = true;

  constructor(
    private clientService: ClientService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.clientService.get(id).subscribe(res => {
      this.pet = res;
      this.id = id;
      this.name = res.name;
      this.age = res.age;
      this.exact = res.exact;
    });
  }

  async save() {
    await this.clientService.update(this.id, {
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
