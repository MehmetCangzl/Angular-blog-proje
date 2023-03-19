import { Injectable } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { CoreService } from './core.service';
import { LoadOptions } from './loadoptions.model';

@Injectable({
  providedIn: 'root'
})
export class CustomDataSourceService {
  store: any = {};
  cache: boolean = false;
  constructor(
    private coreService: CoreService) {
  }

  loadMode(mode: string): CustomDataSourceService {
    this.store.loadMode = mode;
    return this;
  }

  setKey(key: string): CustomDataSourceService {
    this.store.key = key;
    return this;
  }
  setArrayKey(key: Array<string>): CustomDataSourceService {
    this.store.key = key;
    return this;
  }
  isCache(cache?: boolean): CustomDataSourceService {
    if (cache === undefined) {
      this.cache = true;
    } else {
      this.cache = cache;
    }
    return this;
  }

  filter(a: any): CustomDataSourceService {
    let me = this;
    me.store.filter = function (a: any) {

    };
    return me;
  }

  load(message: string, extraParam?: any): CustomDataSourceService {
    let me = this;
    me.store.load = async (loadOptions: any) => {
      let request: any = new LoadOptions(loadOptions);
      if (extraParam !== undefined) {
        let keys = Object.getOwnPropertyNames(extraParam);
        keys.forEach((element: any) => {
          request[element] = extraParam[element]
        });
      }
      const data = await me.coreService.getCall(message, request);
      return data;
    };
    return me;
  }

  group(field: string): CustomDataSourceService {
    let me = this;
    me.store.group = field;
    return me;
  }

  loadDatas(message: string, extraParam?: any): CustomDataSourceService {
    let me = this;
    me.store.load = async function (loadOptions: any) {
      const data = await me.coreService.getCall(message, extraParam);
      return data;
    };
    return me;
  }

  insert(message: string, extraParam?: any): CustomDataSourceService {
    var me = this;
    me.store.insert = (values: any) => {
      if (extraParam !== undefined) {
        var keys = Object.getOwnPropertyNames(extraParam);
        keys.forEach(element => {
          values[element] = extraParam[element]
        });
      }
      return me.coreService.postCall(message, values);
    };
    return me;
  }
  update(message: string, keyPropName?: string, extraParam?: any): CustomDataSourceService {
    var me = this;
    me.store.update = (key: any, values: any) => {
      let put = message + "/" + key;
      var myJSON = JSON.stringify(values);
      let request: any = {
        values: myJSON
      };
      if (extraParam !== undefined) {
        var keys = Object.getOwnPropertyNames(extraParam);
        keys.forEach(element => {
          request[element] = extraParam[element]
        });
      }

      if (!keyPropName) {
        keyPropName = keyPropName ?? '';
        request[keyPropName] = key;
      }
      return me.coreService.putCall(put, request);
    };
    return me;
  }

  updateFullModel(message: string, keyPropName?: string, extraParam?: any): CustomDataSourceService {
    var me = this;
    me.store.update = (key: any, values: any) => {
      let put = message;
      if (typeof key === 'object') {
        var keys = Object.getOwnPropertyNames(key).sort();
        if (keys.length > 0) {
          keys.forEach(element => {
            var value = key[element];
            put += `/${value}`;
          });
        }
      } else {
        put = put + "/" + key;
      }
      var request = values;
      if (extraParam !== undefined) {
        var keys = Object.getOwnPropertyNames(extraParam);
        keys.forEach(element => {
          request[element] = extraParam[element]
        });
      }
      if (keyPropName !== undefined) {
        request[keyPropName] = key;
      }
      return me.coreService.putCall(put, request);
    };
    return me;
  }

  remove(message: string): CustomDataSourceService {
    var me = this;
    me.store.remove = (key: any) => {
      var del = message;
      if (typeof key === 'object') {
        var keys = Object.getOwnPropertyNames(key).sort();
        if (keys.length > 0) {
          keys.forEach(element => {
            var value = key[element];
            del += `/${value}`;
          });
        }
      } else {
        del += "/" + key;
      }
      return me.coreService.deleteCall(del);
    };
    return me;
  }
  byKey(message: string, extraParam?: any): CustomDataSourceService {
    var me = this;
    me.store.byKey = (key: any) => {
      let request: any = {};
      if (extraParam !== undefined) {
        var keys = Object.getOwnPropertyNames(extraParam);
        keys.forEach(element => {
          request[element] = extraParam[element]
        });
      }
      return me.coreService.getCall(message + '/' + key, request);
    };
    return me;
  }

  build = () => {
    return new CustomStore(this.store);
  }

  buildSource(groupField: string, pageSize?: number) {
    let ds = new DataSource({
      loadMode: 'raw',
      pageSize: pageSize || 10,
      paginate: true,
      group: groupField,
      store: new CustomStore(this.store),
    });
    return ds;
  }
}
