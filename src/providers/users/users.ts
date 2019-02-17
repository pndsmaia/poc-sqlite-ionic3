import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class UsersProvider {

  constructor(
    private dbProvider: DatabaseProvider
  ) { }
  public insert(user) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into users (name, lastName) values (?, ?)';
        let data = [user.name, user.lastName];

        return db.executeSql(sql, data)
          .catch((error) => {
            console.log(error);
          })
      }).catch((error) => {
        console.log(error);
      });
  }

  public update(user) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update medicines set name = ?, lastName = ? where id = ?';
        let data = [user.name, user.lastName, user.id];

        return db.executeSql(sql, data)
          .catch((error) => {
            console.log(error);
          })
      }).catch((error) => {
        console.log(error);
      });
  }

  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from users where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .catch((error) => {
            console.log(error);
          })
      }).catch((error) => {
        console.log(error);
      });
  }

  public getMedicine(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from users where id = ?';
        let data = [id];

        return db.executeSql(sql, data).then((data: any) => {
          if (data.rows.length > 0) {
            let item = data.rows.item(0);
            let user: any;
            user.id = item.id;
            user.name = item.name;
            user.lastName = item.lastName;
            return user;
          } else {
            return null;
          }
        }).catch((error) => {
          console.log(error);
        })
      }).catch((error) => {
        console.log(error);
      });
  }

  public getMedicineAll() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * from users';
        let data: any[];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              console.log(data.rows.length);

              let users: Array<any> = [];
              for (let i = 0; i < data.rows.length; i++) {
                let user = data.rows.item(i);
                users.push(user);
              }
              return users;
            } else {
              return [];
            }
          }).catch((error) => {
            console.log(error);
          })
      }).catch((error) => {
        console.log(error);
      });
  }
}
