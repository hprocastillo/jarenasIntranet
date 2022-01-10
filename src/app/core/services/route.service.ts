import {Injectable} from '@angular/core';
import {City, Route, Trip} from "../interfaces/route";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  //COLLECTIONS
  citiesCollection: AngularFirestoreCollection<City>;
  routesCollection: AngularFirestoreCollection<Route>;
  tripsCollection: AngularFirestoreCollection<Trip>;

  constructor(private readonly afs: AngularFirestore) {
    this.routesCollection = afs.collection<Route>('routes', ref => ref
      .orderBy('createdAt', 'desc'));
    this.citiesCollection = afs.collection<City>('cities', ref => ref
      .orderBy('createdAt', 'desc'));
    this.tripsCollection = afs.collection<Trip>('trips', ref => ref
      .orderBy('createdAt', 'desc'));
  }

  //ROUTES SERVICES
  getRoutes() {
    return this.routesCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Route;
      const id = a.payload.doc.id;
      return {id, ...data};
    })));
  }

  getRouteById(id: string) {
    return this.afs.collection<Route>('routes').doc(id).valueChanges();
  }

  saveRoute(route: Route, routeId: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = routeId || this.afs.createId();
        const data = {id, ...route};
        const result = await this.routesCollection.doc(id).set(data);
        resolve(result);
      } catch (message) {
        reject(message);
      }
    });
  }

  updateRoute(route: Route, routeId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = routeId;
        const data = {id, ...route};
        const result = await this.routesCollection.doc(id).update(data);
        resolve(result);
      } catch (message) {
        reject(message);
      }
    });
  }

  deleteRoute(routeId: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.routesCollection.doc(routeId).delete();
        resolve(result);
      } catch (message) {
        reject(message);
      }
    });
  }

  //CITIES SERVICES
  getCities() {
    return this.citiesCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data() as City;
      const id = a.payload.doc.id;
      return {id, ...data};
    })));
  }

  getCityById(id: string) {
    return this.afs.collection<City>('cities').doc(id).valueChanges();
  }

  saveCity(city: City, cityId: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = cityId || this.afs.createId();
        const data = {id, ...city};
        const result = await this.citiesCollection.doc(id).set(data);
        resolve(result);
      } catch (message) {
        reject(message);
      }
    });
  }

  updateCity(city: City, cityId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = cityId;
        const data = {id, ...city};
        const result = await this.citiesCollection.doc(id).update(data);
        resolve(result);
      } catch (message) {
        reject(message);
      }
    });
  }

  deleteCity(cityId: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.citiesCollection.doc(cityId).delete();
        resolve(result);
      } catch (message) {
        reject(message);
      }
    });
  }

  //TRIPS SERVICES
  getTrips() {
    return this.tripsCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Trip;
      const id = a.payload.doc.id;
      return {id, ...data};
    })));
  }

  getTripById(id: string) {
    return this.afs.collection<Trip>('trips').doc(id).valueChanges();
  }

  saveTrip(trip: Trip, tripId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = tripId || this.afs.createId();
        const data = {id, ...trip};
        const result = await this.tripsCollection.doc(id).set(data);
        resolve(result);
      } catch (message) {
        reject(message);
      }
    });
  }

  updateTrip(trip: Trip, tripId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = tripId;
        const data = {id, ...trip};
        const result = await this.tripsCollection.doc(id).update(data);
        resolve(result);
      } catch (message) {
        reject(message);
      }
    });
  }

  deleteTrip(tripId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.tripsCollection.doc(tripId).delete();
        resolve(result);
      } catch (message) {
        reject(message);
      }
    });
  }
}
