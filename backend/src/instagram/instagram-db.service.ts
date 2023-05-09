import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {InstagramSession} from "./instagram-session.schema";
import {Model} from "mongoose";
import {CreateInstagramSessionDto} from "./create-session.dto";

@Injectable()
export class InstagramDBService {
  constructor(
    @InjectModel(InstagramSession.name) private readonly instagramSessionModel: Model<InstagramSession>
  ) {}

  async create(createInstagramSessionDto: CreateInstagramSessionDto): Promise<InstagramSession> {
    const createdSession = await this.instagramSessionModel.create(createInstagramSessionDto);
    return createdSession;
  }

  async getSessionId(): Promise<InstagramSession> {
    const session = this.instagramSessionModel.findOne().exec();

    return session;
  }
}
