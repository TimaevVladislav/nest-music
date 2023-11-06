import {Body, Controller, Get, Param, Post, Delete, UseInterceptors, UploadedFiles} from "@nestjs/common"
import {FileFieldsInterceptor} from "@nestjs/platform-express"

import {TrackService} from "./tracks.service"
import {ObjectId} from "mongoose"
import {CreateTrackDto} from "./dto/create.track.dto"
import {CreateCommentDto} from "./dto/create.comment.dto"

@Controller("tracks")
export class TracksController {

    constructor(private trackService: TrackService) {}
    @Post()
    @UseInterceptors(FileFieldsInterceptor([{name: "picture", maxCount: 1}, {name: "audio", maxCount: 1}]))
    createTrack(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
       return this.trackService.createTrack(dto, files)
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
