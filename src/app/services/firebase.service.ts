import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
// AGREGAR IMPORT DE FIREBASE: FIRESTORE: //

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  // CREAR VARIABLE PRIVADA //
  constructor(private fireStore: AngularFirestore) { }

  // CRUD //
  agregar(coleccion: string, data: any)
  {
    try {
      this.fireStore.collection(coleccion).add(data);
    } catch (error) {
      console.log(error);
    }
  }

  eliminar(coleccion: string, id: string)
  {
    try {
      this.fireStore.collection(coleccion).doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  }

  modificar(coleccion: string, id: string, data: any)
  {
    try {
      this.fireStore.collection(coleccion).doc(id).set(data);
    } catch (error) {
      console.log(error);
    }
  }

  getDato(coleccion: string, id: string)
  {
    return this.fireStore.collection(coleccion).doc(id).get();
  }

  getDatos(coleccion: string)
  {
    return this.fireStore.collection(coleccion).snapshotChanges();
  }
}
