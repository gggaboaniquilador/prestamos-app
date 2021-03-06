import { dashboardService } from './../dashboard-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export default class ClientesPage implements OnInit, OnDestroy {

  public clientes;

  public rla = this.router.url === '/dashboard/clientes'? false : true;

  event$;

  constructor(private dbService: dashboardService,
               private rutaActiva: ActivatedRoute,
               private router: Router) {
                this.event$=
                router.events
                    .subscribe(
                      (event) => {
                        if(event instanceof NavigationStart) {
                          console.log(event.url);
                          this.rla = event.url  === '/dashboard/clientes'? false : true;
                        }
                      });
              }


  ngOnInit() {
    this.getClientes();
  }

  ngOnDestroy() {
    this.event$.unsubscribe();
  }

  getClientes(){
    this.dbService.getAll('customer')
    .subscribe(resp=>{
       this.clientes = resp.clientes;
    });

 }
 onClick(){
  this.rla=true;
}
}
