import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { UserService } from 'src/app/service/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  displayedColumns: string[] = ['name','email','contactNumber','status'];
  dataSource:any;
  responseMessage:any;

  constructor(private ngxSerive:NgxUiLoaderService,
    private userService:UserService,
    private snackbarService:SnackbarService) { }

  ngOnInit(): void {
    this.ngxSerive.start();
    this.tableData();
  }

  tableData(){
    this.userService.getUsers().subscribe((response:any)=>{
      this.ngxSerive.stop();
      this.dataSource = new MatTableDataSource(response);
    },(error:any)=>{
      this.ngxSerive.stop();
      console.log(error);
      if(error.error?.message){
        this,this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onChange(status:any,id:any){
    this.ngxSerive.start();
    var data = {
      status: status.toString(),
      id:id
    }

    this.userService.update(data).subscribe((response:any)=>{
      this.ngxSerive.stop();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error:any)=>{
      this.ngxSerive.stop();
      console.log(error);
      if(error.error?.message){
        this,this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

}
