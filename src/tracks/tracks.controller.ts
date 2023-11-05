import {Body, Controller, Get, Post} from "@nestjs/common"

import {TrackService} from "./tracks.service"
import {CreateTrackDto} from "./dto/create.track.dto"

@Controller("tracks")
export class TracksController {

    constructor(private trackService: TrackService) {}
    @Post()
    createTrack(@Body() dto: CreateTrackDto) {
       return this.trackService.createTrack(dto)
    }

    @Get()
    getAllTracks() {
        return this.trackService.getTracks()
    }
}
