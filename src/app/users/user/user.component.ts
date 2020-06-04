import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: { id: number, name: string };

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.user = {
        id: params?.id,
        name: params?.name
      };
    });

    this.route.queryParams.subscribe((qParams) => {
      console.log(qParams);
    });

    this.route.fragment.subscribe((frag) => {
      console.log({frag});
    });
  }

}
