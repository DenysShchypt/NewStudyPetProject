import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { WatchList } from '../../watch-list/models/watchList.model';
@Table
export class User extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  password: string;

  @HasMany(() => WatchList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  watchList: WatchList[];
}
