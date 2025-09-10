import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Plus, Edit, Trash2, MoreHorizontal, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ClientModal from "./ClientModal";

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
    website: "www.technosoft.com"
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
    email: "carlos.ruiz@construcciones.com"
  },
  {
    id: "3",
    name: "Ana López",
    clientId: "CLI-2024-003",
    company: "Consultoría López & Asociados",
    sector: "Consultoría",
    location: "Sevilla",
    isActive: false,
    contractType: "Básico",
    lastContact: "4 Sep, 2025",
    status: "cliente-inactivo",
    phone: "(95) 403-6999",
    email: "ana.lopez@consultoria.com"
  },
  {
    id: "4",
    name: "Roberto Martín",
    clientId: "CLI-2024-004",
    company: "Comercial Valencia SL",
    sector: "Comercio",
    location: "Valencia",
    isActive: false,
    contractType: "Estándar",
    lastContact: "3 Sep, 2025",
    status: "cliente-prospecto",
    phone: "(96) 365-2984",
    email: "roberto.martin@comercialvalencia.com"
  },
  {
    id: "5",
    name: "Laura Fernández",
    clientId: "CLI-2024-005",
    company: "Innovación Digital",
    sector: "Tecnología",
    location: "Madrid",
    isActive: true,
    contractType: "Premium",
    lastContact: "2 Sep, 2025",
    status: "cliente-activo",
    phone: "(91) 572-9509",
    email: "laura.fernandez@innovacion.com"
  },
  {
    id: "6",
    name: "Javier Sánchez",
    clientId: "CLI-2024-006",
    company: "Logística Barcelona",
    sector: "Logística",
    location: "Barcelona",
    isActive: false,
    contractType: "Básico",
    lastContact: "25 Ago, 2025",
    status: "cliente-prospecto",
    phone: "(93) 378-7874",
    email: "javier.sanchez@logistica.com"
  }
];

type SortField = keyof Client;
type SortDirection = 'asc' | 'desc';

