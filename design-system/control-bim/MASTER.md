# CONTROL BIM — Sistema de diseño (UI/UX Pro Max)

> Fuente metodológica: `nextlevelbuilder/ui-ux-pro-max-skill`, catálogo open source. Proyecto: `Juanca0795/control-tareas-bim`.
> Alcance: escritorio, tablet y móvil. El archivo `index.html` y los registros de Supabase son la fuente de verdad funcional.

## 1. Identidad y dirección seleccionada

- **Producto:** dashboard analítico de coordinación y control de tareas BIM, con métricas de cumplimiento semanal (LPS/PPC).
- **Patrones de la skill:** `Data-Dense Dashboard` + `Drill-Down Analytics`. Conservar todos los KPI, filtros, fechas, gráficos y tablas existentes.
- **Estilo:** AEC Obsidian oscuro corporativo, minimalismo funcional, alta densidad legible. No sustituir el sistema por una landing page o decoración sin función.
- **Paleta semántica existente** (no imponer nuevos valores sin revisión): fondo oscuro `#090d16`, superficie `#111726`, borde `#253048`, acento `#5da7ff`, positivo `#54e1b7`, advertencia `#ffc773`, crítico `#ff8b98`.
- **Tipografía:** Inter para etiquetas y textos; JetBrains Mono para cifras y códigos BIM. Corregir discrepancias de tamaño dentro de un mismo rol; no reducir indiscriminadamente los microtextos.

## 2. Componentes y contenido no negociables

1. Barra de navegación **superior**, tres pestañas (Dashboard, Control de tareas, Control semanal), botón claro/oscuro, configuración, nueva tarea y respaldo exclusivo de Control Semanal.
2. Dashboard y Control de tareas comparten los **seis indicadores**: total entregables, avance promedio, completadas, en ejecución, vencidas/hoy y PPC semanal.
3. Dashboard conserva Salud Operativa BIM, Tareas con Prioridad, Carga y Desempeño por Colaborador BIM y Matriz Operativa: Paquetes × Disciplina, incluidos sus desgloses.
4. Salud BIM diferencia categorías por **color + nombre + valor**, incluidos los vencidos; no ocultar estados para simplificar el donut.
5. Control de tareas: filtros arriba y tabla detallada a ancho disponible; en móvil, representación accesible en tarjetas.
6. Control semanal: línea de tiempo navegable, filtros, compromisos, seis KPI semanales, evolución PPC frente a meta LPS, análisis de causas. Mantener la protección de acceso.
7. No inventar cifras. Mostrar estados vacíos explícitos; cuando haya datos reales, reflejar siempre los de Supabase.

## 3. Interacciones y movimiento

- **Hover de tarjetas:** 150–250 ms, elevación discreta de 1–3 px, sin modificar alturas de fila ni mover la tabla. `focus-visible` igual de claro; no depender del hover en móvil.
- **Cambios de pestaña:** los cuadros **no deben aparecer/desaparecer** como efecto; los números cuentan rápidamente del 0 al valor real y las barras se llenan hasta su ancho real. Mantener precisión decimal y sufijo `%`.
- **Duración de KPI:** aproximadamente 650–800 ms, aceleración inicial y desaceleración final. Cancelar/restaurar valores si cambia de vista rápidamente.
- **Gráficos:** animar sus segmentos desde cero al entrar, y permitir inspección con foco/tooltip. Un efecto visual no constituye un cambio de datos.
- **Accesibilidad:** `prefers-reduced-motion` cancela o reduce animaciones, elementos interactivos con nombre accesible, estados no expresados únicamente por color.

## 4. Gráficos y legibilidad

- Para **PPC frente a una meta** usar barra de progreso/bullet o línea histórica con la meta 85% claramente rotulada; no utilizar donut si hay muchas series comparables.
- Para **Salud BIM** usar anillo por estados y leyenda con cantidades exactas; compensar los colores con etiquetas.
- Para **carga de responsables** usar barras comparables, con nombre completo y proporción visible; conservar el desglosado al seleccionar.
- Para **matriz paquetes × disciplinas** conservar scroll interno cuando lo exija la densidad, sin forzar scroll de toda la página.
- Formatear datos ausentes con raya o explicación, nunca como 0 verificable.

## 5. Responsive

- Referencias de revisión: 375/390 px (teléfono), 768 px (tablet vertical), 1024 px (tablet horizontal), 1440 px (escritorio).
- Mantener la navegación superior operable; no solapar con acciones. Permitir reordenar paneles, sin descartar contenido.
- Etiquetas largas, badges y nombres completos deben envolverse sin recortes ni saltos horizontales del documento.
- Botones táctiles con área de interacción suficiente; usar estados visuales equivalentes sin cursor.

## 6. Comprobaciones antes de publicar

- [ ] No cambió el esquema ni la persistencia de Supabase.
- [ ] Se conservaron los KPI, filtros, gráficos, accesos y desgloses.
- [ ] Los contadores regresan al valor real después de cada animación o interrupción.
- [ ] Barra/legend/tooltips anuncian el dato textual además del color.
- [ ] Vista clara y oscura verificadas, con contraste legible.
- [ ] `prefers-reduced-motion`, foco de teclado, touch y 375/768/1024/1440 px revisados.
- [ ] Verificar primero con datos simulados y después en despliegue, sin sobrescribir datos reales.

## 7. Consultas con la skill instalada

```powershell
python .agents/skills/ui-ux-pro-max/scripts/search.py "analytics dashboard data dense" --domain style
python .agents/skills/ui-ux-pro-max/scripts/search.py "progress chart target dashboard" --domain chart
python .agents/skills/ui-ux-pro-max/scripts/search.py "reduced motion animation" --domain ux
python .agents/skills/ui-ux-pro-max/scripts/search.py "hover card" --domain gsap
python .agents/skills/ui-ux-pro-max/scripts/search.py "BIM project analytics dashboard" --design-system -p "Control BIM"
```

Para guardar el sistema generado como fuente de verdad, consultar antes este MASTER; no sobrescribirlo por `--persist --force` sin autorización expresa.

**Licencia:** MIT. Archivos upstream incluidos en `.agents/skills/ui-ux-pro-max/`, de nextlevelbuilder.
