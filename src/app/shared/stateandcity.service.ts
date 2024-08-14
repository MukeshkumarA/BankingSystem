import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateandcityService {

  constructor() { }

  state(){
    return[
      {
        stateId: 1,
        stateName: "TamilNadu"
      },
      {
        stateId: 2,
        stateName: "Kerala"
      }

    ]
}

city(){
    return[
      {
        cityId: 1,
        stateId: 1,
        cityName: "Madurai"
      },
      {
        cityId: 2,
        stateId: 1,
        cityName: "Chennai"
      },
      {
        cityId: 3,
        stateId: 2,
        cityName: "Kochin"
      },
      {
        cityId: 4,
        stateId: 2,
        cityName: "Thiruvandrum"
      }
    ]
}

branch(){
  return[
    {
      cityId: 1,
      branchName: "Melur"
    },
    {
      cityId: 1,
      branchName: "Sellur"
    },
    {
      cityId: 2,
      branchName: "Madhavaram"
    },
    {
      cityId: 2,
      branchName: "Guindy"
    },
    {
      cityId: 3,
      branchName: "Kochin - 1"
    },
    {
      cityId: 3,
      branchName: "Kochin - 2"
    },
    {
      cityId: 4,
      branchName: "Thiruvandrum - 1"
    },
    {
      cityId: 4,
      branchName: "Thiruvandrum - 2"
    },
    
  ]
}

}
