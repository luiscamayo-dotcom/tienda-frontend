# MiMarketplace — Tienda Virtual de Catálogo y Pedidos (Entrega 1: Frontend)

Aplicación web frontend para la exploración de productos tecnológicos, filtrado multicriterio, gestión de carrito de compras y seguimiento de pedidos con vista diferenciada para cliente y administrador.

---

## 1. Stack Tecnológico y Justificación

| Capa | Tecnología | Justificación de la elección |
| :--- | :--- | :--- |
| **Frontend** | **Angular** | Permite organizar la aplicación por dominios (`core`, `shared`, `features`), reutilizar componentes autónomos (*Standalone*), gestionar estado reactivo con *Signals* y validar formularios en cliente mediante *Reactive Forms*. |
| **Backend (Entrega 2)** | **NestJS** | Proporciona una arquitectura modular basada en TypeScript compatible con los contratos de datos definidos en Angular, facilitando el desarrollo de una API REST estructurada y validada. |
| **Persistencia (Entrega 2)** | **PostgreSQL** | Motor relacional adecuado para garantizar integridad referencial mediante claves primarias y foráneas entre usuarios, categorías, productos y pedidos. |

---

## 2. Perfiles de Usuario y Funcionalidades Implementadas

### Perfil Cliente
* **Catálogo de productos (`/catalogo`):** Visualización de artículos con imagen de referencia, categoría, descripción, precio formateado y disponibilidad en inventario.
* **Búsqueda y filtros combinados:** Filtrado en tiempo real por nombre o descripción, categoría y rango de precio (mínimo y máximo), con estado de carga simulado y mensaje de ausencia de resultados.
* **Detalle de producto (`/producto/:id`):** Consulta individual con selector de unidades limitado al stock disponible y manejo de rutas con identificadores inexistentes.
* **Carrito de compras y checkout (`/carrito`):** Incremento, reducción y eliminación de artículos, cálculo automático de unidades y subtotal, y formulario reactivo de datos de entrega con validaciones (`required`, `minLength`, `pattern`) y comprobante de confirmación.
* **Historial de pedidos (`/mis-pedidos`):** Consulta de compras realizadas con fecha, dirección, detalle de artículos y estado del envío.

### Perfil Administrador de Catálogo
* **Gestión de pedidos (`/admin/pedidos`):** Tabla responsiva con todos los pedidos registrados y selector para actualizar su estado (`Pendiente`, `Enviado`, `Entregado`), sincronizado en tiempo real con el historial del cliente.
* **Vista de inventario (`/admin/productos`):** Listado administrativo del catálogo disponible con precios y existencias.

> **Nota sobre autenticación:** En esta primera entrega ambos perfiles son accesibles desde la barra de navegación para facilitar la evaluación de las vistas. En la **Entrega 2** se integrará la autenticación y autorización en NestJS para restringir las rutas administrativas únicamente a usuarios con rol `ADMIN`.

---

## 3. Estructura del Proyecto

```text
tienda-frontend/
└── src/
    ├── styles.css                       # Estilos globales, tipografía y paleta base
    └── app/
        ├── app.ts / app.html / app.css  # Contenedor principal con Navbar, RouterOutlet y Footer
        ├── app.routes.ts                # Definición de rutas y redirecciones
        ├── core/
        │   ├── models/
        │   │   └── marketplace.model.ts # Contratos TypeScript (Category, Product, CartItem, Order)
        │   └── services/
        │       ├── product.ts           # Catálogo y categorías simuladas
        │       ├── cart.ts              # Estado reactivo del carrito con Signals
        │       └── order.ts             # Registro y actualización de estado de pedidos en memoria
        ├── shared/
        │   └── components/
        │       ├── navbar/              # Barra de navegación con contador dinámico del carrito
        │       ├── footer/              # Pie de página institucional
        │       └── product-card/        # Tarjeta reutilizable de producto
        └── features/
            ├── catalog/                 # Catálogo, barra de filtros y detalle de producto
            ├── cart/                    # Vista de carrito, filas de ítems y formulario de entrega
            ├── orders/                  # Historial de pedidos del cliente
            └── admin/                   # Tablas administrativas de pedidos y productos
```

