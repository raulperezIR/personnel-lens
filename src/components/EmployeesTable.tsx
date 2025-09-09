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
import { Search, Filter, Plus, Edit, Trash2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EmployeeModal from "./EmployeeModal";

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

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "Sofía Pérez",
    employeeId: "202468746MA",
    department: "Software",
    location: "Madrid",
    isActive: false,
    careerPlan: "Senior",
    lastEvaluation: "2 Sep, 2025",
    status: "nueva-referencia",
    phone: "(91) 652-0744",
    email: "sofia.perez@empresa.com"
  },
  {
    id: "2",
    name: "Carlos Sánchez",
    employeeId: "203083553BA",
    department: "Sistemas",
    location: "Barcelona",
    isActive: true,
    careerPlan: "Pleno",
    lastEvaluation: "5 Ago, 2025",
    status: "empleado-activo",
    phone: "(93) 602-0279",
    email: "carlos.sanchez@empresa.com"
  },
  {
    id: "3",
    name: "Valentina González",
    employeeId: "201093014SE",
    department: "Administración",
    location: "Sevilla",
    isActive: true,
    careerPlan: "Junior",
    lastEvaluation: "4 Sep, 2025",
    status: "empleado-activo",
    phone: "(95) 403-6999",
    email: "valentina.gonzalez@empresa.com"
  },
  {
    id: "4",
    name: "Mateo Fernández",
    employeeId: "100485862VA",
    department: "Comercial",
    location: "Valencia",
    isActive: true,
    careerPlan: "Pleno",
    lastEvaluation: "3 Sep, 2025",
    status: "empleado-activo",
    phone: "(96) 365-2984",
    email: "mateo.fernandez@empresa.com"
  },
  {
    id: "5",
    name: "Lucas Martín",
    employeeId: "20209054MA",
    department: "Software",
    location: "Madrid",
    isActive: true,
    careerPlan: "Senior",
    lastEvaluation: "2 Sep, 2025",
    status: "empleado-activo",
    phone: "(91) 572-9509",
    email: "lucas.martin@empresa.com"
  },
  {
    id: "6",
    name: "Martina Romero",
    employeeId: "202122330BA",
    department: "Sistemas",
    location: "Barcelona",
    isActive: false,
    careerPlan: "Junior",
    lastEvaluation: "25 Ago, 2025",
    status: "empleado-interesado",
    phone: "(93) 378-7874",
    email: "martina.romero@empresa.com"
  }
];

const EmployeesTable = () => {
  const [employees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const itemsPerPage = 10;

  const getStatusBadge = (status: Employee['status'], isActive: boolean) => {
    if (!isActive && status === 'nueva-referencia') {
      return (
        <Badge className="bg-warning/10 text-warning border-warning/20 hover:bg-warning/20">
          Nueva Referencia
        </Badge>
      );
    }
    if (isActive && status === 'empleado-activo') {
      return (
        <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/20">
          Empleado Activo
        </Badge>
      );
    }
    if (!isActive && status === 'empleado-interesado') {
      return (
        <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
          Empleado Interesado
        </Badge>
      );
    }
    return null;
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "active" && employee.isActive) ||
                         (filterStatus === "inactive" && !employee.isActive);
    
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

  const handleNewEmployee = () => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
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
            Empleados
          </h1>
          <p className="text-neutral-700 mt-1">
            Un resumen de todos los empleados. Solo los administradores pueden crear, editar o eliminar empleados.
          </p>
        </div>
        <Button 
          onClick={handleNewEmployee}
          className="bg-primary hover:bg-primary-600 text-primary-foreground gap-2 h-10 px-4 font-medium"
        >
          <Plus className="w-4 h-4" />
          Nuevo Empleado
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6 border-neutral-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-700 w-4 h-4" />
            <Input
              placeholder="Buscar por nombre, DNI o ciudad"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-neutral-200 focus:border-primary focus:ring-primary/20"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-neutral-700" />
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40 border-neutral-200">
                <SelectValue placeholder="Filtrar (1)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="inactive">Inactivos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4 text-sm text-neutral-700">
          1 a {Math.min(itemsPerPage, filteredEmployees.length)} de {filteredEmployees.length} empleados
        </div>
      </Card>

      {/* Table */}
      <Card className="border-neutral-200">
        <Table>
          <TableHeader>
            <TableRow className="border-neutral-200">
              <TableHead className="text-neutral-900 font-medium">NOMBRE</TableHead>
              <TableHead className="text-neutral-900 font-medium">ID EMPLEADO</TableHead>
              <TableHead className="text-neutral-900 font-medium">DEPARTAMENTO</TableHead>
              <TableHead className="text-neutral-900 font-medium">UBICACIÓN</TableHead>
              <TableHead className="text-neutral-900 font-medium">ACTIVO</TableHead>
              <TableHead className="text-neutral-900 font-medium">PLAN DE CARRERA</TableHead>
              <TableHead className="text-neutral-900 font-medium">ÚLTIMA EVALUACIÓN</TableHead>
              <TableHead className="text-neutral-900 font-medium">ESTADO</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedEmployees.map((employee) => (
              <TableRow key={employee.id} className="border-neutral-200 hover:bg-neutral-50">
                <TableCell className="font-medium text-foreground">
                  <div>
                    <div>{employee.name}</div>
                    <div className="text-sm text-neutral-700">{employee.phone}</div>
                  </div>
                </TableCell>
                <TableCell className="text-neutral-700">{employee.employeeId}</TableCell>
                <TableCell className="text-neutral-700">{employee.department}</TableCell>
                <TableCell className="text-neutral-700">{employee.location}</TableCell>
                <TableCell>
                  {employee.isActive ? (
                    <span className="text-success">✓</span>
                  ) : (
                    <span className="text-danger">✗</span>
                  )}
                </TableCell>
                <TableCell className="text-neutral-700">{employee.careerPlan}</TableCell>
                <TableCell className="text-neutral-700">{employee.lastEvaluation}</TableCell>
                <TableCell>
                  {getStatusBadge(employee.status, employee.isActive)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditEmployee(employee)}>
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

      <EmployeeModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        employee={editingEmployee}
      />
    </div>
  );
};

export default EmployeesTable;