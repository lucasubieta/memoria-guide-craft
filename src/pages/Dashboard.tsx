import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  BookOpen, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Memorias",
      value: "12",
      description: "Subidas este mes",
      icon: FileText,
      trend: "+2"
    },
    {
      title: "Guías Generadas", 
      value: "148",
      description: "Guías completadas",
      icon: BookOpen,
      trend: "+15"
    },
    {
      title: "En Proceso",
      value: "8", 
      description: "Pendientes de revisión",
      icon: AlertTriangle,
      trend: "-3"
    },
    {
      title: "Aprobadas",
      value: "140",
      description: "Listas para descarga",
      icon: CheckCircle,
      trend: "+12"
    }
  ];

  const recentMemories = [
    {
      id: 1,
      filename: "Memoria_Informatica_2024.pdf",
      titulacion: "Grado en Ingeniería Informática",
      status: "COMPLETED",
      progress: 100,
      materias: 32,
      guiasGeneradas: 32
    },
    {
      id: 2,
      filename: "Memoria_ADE_2024.pdf", 
      titulacion: "Grado en Administración y Dirección de Empresas",
      status: "EXTRACTING",
      progress: 65,
      materias: 28,
      guiasGeneradas: 18
    },
    {
      id: 3,
      filename: "Memoria_Derecho_2024.pdf",
      titulacion: "Grado en Derecho",
      status: "REVIEW",
      progress: 80,
      materias: 35,
      guiasGeneradas: 28
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED": return "text-success";
      case "EXTRACTING": return "text-info";
      case "REVIEW": return "text-warning";
      case "FAILED": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "COMPLETED": return "Completada";
      case "EXTRACTING": return "Extrayendo";
      case "REVIEW": return "En Revisión";
      case "FAILED": return "Error";
      default: return "Desconocido";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Panel de control para la gestión de memorias y guías de aprendizaje
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-success">{stat.trend}</span> {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Memories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Memories List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Memorias Recientes</CardTitle>
                  <CardDescription>
                    Últimas memorias subidas y su estado de procesamiento
                  </CardDescription>
                </div>
                <Button asChild>
                  <Link to="/memorias">Ver todas</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentMemories.map((memory) => (
                <div key={memory.id} className="border border-border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-foreground">{memory.filename}</h4>
                      <p className="text-sm text-muted-foreground">{memory.titulacion}</p>
                    </div>
                    <span className={`text-sm font-medium ${getStatusColor(memory.status)}`}>
                      {getStatusText(memory.status)}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progreso</span>
                      <span className="text-foreground">{memory.progress}%</span>
                    </div>
                    <Progress value={memory.progress} className="h-2" />
                  </div>
                  
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Materias: {memory.materias}</span>
                    <span>Guías: {memory.guiasGeneradas}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
              <CardDescription>
                Operaciones frecuentes del sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full">
                <Link to="/memorias/nueva">
                  <FileText className="w-4 h-4 mr-2" />
                  Subir Nueva Memoria
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link to="/memorias">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Gestionar Memorias
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link to="/reportes">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Ver Reportes
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actividad del Sistema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-muted-foreground">Sistema operativo</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">3 usuarios activos</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Rendimiento óptimo</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}