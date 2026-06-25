# Salida de Gozo · Cuenta atrás

Web-app estática (HTML + CSS + JS puro, sin dependencias ni build) que
muestra la cuenta atrás de "Salida de Gozo": 365 días en total. A día de
hoy (25 de junio de 2026) quedan **336 días**, hasta el **27 de mayo de
2027**.

## Archivos

```
index.html   estructura de la página
style.css    estilos
script.js    lógica de la cuenta atrás (fechas, barra de progreso)
```

## Publicarla en GitHub Pages

1. Crea un repositorio nuevo en GitHub (o usa uno existente) y sube estos
   tres archivos a la raíz (o a una carpeta, por ejemplo `/docs`).
2. En el repositorio, ve a **Settings → Pages**.
3. En **Build and deployment → Source**, elige **Deploy from a branch**.
4. Selecciona la rama (`main`) y la carpeta (`/root` o `/docs`, según donde
   subiste los archivos) y guarda.
5. Al cabo de un minuto, GitHub te dará una URL del tipo
   `https://tu-usuario.github.io/tu-repositorio/`. Esa es tu cuenta atrás.

No hace falta nada más: no usa frameworks, no necesita `npm install` ni
proceso de compilación.

## Cómo funciona

- El número grande es siempre **los días que quedan hasta el 27 de mayo de
  2027**. Se recalcula a partir de la fecha actual del visitante, así que
  la cifra baja sola día a día sin que tengas que tocar nada.
- La barra debajo del número es una representación visual del progreso
  (días transcurridos frente al total de 365), siempre en una sola línea.
- La página es solo de visualización: no tiene botones ni controles, no
  guarda nada en el navegador.

## Estilos

- Colores (4 en total):
  - Fondo: `#0A2E35`
  - Variación de fondo / textura: `#225C67`
  - Color primario (número y barra de progreso): `#31FF1E`
  - Texto: `#F4F7EC`
- Tipografía: **JetBrains Mono** (única familia usada en toda la página,
  cargada desde Google Fonts).

## Personalizar fechas

Si en algún momento quieres reutilizar esta misma app para otra cuenta
atrás, solo tienes que editar tres constantes al principio de `script.js`:

```js
var TOTAL_DAYS = 365;                   // duración total del proyecto
var START_DATE = new Date(2026, 4, 27); // fecha real de inicio (mes en base 0: 4 = mayo)
var TARGET_DATE = new Date(2027, 4, 27); // fecha límite
```

(Recuerda que en JavaScript los meses se cuentan desde 0: enero = 0,
mayo = 4, diciembre = 11.)
