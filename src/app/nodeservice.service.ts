import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TreeNode } from 'primeng/api';

@Injectable()
export class NodeService {
  constructor(private http: HttpClient) {}

  getFiles() {
    return this.http.get<any>('assets/file-api.json');
  }
  getFilesById() {
    return this.http.get<any>('assets/file-api-by-id.json');
  }
  getLazyFiles() {
    return this.http
      .get<any>('assets/files-lazy.json')
      .toPromise()
      .then((res) => <any[]>res.data);
  }
}
