import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  item: any;
  public database: SQLiteObject;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite: SQLite) {
    this.item = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');

    this.sqlite.create({name: "data.db", location: "default"}).then((db: SQLiteObject) => {      
        this.database = db;

        this.database.executeSql('create table if not exists invoices(name VARCHAR(32))', {})
        .then(() => {
            console.log('Table Invoice created !');

              this.database.executeSql("INSERT INTO invoices (name) VALUES (?)", [this.item.text]).then((data) => {
                console.log("INSERTED: ");
                // this.counter++;
                // this.showInvoices();



                this.database.executeSql("SELECT * FROM invoices", []).then((data) => {
                  
                  console.log(data.rows.length);

                  if(data.rows.length > 0) {
                      for(var i = 0 ; i < data.rows.length ; i++) {
                          // this.invoices.push({ name: data.rows.item(i).name });
                          console.log(data.rows.item(i).name);
                      }
                  }
      
                  
      
              }, (error) => {
                  console.log("ERROR: " + JSON.stringify(error));
              });    



            }, (error) => {
                console.log("ERROR: " + JSON.stringify(error.err));
            });    

        })
        .catch(e => console.log(e));    


         
      }, (error) => {
          console.log("ERROR: ", error);
    });    

  }

}
