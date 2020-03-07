import {AfterViewInit, OnInit, Component} from '@angular/core';
import {GridOptions} from 'ag-grid/main';
import {DetailUser} from '../../core/models/detail.user';

import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'my-home-app',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit {

    public gridOptions: GridOptions;

    public cellValue?: string;

    constructor(private _modalService: NgbModal,
                private _mdalConfig: NgbModalConfig) {
        // customize default values of modals used by this component tree
        this._mdalConfig.backdrop = 'static';
        this._mdalConfig.keyboard = false;


        this.gridOptions = {} as GridOptions ;
        this.gridOptions.columnDefs = this.createColumnDefs();

    }

    // Sometimes the gridReady event can fire before the angular component is ready to receive it,
    // so in an angular environment its safer to on you cannot safely rely
    // on AfterViewInit instead before using the API
    public ngAfterViewInit(): void {
    }

    public ngOnInit() : void {
        // this.callServerForProcessingIds();
    }



    // one grid initialisation, grab the APIs and auto resize the columns to fit the available space
    public onGridReady(params: any): void {
      const users: DetailUser[] = [];
      users.push(new DetailUser(1, 2));
      users.push(new DetailUser(1, 2));
      users.push(new DetailUser(1, 2));
      users.push(new DetailUser(1, 2));
            this.gridOptions.api!.setRowData(users);
            this.autoSizeAll();

    }


    public onRowDoubleClicked(event: any):void {
        const rowId: number = event.data.id;
        console.log('selected row event.data: ' + event.data.id);
        this.openModal(rowId);
    }

    public onRowSelected(event: any): void {
      console.log(event);
    }


    public onCellSelected(event: any):void {
        // let newRecordToUpdate = event.data;
        const filterModel: any = this.gridOptions.api!.getFilterModel();
        console.log(filterModel.firstName);
        if(filterModel.firstName) {
            if(filterModel.firstName.condition3 === undefined) {
                filterModel.firstName.condition3 = {
                    type: 'contains',
                    filter: 'done',
                    filterType: 'text'
                };
                 filterModel.firstName.operator = 'OR';
            }
            this.gridOptions.api!.setFilterModel(filterModel);
        }
        console.log(filterModel.firstName);
        this.cellValue = event.value;
    }

    public setDataById():void {
        const ids: number[] = this.getselectedIds();
        const itemsToUpdate: any = [];

        this.gridOptions.api!.forEachNode(function (rowNode: any) {
            let data = rowNode.data;


            if (ids.some((x) => x === data.id)) {
                data.id = 11;
                itemsToUpdate.push(data);
            }
        });

        this.gridOptions.api!.updateRowData({update: itemsToUpdate});
    }

    private getselectedIds(): number[] {
      const ides: number[] = [];
      const selectedNode: any = this.gridOptions.api!.getSelectedRows();
        for (let i = 0; i < selectedNode.length; i++) {
            ides.push(selectedNode[i].id);
        }
        return ides;

    }


    private openModal(rowId: number):void {
        // const modalRef = this.modalService.open(ModalComponent);

    }

    private autoSizeAll():void {
        var allColumnIds: any = [];
        this.gridOptions.columnApi!.getAllColumns().forEach(function (column) {
            allColumnIds.push(column.getColId());
        });
        this.gridOptions.columnApi!.autoSizeColumns(allColumnIds);
    }

    private createColumnDefs():any[] {
        return [
            {
                headerName: '', checkboxSelection: true,
                field: 'id',
                cellRenderer: 'loadingCellRenderer'
            },
            {
                headerName: 'Id', field: 'id'
            },
            {headerName: 'User name', field: 'username',
                filter: 'statusFilterComponent'
            },
            {
                headerName: 'First Name', field: 'firstName',
                cellClassRules: {
                    'rag-green-outer': function (params: any)  {
                        return params.value === 'DONE';
                    },
                    'rag-blue-outer': function (params: any)  {
                        return params.value === 'READY';
                    },
                    'rag-red-outer': function (params: any)  {
                        return params.value === 'ERROR';
                    },
                    'rag-light-outer': function (params: any)  {
                        return params.value === 'WAITING';
                    },
                    'rag-cyan-outer': function (params: any)  {
                        return params.value === 'IN_PROGRESS';
                    },
                    'rag-black-outer': function (params: any)  {
                        return params.value === 'DELETED';
                    },
                    'rag-yello-outer': function (params: any)  {
                        return params.value === 'OUT_SCOPED';
                    }
                },
                cellRenderer: function (params: any) {
                    return '<span class="rag-element">' + params.value + '</span>';
                }
            },
            {headerName: 'Last Name', field: 'lastName'},
            {headerName: 'col 1', field: 'fiel1'},
            {headerName: 'col 2', field: 'fiel2'},
            {headerName: 'col 3', field: 'fiel3'},
            {headerName: 'col 4', field: 'fiel4'},
            {headerName: 'col 5', field: 'fiel5'},
            {headerName: 'col 6', field: 'fiel6'},
            {headerName: 'col 7', field: 'fiel7'},
            {headerName: 'col 8', field: 'fiel8'},
            {headerName: 'col 9', field: 'fiel9'},
            {headerName: 'col 10', field: 'fiel10'},
            {headerName: 'col 11', field: 'fiel11'},
            {headerName: 'col 12', field: 'fiel12'},
            {headerName: 'col 13', field: 'fiel13'},
            {headerName: 'col 14', field: 'fiel14'},
            {headerName: 'col 15', field: 'fiel15'},
            {headerName: 'col 16', field: 'fiel16'},
            {headerName: 'col 17', field: 'fiel17'},
            {headerName: 'col 18', field: 'fiel18'},
            {headerName: 'col 19', field: 'fiel19'},
            {headerName: 'col 20', field: 'fiel20'},
            {headerName: 'col 21', field: 'fiel21'},
            {headerName: 'col 22', field: 'fiel22'},
            {headerName: 'col 23', field: 'fiel23'},
            {headerName: 'col 24', field: 'fiel24'},
            {headerName: 'col 25', field: 'fiel25'},
            {headerName: 'col 26', field: 'fiel26'},
            {headerName: 'col 27', field: 'fiel27'},
            {headerName: 'col 28', field: 'fiel28'},
            {headerName: 'col 29', field: 'fiel29'},
            {headerName: 'col 30', field: 'fiel30'}
        ];
    }

}
