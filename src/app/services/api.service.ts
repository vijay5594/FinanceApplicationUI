import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../entities/topglove.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private LoginApi='Login';
  private ProductApi = 'Product';
  private CustomerApi = 'Customer';
  private FileApi = 'Fileupload';
  private ProductCustomerApi='ProductCustomer';
  private PaymentApi='Payment';
  constructor(private http: HttpClient) {

  }
  LoginApiUrl = (endpoint: string) => {
    return `${environment.baseURL}/${this.LoginApi}/${endpoint}`;
  }
  getProductApiUrl = (endpoint: string) => {
    return `${environment.baseURL}/${this.ProductApi}/${endpoint}`;
  }
  getCustomerApiUrl = (endpoint: string) => {
    return `${environment.baseURL}/${this.CustomerApi}/${endpoint}`;
  }
  FileApiUrl = (endpoint: string) => {
    return `${environment.baseURL}/${this.FileApi}/${endpoint}`;
  }
  getProductCustomerApiUrl = (endpoint: string) => {
    return `${environment.baseURL}/${this.ProductCustomerApi}/${endpoint}`;
  }
  getPaymentApiUrl = (endpoint: string) => {
    return `${environment.baseURL}/${this.PaymentApi}/${endpoint}`;
  }
  doLogin = (params: any): Observable<any> => {
    const url = this.LoginApiUrl('GetLogin');
    return this.http.post(url, params);
  }
  addUser = (params: any): Observable<any> => {
    const url = this.LoginApiUrl('AddUser');
    return this.http.post(url, params);
  }
  getProductDetails() {
    const url = this.getProductApiUrl('Allproducts')
    return this.http.get(url);
  }
  insertProduct = (params: any): Observable<any> => {
    const url = this.getProductApiUrl('AddNewProduct');
    return this.http.post(url, params);
  }
  updateProduct = (params: any): Observable<any> => {
    const url = this.getProductApiUrl('UpdateProduct');
    return this.http.put(url, params);
  } 
  deleteProduct = (params: number): Observable<any> => {
    const url = this.getProductApiUrl('DeleteProduct?productId=');
    return this.http.delete(url + params);
  }
  getCustomerDetails() {
    const url = this.getCustomerApiUrl('AllCustomers')
    return this.http.get(url);
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
  fileUpload = (params: any) : Observable<any> => {
    const url = this.FileApiUrl('Upload');
    return this.http.post(url, params);
  }
  insertProductCustomer = (params: any): Observable<any> => {
    const url = this.getProductCustomerApiUrl('AddProductCustomerdetails');
    return this.http.post(url, params);
  }
  insertPayment = (params: any): Observable<any> => {
    const url = this.getPaymentApiUrl('PaymentDetails');
    return this.http.post(url, params);
  }
}
