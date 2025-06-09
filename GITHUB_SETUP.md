# Instrucciones para subir a GitHub

## 1. Crear repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre del repositorio: `personnel-selection-mvp`
3. Descripción: "Sistema Tomográfico de Selección de Personal - MVP para reducir rotación de empleados"
4. Visibilidad: Elige Público o Privado según tu preferencia
5. NO inicialices con README, .gitignore o licencia (ya los tenemos)
6. Haz clic en "Create repository"

## 2. Conectar y subir el código

Una vez creado el repositorio, GitHub te mostrará las instrucciones. Ejecuta estos comandos en la terminal:

```bash
# Si tu usuario de GitHub es 'tuusuario' y el repo es 'personnel-selection-mvp':
git remote add origin https://github.com/tuusuario/personnel-selection-mvp.git

# Cambiar la rama principal a 'main' (opcional, pero recomendado)
git branch -M main

# Subir el código
git push -u origin main
```

## 3. Configurar el repositorio

Después de subir el código:

1. Ve a Settings → Pages si quieres habilitar GitHub Pages
2. Añade topics relevantes: `react`, `nodejs`, `hr-tech`, `employee-management`
3. Configura las GitHub Actions si necesitas CI/CD

## 4. Invitar colaboradores (opcional)

Si trabajas en equipo:
1. Ve a Settings → Manage access
2. Haz clic en "Invite a collaborator"
3. Busca por username o email

## Comandos útiles de Git

```bash
# Ver el estado actual
git status

# Ver los commits realizados
git log --oneline

# Crear una nueva rama
git checkout -b feature/nueva-funcionalidad

# Cambiar entre ramas
git checkout main
git checkout feature/nueva-funcionalidad

# Actualizar tu código local con cambios remotos
git pull origin main

# Subir cambios
git add .
git commit -m "Descripción de los cambios"
git push origin main
```

## Estructura de ramas recomendada

- `main` - Rama principal estable
- `develop` - Rama de desarrollo
- `feature/*` - Ramas para nuevas características
- `bugfix/*` - Ramas para corrección de errores
- `hotfix/*` - Ramas para correcciones urgentes

---

¡Tu proyecto está listo para ser compartido con el mundo! 🚀