import {HttpException, HttpStatus, Injectable} from "@nestjs/common"
import * as fs from "fs"

import * as uuid from "uuid"
import * as path from "path"
import {FileEnum} from "../../enums/file.enum"

@Injectable()
export class FileService {
    createFile(type: FileEnum, file): string {
        try {
          const fileExtension = file.originalname.split(".").pop()
          const name = uuid.v4() + "." + fileExtension
          const filePath = path.resolve(__dirname, "..", "static", type)

          if (!fs.existsSync(filePath)) {
             fs.mkdirSync(filePath, {recursive: true})
          }

          fs.writeFileSync(path.resolve(filePath, name), file.buffer)
          return type + "/" + name
        } catch (e) {
            throw new HttpException(`Something went wrong when write the file ${e}`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    removeFile(fileName: string) {}

}
