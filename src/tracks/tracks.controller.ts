import {Body, Controller, Get, Param, Post, Delete} from "@nestjs/common"

import {TrackService} from "./tracks.service"
import {ObjectId} from "mongoose"
import {CreateTrackDto} from "./dto/create.track.dto"
import {CreateCommentDto} from "./dto/create.comment.dto"

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

    @Delete("/:id")
    deleteTrack(@Param("id") id: ObjectId) {
        return this.trackService.removeTrack(id)
    }

    @Post("/comments")
    addComment(@Body() dto: CreateCommentDto) {
        return this.trackService.addComment(dto)
    }
}
