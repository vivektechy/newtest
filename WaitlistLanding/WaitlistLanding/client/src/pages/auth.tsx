import { useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/login-form";
import RegisterForm from "@/components/register-form";
import { useAuth } from "@/hooks/use-auth";

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setLocation("/");
    }
  }, [user, setLocation]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Welcome to Marvi</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm />
              </TabsContent>
              <TabsContent value="register">
                <RegisterForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="hidden md:flex flex-col justify-center p-6 bg-primary/5 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Smart Home Management</h2>
          <p className="text-muted-foreground mb-4">
            Control your home devices from anywhere with our intuitive dashboard.
            Manage lights, fans, AC units, and more with just a few clicks.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              ✓ Secure device control
            </li>
            <li className="flex items-center">
              ✓ Room-based organization
            </li>
            <li className="flex items-center">
              ✓ Real-time device status
            </li>
            <li className="flex items-center">
              ✓ User-friendly interface
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
