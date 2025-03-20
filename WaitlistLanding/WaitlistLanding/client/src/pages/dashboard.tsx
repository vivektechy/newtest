import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Room, Device } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth"; // Added import
import RoomList from "@/components/room-list";
import DeviceGrid from "@/components/device-grid";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import AddRoomDialog from "@/components/add-room-dialog";
import AddDeviceDialog from "@/components/add-device-dialog";

export default function Dashboard() {
  const { user } = useAuth();
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);

  const { data: rooms = [] } = useQuery<Room[]>({
    queryKey: ["/api/rooms"],
  });

  const { data: devices = [] } = useQuery<Device[]>({
    queryKey: ["/api/devices", selectedRoomId],
    queryFn: async () => {
      const url = selectedRoomId
        ? `/api/devices?roomId=${selectedRoomId}`
        : "/api/devices";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch devices");
      return res.json();
    },
  });

  return (
    <div className="min-h-screen bg-zinc-900">
      <header className="border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Marvi
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-zinc-400">
                Welcome, {user?.username} 👋
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-zinc-400">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-semibold text-white">22°</span>
                  <span>Mostly Cloudy</span>
                </div>
                <div className="text-sm mt-1">Sydney, Australia</div>
              </div>
              <div className="h-12 w-px bg-zinc-800"></div>
              <div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-zinc-500">Temperature</div>
                    <div className="font-medium text-white">27°C</div>
                  </div>
                  <div>
                    <div className="text-zinc-500">Humidity</div>
                    <div className="font-medium text-white">66%</div>
                  </div>
                  <div>
                    <div className="text-zinc-500">Wind</div>
                    <div className="font-medium text-white">16 km/h</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddRoomOpen(true)}
                className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Room
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddDeviceOpen(true)}
                className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Device
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <aside className="md:col-span-3">
            <RoomList
              rooms={rooms}
              selectedRoomId={selectedRoomId}
              onRoomSelect={setSelectedRoomId}
            />
          </aside>
          <div className="md:col-span-9">
            <DeviceGrid devices={devices} />
          </div>
        </div>
      </main>

      <AddRoomDialog
        open={isAddRoomOpen}
        onOpenChange={setIsAddRoomOpen}
      />
      <AddDeviceDialog
        open={isAddDeviceOpen}
        onOpenChange={setIsAddDeviceOpen}
        rooms={rooms}
      />
    </div>
  );
}