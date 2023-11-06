import {Body, Controller, Get, Param, Post, Delete, UseInterceptors, UploadedFiles, Query} from "@nestjs/common"
import {FileFieldsInterceptor} from "@nestjs/platform-express"

import {TrackService} from "./tracks.service"
import {ObjectId} from "mongoose"
import {CreateTrackDto} from "./dto/create.track.dto"
import {CreateCommentDto} from "./dto/create.comment.dto"
import {ITracksPaginate} from "../../interfaces/tracks.paginate.interface"

@Controller("tracks")
export class TracksController {

    constructor(private trackService: TrackService) {}
    @Post()
    @UseInterceptors(FileFieldsInterceptor([{name: "picture", maxCount: 1}, {name: "audio", maxCount: 1}]))
    createTrack(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
       return this.trackService.createTrack(dto, files)
    }

    @Get()
    getAllTracks(@Query("page") page: number, @Query("offset") offset: number) {
        return this.trackService.getTracks(page, offset)
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

    @Post("/:id")
    addListenTrack(@Param("id") trackId: ObjectId) {
        return this.trackService.addListenTrack(trackId)
    }
}
