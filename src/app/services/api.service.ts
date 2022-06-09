import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../entities/topglove.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private ProductQualityApi = '';
  private ProductApi = 'Product';
  private FileApi = 'Fileupload';
  private CustomerApi = 'Customer';

  constructor(private http: HttpClient) {

  }

  getCustomerApiUrl = (endpoint: string) => {
    return `${environment.baseURL}/${this.CustomerApi}/${endpoint}`;
  }

  getProductApiUrl = (endpoint: string) => {
    return `${environment.baseURL}/${this.ProductQualityApi}/${endpoint}`;
  }
  FileApiUrl = (endpoint: string) => {
    return `${environment.baseURL}/${this.FileApi}/${endpoint}`;
  }


  // getProductApi = (endpoint: string) => {
  //   return `${environment.baseURL}/${this.ProductApi}/${endpoint}`;
  // }

  getUserApiUrl = (endpoint: string) => {
    return `${environment.baseURL}/${this.ProductApi}/${endpoint}`;
  }

  getProductDetails() {
    const url = this.getUserApiUrl('Allproducts')
    return this.http.get(url);
  }

  getCustomerDetails() {
    const url = this.getCustomerApiUrl('AllCustomers')
    return this.http.get(url);
  }
  // getProductDetails() {
  //   const url = this.getUserApiUrl('Allproducts')
  //   return this.http.get(url);
  // }
  insertEntity = (params: any): Observable<any> => {
    const url = this.getUserApiUrl('AddNewProduct');
    return this.http.post(url, params);
  }

  insertProduct = (params: any): Observable<any> => {
    const url = this.getUserApiUrl('AddNewProduct');
    return this.http.post(url, params);
  }
  updateProduct = (params: any): Observable<any> => {
    const url = this.getUserApiUrl('UpdateProduct');
    return this.http.put(url, params);
  } 
  deleteProduct = (params: number): Observable<any> => {
    const url = this.getCustomerApiUrl('DeleteProduct?productId=');
    return this.http.delete(url + params);
  }

  fileUpload = (params: any) : Observable<any> => {
    const url = this.FileApiUrl('Upload');
    return this.http.post(url, params);
  }





  doLogin = (params: any): Observable<any> => {
    const url = this.getUserApiUrl('login');
    return this.http.post(url, params);
  }


  insertCustomer = (params: any): Observable<any> => {
    const url = this.getCustomerApiUrl('AddNewCustomer');
    return this.http.post(url, params);
  }

  updateCustomer = (params: any): Observable<any> => {
    const url = this.getCustomerApiUrl('UpdateCustomer');
    return this.http.put(url, params);
  }
  deleteCustomer = (params: number): Observable<any> => {
    const url = this.getCustomerApiUrl('DeleteCustomer?customerId=');
    return this.http.delete(url + params);
  }



  logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('isSuperUser');
    localStorage.removeItem('workStation');
  }

  // insertEntity = (params: any): Observable<any> => {
  //   const url = this.getProductApiUrl('AddNewProduct');
  //   return this.http.post(url, params);
  // }

  updateEntity = (params: any): Observable<any> => {
    const url = this.getProductApiUrl('Update');
    return this.http.post(url, params);
  }

  loadRecentSerialNo = (user: string): Observable<any> => {
    const endpoint = `GetMaxCount?user=${user}`;
    const url = this.getProductApiUrl(endpoint);
    return this.http.get(url);
  }

  loadAllEntity = (params: any): Observable<Array<any>> => {
    const url = this.getProductApiUrl('FilteredItems');
    return this.http.post<Array<any>>(url, params);
  }

  loadAllPREntity = (params: any): Observable<Array<any>> => {
    const url = this.getProductApiUrl('GetPassingRate');
    return this.http.post<Array<any>>(url, params);
  }

  getExcelReport = (params: any): Observable<HttpResponse<ArrayBuffer>> => {
    const url = this.getProductApiUrl('GenerateExcel');
    return this.http.post(url, params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/octet-stream',
        'Accept': 'application/octet-stream',
      }),
      observe: 'response',
      responseType: 'arraybuffer'
    });
  }

  getPassingRateExcelReport = (params: any): Observable<HttpResponse<ArrayBuffer>> => {
    const url = this.getProductApiUrl('GetPassingRateExcel');
    return this.http.post(url, params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/octet-stream',
        'Accept': 'application/octet-stream',
      }),
      observe: 'response',
      responseType: 'arraybuffer'
    });
  }
}
