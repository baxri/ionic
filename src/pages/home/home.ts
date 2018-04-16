import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: any[];
  invoices: any[];
  public database: SQLiteObject;

  constructor(public navCtrl: NavController, public sqlite: SQLite) {
    
    this.items = [];
    

    for( let i=0; i <10; i++ ){
      this.items.push({
        text: 'Item' + i,
        id: i,
      });
    }

  }

  itemSelected(item){
    this.navCtrl.push(DetailPage, {
      item: item
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');

    this.sqlite.create({name: "data.db", location: "default"}).then((db: SQLiteObject) => {      
        this.database = db;

        this.database.executeSql("SELECT * FROM invoices", []).then((data) => {
            this.invoices = [];
            if(data.rows.length > 0) {
                for(var i = 0 ; i < data.rows.length ; i++) {
                    this.invoices.push({ name: data.rows.item(i).name });
                }
            }

            console.log(this.invoices);

        }, (error) => {
            console.log("ERROR: " + JSON.stringify(error));
        });    
         
      }, (error) => {
          console.log("ERROR: ", error);
    });    

  }


}
