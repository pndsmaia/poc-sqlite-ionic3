import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

  constructor(
    private sqlite: SQLite
  ) {
    console.log('Hello DatabaseTsProvider Provider');
  }

  public getDB() {
    return this.sqlite.create({
      name: 'users.db',
      location: 'default'
    })
  }

  public createDB() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        this.createTables(db);
        this.insertDefaultItems(db);
      })
      .catch(error => console.log(error))
  }

  private createTables(db: SQLiteObject) {
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS users (id integer primary key AUTOINCREMENT NOT NULL, name TEXT, lastName TEXT)']
    ]).then(() => (console.log("Tabelas criadas"))
    ).catch(error => console.log("Erro ao criar as tabelas"));
  }

  private insertDefaultItems(db: SQLiteObject) {
    db.executeSql('select COUNT(id) as qtd from users')
      .then((data: any) => {
        // //Se não existe nenhuma tabela.
        // if (data.rows.item(0).qtd == 0) {
        //   //Criar Tabelas.
        //   db.sqlBatch([
        //     ['insert into users (name) values (?)',]
        //   ])
        // }
      }).catch();
  }

}
