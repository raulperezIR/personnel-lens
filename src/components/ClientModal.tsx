import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Building2, MapPin, Phone, Mail, Globe } from "lucide-react";

interface Client {
  id: string;
  name: string;
  clientId: string;
  company: string;
  sector: string;
  location: string;
  isActive: boolean;
  contractType: string;
  lastContact: string;
  status: 'cliente-prospecto' | 'cliente-activo' | 'cliente-inactivo';
  phone: string;
  email: string;
  website?: string;
}

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client?: Client | null;
}

const ClientModal = ({ isOpen, onClose, client }: ClientModalProps) => {
  const [formData, setFormData] = useState({
    // Datos Generales
    name: "",
    clientId: "",
    company: "",
    sector: "",
    taxId: "",
    website: "",
    
    // Información Comercial
    contractType: "",
    contractStartDate: "",
    contractEndDate: "",
    status: "cliente-prospecto" as 'cliente-prospecto' | 'cliente-activo' | 'cliente-inactivo',
    isActive: true,
    assignedAccount: "",
    priority: "media",
    
    // Contacto y Ubicación
    email: "",
    phone: "",
    mobile: "",
    address: "",
    city: "",
    postalCode: "",
    country: "España",
    notes: ""
  });

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name,
        clientId: client.clientId,
        company: client.company,
        sector: client.sector,
        taxId: "",
        website: client.website || "",
        contractType: client.contractType,
        contractStartDate: "",
        contractEndDate: "",
        status: client.status,
        isActive: client.isActive,
        assignedAccount: "",
        priority: "media",
        email: client.email,
        phone: client.phone,
        mobile: "",
        address: "",
        city: client.location,
        postalCode: "",
        country: "España",
        notes: ""
      });
    } else {
      // Reset form for new client
      setFormData({
        name: "",
        clientId: "",
        company: "",
        sector: "",
        taxId: "",
        website: "",
        contractType: "",
        contractStartDate: "",
        contractEndDate: "",
        status: "cliente-prospecto",
        isActive: true,
        assignedAccount: "",
        priority: "media",
        email: "",
        phone: "",
        mobile: "",
        address: "",
        city: "",
        postalCode: "",
        country: "España",
        notes: ""
      });
    }
  }, [client, isOpen]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Client data:", formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <Building2 className="w-5 h-5 text-primary" />
            {client ? "Editar Cliente" : "Nuevo Cliente"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general">Datos Generales</TabsTrigger>
              <TabsTrigger value="commercial">Información Comercial</TabsTrigger>
              <TabsTrigger value="contact">Contacto y Ubicación</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <User className="w-4 h-4" />
                    Información Básica del Cliente
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre del Contacto Principal</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Ej: María González"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clientId">ID Cliente</Label>
                      <Input
                        id="clientId"
                        value={formData.clientId}
                        onChange={(e) => handleInputChange("clientId", e.target.value)}
                        placeholder="Ej: CLI-2024-001"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Empresa</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        placeholder="Ej: TechnoSoft Solutions"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sector">Sector</Label>
                      <Select value={formData.sector} onValueChange={(value) => handleInputChange("sector", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar sector" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tecnologia">Tecnología</SelectItem>
                          <SelectItem value="construccion">Construcción</SelectItem>
                          <SelectItem value="consultoria">Consultoría</SelectItem>
                          <SelectItem value="comercio">Comercio</SelectItem>
                          <SelectItem value="logistica">Logística</SelectItem>
                          <SelectItem value="educacion">Educación</SelectItem>
                          <SelectItem value="salud">Salud</SelectItem>
                          <SelectItem value="otros">Otros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="taxId">CIF/NIF</Label>
                      <Input
                        id="taxId"
                        value={formData.taxId}
                        onChange={(e) => handleInputChange("taxId", e.target.value)}
                        placeholder="Ej: B12345678"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Sitio Web</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-700 w-4 h-4" />
                        <Input
                          id="website"
                          className="pl-10"
                          value={formData.website}
                          onChange={(e) => handleInputChange("website", e.target.value)}
                          placeholder="www.empresa.com"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="commercial" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Building2 className="w-4 h-4" />
                    Información Comercial
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contractType">Tipo de Contrato</Label>
                      <Select value={formData.contractType} onValueChange={(value) => handleInputChange("contractType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basico">Básico</SelectItem>
                          <SelectItem value="estandar">Estándar</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                          <SelectItem value="enterprise">Enterprise</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Estado del Cliente</Label>
                      <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cliente-prospecto">Cliente Prospecto</SelectItem>
                          <SelectItem value="cliente-activo">Cliente Activo</SelectItem>
                          <SelectItem value="cliente-inactivo">Cliente Inactivo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contractStartDate">Fecha Inicio Contrato</Label>
                      <Input
                        id="contractStartDate"
                        type="date"
                        value={formData.contractStartDate}
                        onChange={(e) => handleInputChange("contractStartDate", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contractEndDate">Fecha Fin Contrato</Label>
                      <Input
                        id="contractEndDate"
                        type="date"
                        value={formData.contractEndDate}
                        onChange={(e) => handleInputChange("contractEndDate", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="assignedAccount">Gestor de Cuenta</Label>
                      <Select value={formData.assignedAccount} onValueChange={(value) => handleInputChange("assignedAccount", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Asignar gestor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ana-garcia">Ana García</SelectItem>
                          <SelectItem value="carlos-lopez">Carlos López</SelectItem>
                          <SelectItem value="maria-rodriguez">María Rodríguez</SelectItem>
                          <SelectItem value="david-martinez">David Martínez</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Prioridad</Label>
                      <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="alta">Alta</SelectItem>
                          <SelectItem value="media">Media</SelectItem>
                          <SelectItem value="baja">Baja</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={formData.isActive}
                      onCheckedChange={(checked) => handleInputChange("isActive", checked)}
                    />
                    <Label htmlFor="isActive">Cliente Activo</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <MapPin className="w-4 h-4" />
                    Contacto y Ubicación
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-700 w-4 h-4" />
                        <Input
                          id="email"
                          type="email"
                          className="pl-10"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="contacto@empresa.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-700 w-4 h-4" />
                        <Input
                          id="phone"
                          className="pl-10"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="(91) 123-4567"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="mobile">Teléfono Móvil</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-700 w-4 h-4" />
                        <Input
                          id="mobile"
                          className="pl-10"
                          value={formData.mobile}
                          onChange={(e) => handleInputChange("mobile", e.target.value)}
                          placeholder="(6) 1234-5678"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Ciudad</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="Madrid"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Calle Principal 123"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Código Postal</Label>
                      <Input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange("postalCode", e.target.value)}
                        placeholder="28001"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">País</Label>
                      <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="España">España</SelectItem>
                          <SelectItem value="Portugal">Portugal</SelectItem>
                          <SelectItem value="Francia">Francia</SelectItem>
                          <SelectItem value="Otros">Otros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notas Adicionales</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      placeholder="Información adicional sobre el cliente..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary-600">
              {client ? "Actualizar Cliente" : "Crear Cliente"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ClientModal;