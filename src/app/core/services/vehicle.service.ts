import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Brand, Vehicle} from "../interfaces/vehicle";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  //COLLECTION
  vehiclesCollection: AngularFirestoreCollection<Vehicle>;
  brandsCollection: AngularFirestoreCollection<Brand>;

  constructor(private readonly afs: AngularFirestore) {
    this.vehiclesCollection = afs.collection<Vehicle>('vehicles', ref => ref
      .orderBy('createdAt', 'desc'));
    this.brandsCollection = afs.collection<Brand>('brands', ref => ref
      .orderBy('createdAt', 'desc'));
  }

  //VEHICLES SERVICE
  getVehicles() {
    return this.vehiclesCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Vehicle;
      const id = a.payload.doc.id;
      return {id, ...data};
    })));
  }

  getVehicleById(id: string) {
    return this.afs.collection<Vehicle>('vehicles').doc(id).valueChanges();
  }

  saveVehicle(vehicle: Vehicle, vehicleId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = vehicleId || this.afs.createId();
        const data = {id, ...vehicle};
        const result = await this.vehiclesCollection.doc(id).set(data);
        resolve(result);
      } catch (message) {
        reject(message);
      }
    });
  }

  updateVehicle(vehicle: Vehicle, vehicleId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = vehicleId;
        const data = {id, ...vehicle};
        const result = await this.vehiclesCollection.doc(id).update(data);
        resolve(result);
      } catch (message) {
        reject(message);
      }
    });
  }

  deleteVehicle(vehicleId: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.vehiclesCollection.doc(vehicleId).delete();
        resolve(result);
      } catch (message) {
        reject(message);
      }
    });
  }

  //BRANDS SERVICE
  getBrands() {
    return this.brandsCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Brand;
      const id = a.payload.doc.id;
      return {id, ...data};
    })));
  }

  getBrandById(id: string) {
    return this.afs.collection<Brand>('brands').doc(id).valueChanges();
  }

  saveBrand(brand: Brand, brandId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = brandId || this.afs.createId();
        const data = {id, ...brand};
        const result = await this.brandsCollection.doc(id).set(data);
        resolve(result);
      } catch (message) {
        reject(message);
      }
    });
  }

  updateBrand(brand: Brand, brandId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = brandId;
        const data = {id, ...brand};
        const result = await this.brandsCollection.doc(id).update(data);
        resolve(result);
      } catch (message) {
        reject(message);
      }
    });
  }

  deleteBrand(brandId: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.brandsCollection.doc(brandId).delete();
        resolve(result);
      } catch (message) {
        reject(message);
      }
    });
  }
}
