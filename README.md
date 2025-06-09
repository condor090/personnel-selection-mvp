# Sistema Tomográfico de Selección de Personal - MVP

Sistema integral para reducir la rotación de personal mediante evaluación multidimensional de candidatos y desarrollo técnico progresivo.

## 🎯 Problema que Resuelve

- **56% de rotación anual** (70 personas en 12 meses de 133 empleados)
- Centros críticos (Constellation, Anahuac) con **140-150% de rotación** en 2 meses
- Falta de coincidencia precisa entre perfil del puesto y candidato
- Ausencia de seguimiento sistemático del desarrollo técnico

## 🚀 Características Principales

### 1. **Evaluación Tomográfica de Candidatos**
- Análisis multidimensional: Técnico, Ético-Humanístico, Creativo, Simbiosis IA, Psicométrico
- Algoritmo de matching ponderado para compatibilidad puesto-candidato
- Evaluaciones personalizadas por nivel jerárquico

### 2. **Sistema de Cintas (Belt System)**
- 7 niveles de desarrollo técnico (blanco → negro)
- Tracking de habilidades y certificaciones
- Estimación de tiempos de progresión
- Generación de códigos QR para certificación

### 3. **Puntos de Verificación con QR**
- Control de procesos críticos según "árbol de satisfacción"
- Verificación biométrica y por código QR
- Seguimiento en tiempo real del cumplimiento
- Historial de verificaciones por empleado

### 4. **Dashboard de Métricas**
- Monitoreo de rotación por ubicación
- Alertas para centros críticos
- Análisis de tendencias
- KPIs de selección y retención

## 🛠️ Stack Tecnológico

### Backend
- Node.js + Express
- PostgreSQL (Sequelize ORM)
- JWT Authentication
- Servicios: Matching Algorithm, AI Assessment

### Frontend
- React + TypeScript
- Material-UI
- React Router
- QR Code Generation

## 📦 Instalación

### Prerrequisitos
- Node.js (v14+)
- PostgreSQL (opcional para MVP - funciona sin DB)
- Git

### Clonar el repositorio
```bash
git clone https://github.com/[tu-usuario]/personnel-selection-mvp.git
cd personnel-selection-mvp
```

### Configuración del Backend
```bash
cd backend
npm install
npm start
```
El servidor correrá en `http://localhost:8091`

### Configuración del Frontend
```bash
cd frontend
npm install
npm start
```
La aplicación estará disponible en `http://localhost:3008`

## 🔐 Credenciales de Acceso

Usuario de prueba:
- Email: `admin@example.com`
- Password: `admin123`

## 📁 Estructura del Proyecto

```
personnel-selection-mvp/
├── backend/
│   ├── src/
│   │   ├── models/        # Modelos de datos
│   │   ├── routes/        # Endpoints API
│   │   ├── services/      # Lógica de negocio
│   │   └── middleware/    # Auth y validación
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/         # Componentes de página
│   │   ├── components/    # Componentes reutilizables
│   │   ├── contexts/      # Context API
│   │   └── services/      # Llamadas API
│   └── package.json
└── README.md
```

## 🚦 Próximos Pasos (Post-MVP)

1. **Integración con Base de Datos Real**
   - Configurar PostgreSQL en producción
   - Migrar datos de prueba

2. **Integración IA**
   - Conectar con servicios de IA para evaluación
   - Análisis predictivo de retención

3. **Hardware Biométrico**
   - Integración con lectores de huella
   - Dispositivos de escaneo QR

4. **Notificaciones**
   - Sistema de alertas por email
   - Notificaciones push

5. **Reportes Avanzados**
   - Exportación a PDF/Excel
   - Dashboards personalizables

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Contacto

Para preguntas o sugerencias sobre el sistema, contactar al equipo de desarrollo.

---

**Nota**: Este es un MVP (Producto Mínimo Viable) diseñado para demostrar las capacidades del sistema. La versión de producción incluirá características adicionales de seguridad, escalabilidad y personalización.