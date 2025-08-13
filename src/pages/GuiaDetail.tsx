import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  FileText, 
  Download,
  Eye,
  Edit,
  Save,
  CheckCircle,
  XCircle,
  Clock,
  User,
  BookOpen,
  FileDown
} from "lucide-react";

export default function GuiaDetail() {
  const { memoriaId, materiaId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});

  // Mock data - en producción vendría de la API
  const materia = {
    id: materiaId,
    codigo: "INF001",
    nombre: "Fundamentos de Programación",
    ects: 6,
    caracter: "Obligatoria",
    curso: 1,
    semestre: 1,
    idioma: "Español",
    modalidad: "Presencial",
    docenteCoordinador: "Dr. Juan Pérez",
    cursoAcademico: "2024-25",
    
    // Datos específicos de la guía
    presentacion: "Esta asignatura introduce los conceptos fundamentales de la programación, incluyendo algoritmos básicos, estructuras de control y metodologías de desarrollo de software.",
    
    competencias: [
      "CG1 - Capacidad para concebir, redactar, organizar, planificar, desarrollar y firmar proyectos en el ámbito de la ingeniería en informática",
      "CE1 - Capacidad para diseñar, desarrollar, seleccionar y evaluar aplicaciones y sistemas informáticos"
    ],
    
    resultadosAprendizaje: [
      "RA1 - Conoce y aplica los fundamentos básicos de programación",
      "RA2 - Diseña algoritmos para resolver problemas computacionales",
      "RA3 - Implementa soluciones de software siguiendo buenas prácticas"
    ],
    
    contenidos: "1. Introducción a la programación\n2. Variables y tipos de datos\n3. Estructuras de control\n4. Funciones y procedimientos\n5. Arrays y estructuras de datos básicas\n6. Programación orientada a objetos básica",
    
    actividadesFormativas: [
      { actividad: "Clases magistrales", horas: 30 },
      { actividad: "Prácticas de laboratorio", horas: 20 },
      { actividad: "Tutorías", horas: 5 },
      { actividad: "Estudio personal", horas: 95 }
    ],
    
    sistemaEvaluacion: [
      { sistema: "Examen final", porcentaje: "60-70", descripcion: "Examen teórico-práctico" },
      { sistema: "Prácticas", porcentaje: "20-30", descripcion: "Evaluación continua de prácticas" },
      { sistema: "Participación", porcentaje: "5-15", descripcion: "Participación en clase y tutorías" }
    ],
    
    bibliografia: "Bibliografía básica:\n- Deitel, P. & Deitel, H. (2020). Java How to Program.\n- Cormen, T. et al. (2019). Introduction to Algorithms.\n\nBibliografía complementaria:\n- Martin, R. (2018). Clean Code."
  };

  const metadata = {
    ultimaModificacion: "2024-03-15T14:30:00Z",
    version: "1.2",
    estado: "REVIEW",
    generadaPor: "Sistema IA",
    revisadaPor: "Prof. Ana García",
    fechaGeneracion: "2024-03-15T12:30:00Z",
    fechaRevision: "2024-03-15T14:30:00Z"
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

  const handleSave = () => {
    // Aquí se guardarían los cambios
    setIsEditing(false);
    console.log("Guardando cambios:", editedData);
  };

  const handleApprove = () => {
    console.log("Aprobando guía...");
  };

  const handleReject = () => {
    console.log("Rechazando guía...");
  };

  const exportToPDF = () => {
    console.log("Exportando a PDF...");
  };

  const exportToWord = () => {
    console.log("Exportando a Word...");
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Link to="/memorias" className="hover:text-foreground">Memorias</Link>
        <span>/</span>
        <Link to={`/memorias/${memoriaId}`} className="hover:text-foreground">Detalle</Link>
        <span>/</span>
        <span className="text-foreground">Guía de {materia.nombre}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/memorias/${memoriaId}`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Guía de Aprendizaje - {materia.nombre}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>{materia.codigo}</span>
            <span>•</span>
            <span>{materia.ects} ECTS</span>
            <span>•</span>
            <span>{materia.caracter}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">Versión {metadata.version}</Badge>
          <Badge variant="secondary">En Revisión</Badge>
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Guardar
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => setIsEditing(true)}>
          <CardContent className="p-4 text-center">
            <Edit className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium">Editar Contenido</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={exportToPDF}>
          <CardContent className="p-4 text-center">
            <FileDown className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium">Exportar PDF</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={exportToWord}>
          <CardContent className="p-4 text-center">
            <FileText className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium">Exportar Word</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
          <CardContent className="p-4 text-center">
            <Eye className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium">Vista Previa</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="contenido" className="space-y-4">
        <TabsList>
          <TabsTrigger value="contenido">Contenido</TabsTrigger>
          <TabsTrigger value="metadatos">Metadatos</TabsTrigger>
          <TabsTrigger value="historial">Historial</TabsTrigger>
          <TabsTrigger value="acciones">Acciones</TabsTrigger>
        </TabsList>

        <TabsContent value="contenido" className="space-y-6">
          {/* Información básica */}
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Curso Académico</Label>
                {isEditing ? (
                  <Input 
                    value={materia.cursoAcademico}
                    onChange={(e) => setEditedData({...editedData, cursoAcademico: e.target.value})}
                  />
                ) : (
                  <p className="text-foreground">{materia.cursoAcademico}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Docente Coordinador</Label>
                {isEditing ? (
                  <Input 
                    value={materia.docenteCoordinador}
                    onChange={(e) => setEditedData({...editedData, docenteCoordinador: e.target.value})}
                  />
                ) : (
                  <p className="text-foreground">{materia.docenteCoordinador}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Presentación */}
          <Card>
            <CardHeader>
              <CardTitle>Presentación de la Materia</CardTitle>
              <CardDescription>
                Descripción general de la asignatura y sus objetivos
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  rows={5}
                  value={materia.presentacion}
                  onChange={(e) => setEditedData({...editedData, presentacion: e.target.value})}
                  className="resize-none"
                />
              ) : (
                <p className="text-foreground whitespace-pre-wrap">{materia.presentacion}</p>
              )}
            </CardContent>
          </Card>

          {/* Competencias */}
          <Card>
            <CardHeader>
              <CardTitle>Competencias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {materia.competencias.map((competencia, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-foreground">{competencia}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resultados de Aprendizaje */}
          <Card>
            <CardHeader>
              <CardTitle>Resultados de Aprendizaje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {materia.resultadosAprendizaje.map((resultado, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-foreground">{resultado}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contenidos */}
          <Card>
            <CardHeader>
              <CardTitle>Contenidos de la Asignatura</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  rows={8}
                  value={materia.contenidos}
                  onChange={(e) => setEditedData({...editedData, contenidos: e.target.value})}
                  className="resize-none"
                />
              ) : (
                <p className="text-foreground whitespace-pre-wrap">{materia.contenidos}</p>
              )}
            </CardContent>
          </Card>

          {/* Actividades Formativas */}
          <Card>
            <CardHeader>
              <CardTitle>Actividades Formativas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 text-sm font-medium text-muted-foreground">Actividad</th>
                      <th className="text-right p-2 text-sm font-medium text-muted-foreground">Horas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materia.actividadesFormativas.map((actividad, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2 text-sm text-foreground">{actividad.actividad}</td>
                        <td className="p-2 text-sm text-foreground text-right">{actividad.horas}h</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-b-2 border-primary">
                      <td className="p-2 text-sm font-medium text-foreground">Total</td>
                      <td className="p-2 text-sm font-medium text-foreground text-right">
                        {materia.actividadesFormativas.reduce((sum, act) => sum + act.horas, 0)}h
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Sistema de Evaluación */}
          <Card>
            <CardHeader>
              <CardTitle>Sistema de Evaluación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {materia.sistemaEvaluacion.map((sistema, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-foreground">{sistema.sistema}</h4>
                      <Badge variant="outline">{sistema.porcentaje}%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{sistema.descripcion}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bibliografía */}
          <Card>
            <CardHeader>
              <CardTitle>Bibliografía</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  rows={8}
                  value={materia.bibliografia}
                  onChange={(e) => setEditedData({...editedData, bibliografia: e.target.value})}
                  className="resize-none"
                />
              ) : (
                <p className="text-foreground whitespace-pre-wrap">{materia.bibliografia}</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metadatos">
          <Card>
            <CardHeader>
              <CardTitle>Metadatos de la Guía</CardTitle>
              <CardDescription>
                Información técnica sobre la generación y estado de la guía
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Generada:</span>
                    <span className="text-sm text-foreground">{formatDate(metadata.fechaGeneracion)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Generada por:</span>
                    <span className="text-sm text-foreground">{metadata.generadaPor}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Versión:</span>
                    <span className="text-sm text-foreground">{metadata.version}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Última modificación:</span>
                    <span className="text-sm text-foreground">{formatDate(metadata.ultimaModificacion)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Revisada por:</span>
                    <span className="text-sm text-foreground">{metadata.revisadaPor}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Estado:</span>
                    <Badge variant="secondary">En Revisión</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historial">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Versiones</CardTitle>
              <CardDescription>
                Registro de cambios y versiones de la guía
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border border-border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">Versión 1.2 (Actual)</h4>
                      <p className="text-sm text-muted-foreground">Revisión de contenidos y actualización de bibliografía</p>
                    </div>
                    <Badge variant="default">Actual</Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{formatDate(metadata.ultimaModificacion)}</span>
                    <span>•</span>
                    <span>Prof. Ana García</span>
                  </div>
                </div>
                
                <div className="border border-border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">Versión 1.1</h4>
                      <p className="text-sm text-muted-foreground">Corrección de sistema de evaluación</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>14/03/2024 16:20</span>
                    <span>•</span>
                    <span>Dr. Juan Pérez</span>
                  </div>
                </div>
                
                <div className="border border-border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">Versión 1.0</h4>
                      <p className="text-sm text-muted-foreground">Versión inicial generada automáticamente</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{formatDate(metadata.fechaGeneracion)}</span>
                    <span>•</span>
                    <span>Sistema IA</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="acciones">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Exportación */}
            <Card>
              <CardHeader>
                <CardTitle>Exportar Guía</CardTitle>
                <CardDescription>
                  Descarga la guía en diferentes formatos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" onClick={exportToPDF}>
                  <FileDown className="w-4 h-4 mr-2" />
                  Exportar como PDF
                </Button>
                <Button variant="outline" className="w-full" onClick={exportToWord}>
                  <FileText className="w-4 h-4 mr-2" />
                  Exportar como Word
                </Button>
              </CardContent>
            </Card>

            {/* Aprobación */}
            <Card>
              <CardHeader>
                <CardTitle>Control de Calidad</CardTitle>
                <CardDescription>
                  Aprobar o rechazar la guía de aprendizaje
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" onClick={handleApprove}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Aprobar Guía
                </Button>
                <Button variant="destructive" className="w-full" onClick={handleReject}>
                  <XCircle className="w-4 h-4 mr-2" />
                  Rechazar Guía
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}