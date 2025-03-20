import { waitlist, type Waitlist, type InsertWaitlist } from "@shared/schema";
import { 
  type Room, type Device, type User,
  type InsertRoom, type InsertDevice, type InsertUser
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // Session store
  sessionStore: session.Store;

  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Waitlist operations
  addToWaitlist(entry: InsertWaitlist): Promise<Waitlist>;
  isEmailInWaitlist(email: string): Promise<boolean>;

  // Room operations
  createRoom(room: InsertRoom): Promise<Room>;
  getRooms(): Promise<Room[]>;
  getRoomById(id: number): Promise<Room | undefined>;

  // Device operations
  createDevice(device: InsertDevice): Promise<Device>;
  getDevices(): Promise<Device[]>;
  getDevicesByRoom(roomId: number): Promise<Device[]>;
  toggleDevice(id: number): Promise<Device>;
}

export class MemStorage implements IStorage {
  sessionStore: session.Store;
  private users: Map<number, User>;
  private waitlist: Map<number, Waitlist>;
  private rooms: Map<number, Room>;
  private devices: Map<number, Device>;
  private currentId: number;
  private currentRoomId: number;
  private currentDeviceId: number;

  constructor() {
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // 24 hours
    });
    this.users = new Map();
    this.waitlist = new Map();
    this.rooms = new Map();
    this.devices = new Map();
    this.currentId = 1;
    this.currentRoomId = 1;
    this.currentDeviceId = 1;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = {
      id,
      username: insertUser.username,
      password: insertUser.password,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  // Waitlist operations
  async addToWaitlist(entry: InsertWaitlist): Promise<Waitlist> {
    const id = this.currentId++;
    const waitlistEntry: Waitlist = {
      id,
      email: entry.email,
      joinedAt: new Date(),
    };
    this.waitlist.set(id, waitlistEntry);
    return waitlistEntry;
  }

  async isEmailInWaitlist(email: string): Promise<boolean> {
    return Array.from(this.waitlist.values()).some(
      (entry) => entry.email === email
    );
  }

  // Room operations
  async createRoom(room: InsertRoom): Promise<Room> {
    const id = this.currentRoomId++;
    const newRoom: Room = {
      id,
      name: room.name,
      createdAt: new Date(),
    };
    this.rooms.set(id, newRoom);
    return newRoom;
  }

  async getRooms(): Promise<Room[]> {
    return Array.from(this.rooms.values());
  }

  async getRoomById(id: number): Promise<Room | undefined> {
    return this.rooms.get(id);
  }

  // Device operations
  async createDevice(device: InsertDevice): Promise<Device> {
    const id = this.currentDeviceId++;
    const newDevice: Device = {
      id,
      name: device.name,
      type: device.type,
      roomId: device.roomId,
      isOn: false,
      createdAt: new Date(),
    };
    this.devices.set(id, newDevice);
    return newDevice;
  }

  async getDevices(): Promise<Device[]> {
    return Array.from(this.devices.values());
  }

  async getDevicesByRoom(roomId: number): Promise<Device[]> {
    return Array.from(this.devices.values()).filter(
      device => device.roomId === roomId
    );
  }

  async toggleDevice(id: number): Promise<Device> {
    const device = this.devices.get(id);
    if (!device) {
      throw new Error("Device not found");
    }

    const updatedDevice: Device = {
      ...device,
      isOn: !device.isOn,
    };
    this.devices.set(id, updatedDevice);
    return updatedDevice;
  }
}

export const storage = new MemStorage();