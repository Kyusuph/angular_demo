import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;

  constructor(private router: Router, private route: ActivatedRoute, private serversService: ServersService) { }

  ngOnInit() {
    const id = +this.route.snapshot.params.id;
    this.server = this.serversService.getServer(id);
    this.route.params.subscribe((params) => {
      this.server = this.serversService.getServer(+params?.id);
    });
    this.route.queryParams.subscribe((qParams) => {
      this.allowEdit = qParams.edit === '1' ? true : false;
    });
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, { name: this.serverName, status: this.serverStatus });
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
