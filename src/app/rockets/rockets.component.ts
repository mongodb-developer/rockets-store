import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Rocket } from '../rocket';

const GET_ALL_ROCKETS = gql`
  query {
    rockets(limit: 20) {
      name
      image
      price
      rocketHeight
    }
  }
`;

@Component({
  selector: 'app-rockets',
  templateUrl: './rockets.component.html',
  styleUrls: ['./rockets.component.scss']
})
export class RocketsComponent implements OnInit {
  rockets$: Observable<Rocket[]>;
  rocketsLoading = true;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.rockets$ = this.apollo
      .watchQuery({query: GET_ALL_ROCKETS})
      .valueChanges.pipe(
        tap((result: any) => { this.rocketsLoading = result?.loading }),
        map((result: any) => result?.data?.rockets)
      );
  }
}
