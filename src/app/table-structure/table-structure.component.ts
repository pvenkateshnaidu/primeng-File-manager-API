import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { Table } from 'primeng/table';
import { MenuItem, PrimeNGConfig, TreeNode } from 'primeng/api';
import { Customer, Representative } from '../customer';
import { CustomerService } from '../customerservice';
import { NodeService } from '../nodeservice.service';

@Component({
  selector: 'app-table-structure',
  templateUrl: './table-structure.component.html',
  styleUrls: ['./table-structure.component.css'],
})
export class TableStructureComponent implements OnInit {
  customers: Customer[];
  nodeChanges: any;
  items: MenuItem;
  listOfFiles: any[];
  home: MenuItem;
  contextMenuitems: MenuItem[];
  selectedFileFolder: any;
  cols: any[];
  constructor(
    private customerService: CustomerService,
    private primengConfig: PrimeNGConfig,
    private nodeService: NodeService
  ) {}

  onclickBreadCrumb(event) {
    this.nodeService.getFiles().subscribe((files) => {
      this.listOfFiles = files.childFileModelList;
      this.items = files.parentTree;
    });
  }
  ngOnInit() {
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.nodeService.getFiles().subscribe((files) => {
      this.listOfFiles = files.childFileModelList;
      this.items = files.parentTree;
    });

    this.cols = [
      { field: 'label', header: 'Name' },
      { field: 'size', header: 'Size' },
      { field: 'type', header: 'Type' },
    ];
    this.contextMenuitems = [
      {
        label: 'Download',
        icon: 'pi pi-fw pi-download',
        command: () => this.downLoadFunction(this.selectedFileFolder),
      },
    ];
  }
  downLoadFunction(selectedFileFolder: any) {}
  onRowSelect($event) {
    //selected File Details $event.data
    if ($event.data.isFile == false) {
      this.nodeService.getFilesById().subscribe((files) => {
        this.listOfFiles = files.childFileModelList;
        this.items = files.parentTree;
      });
    }
  }
}