const ClientsTable = () => {
  const navigate = useNavigate();
  const [clients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSector, setFilterSector] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");
  const [filterContractType, setFilterContractType] = useState("all");
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;

  const getStatusBadge = (status: Client['status'], isActive: boolean) => {
    if (!isActive && status === 'cliente-prospecto') {
      return (
        <Badge className="bg-warning/10 text-warning border-warning/20 hover:bg-warning/20">
          Cliente Prospecto
        </Badge>
      );
    }
    if (isActive && status === 'cliente-activo') {
      return (
        <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/20">
          Cliente Activo
        </Badge>
      );
    }
    if (!isActive && status === 'cliente-inactivo') {
      return (
        <Badge className="bg-danger/10 text-danger border-danger/20 hover:bg-danger/20">
          Cliente Inactivo
        </Badge>
      );
    }
    return null;
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4 opacity-50" />;
    return sortDirection === 'asc' 
      ? <ArrowUp className="w-4 h-4 text-primary" />
      : <ArrowDown className="w-4 h-4 text-primary" />;
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.clientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "active" && client.isActive) ||
                         (filterStatus === "inactive" && !client.isActive);
    
    const matchesSector = filterSector === "all" || client.sector === filterSector;
    const matchesLocation = filterLocation === "all" || client.location === filterLocation;
    const matchesContractType = filterContractType === "all" || client.contractType === filterContractType;
    
    return matchesSearch && matchesStatus && matchesSector && matchesLocation && matchesContractType;
  }).sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const comparison = aValue.localeCompare(bValue);
      return sortDirection === 'asc' ? comparison : -comparison;
    }
    
    if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
      const comparison = aValue === bValue ? 0 : aValue ? 1 : -1;
      return sortDirection === 'asc' ? comparison : -comparison;
    }
    
    return 0;
  });

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClients = filteredClients.slice(startIndex, startIndex + itemsPerPage);

  const handleNewClient = () => {
    setIsModalOpen(true);
  };

  const handleEditClient = (client: Client) => {
    navigate(`/clients/${client.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
              <span className="text-primary text-sm">👥</span>
            </div>
            Clientes
          </h1>
          <p className="text-neutral-700 mt-1">
            Un resumen de todos los clientes. Solo los administradores pueden crear, editar o eliminar clientes.
          </p>
        </div>
        <Button 
          onClick={handleNewClient}
          className="bg-primary hover:bg-primary-600 text-primary-foreground gap-2 h-10 px-4 font-medium"
        >
          <Plus className="w-4 h-4" />
          Nuevo Cliente
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6 border-neutral-200">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-700 w-4 h-4" />
            <Input
              placeholder="Buscar por nombre, ID, empresa o ciudad"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-neutral-200 focus:border-primary focus:ring-primary/20"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-neutral-700" />
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40 border-neutral-200">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Activos</SelectItem>
                  <SelectItem value="inactive">Inactivos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Select value={filterSector} onValueChange={setFilterSector}>
              <SelectTrigger className="w-40 border-neutral-200">
                <SelectValue placeholder="Sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los sectores</SelectItem>
                <SelectItem value="Tecnología">Tecnología</SelectItem>
                <SelectItem value="Construcción">Construcción</SelectItem>
                <SelectItem value="Consultoría">Consultoría</SelectItem>
                <SelectItem value="Comercio">Comercio</SelectItem>
                <SelectItem value="Logística">Logística</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterLocation} onValueChange={setFilterLocation}>
              <SelectTrigger className="w-40 border-neutral-200">
                <SelectValue placeholder="Ubicación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las ubicaciones</SelectItem>
                <SelectItem value="Madrid">Madrid</SelectItem>
                <SelectItem value="Barcelona">Barcelona</SelectItem>
                <SelectItem value="Sevilla">Sevilla</SelectItem>
                <SelectItem value="Valencia">Valencia</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterContractType} onValueChange={setFilterContractType}>
              <SelectTrigger className="w-40 border-neutral-200">
                <SelectValue placeholder="Contrato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los contratos</SelectItem>
                <SelectItem value="Básico">Básico</SelectItem>
                <SelectItem value="Estándar">Estándar</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4 text-sm text-neutral-700">
          1 a {Math.min(itemsPerPage, filteredClients.length)} de {filteredClients.length} clientes
        </div>
      </Card>

      {/* Table */}
      <Card className="border-neutral-200">
        <Table>
          <TableHeader>
            <TableRow className="border-neutral-200">
              <TableHead className="text-neutral-900 font-medium">
                <Button variant="ghost" className="p-0 font-medium text-neutral-900 hover:text-primary" onClick={() => handleSort('name')}>
                  CONTACTO {getSortIcon('name')}
                </Button>
              </TableHead>
              <TableHead className="text-neutral-900 font-medium">
                <Button variant="ghost" className="p-0 font-medium text-neutral-900 hover:text-primary" onClick={() => handleSort('clientId')}>
                  ID CLIENTE {getSortIcon('clientId')}
                </Button>
              </TableHead>
              <TableHead className="text-neutral-900 font-medium">
                <Button variant="ghost" className="p-0 font-medium text-neutral-900 hover:text-primary" onClick={() => handleSort('company')}>
                  EMPRESA {getSortIcon('company')}
                </Button>
              </TableHead>
              <TableHead className="text-neutral-900 font-medium">
                <Button variant="ghost" className="p-0 font-medium text-neutral-900 hover:text-primary" onClick={() => handleSort('sector')}>
                  SECTOR {getSortIcon('sector')}
                </Button>
              </TableHead>
              <TableHead className="text-neutral-900 font-medium">
                <Button variant="ghost" className="p-0 font-medium text-neutral-900 hover:text-primary" onClick={() => handleSort('location')}>
                  UBICACIÓN {getSortIcon('location')}
                </Button>
              </TableHead>
              <TableHead className="text-neutral-900 font-medium">
                <Button variant="ghost" className="p-0 font-medium text-neutral-900 hover:text-primary" onClick={() => handleSort('isActive')}>
                  ACTIVO {getSortIcon('isActive')}
                </Button>
              </TableHead>
              <TableHead className="text-neutral-900 font-medium">
                <Button variant="ghost" className="p-0 font-medium text-neutral-900 hover:text-primary" onClick={() => handleSort('contractType')}>
                  CONTRATO {getSortIcon('contractType')}
                </Button>
              </TableHead>
              <TableHead className="text-neutral-900 font-medium">
                <Button variant="ghost" className="p-0 font-medium text-neutral-900 hover:text-primary" onClick={() => handleSort('lastContact')}>
                  ÚLTIMO CONTACTO {getSortIcon('lastContact')}
                </Button>
              </TableHead>
              <TableHead className="text-neutral-900 font-medium">
                <Button variant="ghost" className="p-0 font-medium text-neutral-900 hover:text-primary" onClick={() => handleSort('status')}>
                  ESTADO {getSortIcon('status')}
                </Button>
              </TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedClients.map((client) => (
              <TableRow key={client.id} className="border-neutral-200 hover:bg-neutral-50">
                <TableCell className="font-medium text-foreground">
                  <div>
                    <div>{client.name}</div>
                    <div className="text-sm text-neutral-700">{client.phone}</div>
                  </div>
                </TableCell>
                <TableCell className="text-neutral-700">{client.clientId}</TableCell>
                <TableCell className="text-neutral-700">{client.company}</TableCell>
                <TableCell className="text-neutral-700">{client.sector}</TableCell>
                <TableCell className="text-neutral-700">{client.location}</TableCell>
                <TableCell>
                  {client.isActive ? (
                    <span className="text-success">✓</span>
                  ) : (
                    <span className="text-danger">✗</span>
                  )}
                </TableCell>
                <TableCell className="text-neutral-700">{client.contractType}</TableCell>
                <TableCell className="text-neutral-700">{client.lastContact}</TableCell>
                <TableCell>
                  {getStatusBadge(client.status, client.isActive)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditClient(client)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-danger">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-neutral-700">
          Resultados por página: {itemsPerPage}
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="border-neutral-200"
          >
            Anterior
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className={page === currentPage 
                ? "bg-primary hover:bg-primary-600 text-primary-foreground" 
                : "border-neutral-200"
              }
            >
              {page}
            </Button>
          ))}
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="border-neutral-200"
          >
            Siguiente
          </Button>
        </div>
      </div>

      <ClientModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        client={null}
      />
    </div>
  );
};

export default ClientsTable;