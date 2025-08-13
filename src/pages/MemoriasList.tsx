import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Search, 
  Plus, 
  Eye, 
  Download,
  Trash2,
  Filter,
  Calendar,
  User
} from "lucide-react";
import { Link } from "react-router-dom";

export default function MemoriasList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const memorias = [
    {
      id: "1",
      filename: "Memoria_Informatica_2024.pdf",
      titulacion: "Grado en Ingeniería Informática",
      uploadedBy: "Ana García",
      uploadedAt: "2024-03-15T10:30:00Z",
      status: "COMPLETED",
      progress: 100,
      materias: 32,
      guiasGeneradas: 32,
      fileSize: "2.1 MB"
    },
    {
      id: "2", 
      filename: "Memoria_ADE_2024.pdf",
      titulacion: "Grado en Administración y Dirección de Empresas",
      uploadedBy: "Carlos López",
      uploadedAt: "2024-03-14T14:20:00Z",
      status: "EXTRACTING",
      progress: 65,
      materias: 28,
      guiasGeneradas: 18,
      fileSize: "1.8 MB"
    },
    {
      id: "3",
      filename: "Memoria_Derecho_2024.pdf", 
      titulacion: "Grado en Derecho",
      uploadedBy: "María Rodríguez",
      uploadedAt: "2024-03-13T09:15:00Z",
      status: "REVIEW",
      progress: 80,
      materias: 35,
      guiasGeneradas: 28,
      fileSize: "3.2 MB"
    },
    {
      id: "4",
      filename: "Memoria_Medicina_2024.pdf",
      titulacion: "Grado en Medicina",
      uploadedBy: "David Martín",
      uploadedAt: "2024-03-12T16:45:00Z",
      status: "FAILED",
      progress: 20,
      materias: 45,
      guiasGeneradas: 0,
      fileSize: "4.5 MB"
    },
    {
      id: "5",
      filename: "Memoria_Psicologia_2024.pdf",
      titulacion: "Grado en Psicología",
      uploadedBy: "Elena Fernández",
      uploadedAt: "2024-03-11T11:30:00Z",
      status: "UPLOADED",
      progress: 0,
      materias: 0,
      guiasGeneradas: 0,
      fileSize: "2.7 MB"
    }
  ];

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "COMPLETED": return "default";
      case "EXTRACTING": return "secondary";
      case "REVIEW": return "outline";
      case "FAILED": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "COMPLETED": return "Completada";
      case "EXTRACTING": return "Extrayendo";
      case "REVIEW": return "En Revisión";
      case "FAILED": return "Error";
      case "UPLOADED": return "Subida";
      default: return "Desconocido";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit", 
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const filteredMemorias = memorias.filter(memoria => {
    const matchesSearch = memoria.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         memoria.titulacion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || memoria.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestión de Memorias</h1>
          <p className="text-muted-foreground mt-2">
            Administra las memorias académicas y su proceso de extracción
          </p>
        </div>
        <Button asChild>
          <Link to="/memorias/nueva">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Memoria
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por nombre de archivo o titulación..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="all">Todos los estados</option>
                <option value="UPLOADED">Subidas</option>
                <option value="EXTRACTING">Extrayendo</option>
                <option value="REVIEW">En Revisión</option>
                <option value="COMPLETED">Completadas</option>
                <option value="FAILED">Con Error</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Memorias Table */}
      <Card>
        <CardHeader>
          <CardTitle>Memorias ({filteredMemorias.length})</CardTitle>
          <CardDescription>
            Lista de todas las memorias subidas al sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Archivo</TableHead>
                  <TableHead>Titulación</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Progreso</TableHead>
                  <TableHead>Materias</TableHead>
                  <TableHead>Subido por</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMemorias.map((memoria) => (
                  <TableRow key={memoria.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-foreground">{memoria.filename}</div>
                        <div className="text-sm text-muted-foreground">{memoria.fileSize}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate text-foreground">
                        {memoria.titulacion}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(memoria.status)}>
                        {getStatusText(memoria.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 w-24">
                        <div className="text-sm text-foreground">{memoria.progress}%</div>
                        <Progress value={memoria.progress} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="text-foreground">{memoria.guiasGeneradas}/{memoria.materias}</div>
                        <div className="text-muted-foreground">guías</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{memoria.uploadedBy}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{formatDate(memoria.uploadedAt)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/memorias/${memoria.id}`}>
                            <Eye className="w-4 h-4" />
                          </Link>
                        </Button>
                        {memoria.status === "COMPLETED" && (
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredMemorias.length === 0 && (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No se encontraron memorias</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== "all" 
                  ? "Intenta ajustar los filtros de búsqueda" 
                  : "Sube tu primera memoria para comenzar"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}