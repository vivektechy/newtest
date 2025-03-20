import { Device } from "@shared/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Lightbulb,
  Fan,
  Tv,
  Speaker,
  AirVent,
  Power
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface DeviceGridProps {
  devices: Device[];
}

const deviceIcons: Record<string, React.ReactNode> = {
  light: <Lightbulb className="h-6 w-6" />,
  fan: <Fan className="h-6 w-6" />,
  ac: <AirVent className="h-6 w-6" />,
  tv: <Tv className="h-6 w-6" />,
  speaker: <Speaker className="h-6 w-6" />,
};

export default function DeviceGrid({ devices }: DeviceGridProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: async (deviceId: number) => {
      const res = await apiRequest("POST", `/api/devices/${deviceId}/toggle`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/devices"] });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  if (devices.length === 0) {
    return (
      <div className="text-center py-8">
        <Power className="h-12 w-12 mx-auto text-zinc-700 mb-4" />
        <p className="text-lg text-zinc-500">No devices found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {devices.map((device) => (
        <Card key={device.id} className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                  {deviceIcons[device.type] || <Power className="h-6 w-6" />}
                </div>
                <div>
                  <h3 className="font-medium text-white">{device.name}</h3>
                  <p className="text-sm text-zinc-400 capitalize">
                    {device.type}
                  </p>
                </div>
              </div>
              <Switch
                checked={device.isOn}
                onCheckedChange={() => toggleMutation.mutate(device.id)}
                disabled={toggleMutation.isPending}
                className="data-[state=checked]:bg-blue-500"
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}