import { Module } from "@nestjs/common"
import { TracksController } from "./tracks.controller"
import { TracksService } from "./tracks.service"
import {MongooseModule} from "@nestjs/mongoose"

import {Track, TrackSchema} from "./schemas/track.schema"
import {Comment, CommentSchema} from "./schemas/comment.schema"


@Module({
  imports: [
     MongooseModule.forFeature([{name: Track.name, schema: TrackSchema}]),
     MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}])
  ],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService]
})

export class TracksModule {}