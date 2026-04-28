# Historial de Cambios del Proyecto (LOG_PROYECT)

Este documento registra el historial de cambios y evolución del proyecto FitStudio en orden ascendente (desde lo más antiguo a lo más reciente).

## 1. Configuración Inicial y Arquitectura
- Creación de la solución **FitStudio** en .NET 9.0.
- Estructuración del proyecto siguiendo los principios de la **Arquitectura Limpia (Clean Architecture)** con la creación de los 4 proyectos principales:
  - `FitStudio.Domain`
  - `FitStudio.Application`
  - `FitStudio.Infrastructure`
  - `FitStudio.Api`

## 2. Definición del Modelo de Dominio
- Implementación de la entidad base `BaseEntity` para control de `Id`, `CreatedAt` y `UpdatedAt`.
- Creación de las entidades principales que soportan el modelo multi-tenant:
  - `Studio` (Entidad principal para cada negocio/sucursal).
  - `User`, `Client` (Usuarios del sistema y clientes finales).
  - `Membership` (Planes de pago y créditos).
  - `Schedule`, `Booking` (Clases y reservaciones).
  - `Payment` (Registro de pagos).

## 3. Capa de Aplicación (Application)
- Creación de interfaces de servicios fundamentales: `IAuthService`, `IMembershipService`, `INotificationService`, `IPaymentService`.
- Implementación de Data Transfer Objects (DTOs) para entrada y salida de datos (`AuthDtos.cs`, `ClientDtos.cs`).
- Configuración de AutoMapper (`MappingProfile.cs`) para transformar entre Entidades y DTOs automáticamente.

## 4. Capa de Infraestructura (Infrastructure) y Persistencia
- Configuración de Entity Framework Core mediante el DbContext `FitStudioDbContext`.
- Configuración de relaciones y llaves foráneas (`HasForeignKey`, `HasOne`, `WithMany`) para todas las entidades dentro del DbContext.
- Implementación de servicios concretos de negocio: `AuthService` (autenticación JWT), `MembershipService`, `PaymentService`.
- Creación del servicio de encriptación `EncryptionService` para el manejo de credenciales.

## 5. API y Controladores
- Configuración de `Program.cs` en `FitStudio.Api` con inyección de dependencias, lectura de configuraciones (`appsettings.json`) y parámetros de entorno.
- Implementación del `AuthController` para el registro y autenticación de usuarios.
- Implementación del `PaymentController` como punto de entrada para procesamiento de pagos.

## 6. Resolución de Problemas de Base de Datos y Modelado (EF Core)
- **Problema de "Multiple Cascade Paths"**: Se detectó que al eliminar un `Studio`, se eliminaban los `Schedules` y `Clients` simultáneamente, lo que generaba dos rutas de eliminación en cascada hacia la tabla `Bookings` (SQL Server bloqueaba esto). 
  - *Solución*: Se ajustó la configuración en `FitStudioDbContext` estableciendo `DeleteBehavior.Restrict` para la relación entre `Booking` y `Schedule`.
- **Advertencias de Truncamiento**: Se resolvieron advertencias de validación de EF Core definiendo explícitamente el tipo de columna `decimal(18,2)` para las propiedades monetarias `Membership.Price` y `Payment.Amount`.
- Se generó la migración inicial (`20260427235756_InitialCreate`) aplicando exitosamente este nuevo diseño a la base de datos de desarrollo mediante `dotnet ef database update`.
- **Implementación de Flujo de Registro y Verificación**:
  - Creación de `Register` y `VerifyCode` en `AuthService` y `AuthController`.
  - Integración con **OneSignal** mediante `NotificationService` para envío de códigos por email.
  - Implementación de la entidad `VerificationCode` para persistencia de OTPs en base de datos.
  - Ajuste en la lógica de registro para permitir nombres de estudios duplicados pero mantener emails de usuario únicos.
  - Aplicación de migraciones `AddVerificationCodes` y `RemoveUniqueStudioSlug`.
- **Mejoras en API y Frontend**:
  - Configuración de políticas de **CORS** en el backend para permitir peticiones desde el frontend Ionic.
  - Implementación de páginas de Login, Registro, Verificación y Términos en el portal Admin con diseño premium.
  - Corrección de ruteo anidado en el sistema de navegación por pestañas (tabs).
  - Configuración de logs detallados en el frontend para seguimiento del proceso de autenticación.
