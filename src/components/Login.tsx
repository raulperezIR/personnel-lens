import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Acceso exitoso",
      description: "Bienvenido a Control Tiempos",
    });
    // Redirect to employees page
    navigate("/employees");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <Card className="w-full max-w-[420px] shadow-lg border-0 bg-card">
        <CardHeader className="text-center pb-8 pt-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-semibold text-xl">CT</span>
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-foreground">Control Tiempos</h1>
          <p className="text-neutral-700 text-sm mt-2">Accede a tu intranet corporativa</p>
        </CardHeader>
        <CardContent className="px-8 pb-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@empresa.com"
                className="h-11 border-neutral-200 focus:border-primary focus:ring-primary/20"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-11 border-neutral-200 focus:border-primary focus:ring-primary/20"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="border-neutral-200 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label htmlFor="remember" className="text-sm text-neutral-700 cursor-pointer">
                  Recordarme
                </Label>
              </div>
              <a 
                href="#" 
                className="text-sm text-primary hover:text-primary-600 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 bg-primary hover:bg-primary-600 text-primary-foreground font-medium transition-colors"
            >
              Iniciar Sesión
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;