// app.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import userRouter from "./src/routes/user.routes.js";
import songRouter from "./src/routes/song.routes.js";
import playlistRouter from "./src/routes/playlist.routes.js"
import adminRouter from "./src/routes/admin.route.js"

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
  credentials: true
}));

app.use(cookieParser());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use( "/api/v1/user", userRouter );
app.use( "/api/v1/song", songRouter );
app.use( "/api/v1/playlist", playlistRouter );
app.use( "/api/v1/admin", adminRouter );

export default app;
