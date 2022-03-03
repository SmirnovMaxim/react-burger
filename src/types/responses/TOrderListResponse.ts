import {OrderStatuses} from '../../enums';

export type TOrder = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  owner?: string;
  status: keyof typeof OrderStatuses;
  updatedAt: string;
  _v?: number;
  _id: string;
}

export type TOrderListResponse = {
  orders: TOrder[];
  success: boolean;
  total: number;
  totalToday: number;
}

