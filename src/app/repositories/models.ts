import {Model} from '../models/model';

export interface WAPacket<T extends Model |Model[], K = any> {
  data: T;
  meta: K;
}
