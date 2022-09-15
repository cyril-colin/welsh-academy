import {Model} from '../models/model';

export interface WAPacket<T extends Model |Model[]> {
  data: T;
  meta: any;
}
