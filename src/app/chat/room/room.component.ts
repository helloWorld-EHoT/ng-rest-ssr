import {Component, OnInit} from '@angular/core';
import {PrettyPrintPipe} from '../../shared/pipes/pretty-print.pipe';

@Component({
    selector: 'benamix-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.scss', '../rooms.general.scss'],
    providers: [PrettyPrintPipe]
})
export class RoomComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
