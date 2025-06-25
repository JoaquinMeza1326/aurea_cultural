import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T extends Record<string, any>> {
  @Input() data: T[] = [];
  @Input() columns: { field: string; header: string }[] = [];
  @Input() showActions: boolean = true;
  @Input() showSearch: boolean = true;
  @Input() showPaginate: boolean = true;
  @Input() showSelect: boolean = false;

  @Output() editEventHandler = new EventEmitter<number>();
  @Output() deleteEventHandler = new EventEmitter<number>();

  constructor(private dialog: MatDialog) {}

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [];

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  ngOnChanges() {
    this.dataSource.data = this.data;

    if (this.showActions && !this.displayedColumns.includes('acciones')) {
      this.displayedColumns.push('acciones');
    }

    if (this.showSelect && !this.displayedColumns.includes('select')) {
      this.displayedColumns.push('select');
    }


    if (this.paginator) this.dataSource.paginator = this.paginator;
    if (this.sort) this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map((x) => x.field);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
  }

  edit(id: number) {
    this.editEventHandler.emit(id);
  }

  delete(id: number) {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: { message: '¿Estás seguro de eliminar este item?' },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deleteEventHandler.emit(id);
      }
    });
  }
}
