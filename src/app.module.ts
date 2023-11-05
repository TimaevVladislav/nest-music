import * as process from "process"
import { Module } from "@nestjs/common"
import {MongooseModule} from "@nestjs/mongoose"

import { TracksModule } from "./tracks/tracks.module"

@Module({
  imports: [
      MongooseModule.forRoot("mongodb+srv://timaevvladislav:MRDUrBGibKcTOJLh@cluster0.vbi1pjc.mongodb.net/?retryWrites=true&w=majority"),
      TracksModule
  ],
  controllers: [],
  providers: []
})

export class AppModule {}
