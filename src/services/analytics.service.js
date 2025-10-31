// import { sendMessageInDiscordChannel } from "../utils/discord-server.utils.js";
import api from "./api.js";

export const leaderboardUsersSrv = () => api.get(`/analytics/leaderboard`, { withCredentials: true });

