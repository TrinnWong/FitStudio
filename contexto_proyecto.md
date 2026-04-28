# Contexto del Proyecto: FitStudio

## Descripción General
**FitStudio** es una plataforma SaaS (Software as a Service) multi-tenant diseñada para la gestión integral de estudios de fitness, gimnasios o centros de entrenamiento (ej. Yoga, Pilates, Crossfit, etc.). La plataforma permite a los dueños de estudios gestionar a sus clientes, membresías, venta de paquetes de créditos, programación de clases (horarios), reservas de clases y procesamiento de pagos.

## Arquitectura
El proyecto backend está construido en **.NET 9.0** y sigue los principios de la **Arquitectura Limpia (Clean Architecture)**. Esto asegura una separación clara de responsabilidades, facilitando el mantenimiento y la escalabilidad del sistema. El código se divide en las siguientes capas (proyectos):

1. **FitStudio.Domain (Dominio)**: Contiene la lógica central del negocio y las entidades base. No tiene dependencias de infraestructura ni frameworks externos.
2. **FitStudio.Application (Aplicación)**: Contiene los casos de uso del sistema, Interfaces de servicios (ej. `IAuthService`, `IPaymentService`), DTOs (Data Transfer Objects) y perfiles de mapeo (AutoMapper).
3. **FitStudio.Infrastructure (Infraestructura)**: Implementa las interfaces definidas en la capa de aplicación. Contiene la configuración de base de datos con Entity Framework Core, lógica de encriptación (`EncryptionService`), migraciones y servicios externos.
4. **FitStudio.Api (Presentación/API)**: El punto de entrada de la aplicación. Expone controladores REST (`AuthController`, `PaymentController`), configura la inyección de dependencias y maneja las peticiones HTTP.

## Entidades Principales (Modelo de Datos)
El sistema está diseñado de forma multi-tenant, donde múltiples estudios comparten la misma base de datos, separados lógicamente por un `StudioId`.
- **Studio**: Entidad raíz que representa el centro de fitness. Posee su configuración de cuenta, Stripe ID, etc.
- **User**: Usuarios administrativos o dueños del estudio.
- **Client**: Clientes finales del estudio. Llevan un registro de sus "Créditos" disponibles y estado de cuenta.
- **Membership**: Paquetes o planes de pago configurables por el estudio (ej. "10 Clases al mes", "Mensualidad Libre"). Tienen un precio y una cantidad de créditos asociados.
- **Schedule**: Horarios programados para clases específicas (ej. "Clase de Pilates a las 7:00 AM"). Tienen capacidad máxima y asientos disponibles.
- **Booking**: Representa la reserva de un cliente para una clase específica (`Schedule`).
- **Payment**: Registro de transacciones de pagos realizadas por los clientes al adquirir membresías.

## Stack Tecnológico y Dependencias Clave
- **Framework**: .NET 9.0 (ASP.NET Core Web API)
- **Base de Datos**: SQL Server
- **ORM**: Entity Framework Core 9.0
- **Mapeo de Objetos**: AutoMapper
- **Autenticación**: JSON Web Tokens (JWT)
- **Integraciones Previstas**: 
  - *Stripe*: Para el procesamiento de pagos (configurado en variables de entorno).
  - *OneSignal*: Para notificaciones push a los usuarios (configurado en variables de entorno).
