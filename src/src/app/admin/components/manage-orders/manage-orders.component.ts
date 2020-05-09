import { Component, OnInit } from '@angular/core';
import { OrderService } from 'shared/services/order/order.service';

@Component({
  selector: 'manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {

  orders$;

  constructor(private orderService: OrderService) { }

  async ngOnInit() {
    this.orders$ = await this.orderService.getAll();
  }

}
