import { Component, OnInit } from '@angular/core';

/**
 * Component that works as the main layout of this application. Holds the header, footer and 
 * route rendering of: collaborators, documents, access-requests and tags.
 */
@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {


  /**
   * The state of the sidebar.
   */
  sideBarOpen = true;

  /**@ignore */
  constructor() { }

  /**@ignore */
  ngOnInit(): void {
  }

  /**
   * Toggle the sidebar of the application.
   */
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
