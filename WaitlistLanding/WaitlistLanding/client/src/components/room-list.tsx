import { Room } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HomeIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoomListProps {
  rooms: Room[];
  selectedRoomId: number | null;
  onRoomSelect: (id: number | null) => void;
}

export default function RoomList({
  rooms,
  selectedRoomId,
  onRoomSelect,
}: RoomListProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-white">Your Rooms</h2>
      <ScrollArea className="h-[calc(100vh-16rem)] rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
        <div className="space-y-2">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-800",
              selectedRoomId === null && "bg-zinc-800 text-white"
            )}
            onClick={() => onRoomSelect(null)}
          >
            <HomeIcon className="mr-2 h-4 w-4" />
            All Rooms
          </Button>
          {rooms.map((room) => (
            <div
              key={room.id}
              className={cn(
                "group rounded-lg p-2 transition-colors hover:bg-zinc-800 cursor-pointer",
                selectedRoomId === room.id && "bg-zinc-800"
              )}
              onClick={() => onRoomSelect(room.id)}
            >
              <div className="aspect-video rounded-lg bg-zinc-800 mb-2 overflow-hidden">
                <img
                  src={`https://source.unsplash.com/featured/?${room.name.toLowerCase()},room`}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className={cn(
                  "font-medium text-zinc-400 group-hover:text-white",
                  selectedRoomId === room.id && "text-white"
                )}>
                  {room.name}
                </span>
                <span className="text-xs text-zinc-500">2 Devices</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}