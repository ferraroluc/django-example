import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modify-pet',
  templateUrl: './modify-pet.component.html',
  styleUrls: ['./modify-pet.component.css']
})
export class ModifyPetComponent implements OnInit {

  pet: Client = {}

  // form: FormGroup = new FormGroup({
  //   "name": new FormControl(),
  //   "age": new FormControl(),
  //   "exact": new FormControl()
  // });

  id:any = 0;
  name:any = "";
  age:any = 0;
  exact:any = true;

  constructor(
    private clientService: ClientService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.clientService.get(id).subscribe(res => {
      this.pet = res;
      // this.form.controls["name"].setValue(this.pet.name);
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
  }

}
