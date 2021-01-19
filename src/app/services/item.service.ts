import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/items';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  url:string = 'http://localhost:3001/items';
  httpOptions={
    headers: {
      'Content-Type': 'application/json'
    }
  };
  items:Item[]=[ 
    {
      id: 0,
      title: 'manzana',
      price: 1.50,
      quantity: 4,
      completed: false
    },
    {
      id: 1,
      title: 'pan',
      price: 8.50,
      quantity: 8,
      completed: true
    },
    {
      id: 2,
      title: 'camiseta',
      price: 42,
      quantity: 1,
      completed: false
    }
    ];

  constructor(private http:HttpClient) { }

  getItems():Observable<Item[]>{
    //objeto estatico en el front
    //return this.items

    //Objeto observable en nuestro back local 3001
    return this.http.get<Item[]>(this.url);
  }

  //añadir
  addItem(item: Item):Observable<Item>{
    //objeto mockeado en el front
    //this.items.unshift(item);

    return this.http.post<Item>(this.url, item, this.httpOptions)
  }

  //actualizar
  toggleItem(item:Item):Observable<Item>{
    return this.http.put<Item>(this.url + item.id, item, this.httpOptions);
  }

  //eliminar
  deleteItem(item:Item):Observable<Item>{
    return this.http.delete<Item>(this.url + item.id);
  }
}
