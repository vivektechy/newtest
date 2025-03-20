import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRoomSchema, insertDeviceSchema, insertWaitlistSchema } from "@shared/schema";
import { ZodError } from "zod";
import { setupAuth } from "./auth";

function isAuthenticated(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  setupAuth(app);

  // Protected routes
  app.get("/api/rooms", isAuthenticated, async (_req, res) => {
    const rooms = await storage.getRooms();
    res.json(rooms);
  });

  app.post("/api/rooms", isAuthenticated, async (req, res) => {
    try {
      const data = insertRoomSchema.parse(req.body);
      const room = await storage.createRoom(data);
      res.status(201).json(room);
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.get("/api/devices", isAuthenticated, async (req, res) => {
    const roomId = req.query.roomId ? Number(req.query.roomId) : undefined;
    const devices = roomId 
      ? await storage.getDevicesByRoom(roomId)
      : await storage.getDevices();
    res.json(devices);
  });

  app.post("/api/devices", isAuthenticated, async (req, res) => {
    try {
      const data = insertDeviceSchema.parse(req.body);
      const device = await storage.createDevice(data);
      res.status(201).json(device);
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.post("/api/devices/:id/toggle", isAuthenticated, async (req, res) => {
    try {
      const id = Number(req.params.id);
      const device = await storage.toggleDevice(id);
      res.json(device);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(404).json({ message: err.message });
      }
      throw err;
    }
  });

  return createServer(app);
}