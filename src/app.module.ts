import * as process from "process"
import * as path from "path"

import { Module } from "@nestjs/common"
import {ServeStaticModule} from "@nestjs/serve-static"
import {MongooseModule} from "@nestjs/mongoose"

import { TracksModule } from "./tracks/tracks.module"
import { FileModule } from "./file/file.module"



@Module({
  imports: [
      ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, "static")}),
      MongooseModule.forRoot("mongodb+srv://timaevvladislav:MRDUrBGibKcTOJLh@cluster0.vbi1pjc.mongodb.net/?retryWrites=true&w=majority"),
      TracksModule,
      FileModule
  ],
  controllers: [],
  providers: []
})

export class AppModule {}
