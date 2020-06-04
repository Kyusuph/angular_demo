import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  servers: {id: number, name: string, status: string}[] = [];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private serversService: ServersService
    ) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  // onReload() {
  //   this.router.navigate(['/servers'],
  //     {
  //       relativeTo: this.activeRoute,
  //       queryParams: {delete: 2, edit: 2},
  //       fragment: 'deleting'
  //     }
  //   );
  // }

}