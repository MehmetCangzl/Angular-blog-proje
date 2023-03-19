import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  toastrOption = {
    closeButton: true,
    enabledHtml: false
  };
  constructor(
    private httpClient: HttpClient,
    public snackBar: ToastrService
  ) {
  }

  toHttpParams(params: any) {
    return Object.getOwnPropertyNames(params)
      .filter(x => params[x] !== undefined)
      .reduce((p, key) => p.set(key, params[key]), new HttpParams());
  }

  async getCall(message: string, params?: Object): Promise<any> {
    let options: any = { responseType: 'json' };
    if (params) {
      const request = this.toHttpParams(params);
      options['params'] = request;
    }
    let urlMessage = `${environment.apiUrl}/${message}`;
    return this.httpClient
      .get(urlMessage, options)
      .toPromise()
      .then(this.successHandler.bind(this))
      .catch(this.errorHandler.bind(this));
  }

  getCallObservable(message: string, params?: Object): Observable<any> {
    let options: any = { responseType: 'json' };
    if (params) {
      const request = this.toHttpParams(params);
      options['params'] = request;
    }
    let urlMessage = `${environment.apiUrl}/${message}`;
    this.httpClient
    return this.httpClient.get(urlMessage, options);
  }

  async postCall(message: string, params?: any): Promise<any> {
    let urlMessage = `${environment.apiUrl}/${message}`;
    return this.httpClient
      .post(urlMessage, params, { responseType: 'json' })
      .toPromise()
      .then(this.saveSuccessHandler.bind(this))
      .catch(this.errorHandler.bind(this));
  }

  async postCallWithoutToast(message: string, params?: any): Promise<any> {
    let urlMessage = `${environment.apiUrl}/${message}`;
    return this.httpClient
      .post(urlMessage, params, { responseType: 'json' })
      .toPromise();
  }

  postCallObservable(message: string, params?: any): Observable<any> {
    let urlMessage = `${environment.apiUrl}/${message}`;
    return this.httpClient.post(urlMessage, params, { responseType: 'json' });
  }

  async putCall(message: string, params?: any): Promise<any> {
    let urlMessage = `${environment.apiUrl}/${message}`;
    return this.httpClient
      .put(urlMessage, params, {})
      .toPromise()
      .then(this.saveSuccessHandler.bind(this))
      .catch(this.errorHandler.bind(this));
  }


  async deleteCall(message: string, params?: any): Promise<any> {
    let request = new HttpParams();
    if (params) {

      var props = Object.getOwnPropertyNames(params);
      props.forEach(x => {
        var value = params[x];
        if (value !== undefined) {
          request.set(x, value);
        }
      });
    }

    let urlMessage = `${environment.apiUrl}/${message}`;
    return this.httpClient
      .delete(urlMessage, { params: request })
      .toPromise()
      .then(this.successHandler.bind(this))
      .catch(this.errorHandler.bind(this));
  }


  public RefreshToken(request: any): Observable<any> {
    let message = `Auth/RefreshToken`;
    return this.postCallObservable(message, request);
  }

  private saveSuccessHandler(res: any) {
    if (res.message === undefined || res.message === '') {
      this.snackBar.success('İşlem Başarılı!', undefined, this.toastrOption);
    }
    return res;
  }

  private successHandler(res: any) {
    return res;
  }
  private errorHandler(res: any) {
    if (res.status) {
      if (res.status === 404) {
        this.snackBar.error(`${res.status}: Geçersiz istek!`, 'x', this.toastrOption);
        return;
      }
      if (res.status === 403) {
        this.snackBar.error(`${res.status}: Not permitted!`, 'x', this.toastrOption);
        return;
      }

      if (res.error) {
        var content = `<div> <span>${res.error.instance}</span> <p> ${res.error.message} </p></div>`;
        this.snackBar.error(content, '', {
          enableHtml: true
        });
      }
    }
  }
  private messageParse(errors: any): Promise<any[]> {
    let messages: any[] = [];
    var keys = Object.getOwnPropertyNames(errors);
    return new Promise((resolve, reject) => {
      if (keys.length > 0) {
        keys.forEach(element => {
          var item = errors[element];
          if (Array.isArray(item)) {
            item.forEach(m => {
              var message = `${m} `;
              messages.push(message);
            });
          } else {
            messages.push(item);
          }
        });
      }
      resolve(messages);
    });

  }
  public errorResponseHandler(errors: any): Promise<string> {
    return new Promise((resolve, reject) => {
      this.messageParse(errors).then((er: any[]) => {
        let message = '';
        er.forEach(x => {
          message += x;
        });
        resolve(message);
      });
    });
  }
}
