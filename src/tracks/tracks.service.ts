import {HttpException, HttpStatus, Injectable} from "@nestjs/common"
import {InjectModel} from "@nestjs/mongoose"
import {Track, TrackDocument} from "./schemas/track.schema"
import {Model, ObjectId} from "mongoose"

import {CreateTrackDto} from "./dto/create.track.dto"
import {CreateCommentDto} from "./dto/create.comment.dto"
import {Comment, CommentDocument} from "./schemas/comment.schema"

import {FileService} from "../file/file.service"
import {FileEnum} from "../../enums/file.enum"
import {ITracksPaginate} from "../../interfaces/tracks.paginate.interface"


@Injectable()
export class TrackService {
    constructor(@InjectModel(Track.name) private track: Model<TrackDocument>, @InjectModel(Comment.name) private comment: Model<CommentDocument>, private fileService: FileService) {}

    async createTrack(dto: CreateTrackDto, files): Promise<Track> {
        try {
            const audio = this.fileService.createFile(FileEnum.AUDIO, files.audio[0])
            const picture = this.fileService.createFile(FileEnum.PICTURE, files.picture[0])

            const track = await this.track.create({...dto, listens: 0, audio, picture})
            return track.save()
        } catch (e) {
            throw new HttpException(`Something went wrong when create the track ${e}`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getTracks(count = 10, offset = 0): Promise<Track[]> {
        try {
            return this.track.find().skip(offset).limit(count)
        } catch (e) {
            throw new HttpException(`Something went wrong ${e}`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getTrack(id: ObjectId): Promise<Track> {
        const track = await this.track.findById(id).populate("comments")
        return track
    }

    async removeTrack(id: ObjectId): Promise<Track> {
        const track = await this.track.findByIdAndDelete(id)
        return track
    }

    async addComment(dto: CreateCommentDto): Promise<Comment> {
        try {
            const track = await this.track.findById(dto.trackId)
            const comment = await this.comment.create({...dto})

            track.comments.push(comment._id)
            await track.save()
            return comment
        } catch (e) {
            throw new HttpException(`Something went wrong ${e}`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async addListenTrack(trackId: ObjectId): Promise<Track> {
        try {
            const track = await this.track.findById(trackId)
            track.listens++
            return await track.save()
        } catch (e) {
            throw new HttpException(`Something went wrong ${e}`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
