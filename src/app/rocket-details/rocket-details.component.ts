import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Rocket } from '../rocket';

const GET_ROCKET= gql`
  query ($name: String) {
    rocket(query:{ name: $name }) {
      name
      price
      image
      cmp
      wiki
      status
      liftoffThrust
      payloadToLEO
      stages
      strapOns
      payloadToGTO
      fairingDiameter
      fairingHeight
    }
  }
`;

@Component({
  selector: 'app-rocket',
  templateUrl: './rocket-details.component.html',
  styleUrls: ['./rocket-details.component.scss']
})
export class RocketDetailsComponent implements OnInit {
  private name: string;
  rocket: Rocket;
  rocketLoading = true;

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.name = params['name'];

      this.apollo
        .watchQuery({
          query: GET_ROCKET,
          variables: {
            name: this.name
          }
        })
        .valueChanges
        .subscribe({
          next: (result: any) => {
            this.rocketLoading = result?.loading;
            this.rocket = result?.data?.rocket;

            // TODO: Connect to API Gateway to get launches
            // this.launches = result?.data?.launches;
          }
        });
    });
  }
}