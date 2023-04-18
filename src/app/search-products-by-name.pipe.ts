import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchProductsByName'
})
export class SearchProductsByNamePipe implements PipeTransform {

  transform(products:any , searchTerm:string): any {

    return products.filter((product:any) => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
    
  };

}
