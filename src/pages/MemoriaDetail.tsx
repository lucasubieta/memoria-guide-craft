import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  ArrowLeft,
  FileText, 
  BookOpen, 
  AlertTriangle,
  CheckCircle,
  Download,
  Eye,
  Edit,
  Calendar,
  User,
  FileCheck,
  Clock
} from "lucide-react";

export default function MemoriaDetail() {
  const { id } = useParams();

  // Mock data - en producción vendría de la API
  const memoria = {
    id: "1",
    filename: "Memoria_Informatica_2024.pdf",
    titulacion: "Grado en Ingeniería Informática",
    escuela: "Escuela Técnica Superior de Ingeniería",
    plan: "Plan 2019",
    cursoAcademico: "2024-25",
    uploadedBy: "Ana García",
    uploadedAt: "2024-03-15T10:30:00Z",
    status: "COMPLETED",
    progress: 100,
    fileSize: "2.1 MB",
    pageCount: 245,
    language: "es",
    extractionSummary: "Extracción completada correctamente. Se identificaron 32 materias.",
    metadata: {
      extractedAt: "2024-03-15T11:45:00Z",
      processingTime: "1h 15m",
      confidence: 0.95
    }
  };

  const materias = [
    {
      id: "1",
      codigo: "INF001",
      nombre: "Fundamentos de Programación",
      ects: 6,
      caracter: "Obligatoria",
      curso: 1,
      semestre: 1,
      docenteCoordinador: "Dr. Juan Pérez",
      status: "GENERATED",
      confidence: 0.98,
      guiaGenerada: true,
      fechaGeneracion: "2024-03-15T12:30:00Z"
    },
    {
      id: "2", 
      codigo: "INF002",
      nombre: "Estructuras de Datos y Algoritmos",
      ects: 6,
      caracter: "Obligatoria", 
      curso: 1,
      semestre: 2,
      docenteCoordinador: "Dra. María López",
      status: "REVIEW",
      confidence: 0.85,
      guiaGenerada: false,
      fechaGeneracion: null
    },
    {
      id: "3",
      codigo: "INF003", 
      nombre: "Bases de Datos",
      ects: 6,
      caracter: "Obligatoria",
      curso: 2,
      semestre: 1,
      docenteCoordinador: "Dr. Carlos Ruiz",
      status: "READY",
      confidence: 0.92,
      guiaGenerada: true,
      fechaGeneracion: "2024-03-15T13:15:00Z"
    }
  ];

  const errores = [
    {
      id: "1",
      tipo: "Extracción",
      materia: "Programación Avanzada",
      descripcion: "No se pudo extraer la tabla de evaluación",
      severidad: "Media",
      fecha: "2024-03-15T11:20:00Z"
    },
    {
      id: "2",
      tipo: "Validación", 
      materia: "Matemáticas I",
      descripcion: "Los porcentajes de evaluación no suman 100%",
      severidad: "Alta",
      fecha: "2024-03-15T11:25:00Z"
    }
  ];

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "GENERATED": return "default";
      case "READY": return "secondary";
      case "REVIEW": return "outline";
      case "FAILED": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "GENERATED": return "Generada";
      case "READY": return "Lista";
      case "REVIEW": return "En Revisión";
      case "FAILED": return "Error";
      default: return "Detectada";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Alta": return "text-destructive";
      case "Media": return "text-warning";
      case "Baja": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Link to="/memorias" className="hover:text-foreground">Memorias</Link>
        <span>/</span>
        <span className="text-foreground">{memoria.filename}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/memorias">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-foreground">{memoria.filename}</h1>
          <p className="text-muted-foreground">{memoria.titulacion}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="default">Completada</Badge>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Descargar Original
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Descarga Masiva
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Páginas</p>
                <p className="text-2xl font-bold text-foreground">{memoria.pageCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Materias</p>
                <p className="text-2xl font-bold text-foreground">{materias.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <div>
                <p className="text-sm font-medium text-foreground">Guías Generadas</p>
                <p className="text-2xl font-bold text-foreground">
                  {materias.filter(m => m.guiaGenerada).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              <div>
                <p className="text-sm font-medium text-foreground">Errores</p>
                <p className="text-2xl font-bold text-foreground">{errores.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Información General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Escuela:</span>
                <span className="text-sm text-foreground text-right">{memoria.escuela}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Plan:</span>
                <span className="text-sm text-foreground">{memoria.plan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Curso Académico:</span>
                <span className="text-sm text-foreground">{memoria.cursoAcademico}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Tamaño:</span>
                <span className="text-sm text-foreground">{memoria.fileSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Idioma:</span>
                <span className="text-sm text-foreground">{memoria.language.toUpperCase()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Processing Info */}
        <Card>
          <CardHeader>
            <CardTitle>Estado del Procesamiento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progreso</span>
                <span className="text-foreground">{memoria.progress}%</span>
              </div>
              <Progress value={memoria.progress} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Tiempo de procesamiento:</span>
              </div>
              <span className="text-sm text-foreground pl-6">{memoria.metadata.processingTime}</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FileCheck className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Confianza:</span>
              </div>
              <span className="text-sm text-foreground pl-6">{(memoria.metadata.confidence * 100).toFixed(1)}%</span>
            </div>
          </CardContent>
        </Card>

        {/* Upload Info */}
        <Card>
          <CardHeader>
            <CardTitle>Información de Subida</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Subido por:</span>
              </div>
              <span className="text-sm text-foreground pl-6">{memoria.uploadedBy}</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Fecha de subida:</span>
              </div>
              <span className="text-sm text-foreground pl-6">{formatDate(memoria.uploadedAt)}</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FileCheck className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Procesado:</span>
              </div>
              <span className="text-sm text-foreground pl-6">{formatDate(memoria.metadata.extractedAt)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="materias" className="space-y-4">
        <TabsList>
          <TabsTrigger value="materias">Materias ({materias.length})</TabsTrigger>
          <TabsTrigger value="errores">Errores ({errores.length})</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="materias">
          <Card>
            <CardHeader>
              <CardTitle>Materias Extraídas</CardTitle>
              <CardDescription>
                Lista de materias identificadas en la memoria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>ECTS</TableHead>
                      <TableHead>Carácter</TableHead>
                      <TableHead>Curso/Sem</TableHead>
                      <TableHead>Coordinador</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {materias.map((materia) => (
                      <TableRow key={materia.id}>
                        <TableCell className="font-medium">{materia.codigo}</TableCell>
                        <TableCell>
                          <div className="max-w-xs">
                            <div className="font-medium text-foreground">{materia.nombre}</div>
                            <div className="text-sm text-muted-foreground">
                              Confianza: {(materia.confidence * 100).toFixed(0)}%
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{materia.ects}</TableCell>
                        <TableCell>{materia.caracter}</TableCell>
                        <TableCell>{materia.curso}º / {materia.semestre}º</TableCell>
                        <TableCell>{materia.docenteCoordinador}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(materia.status)}>
                            {getStatusText(materia.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/memorias/${id}/materias/${materia.id}`}>
                                <Eye className="w-4 h-4" />
                              </Link>
                            </Button>
                            {materia.guiaGenerada && (
                              <Button variant="ghost" size="sm">
                                <Download className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errores">
          <Card>
            <CardHeader>
              <CardTitle>Errores de Procesamiento</CardTitle>
              <CardDescription>
                Errores encontrados durante la extracción
              </CardDescription>
            </CardHeader>
            <CardContent>
              {errores.length > 0 ? (
                <div className="space-y-4">
                  {errores.map((error) => (
                    <div key={error.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{error.tipo}</Badge>
                            <span className={`text-sm font-medium ${getSeverityColor(error.severidad)}`}>
                              {error.severidad}
                            </span>
                          </div>
                          <h4 className="font-medium text-foreground">{error.materia}</h4>
                          <p className="text-sm text-muted-foreground">{error.descripcion}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(error.fecha)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Sin errores</h3>
                  <p className="text-muted-foreground">
                    El procesamiento se completó sin errores
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Logs de Procesamiento</CardTitle>
              <CardDescription>
                Registro detallado del procesamiento de la memoria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-2">
                <div className="text-muted-foreground">[2024-03-15 10:30:15] Memoria subida: {memoria.filename}</div>
                <div className="text-muted-foreground">[2024-03-15 10:30:16] Iniciando análisis de estructura...</div>
                <div className="text-muted-foreground">[2024-03-15 10:32:45] Estructura identificada correctamente</div>
                <div className="text-muted-foreground">[2024-03-15 10:33:02] Iniciando extracción de materias...</div>
                <div className="text-muted-foreground">[2024-03-15 11:20:30] Materia extraída: {materias[0].nombre}</div>
                <div className="text-muted-foreground">[2024-03-15 11:22:15] Materia extraída: {materias[1].nombre}</div>
                <div className="text-muted-foreground">[2024-03-15 11:24:45] Materia extraída: {materias[2].nombre}</div>
                <div className="text-success">[2024-03-15 11:45:00] Procesamiento completado exitosamente</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}