---

## 4. Requisitos Previos e Instrucciones de Ejecución

### Requisitos
* **Node.js:** v20.x LTS o superior.
* **npm:** v10.x o superior.
* **Angular CLI:** v19+ (`npm install -g @angular/cli`).

### Pasos para ejecutar en local
1. Clonar o descargar el repositorio y ubicarse en la carpeta del frontend:
   ```bash
   cd tienda-frontend
   ```
2. Instalar las dependencias del proyecto:
   ```bash
   npm install
   ```
3. Iniciar el servidor de desarrollo:
   ```bash
   ng serve
   ```
4. Abrir en el navegador la dirección:
   ```text
   http://localhost:4200
   ```

---

## 5. Datos Simulados y Supuestos Utilizados

### Categorías simuladas (`ProductService`)
* `1` — Periféricos
* `2` — Monitores
* `3` — Audio

### Productos simulados (`ProductService`)
| ID | Producto | Categoría | Precio (COP) | Stock inicial | Propósito en pruebas |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Teclado Mecánico RGB | Periféricos | $ 240,000 | 12 | Flujo normal de compra |
| 2 | Monitor IPS 24 pulgadas | Monitores | $ 680,000 | 5 | Filtrado por categoría y precio |
| 3 | Mouse Inalámbrico Ergonómico | Periféricos | $ 135,000 | 18 | Control de cantidades máximas |
| 4 | Audífonos Studio Over-Ear | Audio | $ 310,000 | 0 | **Caso límite:** producto agotado (`stock: 0`) |
| 5 | Monitor Curvo 27 pulgadas | Monitores | $ 1,150,000 | 3 | Filtrado por rango superior de precio |

### Pedidos iniciales (`OrderService`)
* **Pedido `#1024`:** Cliente *Laura Gómez*, dirección *Calle 12 # 4-55*, fecha `2026-11-18`, estado `Entregado`, total `$ 240,000` (1x Teclado Mecánico RGB).

### Supuestos de funcionamiento (Entrega 1)
* **Persistencia en memoria:** El carrito y los pedidos creados durante la sesión se gestionan mediante *Angular Signals*. Al recargar completamente el navegador (`F5`), el estado vuelve a los datos iniciales; la navegación debe realizarse desde los enlaces internos de la aplicación.
* **Latencia simulada:** Se incluyen retardos controlados (`300 ms` al cargar el catálogo y `500 ms` al procesar un pedido) para evidenciar los estados de carga en la interfaz.
* **Cálculo de totales:** En esta fase los subtotales se calculan en cliente; en la Entrega 2 el servidor recalculará precios y descontará stock antes de confirmar la orden.

---

## 6. Escenarios de Prueba (Casos Normales y Casos Límite)

* **Flujo normal de compra:** Filtrar productos en `/catalogo`, agregar unidades desde la tarjeta o desde `/producto/1`, ajustar cantidades en `/carrito`, completar el formulario de entrega válido, confirmar el pedido y verificar su aparición en `/mis-pedidos` y `/admin/pedidos`.
* **Cambio de estado administrativo:** Cambiar el estado del pedido recién creado en `/admin/pedidos` de `Pendiente` a `Enviado` y comprobar la actualización en `/mis-pedidos`.
* **Caso límite — Producto agotado:** Verificar que *Audífonos Studio Over-Ear* (`stock: 0`) deshabilita el botón de compra tanto en el catálogo como en `/producto/4`.
* **Caso límite — Formulario inválido:** Intentar confirmar un pedido en `/carrito` con campos vacíos, nombre menor a 3 caracteres, dirección menor a 8 caracteres o teléfono no numérico para comprobar los mensajes de error por campo.
* **Caso límite — Recurso inexistente:** Navegar a `/producto/999` para verificar el mensaje de producto no encontrado y el enlace de retorno al catálogo.
* **Caso límite — Ausencia de resultados:** Aplicar un filtro sin coincidencias en `/catalogo` o vaciar `/carrito` para comprobar los estados vacíos.