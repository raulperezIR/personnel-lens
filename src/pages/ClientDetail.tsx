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
import { 
  ArrowLeft, 
  User, 
  Briefcase, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Calendar,
  Menu,
  Bell,
  Users,
  UserCheck,
  BarChart3,
  Settings,
  LogOut,
  CreditCard,
  Pencil,
  Trash2,
  Plus
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { SubscriptionModal, Subscription } from "@/components/SubscriptionModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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

// Mock subscriptions data
const mockSubscriptions: Subscription[] = [
  {
    id: "1",
    platform: "Netflix",
    plan: "Plan Premium",
    startDate: "2024-03-01",
    endDate: "2026-03-01",
    amount: "15,99",
    status: "activa"
  },
  {
    id: "2",
    platform: "HBO Max",
    plan: "Plan Estándar",
    startDate: "2024-01-15",
    endDate: "2026-07-15",
    amount: "9,99",
    status: "activa"
  },
  {
    id: "3",
    platform: "Disney+",
    plan: "Plan Anual",
    startDate: "2023-12-10",
    endDate: "2025-12-10",
    amount: "8,99",
    status: "activa"
  },
  {
    id: "4",
    platform: "Spotify Premium",
    plan: "Plan Individual",
    startDate: "2023-05-05",
    endDate: "2024-05-05",
    amount: "10,99",
    status: "caducada"
  },
  {
    id: "5",
    platform: "YouTube Premium",
    plan: "Plan Familiar",
    startDate: "2024-02-20",
    endDate: "2024-08-20",
    amount: "11,99",
    status: "caducada"
  }
];

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
  const [collapsed, setCollapsed] = useState(false);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(mockSubscriptions);
  const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState<string | null>(null);

  const sidebarItems = [
    { icon: Users, label: "Clientes", path: "/employees", active: true },
    { icon: UserCheck, label: "Empleados", path: "/employees-old" },
    { icon: BarChart3, label: "Reportes", path: "/reports" },
    { icon: Settings, label: "Configuración", path: "/settings" },
  ];

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

  const handleSaveSubscription = (subscription: Subscription) => {
    if (editingSubscription) {
      setSubscriptions(subscriptions.map(s => s.id === subscription.id ? subscription : s));
    } else {
      setSubscriptions([...subscriptions, subscription]);
    }
    setEditingSubscription(null);
  };

  const handleEditSubscription = (subscription: Subscription) => {
    setEditingSubscription(subscription);
    setSubscriptionModalOpen(true);
  };

  const handleDeleteSubscription = (id: string) => {
    setSubscriptionToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteSubscription = () => {
    if (subscriptionToDelete) {
      setSubscriptions(subscriptions.filter(s => s.id !== subscriptionToDelete));
      toast({
        title: "Suscripción eliminada",
        description: "La suscripción se ha eliminado correctamente."
      });
    }
    setDeleteDialogOpen(false);
    setSubscriptionToDelete(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
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
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <div className={`bg-card border-r border-neutral-200 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-8">
            {!collapsed && (
              <div>
                <h1 className="text-lg font-semibold text-primary">ERP Clientes</h1>
                <p className="text-xs text-neutral-700">Sistema de gestión</p>
              </div>
            )}
          </div>
          
          <nav className="space-y-2">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  item.active
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
          
          <div className="absolute bottom-4 left-4 right-4">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 rounded-lg">
              <LogOut className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>Cerrar Sesión</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-card border-b border-neutral-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCollapsed(!collapsed)}
                className="text-neutral-700"
              >
                <Menu className="w-4 h-4" />
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/employees")}
                className="text-neutral-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
              {getStatusBadge(client.status, client.isActive)}
              <Bell className="w-5 h-5 text-neutral-700 cursor-pointer" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-foreground">Admin</p>
                  <p className="text-neutral-700">Administrador</p>
                </div>
              </div>
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
        <div className="p-6 max-w-6xl mx-auto w-full">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">Datos Generales</TabsTrigger>
            <TabsTrigger value="commercial">Información Comercial</TabsTrigger>
            <TabsTrigger value="contact">Contacto y Ubicación</TabsTrigger>
            <TabsTrigger value="subscriptions">Suscripciones</TabsTrigger>
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

          <TabsContent value="subscriptions" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Suscripciones
                </CardTitle>
                <Button 
                  onClick={() => {
                    setEditingSubscription(null);
                    setSubscriptionModalOpen(true);
                  }}
                  className="bg-primary hover:bg-primary-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nueva Suscripción
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-neutral-200">
                      <tr>
                        <th className="text-left py-3 px-4 text-sm font-medium text-neutral-700 uppercase">
                          Plataforma
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-neutral-700 uppercase">
                          Inicio
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-neutral-700 uppercase">
                          Caducidad
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-neutral-700 uppercase">
                          Importe
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-neutral-700 uppercase">
                          Estado
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-neutral-700 uppercase">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscriptions.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center py-8 text-neutral-700">
                            No hay suscripciones registradas
                          </td>
                        </tr>
                      ) : (
                        subscriptions.map((subscription) => (
                          <tr key={subscription.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                            <td className="py-4 px-4">
                              <div className="flex flex-col">
                                <span className="font-medium text-foreground">{subscription.platform}</span>
                                <span className="text-sm text-neutral-700">{subscription.plan}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-neutral-700">
                              {formatDate(subscription.startDate)}
                            </td>
                            <td className="py-4 px-4 text-neutral-700">
                              {formatDate(subscription.endDate)}
                            </td>
                            <td className="py-4 px-4 text-primary font-medium">
                              {subscription.amount} €
                            </td>
                            <td className="py-4 px-4">
                              {subscription.status === 'activa' ? (
                                <Badge className="bg-success/10 text-success border-success/20">
                                  Activa
                                </Badge>
                              ) : (
                                <Badge className="bg-danger/10 text-danger border-danger/20">
                                  Caducada
                                </Badge>
                              )}
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditSubscription(subscription)}
                                  className="text-primary hover:text-primary hover:bg-primary/10"
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteSubscription(subscription.id)}
                                  className="text-danger hover:text-danger hover:bg-danger/10"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </div>
      </div>

      <SubscriptionModal
        open={subscriptionModalOpen}
        onOpenChange={setSubscriptionModalOpen}
        subscription={editingSubscription}
        onSave={handleSaveSubscription}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. La suscripción será eliminada permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteSubscription} className="bg-danger hover:bg-danger/90">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ClientDetail;