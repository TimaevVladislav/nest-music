import {Body, Controller, Get, Param, Post} from "@nestjs/common"

import {TrackService} from "./tracks.service"
import {CreateTrackDto} from "./dto/create.track.dto"
import {ObjectId} from "mongoose"

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

    @Get("/:id")
    getTrack(@Param("id") id: ObjectId) {
        return this.trackService.getTrack(id)
    }
}
