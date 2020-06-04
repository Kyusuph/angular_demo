import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: { id: number, name: string, status: string };
  allowEdit = false;

  constructor(
    private route: ActivatedRoute,
    private serversService: ServersService,
    private router: Router
    ) { }

  ngOnInit() {
    const id = +this.route.snapshot.params.id;
    this.server = this.serversService.getServer(id);
    this.route.params.subscribe((params) => {
      this.server = this.serversService.getServer(+params?.id);
    });
    this.route.snapshot.queryParams.subscribe((qParams) => {
      console.log(qParams);
      this.allowEdit = qParams.edit;
      console.log(this.allowEdit);
    });
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

}
