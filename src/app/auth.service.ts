import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs';

const GET_CUSTOMER = gql`
  query {
    customer {
      _id
      name
      avatar
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apollo: Apollo) {
  }

  getCustomer() {
    return this.apollo.watchQuery({ query: GET_CUSTOMER })
      .valueChanges.pipe(map((result: any) => result?.data?.customer));
  }
}
