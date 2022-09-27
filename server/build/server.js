"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const convert_hour_to_string_1 = require("./util/convert-hour-to-string");
const convert_minutes_to_hour_string_1 = require("./util/convert-minutes-to-hour-string");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient({
    log: ['query']
});
app.use(express_1.default.json()); // Linha para express entender requisição JS
app.use((0, cors_1.default)());
app.post("/game/:id/ads", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const gameId = request.params.id;
    const body = request.body;
    const ad = yield prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: (0, convert_hour_to_string_1.convertHourStringToMinutes)(body.hourStart),
            hourEnd: (0, convert_hour_to_string_1.convertHourStringToMinutes)(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel
        }
    });
    return response.status(201).json(ad);
})); // Rota para criar anuncios.
app.get("/games", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const games = yield prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    });
    return response.json(games);
})); // Rota para listar os games.
app.get("/games/:id/ads", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const gameId = request.params.id;
    const ads = yield prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    return response.json(ads.map(ad => {
        return Object.assign(Object.assign({}, ad), { weekDays: ad.weekDays.split(','), hourStart: (0, convert_minutes_to_hour_string_1.convertMinutesToHourString)(ad.hourStart), hourEnd: (0, convert_minutes_to_hour_string_1.convertMinutesToHourString)(ad.hourEnd) });
    }));
})); // Rota para listas os anuncios por game.
app.get("/ads/:id/discord", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const adId = request.params.id;
    const ad = yield prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where: {
            id: adId
        }
    });
    return response.json({
        discord: ad.discord
    });
})); // Rota para buscar o discord do anuncio
app.listen(3333);
