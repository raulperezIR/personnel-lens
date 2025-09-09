import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  FileText, 
  Settings, 
  LogOut, 
  Menu,
  Bell
} from "lucide-react";
import EmployeesTable from "@/components/EmployeesTable";

const Employees = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: false },
    { icon: Users, label: "Empleados", active: true },
    { icon: Clock, label: "Control Tiempos", active: false },
    { icon: FileText, label: "Informes", active: false },
    { icon: Settings, label: "Configuración", active: false },
  ];

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Sidebar */}
      <div className={`bg-card border-r border-neutral-200 transition-all duration-300 ${
        isSidebarCollapsed ? 'w-16' : 'w-64'
      }`}>
        <div className="p-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-semibold text-sm">CT</span>
            </div>
            {!isSidebarCollapsed && (
              <div>
                <h1 className="font-semibold text-foreground">IR Soluciones</h1>
                <p className="text-xs text-neutral-700">Control Tiempos</p>
              </div>
            )}
          </div>
          
          <nav className="space-y-2">
            {sidebarItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    item.active 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isSidebarCollapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isSidebarCollapsed && (
              <span className="text-sm font-medium">Cerrar Sesión</span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-neutral-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="text-neutral-700"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="text-sm text-neutral-700">
                <span className="text-primary cursor-pointer hover:underline">Miembros</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-neutral-700">
                <Bell className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    AG
                  </AvatarFallback>
                </Avatar>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">Ana García</p>
                  <p className="text-xs text-neutral-700">Administradora</p>
                </div>
                <Settings className="w-4 h-4 text-neutral-700 cursor-pointer" />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <EmployeesTable />
        </main>
      </div>
    </div>
  );
};

export default Employees;