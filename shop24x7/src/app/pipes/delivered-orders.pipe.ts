import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deliveredOrders',
  pure: false
})
export class DeliveredOrdersPipe implements PipeTransform {

  transform(value: any): any {
    if (!value) {
      return
    }
    console.log (value)
    const filtered = value.filter((order : any) => {
      return order.delivered==true;
    })
    return filtered


  }

}
