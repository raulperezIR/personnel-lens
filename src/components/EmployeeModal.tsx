import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Briefcase, MapPin, Phone, Mail, Calendar, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Employee {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  location: string;
  isActive: boolean;
  careerPlan: string;
  lastEvaluation: string;
  status: 'nueva-referencia' | 'empleado-activo' | 'empleado-interesado';
  phone: string;
  email: string;
}

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee?: Employee | null;
}

const EmployeeModal = ({ isOpen, onClose, employee }: EmployeeModalProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    employeeId: "",
    email: "",
    phone: "",
    department: "",
    location: "",
    careerPlan: "",
    isActive: true,
    status: "empleado-activo" as Employee['status'],
    address: "",
    city: "",
    zipCode: "",
    country: "España",
    dateOfBirth: "",
    startDate: "",
  });

  const { toast } = useToast();

  useEffect(() => {
    if (employee) {
      const [firstName, ...lastNameParts] = employee.name.split(" ");
      setFormData({
        firstName,
        lastName: lastNameParts.join(" "),
        employeeId: employee.employeeId,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        location: employee.location,
        careerPlan: employee.careerPlan,
        isActive: employee.isActive,
        status: employee.status,
        address: "",
        city: employee.location,
        zipCode: "",
        country: "España",
        dateOfBirth: "",
        startDate: "",
      });
    } else {
      // Reset form for new employee
      setFormData({
        firstName: "",
        lastName: "",
        employeeId: "",
        email: "",
        phone: "",
        department: "",
        location: "",
        careerPlan: "",
        isActive: true,
        status: "empleado-activo",
        address: "",
        city: "",
        zipCode: "",
        country: "España",
        dateOfBirth: "",
        startDate: "",
      });
    }
  }, [employee, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: employee ? "Empleado actualizado" : "Empleado creado",
      description: `${formData.firstName} ${formData.lastName} ha sido ${employee ? "actualizado" : "creado"} exitosamente.`,
    });
    onClose();
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            {employee ? "Editar Empleado" : "Nuevo Empleado"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="personal" className="mt-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Datos Personales</TabsTrigger>
              <TabsTrigger value="work">Información Laboral</TabsTrigger>
              <TabsTrigger value="contact">Contacto y Dirección</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <User className="w-5 h-5 text-primary" />
                    Información Personal
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      Nombre *
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="Nombre"
                      className="border-neutral-200 focus:border-primary focus:ring-primary/20"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Apellidos *
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Apellidos"
                      className="border-neutral-200 focus:border-primary focus:ring-primary/20"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employeeId" className="text-sm font-medium">
                      ID Empleado *
                    </Label>
                    <Input
                      id="employeeId"
                      value={formData.employeeId}
                      onChange={(e) => handleInputChange("employeeId", e.target.value)}
                      placeholder="202468746MA"
                      className="border-neutral-200 focus:border-primary focus:ring-primary/20"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="text-sm font-medium">
                      Fecha de Nacimiento
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      className="border-neutral-200 focus:border-primary focus:ring-primary/20"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="work" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Briefcase className="w-5 h-5 text-primary" />
                    Información Laboral
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-sm font-medium">
                      Departamento *
                    </Label>
                    <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
                      <SelectTrigger className="border-neutral-200">
                        <SelectValue placeholder="Seleccionar departamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Software">Software</SelectItem>
                        <SelectItem value="Sistemas">Sistemas</SelectItem>
                        <SelectItem value="Administración">Administración</SelectItem>
                        <SelectItem value="Comercial">Comercial</SelectItem>
                        <SelectItem value="Recursos Humanos">Recursos Humanos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="careerPlan" className="text-sm font-medium">
                      Plan de Carrera *
                    </Label>
                    <Select value={formData.careerPlan} onValueChange={(value) => handleInputChange("careerPlan", value)}>
                      <SelectTrigger className="border-neutral-200">
                        <SelectValue placeholder="Seleccionar nivel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Junior">Junior</SelectItem>
                        <SelectItem value="Pleno">Pleno</SelectItem>
                        <SelectItem value="Senior">Senior</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-sm font-medium">
                      Ubicación *
                    </Label>
                    <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                      <SelectTrigger className="border-neutral-200">
                        <SelectValue placeholder="Seleccionar ciudad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Madrid">Madrid</SelectItem>
                        <SelectItem value="Barcelona">Barcelona</SelectItem>
                        <SelectItem value="Valencia">Valencia</SelectItem>
                        <SelectItem value="Sevilla">Sevilla</SelectItem>
                        <SelectItem value="Bilbao">Bilbao</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-sm font-medium">
                      Fecha de Inicio
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange("startDate", e.target.value)}
                      className="border-neutral-200 focus:border-primary focus:ring-primary/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-sm font-medium">
                      Estado
                    </Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                      <SelectTrigger className="border-neutral-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="empleado-activo">Empleado Activo</SelectItem>
                        <SelectItem value="nueva-referencia">Nueva Referencia</SelectItem>
                        <SelectItem value="empleado-interesado">Empleado Interesado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => handleInputChange("isActive", e.target.checked)}
                      className="rounded border-neutral-200 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="isActive" className="text-sm font-medium cursor-pointer">
                      Empleado Activo
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Phone className="w-5 h-5 text-primary" />
                    Contacto y Dirección
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="empleado@empresa.com"
                      className="border-neutral-200 focus:border-primary focus:ring-primary/20"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Teléfono
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="(XX) XXX-XXXX"
                      className="border-neutral-200 focus:border-primary focus:ring-primary/20"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address" className="text-sm font-medium">
                      Dirección
                    </Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Calle, número, piso..."
                      className="border-neutral-200 focus:border-primary focus:ring-primary/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm font-medium">
                      Ciudad
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="Ciudad"
                      className="border-neutral-200 focus:border-primary focus:ring-primary/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zipCode" className="text-sm font-medium">
                      Código Postal
                    </Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      placeholder="28001"
                      className="border-neutral-200 focus:border-primary focus:ring-primary/20"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="country" className="text-sm font-medium">
                      País
                    </Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                      <SelectTrigger className="border-neutral-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="España">España</SelectItem>
                        <SelectItem value="Francia">Francia</SelectItem>
                        <SelectItem value="Portugal">Portugal</SelectItem>
                        <SelectItem value="Italia">Italia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-neutral-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-neutral-200 text-neutral-700 hover:bg-neutral-50"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary-600 text-primary-foreground"
            >
              {employee ? "Actualizar Empleado" : "Crear Empleado"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeModal;