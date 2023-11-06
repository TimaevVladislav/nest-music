import { Module } from "@nestjs/common"
import { TracksController } from "./tracks.controller"
import {TrackService} from "./tracks.service"
import {MongooseModule} from "@nestjs/mongoose"

import {Track, TrackSchema} from "./schemas/track.schema"
import {Comment, CommentSchema} from "./schemas/comment.schema"
import {FileModule} from "../file/file.module"


@Module({
  imports: [
     MongooseModule.forFeature([{name: Track.name, schema: TrackSchema}]),
     MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}]),
     FileModule
  ],
  controllers: [TracksController],
  providers: [TrackService],
  exports: [TrackService]
})

export class TracksModule {}
