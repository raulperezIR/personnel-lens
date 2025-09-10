import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, User, Briefcase, MapPin, Phone, Mail, Globe, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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
  address?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  contactPerson?: string;
  position?: string;
  alternativePhone?: string;
  notes?: string;
}

// Mock data - same as in ClientsTable
const mockClients: Client[] = [
  {
    id: "1",
    name: "María González",
    clientId: "CLI-2024-001",
    company: "TechnoSoft Solutions",
    sector: "Tecnología",
    location: "Madrid",
    isActive: true,
    contractType: "Premium",
    lastContact: "2 Sep, 2025",
    status: "cliente-activo",
    phone: "(91) 652-0744",
    email: "maria.gonzalez@technosoft.com",
    website: "www.technosoft.com",
    address: "Calle Serrano 123",
    postalCode: "28006",
    city: "Madrid",
    country: "España",
    contactPerson: "María González",
    position: "Directora General",
    alternativePhone: "(91) 652-0745",
    notes: "Cliente preferente con contrato Premium"
  },
  {
    id: "2",
    name: "Carlos Ruiz",
    clientId: "CLI-2024-002",
    company: "Construcciones Ruiz",
    sector: "Construcción",
    location: "Barcelona",
    isActive: true,
    contractType: "Estándar",
    lastContact: "5 Ago, 2025",
    status: "cliente-activo",
    phone: "(93) 602-0279",
    email: "carlos.ruiz@construcciones.com",
    address: "Passeig de Gràcia 45",
    postalCode: "08007",
    city: "Barcelona",
    country: "España",
    contactPerson: "Carlos Ruiz",
    position: "CEO",
    notes: "Empresa familiar con más de 20 años de experiencia"
  },
  // ... rest of mock data with similar structure
];

const ClientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [client, setClient] = useState<Client | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Client | null>(null);

  useEffect(() => {
    if (id) {
      const foundClient = mockClients.find(c => c.id === id);
      if (foundClient) {
        setClient(foundClient);
        setFormData(foundClient);
      }
    }
  }, [id]);

  const handleSave = () => {
    if (formData) {
      setClient(formData);
      setIsEditing(false);
      toast({
        title: "Cliente actualizado",
        description: "Los datos del cliente se han guardado correctamente.",
      });
    }
  };

  const handleCancel = () => {
    setFormData(client);
    setIsEditing(false);
  };

  const getStatusBadge = (status: Client['status'], isActive: boolean) => {
    if (!isActive && status === 'cliente-prospecto') {
      return (
        <Badge className="bg-warning/10 text-warning border-warning/20">
          Cliente Prospecto
        </Badge>
      );
    }
    if (isActive && status === 'cliente-activo') {
      return (
        <Badge className="bg-success/10 text-success border-success/20">
          Cliente Activo
        </Badge>
      );
    }
    if (!isActive && status === 'cliente-inactivo') {
      return (
        <Badge className="bg-danger/10 text-danger border-danger/20">
          Cliente Inactivo
        </Badge>
      );
    }
    return null;
  };

  if (!client || !formData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground">Cliente no encontrado</h2>
          <Button onClick={() => navigate("/employees")} className="mt-4">
            Volver a la lista
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-card border-b border-neutral-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/employees")}
              className="text-neutral-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Ficha de Cliente
              </h1>
              <p className="text-sm text-neutral-700">{client.clientId}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {getStatusBadge(client.status, client.isActive)}
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} className="bg-primary hover:bg-primary-600">
                Editar Cliente
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button onClick={handleSave} className="bg-primary hover:bg-primary-600">
                  Guardar
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-w-6xl mx-auto">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">Datos Generales</TabsTrigger>
            <TabsTrigger value="commercial">Información Comercial</TabsTrigger>
            <TabsTrigger value="contact">Contacto y Ubicación</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Información Personal
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientId">ID Cliente</Label>
                  <Input
                    id="clientId"
                    value={formData.clientId}
                    onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Persona de Contacto</Label>
                  <Input
                    id="contactPerson"
                    value={formData.contactPerson || ""}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Posición</Label>
                  <Input
                    id="position"
                    value={formData.position || ""}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center space-x-2 md:col-span-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                    disabled={!isEditing}
                  />
                  <Label htmlFor="isActive">Cliente Activo</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="commercial" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  Información Comercial
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company">Empresa</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sector">Sector</Label>
                  <Select
                    value={formData.sector}
                    onValueChange={(value) => setFormData({ ...formData, sector: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tecnología">Tecnología</SelectItem>
                      <SelectItem value="Construcción">Construcción</SelectItem>
                      <SelectItem value="Consultoría">Consultoría</SelectItem>
                      <SelectItem value="Comercio">Comercio</SelectItem>
                      <SelectItem value="Logística">Logística</SelectItem>
                      <SelectItem value="Salud">Salud</SelectItem>
                      <SelectItem value="Educación">Educación</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contractType">Tipo de Contrato</Label>
                  <Select
                    value={formData.contractType}
                    onValueChange={(value) => setFormData({ ...formData, contractType: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Básico">Básico</SelectItem>
                      <SelectItem value="Estándar">Estándar</SelectItem>
                      <SelectItem value="Premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: 'cliente-prospecto' | 'cliente-activo' | 'cliente-inactivo') => 
                      setFormData({ ...formData, status: value })}
                    disabled={!isEditing}
                  >
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
                <div className="space-y-2">
                  <Label htmlFor="lastContact">Último Contacto</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-700 w-4 h-4" />
                    <Input
                      id="lastContact"
                      value={formData.lastContact}
                      onChange={(e) => setFormData({ ...formData, lastContact: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="notes">Notas</Label>
                  <Input
                    id="notes"
                    value={formData.notes || ""}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Notas adicionales sobre el cliente..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Contacto y Ubicación
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono Principal</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-700 w-4 h-4" />
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alternativePhone">Teléfono Alternativo</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-700 w-4 h-4" />
                    <Input
                      id="alternativePhone"
                      value={formData.alternativePhone || ""}
                      onChange={(e) => setFormData({ ...formData, alternativePhone: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-700 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Sitio Web</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-700 w-4 h-4" />
                    <Input
                      id="website"
                      value={formData.website || ""}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input
                    id="address"
                    value={formData.address || ""}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Código Postal</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode || ""}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <Input
                    id="city"
                    value={formData.city || ""}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">País</Label>
                  <Select
                    value={formData.country || ""}
                    onValueChange={(value) => setFormData({ ...formData, country: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar país" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="España">España</SelectItem>
                      <SelectItem value="Francia">Francia</SelectItem>
                      <SelectItem value="Portugal">Portugal</SelectItem>
                      <SelectItem value="Italia">Italia</SelectItem>
                      <SelectItem value="Reino Unido">Reino Unido</SelectItem>
                      <SelectItem value="Alemania">Alemania</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientDetail;