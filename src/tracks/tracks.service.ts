import { Injectable } from "@nestjs/common"
import {InjectModel} from "@nestjs/mongoose"
import {Track} from "./schemas/track.schema"
import {Model} from "mongoose"

import {CreateTrackDto} from "./dto/create.track.dto"

@Injectable()
export class TrackService {
    constructor(@InjectModel(Track.name) private track: Model<Track>) {}

    async createTrack(dto: CreateTrackDto): Promise<Track> {
        const createdCat = await this.track.create({...dto, listens: 0})
        return createdCat.save()
    }

    async getTracks(): Promise<Track[]> {
        return this.track.find()
    }
}
