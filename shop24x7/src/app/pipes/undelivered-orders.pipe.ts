import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'undeliveredOrders',
  pure: false
})
export class UndeliveredOrdersPipe implements PipeTransform {

  transform(value: any): any {
    if (!value) {
      return
    }
    const filtered = value.filter((order : any) => {
      return order.delivered==false;
    })
    return filtered


  }

}
