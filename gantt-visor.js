const VGG_CSS = `
#bim-gantt-overlay{position:fixed;inset:0;background:rgba(4,9,20,.82);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);z-index:99990;display:flex;align-items:center;justify-content:center;padding:12px;box-sizing:border-box}
#bim-gantt-overlay[hidden]{display:none!important}
#bim-gantt-overlay *{box-sizing:border-box}
#bim-gantt-modal{display:flex;flex-direction:column;width:min(97vw,1820px);height:min(94dvh,1120px);min-width:0;max-height:100dvh;overflow:hidden;border:1px solid var(--border-strong,#334155);border-radius:16px;background:var(--bg-panel,#10182a);color:var(--ink-primary,#f8fafc);box-shadow:0 24px 80px rgba(0,0,0,.55)}
#bim-gantt-modal.max{width:100vw;height:100dvh;border-radius:0;border:0}
#bim-gantt-overlay:has(#bim-gantt-modal.max){padding:0}

.vgg-header{padding:12px 18px;display:flex;align-items:center;justify-content:space-between;gap:12px;border-bottom:1px solid var(--border-base,#253048);background:rgba(13,19,32,.88)}
html[data-theme="light"] .vgg-header{background:rgba(248,250,252,.96)}
.vgg-header h2{font-family:'Space Grotesk',Inter,sans-serif;font-size:14px;font-weight:800;margin:0 0 3px;letter-spacing:.015em;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.vgg-source-badge{font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:600;padding:2px 8px;border-radius:999px;background:rgba(59,130,246,.15);color:#60a5fa;border:1px solid rgba(59,130,246,.35)}
.vgg-source-badge.imported{background:rgba(16,185,129,.15);color:#34d399;border-color:rgba(16,185,129,.35)}
html[data-theme="light"] .vgg-source-badge{background:#eff6ff;color:#1d4ed8;border-color:#bfdbfe}
html[data-theme="light"] .vgg-source-badge.imported{background:#ecfdf5;color:#047857;border-color:#a7f3d0}
.vgg-header p{font-size:11px;color:var(--ink-secondary,#aab6ca);margin:0;line-height:1.45}
.vgg-header-actions{display:flex;align-items:center;gap:7px;flex-wrap:wrap;flex-shrink:0}
.vgg-header-actions button{height:32px;padding:0 11px;background:var(--bg-subtle,#1e293b);color:var(--ink-primary,#f8fafc);border:1px solid var(--border-base,#334155);border-radius:8px;cursor:pointer;font-size:11px;font-weight:600;display:inline-flex;align-items:center;gap:5px;transition:background-color .15s,border-color .15s,color .15s}
.vgg-header-actions button:hover{border-color:var(--accent-blue,#5da7ff);background:var(--bg-hover,#1a2333)}
.vgg-header-actions button[data-vgg-action="today"]{border-color:rgba(93,167,255,.45);color:var(--accent-blue,#60a5fa)}
.vgg-header-actions button[data-vgg-action="import-excel"]{border-color:rgba(52,211,153,.42);color:#34d399}
html[data-theme="light"] .vgg-header-actions button[data-vgg-action="import-excel"]{color:#047857;border-color:#6ee7b7}
.vgg-header-actions button[data-vgg-action="restore-excel"]{border-color:rgba(245,158,11,.42);color:#fbbf24}
.vgg-header-actions button[hidden]{display:none!important}

.vgg-controls{padding:9px 18px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;border-bottom:1px solid var(--border-base,#253048);position:relative;z-index:3;overflow:visible}
.vgg-controls label{font-size:11px;font-weight:500;color:var(--ink-secondary,#cbd5e1);display:inline-flex;gap:5px;align-items:center}
.vgg-controls select,.vgg-controls input[type=search]{max-width:168px;height:31px;border:1px solid var(--border-base,#334155);border-radius:8px;padding:4px 8px;background:var(--bg-subtle,#1e293b);font-size:11px;color:var(--ink-primary,#f8fafc);transition:border-color .15s,box-shadow .15s}
.vgg-controls input[type=search]{width:165px}
.vgg-controls input[type=checkbox]{accent-color:#5da7ff;cursor:pointer}
.vgg-controls select.vgg-filter-active,.vgg-controls input.vgg-filter-active{border-color:var(--accent-blue,#5da7ff);box-shadow:0 0 0 1px rgba(93,167,255,.35)}
.vgg-tool-btn{height:31px;padding:0 10px;border-radius:8px;border:1px solid var(--border-base,#334155);background:var(--bg-subtle,#1e293b);color:var(--ink-primary,#f8fafc);font-size:11px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:5px}
.vgg-tool-btn:hover{border-color:var(--accent-blue,#5da7ff)}
.vgg-reset-btn{height:31px;padding:0 10px;border-radius:8px;border:1px solid rgba(93,167,255,.4);background:rgba(59,130,246,.14);color:var(--accent-blue,#60a5fa);font-size:11px;font-weight:600;cursor:pointer}
.vgg-reset-btn:hover{background:rgba(59,130,246,.24)}
.vgg-reset-btn[hidden]{display:none!important}
.vgg-theme-toggle{height:31px;padding:0 9px;border-radius:8px;border:1px solid var(--border-base,#334155);background:var(--bg-subtle,#1e293b);cursor:pointer;user-select:none}
.vgg-count{margin-left:auto;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;color:var(--ink-secondary,#94a3b8)}

/* Scroll y tabla: grilla Gantt limpia estilo ejecutivo (celdas blancas por defecto) */
.vgg-scroll{flex:1;min-height:0;overflow:auto;overscroll-behavior:contain;background:#f8fafc;scrollbar-width:thin;position:relative}
.vgg-table{border-collapse:separate;border-spacing:0;table-layout:fixed;width:max-content;font-family:Inter,Arial,sans-serif;font-size:11px;color:#1e293b;background:#fff}
.vgg-table th,.vgg-table td{border-bottom:1px solid #e2e8f0;border-right:1px solid #edf2f7;padding:4px 7px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;height:30px}

/* Mejora #1: Sticky real de cabeceras (3 filas) y columnas congeladas a la izquierda */
.vgg-table thead th{position:sticky;color:#f8fafc;text-align:center;background:#16243d;font-weight:700;z-index:10;border-right-color:rgba(255,255,255,.10);border-bottom-color:rgba(255,255,255,.10)}
.vgg-table thead .vgg-week th{top:0;height:26px;font-size:11px;letter-spacing:.04em}
.vgg-table thead .vgg-date th{top:26px;height:22px;font-family:'JetBrains Mono',monospace;font-size:10.5px}
.vgg-table thead .vgg-weekday th{top:48px;height:22px;font-size:10px;opacity:.92}
.vgg-table thead th.vgg-meta{top:0;z-index:16}
.vgg-table .vgg-sticky-col{position:sticky;z-index:6}
.vgg-table thead .vgg-sticky-col{z-index:18}
.vgg-table .vgg-sticky-last{border-right:2px solid #94a3b8!important;box-shadow:6px 0 12px -6px rgba(15,23,42,.22)}

.vgg-table tbody tr.vgg-activity td{background:#ffffff}
.vgg-table tbody tr.vgg-activity.vgg-row-alt td{background:#f8fafc}
.vgg-table tbody tr.vgg-activity:hover td:not(.weekend):not(.holiday):not(.day-off){background:#eff6ff!important}
.vgg-table tbody tr.vgg-activity{cursor:pointer}

/* Mejora #3: Filas colapsables de Responsable y Grupo */
.vgg-table tr.vgg-owner-row{cursor:pointer}
.vgg-table tr.vgg-owner-row td{background:#172b4d;color:#f8fafc;font-weight:800;border-top:2px solid #0f1f3a;border-bottom:1px solid #0f1f3a;letter-spacing:.03em;height:32px}
.vgg-table tr.vgg-owner-row:hover td{background:#1e3a5f}
.vgg-table tr.vgg-group-row{cursor:pointer}
.vgg-table tr.vgg-group-row td{background:#f1f5f9;color:#1e3a5f;font-weight:700;border-top:1px solid #cbd5e1;border-bottom:1px solid #cbd5e1}
.vgg-table tr.vgg-group-row:hover td{background:#e2e8f0}
.vgg-chevron{display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;margin-right:6px;font-size:10px;border-radius:4px;background:rgba(148,163,184,.22);transition:transform .15s ease}
.vgg-table tr.vgg-owner-row .vgg-chevron{background:rgba(255,255,255,.16);color:#fff}
.vgg-row-badge{margin-left:8px;font-family:'JetBrains Mono',monospace;font-size:9.5px;font-weight:600;padding:1px 7px;border-radius:999px;background:rgba(30,58,95,.12);color:#334155}
.vgg-table tr.vgg-owner-row .vgg-row-badge{background:rgba(255,255,255,.16);color:#e2e8f0}

.vgg-table .vgg-id{font-weight:800;color:#2563eb;text-align:center;font-family:'JetBrains Mono',monospace;font-size:10.5px}
.vgg-table .vgg-center{text-align:center}
.vgg-table .vgg-day{padding:0;position:relative;vertical-align:middle}

/* Cabeceras de semanas alternas limpias */
.vgg-table thead tr.vgg-week th.excel-week-dark,
.vgg-table thead tr.vgg-date th.excel-week-dark,
.vgg-table thead tr.vgg-weekday th.excel-week-dark{background:#17253f;color:#f8fafc}
.vgg-table thead tr.vgg-week th.excel-week-light,
.vgg-table thead tr.vgg-date th.excel-week-light,
.vgg-table thead tr.vgg-weekday th.excel-week-light{background:#e2e8f0;color:#1e293b;border-right-color:#cbd5e1;border-bottom-color:#cbd5e1}
.vgg-table thead tr.vgg-date th.nonwork,
.vgg-table thead tr.vgg-weekday th.nonwork{color:#e11d48!important;font-weight:800}
.vgg-table thead tr.vgg-date th.weekend-header,
.vgg-table thead tr.vgg-weekday th.weekend-header{background:#fff1f2!important;color:#be123c!important;font-weight:800}
.vgg-table thead tr.vgg-date th.holiday-header,
.vgg-table thead tr.vgg-weekday th.holiday-header{background:#ffe4e6!important;color:#9f1239!important}
.vgg-table thead tr.vgg-date th.today-header,
.vgg-table thead tr.vgg-weekday th.today-header{background:#2563eb!important;color:#ffffff!important;box-shadow:inset 0 -2px 0 #93c5fd}

/* Días no laborables sutiles (no compiten con las barras) */
.vgg-table tbody td.vgg-day.weekend{background:#fff5f6!important}
.vgg-table tbody td.vgg-day.holiday{background:#ffe4e6!important}
.vgg-table tbody tr.vgg-activity td.vgg-day.day-off,
.vgg-table tbody tr.vgg-activity:hover td.vgg-day.day-off{background:#f3ecff!important}
.vgg-table tbody tr.vgg-group-row td.vgg-day.weekend,
.vgg-table tbody tr.vgg-group-row td.vgg-day.holiday,
.vgg-table tbody tr.vgg-group-row td.vgg-day.day-off{background:#f1f5f9!important}

/* Barras Gantt modernas y continuas (sin cortes cuadriculados) */
.vgg-table tbody td.vgg-day.scheduled{border-right-color:transparent}
.vgg-table tbody td.vgg-day.scheduled.bar-end{border-right-color:#edf2f7}
.vgg-bar-seg{
  display:flex;align-items:center;justify-content:center;
  height:20px;margin:0;width:100%;
  background:linear-gradient(180deg,#4f83cc 0%,#3b6db5 100%);
  box-shadow:0 1px 2px rgba(15,23,42,.18);
  border-right:1px solid rgba(255,255,255,.22);
  transition:filter .15s ease,transform .15s ease
}
.vgg-day.bar-start .vgg-bar-seg{border-top-left-radius:6px;border-bottom-left-radius:6px;margin-left:2px;width:calc(100% - 2px)}
.vgg-day.bar-end .vgg-bar-seg{border-top-right-radius:6px;border-bottom-right-radius:6px;border-right:0;margin-right:2px;width:calc(100% - 2px)}
.vgg-day.bar-start.bar-end .vgg-bar-seg{margin-left:2px;margin-right:2px;width:calc(100% - 4px)}

.vgg-bar-seg.done{background:linear-gradient(180deg,#14b89a 0%,#0d947b 100%)}
.vgg-bar-seg.partial{background:linear-gradient(90deg,#10b981 0%,#10b981 var(--vgg-real-fill),#4679c2 var(--vgg-real-fill),#4679c2 100%)}
.vgg-bar-seg.late{background:linear-gradient(180deg,#e5a13e 0%,#c98324 100%)}
.vgg-table tbody tr.vgg-activity:hover .vgg-bar-seg{filter:brightness(1.07)}
.vgg-cell-percent{font:700 8.5px/1 'JetBrains Mono',Inter,sans-serif;color:#ffffff;letter-spacing:-.2px;font-variant-numeric:tabular-nums;text-shadow:0 1px 1px rgba(0,0,0,.22)}

/* Barra Resumen de Grupo estilizada (delgada con remates estilo MS Project) */
.vgg-group-bar{
  display:block;height:8px;width:100%;
  background:linear-gradient(180deg,#1e3a5f 0%,#132945 100%);
  position:relative
}
.vgg-day.bar-start .vgg-group-bar{border-top-left-radius:4px;border-bottom-left-radius:4px;margin-left:2px;width:calc(100% - 2px)}
.vgg-day.bar-end .vgg-group-bar{border-top-right-radius:4px;border-bottom-right-radius:4px;margin-right:2px;width:calc(100% - 2px)}
.vgg-day.bar-start.bar-end .vgg-group-bar{margin-left:2px;margin-right:2px;width:calc(100% - 4px)}
.vgg-day.bar-start .vgg-group-bar::before{content:"";position:absolute;left:0;bottom:-4px;width:0;height:0;border-left:5px solid #132945;border-bottom:4px solid transparent}
.vgg-day.bar-end .vgg-group-bar::after{content:"";position:absolute;right:0;bottom:-4px;width:0;height:0;border-right:5px solid #132945;border-bottom:4px solid transparent}

.vgg-table .vgg-title{overflow:hidden;text-overflow:ellipsis}

/* Mejora #6: Fila seleccionada, Predecesora y Sucesora */
.vgg-table tbody tr.vgg-activity.vgg-selected td:not(.weekend):not(.holiday):not(.day-off){background:#dbeafe!important}
.vgg-table tbody tr.vgg-activity.vgg-selected td:first-child{box-shadow:inset 4px 0 0 #2563eb}
.vgg-table tbody tr.vgg-activity.vgg-predecessor td:not(.weekend):not(.holiday):not(.day-off){background:#fef3c7!important}
.vgg-table tbody tr.vgg-activity.vgg-predecessor td:first-child{box-shadow:inset 4px 0 0 #f59e0b}
.vgg-table tbody tr.vgg-activity.vgg-successor td:not(.weekend):not(.holiday):not(.day-off){background:#cffafe!important}
.vgg-table tbody tr.vgg-activity.vgg-successor td:first-child{box-shadow:inset 4px 0 0 #06b6d4}

/* Mejora #5: Modo Oscuro opcional para la grilla Gantt (celdas blancas clásicas por defecto) */
#bim-gantt-modal.vgg-dark-table .vgg-scroll{background:#0b1120}
#bim-gantt-modal.vgg-dark-table .vgg-table{background:#0f172a;color:#e2e8f0}
#bim-gantt-modal.vgg-dark-table .vgg-table th,
#bim-gantt-modal.vgg-dark-table .vgg-table td{border-bottom-color:#1e293b;border-right-color:#1e293b}
#bim-gantt-modal.vgg-dark-table .vgg-table tbody tr.vgg-activity td{background:#0f172a}
#bim-gantt-modal.vgg-dark-table .vgg-table tbody tr.vgg-activity.vgg-row-alt td{background:#131d31}
#bim-gantt-modal.vgg-dark-table .vgg-table tbody tr.vgg-activity:hover td:not(.weekend):not(.holiday):not(.day-off){background:#1c2a44!important}
#bim-gantt-modal.vgg-dark-table .vgg-table tr.vgg-group-row td{background:#17253f;color:#e2e8f0;border-color:#263959}
#bim-gantt-modal.vgg-dark-table .vgg-table tr.vgg-group-row .vgg-row-badge{background:rgba(255,255,255,.14);color:#cbd5e1}
#bim-gantt-modal.vgg-dark-table .vgg-group-bar{background:linear-gradient(180deg,#60a5fa 0%,#3b82f6 100%)}
#bim-gantt-modal.vgg-dark-table .vgg-day.bar-start .vgg-group-bar::before{border-left-color:#3b82f6}
#bim-gantt-modal.vgg-dark-table .vgg-day.bar-end .vgg-group-bar::after{border-right-color:#3b82f6}
#bim-gantt-modal.vgg-dark-table .vgg-table .vgg-id{color:#93c5fd}
#bim-gantt-modal.vgg-dark-table .vgg-table thead tr.vgg-week th.excel-week-light,
#bim-gantt-modal.vgg-dark-table .vgg-table thead tr.vgg-date th.excel-week-light,
#bim-gantt-modal.vgg-dark-table .vgg-table thead tr.vgg-weekday th.excel-week-light{background:#23324d;color:#e2e8f0;border-color:#2c3e5e}
#bim-gantt-modal.vgg-dark-table .vgg-table thead tr.vgg-date th.weekend-header,
#bim-gantt-modal.vgg-dark-table .vgg-table thead tr.vgg-weekday th.weekend-header{background:#3b1824!important;color:#fda4af!important}
#bim-gantt-modal.vgg-dark-table .vgg-table thead tr.vgg-date th.holiday-header,
#bim-gantt-modal.vgg-dark-table .vgg-table thead tr.vgg-weekday th.holiday-header{background:#4c1d2e!important;color:#fecdd3!important}
#bim-gantt-modal.vgg-dark-table .vgg-table tbody td.vgg-day.weekend,
#bim-gantt-modal.vgg-dark-table .vgg-table tbody td.vgg-day.holiday{background:#21141e!important}
#bim-gantt-modal.vgg-dark-table .vgg-table tbody tr.vgg-activity td.vgg-day.day-off{background:#221a38!important}
#bim-gantt-modal.vgg-dark-table .vgg-table tbody tr.vgg-group-row td.vgg-day.weekend,
#bim-gantt-modal.vgg-dark-table .vgg-table tbody tr.vgg-group-row td.vgg-day.holiday,
#bim-gantt-modal.vgg-dark-table .vgg-table tbody tr.vgg-group-row td.vgg-day.day-off{background:#17253f!important}
#bim-gantt-modal.vgg-dark-table .vgg-table tbody tr.vgg-activity.vgg-selected td:not(.weekend):not(.holiday):not(.day-off){background:#1b3256!important}
#bim-gantt-modal.vgg-dark-table .vgg-table tbody tr.vgg-activity.vgg-predecessor td:not(.weekend):not(.holiday):not(.day-off){background:rgba(245,158,11,.18)!important}
#bim-gantt-modal.vgg-dark-table .vgg-table tbody tr.vgg-activity.vgg-successor td:not(.weekend):not(.holiday):not(.day-off){background:rgba(6,182,212,.16)!important}
#bim-gantt-modal.vgg-dark-table .vgg-empty-state{background:#0b1120;color:#cbd5e1}
#bim-gantt-modal.vgg-dark-table .vgg-empty-state strong{color:#f8fafc}
#bim-gantt-modal.vgg-dark-table .vgg-empty-state p{color:#94a3b8}

/* Fronteras semanales limpias y línea vertical continua para Hoy */
.vgg-table thead .vgg-week th.vgg-week-start,
.vgg-table thead .vgg-date th.vgg-week-start,
.vgg-table thead .vgg-weekday th.vgg-week-start,
.vgg-table tbody td.vgg-day.vgg-week-start{border-left:1.5px solid #94a3b8!important}
#bim-gantt-modal.vgg-dark-table .vgg-table tbody td.vgg-day.vgg-week-start{border-left-color:#334155!important}
.vgg-table tbody td.vgg-day.today{background:rgba(37,99,235,.06)!important;box-shadow:inset 2px 0 0 #2563eb!important}
#bim-gantt-modal.vgg-dark-table .vgg-table tbody td.vgg-day.today{background:rgba(59,130,246,.12)!important;box-shadow:inset 2px 0 0 #60a5fa!important}
.vgg-table tbody tr.vgg-activity:focus-visible{outline:2px solid #2563eb;outline-offset:-2px}

/* Panel inferior accionable (#4 y #6) */
.vgg-detail{border-top:1px solid var(--border-base,#334155);padding:10px 18px;font-size:11.5px;line-height:1.5;min-height:48px;max-height:110px;overflow:auto;color:var(--ink-secondary,#cbd5e1);display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
.vgg-detail-text{flex:1 1 360px}
.vgg-detail b{color:var(--ink-primary,#fff)}
.vgg-detail-actions{display:flex;align-items:center;gap:7px;flex-wrap:wrap}
.vgg-action-btn{height:30px;padding:0 11px;border-radius:8px;border:1px solid rgba(93,167,255,.45);background:rgba(59,130,246,.16);color:#60a5fa;font-size:11px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:5px}
.vgg-action-btn:hover{background:rgba(59,130,246,.28)}
.vgg-action-btn.create{border-color:rgba(52,211,153,.45);background:rgba(16,185,129,.16);color:#34d399}
.vgg-action-btn.create:hover{background:rgba(16,185,129,.28)}
html[data-theme="light"] .vgg-action-btn{background:#eff6ff;color:#1d4ed8;border-color:#93c5fd}
html[data-theme="light"] .vgg-action-btn.create{background:#ecfdf5;color:#047857;border-color:#6ee7b7}
.vgg-dep-pill{display:inline-flex;align-items:center;padding:1px 7px;margin:0 2px;border-radius:999px;font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:700;cursor:pointer;border:1px solid transparent}
.vgg-dep-pill.pred{background:rgba(245,158,11,.18);color:#fbbf24;border-color:rgba(245,158,11,.42)}
.vgg-dep-pill.succ{background:rgba(6,182,212,.18);color:#22d3ee;border-color:rgba(6,182,212,.42)}
html[data-theme="light"] .vgg-dep-pill.pred{background:#fef3c7;color:#b45309;border-color:#fcd34d}
html[data-theme="light"] .vgg-dep-pill.succ{background:#cffafe;color:#0e7490;border-color:#67e8f9}

.vgg-empty-state{padding:48px 20px;text-align:center;color:#334155;background:#f8fafc;display:flex;flex-direction:column;align-items:center;gap:10px}
.vgg-empty-state strong{font-size:14px;color:#0f172a}
.vgg-empty-state p{margin:0;font-size:12px;color:#475569;max-width:440px}
.vgg-empty-state button{margin-top:4px;height:34px;padding:0 14px;border-radius:8px;border:1px solid #2563eb;background:#2563eb;color:#fff;font-size:12px;font-weight:600;cursor:pointer}
.vgg-empty-state button:hover{background:#1d4ed8}

.vgg-footer{padding:9px 18px;display:flex;gap:12px;flex-wrap:wrap;align-items:center;background:var(--bg-subtle,#1e293b);font-size:10.5px;color:var(--ink-secondary,#aebed2);border-top:1px solid var(--border-base,#253048)}
.vgg-chip{display:inline-flex;gap:5px;align-items:center}
.vgg-chip i{width:14px;height:10px;border-radius:2px;background:#5682bd}
.vgg-chip i.done{background:#2d9c89}
.vgg-chip i.partial{background:linear-gradient(90deg,#2d9c89 50%,#5682bd 50%)}
.vgg-chip i.late{background:#d39843}
.vgg-chip i.group{background:#426a95}
.vgg-chip i.weekend{background:#fbdce2;border:1px solid #d74e67}
.vgg-chip i.day-off{background:#e7dbff;border:1px solid #a58bcf}
.vgg-chip i.pred{background:#f59e0b}
.vgg-chip i.succ{background:#06b6d4}

.vgg-colchooser{position:relative;flex:none}
.vgg-colchooser>summary{list-style:none;display:inline-flex;align-items:center;gap:6px;min-height:31px;padding:0 10px;cursor:pointer;border:1px solid var(--border-base,#334155);border-radius:8px;background:var(--bg-subtle,#1e293b);color:var(--ink-primary,#f8fafc);font-size:11px;font-weight:600}
.vgg-colchooser>summary::-webkit-details-marker{display:none}
.vgg-colchooser[open]>summary{border-color:var(--accent-blue,#60a5fa)}
.vgg-colchooser-popover{position:absolute;right:0;top:calc(100% + 5px);z-index:50;width:235px;max-width:calc(100vw - 36px);max-height:min(65vh,390px);overflow-y:auto;background:var(--bg-panel,#111d30);color:var(--ink-primary,#fff);border:1px solid var(--border-strong,#4a607c);border-radius:10px;box-shadow:0 14px 36px rgba(0,0,0,.45);padding:10px}
.vgg-colchooser-popover .vgg-col-item{display:flex;align-items:center;gap:8px;padding:5px 3px;color:var(--ink-primary,#f8fafc);font-size:11px}
.vgg-colchooser-popover input{accent-color:#42a5ee}
.vgg-colchooser-popover button{display:block;width:100%;margin-top:8px;padding:8px;border:1px solid var(--border-base,#334155);border-radius:6px;cursor:pointer;background:var(--bg-subtle,#1e293b);color:var(--accent-blue,#60a5fa);font-size:11px;font-weight:700}

@media(max-width:780px){#bim-gantt-overlay{padding:0}#bim-gantt-modal{width:100vw;height:100dvh;border-radius:0}.vgg-header{padding:9px}.vgg-controls{padding:7px}.vgg-count{margin-left:0}}
`;

/* Visor interactivo del cronograma Gantt (Excel -> HTML).
   Incluye: Sticky real (#1), Colapsar/Expandir (#3), Conexión directa con tareas (#4),
   Zoom + Modo Oscuro nativo (#5), Resaltado de dependencias (#6) e Importación Excel .xlsx (#7). */
(function(){
'use strict';
const BASE_SOURCE = window.BIM_GANTT_VIEW_SOURCE;
if(!BASE_SOURCE) return;

const STORAGE_EXCEL_KEY = 'bim-gantt-excel-override-v1';
const STORAGE_ZOOM_KEY = 'bim-gantt-zoom-v1';
const STORAGE_DARK_TABLE_KEY = 'bim-gantt-dark-table-v1';
const ZOOM_WIDTHS = { compact: 22, normal: 30, wide: 42 };

let S = loadActiveSource();
const st = { owner:'', group:'', week:'', status:'', search:'', selected:'', zoom: readPref(STORAGE_ZOOM_KEY, 'normal') };
let darkTableMode = readPref(STORAGE_DARK_TABLE_KEY, '0') === '1';
let overlay = null, bodyOverflow = '', lastTrigger = null;
const hiddenColumns = new Set();
const collapsedOwners = new Set();
const collapsedGroups = new Set();

const columns = [
  ['ID',56],['EDT',62],['Actividad / hito',310],['Responsable',148],
  ['Tipo',56],['Dur. (dc)',67],['Inicio',86],['Fin',86],
  ['Predecesor',84],['Dependencia',84],['Desfase (dc)',86]
];
const STICKY_INDICES = new Set([0, 1, 2]); // ID, EDT, Actividad / hito

function readPref(key, fallback){
  try { return localStorage.getItem(key) || fallback; } catch { return fallback; }
}
function savePref(key, value){
  try { localStorage.setItem(key, String(value)); } catch {}
}
function loadActiveSource(){
  try {
    const raw = localStorage.getItem(STORAGE_EXCEL_KEY);
    if(raw){
      const parsed = JSON.parse(raw);
      if(parsed && Array.isArray(parsed.rows) && parsed.start && parsed.end){
        return parsed;
      }
    }
  } catch {}
  return BASE_SOURCE;
}
function isImportedSource(){
  return S !== BASE_SOURCE && Boolean(S.importedAt);
}

function escapeText(x){
  return String(x==null?'':x).replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
function normalizeKey(str){
  return String(str||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim();
}
function dates(from, to){
  const out = [];
  const d = new Date(from + 'T00:00:00Z');
  const end = new Date(to + 'T00:00:00Z');
  if(!Number.isFinite(d.getTime()) || !Number.isFinite(end.getTime())) return out;
  for(let guard = 0; d <= end && guard < 120; d.setUTCDate(d.getUTCDate()+1), guard++){
    out.push(d.toISOString().slice(0,10));
  }
  return out;
}
function getAllDates(){ return dates(S.start, S.end); }
function week(date){
  const d = new Date(date + 'T12:00:00Z');
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const y = d.getUTCFullYear();
  const j = new Date(Date.UTC(y, 0, 4));
  j.setUTCDate(j.getUTCDate() - (j.getUTCDay() || 7) + 1);
  return 'S' + String(1 + Math.floor((d - j) / 604800000));
}
function getWeeks(){ return [...new Set(getAllDates().map(week))]; }
function readable(d){ return d ? d.slice(8,10)+'/'+d.slice(5,7)+'/'+d.slice(2,4) : ''; }
function owners(){ return [...new Set(S.rows.filter(r=>r.kind==='activity' && r.owner).map(r=>r.owner))]; }
function ownerOfSection(row){
  if(row.kind !== 'owner') return '';
  const text = normalizeKey(row.label);
  return owners().find(o => text.includes(normalizeKey(o))) || row.label;
}

/* Avance real registrado en Supabase (sin cambios en lógica de negocio) */
function recordedActivityActual(row, matched, completedAt){
  const store = typeof catalogs==='undefined' ? null : catalogs;
  const now = typeof todayString==='function' ? todayString() : new Date().toISOString().slice(0,10);
  const records = [];
  for(const task of matched){
    const item = store?.ganttTaskProgressByTask?.[task.id];
    if(item?.activityId!==row.id || !Number.isFinite(item.actual) ||
       item.actual<0 || item.actual>100 || !item.achievedOn ||
       item.achievedOn>now || !Number.isFinite(Date.parse(item.updatedAt))) continue;
    records.push({actual:item.actual, achievedOn:item.achievedOn, updatedAt:item.updatedAt, source:'tarea'});
  }
  const weekly = store?.ganttWeeklyProgress || {};
  const current = now.slice(0,4)+'-W'+week(now).slice(1).padStart(2,'0');
  for(const [period, data] of Object.entries(weekly)){
    if(!/^\d{4}-W\d{2}$/.test(period) || period>current) continue;
    const item = data?.[row.id];
    if(!item || !Number.isFinite(item.actual) || item.actual<0 || item.actual>100 ||
       !Number.isFinite(Date.parse(item.updatedAt))) continue;
    records.push({actual:item.actual, achievedOn:'', updatedAt:item.updatedAt, period, source:'ppc'});
  }
  records.sort((a,b)=>a.updatedAt.localeCompare(b.updatedAt) || (a.source==='tarea'?-1:1));
  const latest = records[records.length-1];
  if(latest){
    if(completedAt && latest.source==='tarea' && completedAt>latest.achievedOn && latest.actual<100){
      return {actual:100, source:'cierre', achievedOn:completedAt};
    }
    return {actual:latest.actual, source:latest.source, achievedOn:latest.achievedOn||'', period:latest.period||''};
  }
  return {actual:completedAt?100:null, source:completedAt?'cierre':'', achievedOn:completedAt||''};
}

function realFillOfGanttDay(row, date, actual){
  if(!Number.isFinite(actual)) return 0;
  const daily = Object.entries(row.percentByDay||{}).map(([day,share])=>({
    day:Number(day), share:Number(share)
  })).filter(x=>Number.isInteger(x.day)&&x.day>=1&&x.day<=31&&Number.isFinite(x.share)&&x.share>0)
    .sort((a,b)=>a.day-b.day);
  const total = daily.reduce((sum,x)=>sum+x.share, 0);
  if(!total) return 0;
  const day = Number(date.slice(8,10));
  let preceding = 0;
  for(const entry of daily){
    if(entry.day===day){
      const fulfilled = Math.min(Math.max(total*actual/100 - preceding, 0), entry.share);
      return Math.min(100, Math.max(0, 100*fulfilled/entry.share));
    }
    if(entry.day < day) preceding += entry.share;
  }
  return 0;
}

function taskState(row){
  const src = typeof tasks!=='undefined' && Array.isArray(tasks) ? tasks : [];
  const matched = src.filter(t => typeof catalogs!=='undefined' &&
    catalogs.ganttLinksByTask?.[t.id]?.mode==='select' &&
    catalogs.ganttLinksByTask?.[t.id]?.activityId===row.id);
  const today = typeof todayString==='function' ? todayString() : new Date().toISOString().slice(0,10);
  const done = matched.filter(t => t.completedAt && t.completedAt<=today &&
    (typeof categoryOf==='function' ? categoryOf(t.status)==='done' : /completad/i.test(t.status||'')))
    .sort((a,b)=>a.completedAt.localeCompare(b.completedAt));
  const first = done[0] || null;
  const verified = recordedActivityActual(row, matched, first?.completedAt||'');
  return {
    state: first ? 'completed' : matched.length ? 'pending' : 'unassigned',
    taskIds: matched.map(x=>x.id),
    completedAt: first?.completedAt || '',
    late: !!(first && first.completedAt > row.end),
    actual: verified.actual,
    actualSource: verified.source,
    actualOn: verified.achievedOn
  };
}

/* Mejora #6: Resolución de dependencias (predecesoras y sucesoras) */
function parsePredecessorCodes(predecessorStr){
  if(!predecessorStr) return [];
  const matches = String(predecessorStr).toUpperCase().match(/[A-Z]+\d+|\b\d+(?:\.\d+)?\b/g);
  return matches ? [...new Set(matches)] : [];
}
function findDependencies(activityRow){
  if(!activityRow) return { predecessors: [], successors: [] };
  const acts = S.rows.filter(r => r.kind === 'activity');
  const predCodes = new Set(parsePredecessorCodes(activityRow.predecessor));
  const predecessors = acts.filter(a => {
    const codeA = String(a.excelId || a.id || '').toUpperCase();
    const idA = String(a.id || '').toUpperCase();
    const edtA = String(a.edt || '').toUpperCase();
    return a.id !== activityRow.id && (predCodes.has(codeA) || predCodes.has(idA) || (edtA && predCodes.has(edtA)));
  });
  const selfCodes = new Set([
    String(activityRow.excelId || '').toUpperCase(),
    String(activityRow.id || '').toUpperCase()
  ].filter(Boolean));
  const successors = acts.filter(a => {
    if(a.id === activityRow.id) return false;
    const codes = parsePredecessorCodes(a.predecessor);
    return codes.some(c => selfCodes.has(c));
  });
  return { predecessors, successors };
}

function visibleActivities(){
  const allDates = getAllDates();
  return S.rows.filter(row => {
    if(row.kind !== 'activity') return false;
    if(st.owner && row.owner !== st.owner) return false;
    if(st.group && row.group !== st.group) return false;
    if(st.week && !allDates.some(d => week(d)===st.week && d>=row.start && d<=row.end)) return false;
    if(st.search && !([row.excelId||row.id, row.id, row.edt, row.title, row.owner, row.group, row.predecessor].join(' ')
      .toLocaleLowerCase('es').includes(st.search.toLocaleLowerCase('es')))) return false;
    if(st.status && taskState(row).state !== st.status) return false;
    return true;
  });
}

function keptRows(activities){
  const ids = new Set(activities.map(a=>a.id));
  const groups = new Set(activities.map(a=>a.owner+'|'+a.group));
  const presentOwners = new Set(activities.map(a=>a.owner));
  const countByOwner = new Map();
  const countByGroup = new Map();
  activities.forEach(a => {
    countByOwner.set(a.owner, (countByOwner.get(a.owner)||0) + 1);
    const gk = a.owner + '|' + a.group;
    countByGroup.set(gk, (countByGroup.get(gk)||0) + 1);
  });
  const ignoreCollapse = Boolean(st.search);
  const result = [];
  let currentOwner = '';
  for(const row of S.rows){
    if(row.kind === 'owner'){
      currentOwner = ownerOfSection(row);
      if(presentOwners.has(currentOwner)){
        result.push({ ...row, _ownerKey: currentOwner, _count: countByOwner.get(currentOwner)||0 });
      }
    } else if(row.kind === 'group'){
      const gKey = currentOwner + '|' + row.title;
      if(!groups.has(gKey)) continue;
      if(!ignoreCollapse && collapsedOwners.has(currentOwner)) continue;
      result.push({ ...row, _ownerKey: currentOwner, _groupKey: gKey, _count: countByGroup.get(gKey)||0 });
    } else if(ids.has(row.id)){
      const gKey = row.owner + '|' + row.group;
      if(!ignoreCollapse && (collapsedOwners.has(row.owner) || collapsedGroups.has(gKey))) continue;
      result.push(row);
    }
  }
  return result;
}

function weekTone(d){ return Number(week(d).slice(1))%2===0 ? 'excel-week-dark' : 'excel-week-light'; }
function nonWorkingDate(d){ return S.holidays?.[d] || BASE_SOURCE.holidays?.[d] || ''; }
function dayInfo(d){
  const dow = new Date(d+'T12:00:00Z').getUTCDay();
  const weekend = dow===0 || dow===6;
  const holiday = Boolean(nonWorkingDate(d));
  return { dow, weekend, holiday, mark: weekend || holiday,
    note: nonWorkingDate(d) || (weekend ? (dow===6 ? 'Sábado' : 'Domingo') : '') };
}
function excelPercent(value){
  const n = Number(value);
  if(!Number.isFinite(n) || n<=0) return '';
  const percent = n * 100;
  return (n < 0.1 ? percent.toFixed(1) : Math.round(percent).toString()) + '%';
}
function weekHeaders(days){
  const chunks = []; let last = '', size = 0, tone = '';
  days.forEach(d => {
    const w = week(d);
    if(last && w!==last){ chunks.push([last, size, tone]); size = 0; }
    last = w; size++; tone = weekTone(d);
  });
  if(size) chunks.push([last, size, tone]);
  return chunks.map((c,i) => '<th class="'+c[2]+(i?' vgg-week-start':'')+'" colspan="'+c[1]+'">'+c[0]+'</th>').join('');
}

function dayBar(row, d, state, days, idx){
  const info = dayInfo(d);
  const today = d === (typeof todayString==='function' ? todayString() : new Date().toISOString().slice(0,10));
  const personalLeave = (S.nonWorkingByOwner || BASE_SOURCE.nonWorkingByOwner)?.[row.owner||'']?.[d] || '';
  const boundary = info.dow===1 ? ' vgg-week-start' : '';
  const dateAttr = ' data-vgg-date="'+d+'"';
  const cls = 'vgg-day'+(info.weekend?' weekend':'')+(info.holiday?' holiday':'')+
    (personalLeave?' day-off':'')+(today?' today':'')+boundary;
  if(row.kind === 'group'){
    if(d < row.start || d > row.end) return '<td class="'+cls+'"'+dateAttr+'></td>';
    const isStart = idx === 0 || days[idx-1] < row.start;
    const isEnd = idx === days.length - 1 || days[idx+1] > row.end;
    const segCls = (isStart ? ' bar-start' : '') + (isEnd ? ' bar-end' : '');
    return '<td class="'+cls+' scheduled group'+segCls+'"'+dateAttr+'><span class="vgg-group-bar"></span></td>';
  }
  const value = row.percentByDay?.[String(Number(d.slice(8,10)))] || 0;
  if(!value) return '<td class="'+cls+'"'+dateAttr+'></td>';
  const prevHas = idx > 0 && Boolean(row.percentByDay?.[String(Number(days[idx-1].slice(8,10)))]);
  const nextHas = idx < days.length - 1 && Boolean(row.percentByDay?.[String(Number(days[idx+1].slice(8,10)))]);
  const segCls = (!prevHas ? ' bar-start' : '') + (!nextHas ? ' bar-end' : '');
  const fill = realFillOfGanttDay(row, d, state.actual);
  const status = fill >= 99.999 ? (state.late && state.actual>=100 ? ' late' : ' done')
    : fill > .001 ? ' partial' : '';
  const style = status===' partial' ? ' style="--vgg-real-fill:'+Number(fill.toFixed(4))+'%"' : '';
  const planned = Number((value*100).toFixed(2));
  const realPart = Number((planned*fill/100).toFixed(2));
  const tip = (row.excelId||row.id)+' · '+readable(d)+' · Programado: '+planned+' % · Ejecutado: '+realPart+' % ('+Number(fill.toFixed(1))+' % del día)';
  return '<td class="'+cls+' scheduled'+segCls+'"'+dateAttr+' title="'+escapeText(tip)+'">'+
    '<div class="vgg-bar-seg'+status+'"'+style+'><span class="vgg-cell-percent">'+excelPercent(value)+'</span></div></td>';
}

/* Mejora #1: Cálculo dinámico de columnas visibles y offsets sticky */
function visibleColumns(){
  const list = columns.map((col,i) => ({ label:col[0], width:col[1], index:i }))
    .filter(col => !hiddenColumns.has(col.index));
  let offset = 0;
  let lastStickyPos = -1;
  list.forEach((col, pos) => {
    if(STICKY_INDICES.has(col.index)){
      col.sticky = true;
      col.left = offset;
      offset += col.width;
      lastStickyPos = pos;
    } else {
      col.sticky = false;
    }
  });
  if(lastStickyPos >= 0) list[lastStickyPos].stickyLast = true;
  return list;
}

function stickyAttrs(col){
  if(!col.sticky) return { cls:'', style:'' };
  return {
    cls: ' vgg-sticky-col' + (col.stickyLast ? ' vgg-sticky-last' : ''),
    style: ' style="left:'+col.left+'px"'
  };
}

function rowMeta(row, displayed, groupExtra){
  const items = [
    row.excelId||row.id||'', row.edt||'', row.title||'', row.owner||'', row.type||'',
    row.duration||'', readable(row.start), readable(row.end), row.predecessor||'',
    row.dependency||'', row.lag||''
  ];
  return displayed.map(col => {
    const i = col.index;
    const stA = stickyAttrs(col);
    const baseCls = (i===0?'vgg-id ':[1,4,5,6,7,8,9,10].includes(i)?'vgg-center ':'') + (i===2?'vgg-title':'') + stA.cls;
    let content = escapeText(items[i]);
    if(groupExtra && i === 2){
      const icon = groupExtra.collapsed ? '▸' : '▾';
      content = '<span class="vgg-chevron" aria-hidden="true">'+icon+'</span>' + content +
        '<span class="vgg-row-badge">'+groupExtra.count+'</span>';
    }
    return '<td class="'+baseCls.trim()+'"'+stA.style+'>'+content+'</td>';
  }).join('');
}

function updateCollapseAllButton(){
  const btn = document.getElementById('vgg-collapse-all');
  if(!btn) return;
  const anyCollapsed = collapsedOwners.size > 0 || collapsedGroups.size > 0;
  btn.textContent = anyCollapsed ? 'Expandir todo' : 'Contraer todo';
}

function renderHeaderMeta(){
  const sub = document.getElementById('vgg-header-sub');
  const badge = document.getElementById('vgg-source-badge');
  const restoreBtn = document.getElementById('vgg-restore-excel');
  const footerSource = document.getElementById('vgg-footer-source');
  if(sub){
    sub.textContent = S.project + ' · Inicio ' + readable(S.start) + ' · Fin ' + readable(S.end) +
      ' · ' + S.calendarDays + ' días calendario' + (S.workingDays ? ' · ' + S.workingDays + ' días laborables' : '');
  }
  if(badge){
    if(isImportedSource()){
      badge.textContent = 'Excel importado: ' + (S.source || 'archivo.xlsx');
      badge.classList.add('imported');
    } else {
      badge.textContent = 'Corte base: 13/11/2026';
      badge.classList.remove('imported');
    }
  }
  if(restoreBtn) restoreBtn.hidden = !isImportedSource();
  if(footerSource){
    footerSource.textContent = isImportedSource()
      ? 'Porcentajes = Excel importado (' + (S.importedAt || '') + ')'
      : 'Porcentajes = carga diaria programada en Excel · Corte: 13/11/2026';
  }
}

function render(){
  if(!overlay || overlay.hidden) return;
  renderHeaderMeta();
  const modal = document.getElementById('bim-gantt-modal');
  if(modal) modal.classList.toggle('vgg-dark-table', darkTableMode);

  const values = visibleActivities();
  const rows = keptRows(values);
  const allDates = getAllDates();
  const days = st.week ? allDates.filter(d => week(d) === st.week) : allDates;
  const displayed = visibleColumns();
  const dayWidth = ZOOM_WIDTHS[st.zoom] || 30;

  const selectedRow = st.selected ? S.rows.find(r => r.kind==='activity' && r.id===st.selected) : null;
  const deps = findDependencies(selectedRow);
  const predIds = new Set(deps.predecessors.map(a => a.id));
  const succIds = new Set(deps.successors.map(a => a.id));

  const colgroup = displayed.map(x => '<col style="width:'+x.width+'px">').join('') +
    days.map(() => '<col style="width:'+dayWidth+'px">').join('');
  const heads = '<tr class="vgg-week">' + displayed.map(x => {
    const stA = stickyAttrs(x);
    return '<th class="vgg-meta'+stA.cls+'"'+stA.style+' rowspan="3">'+escapeText(x.label)+'</th>';
  }).join('') + weekHeaders(days) + '</tr>';

  const dnames = ['D','L','M','X','J','V','S'];
  const todayStr = typeof todayString==='function'
    ? todayString()
    : new Date().getFullYear()+'-'+String(new Date().getMonth()+1).padStart(2,'0')+'-'+String(new Date().getDate()).padStart(2,'0');

  const datesRow = '<tr class="vgg-date">' + days.map(d => {
    const info = dayInfo(d);
    return '<th data-vgg-date="'+d+'" class="'+weekTone(d)+
      (info.dow===1?' vgg-week-start':'')+(info.mark?' nonwork':'')+
      (info.weekend?' weekend-header':'')+(info.holiday?' holiday-header':'')+
      (d===todayStr?' today-header':'')+'" title="'+escapeText(info.note||d)+'">'+Number(d.slice(-2))+'</th>';
  }).join('') + '</tr>';

  const dowsRow = '<tr class="vgg-weekday">' + days.map(d => {
    const info = dayInfo(d);
    return '<th data-vgg-date="'+d+'" class="'+weekTone(d)+
      (info.dow===1?' vgg-week-start':'')+(info.mark?' nonwork':'')+
      (info.weekend?' weekend-header':'')+(info.holiday?' holiday-header':'')+
      (d===todayStr?' today-header':'')+'" title="'+escapeText(info.note||d)+'">'+dnames[info.dow]+'</th>';
  }).join('') + '</tr>';

  let body = '', activityIndex = 0;
  for(const row of rows){
    if(row.kind === 'owner'){
      const isCol = collapsedOwners.has(row._ownerKey);
      const stickyCount = displayed.filter(c => c.sticky).length || 1;
      const restMeta = displayed.length - stickyCount;
      body += '<tr class="vgg-owner-row" data-vgg-toggle-owner="'+escapeText(row._ownerKey)+'" title="Clic para contraer o expandir">'+
        '<td class="vgg-sticky-col vgg-sticky-last" style="left:0" colspan="'+stickyCount+'">'+
        '<span class="vgg-chevron" aria-hidden="true">'+(isCol?'▸':'▾')+'</span>'+escapeText(row.label)+
        '<span class="vgg-row-badge">'+row._count+' act.</span></td>'+
        (restMeta > 0 ? '<td colspan="'+restMeta+'"></td>' : '') +
        '<td colspan="'+days.length+'"></td></tr>';
      continue;
    }
    if(row.kind === 'group'){
      const isCol = collapsedGroups.has(row._groupKey);
      const copy = { id:'', edt:row.id, title:row.title, owner:'', type:'Resumen', duration:row.duration,
        start:row.start, end:row.end, predecessor:'', dependency:'', lag:'' };
      body += '<tr class="vgg-group-row" data-vgg-toggle-group="'+escapeText(row._groupKey)+'" title="Clic para contraer o expandir">'+
        rowMeta(copy, displayed, { collapsed:isCol, count:row._count }) +
        days.map((d, idx) => dayBar(row, d, { state:'group' }, days, idx)).join('') + '</tr>';
      continue;
    }
    const state = taskState(row);
    const depCls = st.selected===row.id ? ' vgg-selected' : predIds.has(row.id) ? ' vgg-predecessor' : succIds.has(row.id) ? ' vgg-successor' : '';
    body += '<tr class="vgg-activity'+((activityIndex++%2)?' vgg-row-alt':'')+depCls+
      '" data-gantt-activity="'+escapeText(row.id)+'" tabindex="0">'+
      rowMeta({ ...row, type:row.type||'Act.' }, displayed) +
      days.map((d, idx) => dayBar(row, d, state, days, idx)).join('') + '</tr>';
  }

  const node = document.getElementById('vgg-table');
  if(!node) return;
  const totalActivities = S.rows.filter(r => r.kind === 'activity').length;
  const activeFilters = ['owner','group','week','status','search'].filter(k => Boolean(st[k])).length;
  const resetBtn = document.getElementById('vgg-reset-filters');
  if(resetBtn) resetBtn.hidden = activeFilters === 0;
  ['owner','group','week','status','search'].forEach(k => {
    const el = document.getElementById('vgg-'+k);
    if(el) el.classList.toggle('vgg-filter-active', Boolean(st[k]));
  });
  updateCollapseAllButton();

  const emptyBox = document.getElementById('vgg-empty-state');
  if(!body){
    node.innerHTML = '';
    if(emptyBox) emptyBox.hidden = false;
  } else {
    if(emptyBox) emptyBox.hidden = true;
    node.innerHTML = '<colgroup>'+colgroup+'</colgroup><thead>'+heads+datesRow+dowsRow+'</thead><tbody>'+body+'</tbody>';
  }

  document.getElementById('vgg-count').textContent = values.length + ' de ' + totalActivities + ' actividades';
  if(!body){
    document.getElementById('vgg-detail').innerHTML = '<div class="vgg-detail-text">No se encontraron actividades para los filtros seleccionados.</div>';
  } else if(!st.selected){
    document.getElementById('vgg-detail').innerHTML = '<div class="vgg-detail-text">Haz clic en una actividad para ver sus dependencias, entregable vinculado y abrirlo o crearlo directamente.</div>';
  }
}

/* Mejora #4 y #6: Panel de detalle interactivo con dependencias y acciones directas */
function showDetail(id){
  const row = S.rows.find(r => r.kind==='activity' && r.id===id);
  if(!row) return;
  st.selected = id;
  const status = taskState(row);
  const deps = findDependencies(row);
  const labels = { completed:'Completada', pending:'Pendiente', unassigned:'Sin asignar' };

  const predHtml = deps.predecessors.length
    ? ' · Predecesor: ' + deps.predecessors.map(p =>
        '<button type="button" class="vgg-dep-pill pred" data-vgg-jump="'+escapeText(p.id)+'" title="'+escapeText(p.title)+'">'+escapeText(p.excelId||p.id)+'</button>'
      ).join('')
    : '';
  const succHtml = deps.successors.length
    ? ' · Dependen de esta: ' + deps.successors.map(s =>
        '<button type="button" class="vgg-dep-pill succ" data-vgg-jump="'+escapeText(s.id)+'" title="'+escapeText(s.title)+'">'+escapeText(s.excelId||s.id)+'</button>'
      ).join('')
    : '';

  const note = '<div class="vgg-detail-text"><b>'+escapeText((row.excelId||row.id)+' — '+row.title)+'</b> · '+escapeText(row.owner)+
    ' · '+readable(row.start)+' al '+readable(row.end)+' · Estado: <b>'+labels[status.state]+'</b>'+
    ' · Entregable vinculado: '+escapeText(status.taskIds.join(', ')||'Sin vincular')+
    (status.completedAt ? ' · Fin real: '+readable(status.completedAt) : '')+
    (Number.isFinite(status.actual) ? ' · Avance real: '+status.actual+' %' : ' · Sin avance real registrado')+
    (status.completedAt && Number.isFinite(status.actual) && status.actual<100 ? ' · <b>Revisar: estado Completada con avance parcial</b>' : '')+
    (status.late ? ' · Fuera de plazo' : '') + predHtml + succHtml + '</div>';

  let actions = '<div class="vgg-detail-actions">';
  if(status.taskIds.length){
    actions += status.taskIds.slice(0,3).map(tid =>
      '<button type="button" class="vgg-action-btn" data-vgg-open-task="'+escapeText(tid)+'">Abrir '+escapeText(tid)+'</button>'
    ).join('');
  } else {
    actions += '<button type="button" class="vgg-action-btn create" data-vgg-create-task="'+escapeText(row.id)+'">+ Crear tarea vinculada</button>';
  }
  actions += '</div>';

  document.getElementById('vgg-detail').innerHTML = note + actions;

  const predIds = new Set(deps.predecessors.map(a => a.id));
  const succIds = new Set(deps.successors.map(a => a.id));
  overlay?.querySelectorAll('tr[data-gantt-activity]').forEach(tr => {
    const rid = tr.dataset.ganttActivity;
    tr.classList.toggle('vgg-selected', rid === id);
    tr.classList.toggle('vgg-predecessor', predIds.has(rid));
    tr.classList.toggle('vgg-successor', succIds.has(rid));
  });
}

function openLinkedTask(taskId){
  if(typeof openEditor !== 'function') return;
  close();
  setTimeout(() => openEditor(taskId), 30);
}

function createTaskFromGanttActivity(activityId){
  const row = S.rows.find(r => r.kind==='activity' && r.id===activityId);
  if(!row || typeof openEditor !== 'function') return;
  close();
  setTimeout(() => {
    openEditor();
    const titleEl = document.getElementById('f-title');
    if(titleEl) titleEl.value = row.title || '';
    const deadlineEl = document.getElementById('f-deadline');
    if(deadlineEl && row.end) deadlineEl.value = row.end;
    const ownerEl = document.getElementById('f-owner');
    if(ownerEl && row.owner){
      const target = normalizeKey(row.owner);
      const opt = [...ownerEl.options].find(o => normalizeKey(o.value) === target || normalizeKey(o.value).includes(target) || target.includes(normalizeKey(o.value)));
      if(opt){
        ownerEl.value = opt.value;
        if(typeof refreshGanttForOwner === 'function') refreshGanttForOwner();
      }
    }
    if(typeof chooseGanttActivity === 'function'){
      try { chooseGanttActivity(row.id); } catch {}
    }
    if(typeof refreshEditorDeadlinePreview === 'function') refreshEditorDeadlinePreview();
    if(typeof toast === 'function') toast('Formulario prellenado desde ' + (row.excelId || row.id));
  }, 40);
}

/* Mejora #7: Importación directa de archivo Excel (.xlsx) */
function loadSheetJs(){
  if(window.XLSX) return Promise.resolve(window.XLSX);
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js';
    s.onload = () => window.XLSX ? resolve(window.XLSX) : reject(new Error('XLSX no disponible'));
    s.onerror = () => reject(new Error('No se pudo cargar el lector de Excel (verifica tu conexión)'));
    document.head.appendChild(s);
  });
}

function excelSerialToIso(val){
  if(!val) return '';
  if(val instanceof Date && Number.isFinite(val.getTime())){
    return val.toISOString().slice(0,10);
  }
  if(typeof val === 'number' && val > 25000 && val < 80000){
    const utc = new Date(Math.round((val - 25569) * 86400 * 1000));
    return Number.isFinite(utc.getTime()) ? utc.toISOString().slice(0,10) : '';
  }
  const str = String(val).trim();
  if(/^\d{4}-\d{2}-\d{2}/.test(str)) return str.slice(0,10);
  const dmy = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
  if(dmy){
    const y = dmy[3].length === 2 ? '20' + dmy[3] : dmy[3];
    return y + '-' + dmy[2].padStart(2,'0') + '-' + dmy[1].padStart(2,'0');
  }
  return '';
}

function parseExcelWorkbook(wb, fileName){
  const sheetName = wb.SheetNames.find(n => /^gant+$/i.test(n.trim())) || wb.SheetNames[0];
  const sheet = wb.Sheets[sheetName];
  if(!sheet) throw new Error('No se encontró la hoja Gantt en el archivo.');
  const matrix = window.XLSX.utils.sheet_to_json(sheet, { header: 1, raw: true, defval: '' });
  if(!matrix.length) throw new Error('La hoja seleccionada está vacía.');

  // Detectar fila de encabezados
  let headerRowIdx = -1;
  for(let r = 0; r < Math.min(matrix.length, 20); r++){
    const joined = matrix[r].map(c => normalizeKey(c)).join('|');
    if(joined.includes('actividad') && (joined.includes('inicio') || joined.includes('responsable'))){
      headerRowIdx = r;
      break;
    }
  }
  if(headerRowIdx < 0) throw new Error('No se detectaron las columnas estándar del Gantt (Actividad, Inicio, Fin).');

  const hdr = matrix[headerRowIdx].map(c => normalizeKey(c));
  const findCol = (...pats) => hdr.findIndex(h => pats.some(p => h === p || h.includes(p)));
  const cId = Math.max(0, findCol('id'));
  const cEdt = findCol('edt');
  const cTitle = findCol('actividad', 'hito', 'entregable');
  const cOwner = findCol('responsable', 'colaborador');
  const cType = findCol('tipo');
  const cDur = findCol('dur');
  const cStart = findCol('inicio');
  const cEnd = findCol('fin');
  const cPred = findCol('predecesor');
  const cDep = findCol('dependencia');
  const cLag = findCol('desfase', 'lag');

  // Detectar columnas de días (1..31) en la fila de encabezados o la siguiente
  const dayCols = [];
  const probeRows = [headerRowIdx, headerRowIdx + 1, headerRowIdx - 1].filter(i => i >= 0 && i < matrix.length);
  for(const pr of probeRows){
    const found = [];
    const rowVals = matrix[pr];
    for(let c = Math.max(cEnd, cTitle, 5) + 1; c < rowVals.length; c++){
      const n = Number(rowVals[c]);
      if(Number.isInteger(n) && n >= 1 && n <= 31) found.push({ col: c, day: n });
    }
    if(found.length >= 15){ dayCols.push(...found); break; }
  }

  // Mapa para conservar IDs internos históricos de Supabase por título o excelId
  const baseByExcelId = new Map();
  const baseByTitle = new Map();
  BASE_SOURCE.rows.filter(r => r.kind === 'activity').forEach(r => {
    if(r.excelId) baseByExcelId.set(r.excelId.toUpperCase(), r.id);
    if(r.title) baseByTitle.set(normalizeKey(r.title), r.id);
  });

  const parsedRows = [];
  let currentOwnerLabel = '', currentOwnerName = '', currentGroup = '', currentGroupNo = '';
  let minDate = '', maxDate = '';

  const startDataRow = Math.max(headerRowIdx + 1, probeRows.length ? Math.max(...probeRows) + 1 : headerRowIdx + 1);
  for(let r = startDataRow; r < matrix.length; r++){
    const line = matrix[r];
    if(!line || line.every(v => String(v||'').trim() === '')) continue;

    const rawId = String(line[cId] ?? '').trim();
    const rawEdt = cEdt >= 0 ? String(line[cEdt] ?? '').trim() : '';
    const rawTitle = cTitle >= 0 ? String(line[cTitle] ?? '').trim() : '';
    const rawOwner = cOwner >= 0 ? String(line[cOwner] ?? '').trim() : '';
    const rawType = cType >= 0 ? String(line[cType] ?? '').trim() : '';
    const startIso = cStart >= 0 ? excelSerialToIso(line[cStart]) : '';
    const endIso = cEnd >= 0 ? excelSerialToIso(line[cEnd]) : '';

    // Fila de sección de responsable (ej. "ACTIVIDADES JUAN CARLOS PRADA")
    const firstNonEmpty = String(line.find(v => String(v||'').trim() !== '') || '').trim();
    if(/^actividades\s+/i.test(firstNonEmpty) && !startIso && !endIso){
      currentOwnerLabel = firstNonEmpty;
      currentOwnerName = firstNonEmpty.replace(/^actividades\s+/i, '').trim();
      parsedRows.push({ kind: 'owner', label: currentOwnerLabel });
      continue;
    }

    // Fila de grupo resumen
    if((/resumen/i.test(rawType) || (!rawId && rawEdt && !rawEdt.includes('.'))) && rawTitle){
      currentGroup = rawTitle;
      currentGroupNo = rawEdt || '';
      parsedRows.push({
        kind: 'group',
        id: currentGroupNo,
        title: rawTitle,
        duration: cDur >= 0 ? Number(line[cDur]) || '' : '',
        start: startIso,
        end: endIso,
        owner: currentOwnerLabel || currentOwnerName
      });
      continue;
    }

    if(!rawTitle || (!startIso && !endIso)) continue;
    const excelId = rawId || ('A' + String(parsedRows.filter(x=>x.kind==='activity').length + 1).padStart(2,'0'));
    const internalId = baseByTitle.get(normalizeKey(rawTitle)) || baseByExcelId.get(excelId.toUpperCase()) || excelId;

    const percentByDay = {};
    for(const dc of dayCols){
      const rawVal = line[dc.col];
      if(rawVal === '' || rawVal == null) continue;
      let num = typeof rawVal === 'number' ? rawVal : Number(String(rawVal).replace('%','').replace(',','.').trim());
      if(!Number.isFinite(num) || num <= 0) continue;
      if(num > 1.0001) num = num / 100;
      percentByDay[String(dc.day)] = Number(num.toFixed(6));
    }

    if(startIso && (!minDate || startIso < minDate)) minDate = startIso;
    if(endIso && (!maxDate || endIso > maxDate)) maxDate = endIso;

    parsedRows.push({
      kind: 'activity',
      id: internalId,
      excelId,
      edt: rawEdt,
      title: rawTitle,
      owner: rawOwner || currentOwnerName || 'Sin asignar',
      group: currentGroup || 'General',
      groupNo: currentGroupNo,
      type: rawType || 'Act.',
      duration: cDur >= 0 ? (Number(line[cDur]) || '') : '',
      start: startIso || endIso,
      end: endIso || startIso,
      predecessor: cPred >= 0 ? String(line[cPred] ?? '').trim() : '',
      dependency: cDep >= 0 ? String(line[cDep] ?? '').trim() : '',
      lag: cLag >= 0 ? String(line[cLag] ?? '').trim() : '',
      percentByDay
    });
  }

  const actsCount = parsedRows.filter(r => r.kind === 'activity').length;
  if(!actsCount) throw new Error('No se encontraron actividades con fechas válidas en la hoja "' + sheetName + '".');

  const monthStart = minDate ? minDate.slice(0,7) + '-01' : BASE_SOURCE.start;
  const dEnd = maxDate ? new Date(Number(maxDate.slice(0,4)), Number(maxDate.slice(5,7)), 0) : new Date(BASE_SOURCE.end + 'T00:00:00Z');
  const monthEnd = dEnd.getFullYear() + '-' + String(dEnd.getMonth()+1).padStart(2,'0') + '-' + String(dEnd.getDate()).padStart(2,'0');
  const calDays = dates(monthStart, monthEnd).length;

  return {
    project: BASE_SOURCE.project,
    start: monthStart,
    end: monthEnd,
    calendarDays: calDays,
    workingDays: BASE_SOURCE.workingDays,
    source: fileName,
    importedAt: new Date().toLocaleString('es-PE', { dateStyle:'short', timeStyle:'short' }),
    holidays: BASE_SOURCE.holidays || {},
    nonWorkingByOwner: BASE_SOURCE.nonWorkingByOwner || {},
    rows: parsedRows
  };
}

async function handleExcelFileImport(file){
  if(!file) return;
  if(typeof toast === 'function') toast('Leyendo archivo Excel "' + file.name + '"…');
  try {
    const XLSX = await loadSheetJs();
    const buffer = await file.arrayBuffer();
    const wb = XLSX.read(buffer, { type:'array', cellDates:true });
    const nextSource = parseExcelWorkbook(wb, file.name);
    S = nextSource;
    try { localStorage.setItem(STORAGE_EXCEL_KEY, JSON.stringify(nextSource)); } catch {}
    st.owner = ''; st.group = ''; st.week = ''; st.status = ''; st.search = ''; st.selected = '';
    collapsedOwners.clear(); collapsedGroups.clear();
    rebuildFilterSelects();
    render();
    const count = S.rows.filter(r => r.kind === 'activity').length;
    if(typeof toast === 'function') toast('Excel importado: ' + count + ' actividades cargadas desde ' + file.name);
  } catch (err) {
    if(typeof toast === 'function') toast('Error al importar Excel: ' + (err?.message || 'formato no compatible'));
  }
}

function restoreBaseSource(){
  try { localStorage.removeItem(STORAGE_EXCEL_KEY); } catch {}
  S = BASE_SOURCE;
  st.owner = ''; st.group = ''; st.week = ''; st.status = ''; st.search = ''; st.selected = '';
  collapsedOwners.clear(); collapsedGroups.clear();
  rebuildFilterSelects();
  render();
  if(typeof toast === 'function') toast('Cronograma restaurado al corte base (13/11/2026).');
}

function rebuildFilterSelects(){
  const ownerSel = document.getElementById('vgg-owner');
  if(ownerSel){
    ownerSel.innerHTML = '<option value="">Todos</option>' +
      owners().map(o => '<option value="'+escapeText(o)+'">'+escapeText(o)+'</option>').join('');
    ownerSel.value = st.owner;
  }
  const weekSel = document.getElementById('vgg-week');
  if(weekSel){
    weekSel.innerHTML = '<option value="">Mes completo</option>' +
      getWeeks().map(w => '<option value="'+w+'">'+w+'</option>').join('');
    weekSel.value = st.week;
  }
  const statusSel = document.getElementById('vgg-status');
  if(statusSel) statusSel.value = st.status;
  const searchEl = document.getElementById('vgg-search');
  if(searchEl) searchEl.value = st.search;
  redrawGroups();
}

function applySharedGanttColumns(){
  const preferences = window.bimGanttColumnPreferences?.read?.();
  if(!preferences) return false;
  const next = new Set(preferences.hidden || []);
  const changed = next.size !== hiddenColumns.size || [...next].some(i => !hiddenColumns.has(i));
  if(!changed) return false;
  hiddenColumns.clear();
  for(const index of next) hiddenColumns.add(index);
  const picker = document.getElementById('vgg-colchooser');
  if(picker) picker.querySelectorAll('input[data-vgg-col]').forEach(input => {
    input.checked = !hiddenColumns.has(Number(input.dataset.vggCol));
  });
  return true;
}

window.addEventListener('bim-gantt-columns-updated', () => {
  if(!applySharedGanttColumns() || !overlay || overlay.hidden) return;
  const scroll = overlay.querySelector('.vgg-scroll');
  const left = scroll?.scrollLeft || 0, top = scroll?.scrollTop || 0;
  render();
  if(scroll){ scroll.scrollLeft = left; scroll.scrollTop = top; }
});

function redrawGroups(){
  const select = document.getElementById('vgg-group');
  if(!select) return;
  const groups = [...new Set(S.rows.filter(r => r.kind==='activity' && (!st.owner || r.owner===st.owner)).map(r => r.group))];
  if(!groups.includes(st.group)) st.group = '';
  select.innerHTML = '<option value="">Todos los grupos</option>' + groups.map(g =>
    '<option value="'+escapeText(g)+'">'+escapeText(g)+'</option>').join('');
  select.value = st.group;
}

function close(){
  if(!overlay || overlay.hidden) return;
  overlay.hidden = true;
  document.body.style.overflow = bodyOverflow;
  if(lastTrigger && lastTrigger.isConnected && typeof lastTrigger.focus==='function') lastTrigger.focus();
  lastTrigger = null;
}

function open(){
  applySharedGanttColumns();
  lastTrigger = document.activeElement;
  if(!overlay){
    overlay = document.createElement('div');
    overlay.id = 'bim-gantt-overlay';
    overlay.hidden = true;
    overlay.setAttribute('role','dialog');
    overlay.setAttribute('aria-modal','true');
    overlay.setAttribute('aria-label','Visor Gantt Excel');
    overlay.innerHTML = '<section id="bim-gantt-modal"><header class="vgg-header"><div>'+
      '<h2>CRONOGRAMA DEL PROYECTO — DIAGRAMA DE GANTT <span id="vgg-source-badge" class="vgg-source-badge"></span></h2>'+
      '<p id="vgg-header-sub"></p></div>'+
      '<div class="vgg-header-actions">'+
      '<input type="file" id="vgg-excel-input" accept=".xlsx,.xls" hidden>'+
      '<button type="button" data-vgg-action="import-excel" title="Cargar archivo Excel (.xlsx) actualizado con la hoja Gant">↑ Importar Excel</button>'+
      '<button type="button" id="vgg-restore-excel" data-vgg-action="restore-excel" hidden title="Volver al corte base del repositorio">Restaurar base</button>'+
      '<button type="button" data-vgg-action="today" title="Desplazar el cronograma hasta la columna de hoy">Ir a Hoy</button>'+
      '<button type="button" data-vgg-action="expand">Pantalla completa</button>'+
      '<button type="button" data-vgg-action="close">✕ Cerrar</button></div></header>'+
      '<div class="vgg-controls"><label>Responsable <select id="vgg-owner"></select></label>'+
      '<label>Grupo <select id="vgg-group"></select></label>'+
      '<label>Semana <select id="vgg-week"></select></label>'+
      '<label>Estado <select id="vgg-status"><option value="">Todos</option>'+
      '<option value="unassigned">Sin asignar</option><option value="pending">Pendiente</option>'+
      '<option value="completed">Completada</option></select></label>'+
      '<input id="vgg-search" type="search" placeholder="Buscar actividad / ID (/)" aria-label="Buscar actividad">'+
      '<label>Zoom <select id="vgg-zoom" aria-label="Zoom del calendario">'+
      '<option value="compact">Compacto</option><option value="normal">Normal</option><option value="wide">Amplio</option>'+
      '</select></label>'+
      '<label class="vgg-theme-toggle" title="Activar modo oscuro en las celdas de la tabla">'+
      '<input type="checkbox" id="vgg-dark-table"> Tabla oscura</label>'+
      '<button type="button" id="vgg-collapse-all" class="vgg-tool-btn" data-vgg-action="toggle-collapse-all">Contraer todo</button>'+
      '<button type="button" id="vgg-reset-filters" class="vgg-reset-btn" data-vgg-action="reset-filters" hidden>Limpiar filtros</button>'+
      '<details id="vgg-colchooser" class="vgg-colchooser"><summary>Columnas compartidas</summary>'+
      '<div class="vgg-colchooser-popover" aria-label="Columnas visibles para todos">'+
      '<p style="margin:0 0 7px;color:var(--ink-secondary,#abc1db);font-size:10px">La selección se comparte con todos mediante Supabase.</p>'+
      columns.map((col,i) => '<label class="vgg-col-item"><input type="checkbox"'+
        (hiddenColumns.has(i)?'':' checked')+' data-vgg-col="'+i+'"> '+escapeText(col[0])+'</label>').join('')+
      '<button type="button" data-vgg-action="all-columns">Mostrar todas</button></div></details>'+
      '<span class="vgg-count" id="vgg-count"></span></div>'+
      '<div class="vgg-scroll"><table class="vgg-table" id="vgg-table" aria-label="Cronograma Gantt basado en Excel"></table>'+
      '<div id="vgg-empty-state" class="vgg-empty-state" hidden><strong>Sin actividades coincidentes</strong>'+
      '<p>Ninguna actividad del cronograma coincide con los filtros o búsqueda aplicados.</p>'+
      '<button type="button" data-vgg-action="reset-filters">Restablecer filtros</button></div></div>'+
      '<div class="vgg-detail" id="vgg-detail"></div>'+
      '<footer class="vgg-footer"><span class="vgg-chip"><i></i> Programado</span>'+
      '<span class="vgg-chip"><i class="done"></i> Avance real</span>'+
      '<span class="vgg-chip"><i class="partial"></i> Avance parcial</span>'+
      '<span class="vgg-chip"><i class="late"></i> Fuera de plazo</span>'+
      '<span class="vgg-chip"><i class="group"></i> Grupo</span>'+
      '<span class="vgg-chip"><i class="weekend"></i> Fin de semana / feriado</span>'+
      '<span class="vgg-chip"><i class="day-off"></i> Día libre Prada (9-10)</span>'+
      '<span class="vgg-chip"><i class="pred"></i> Predecesor</span>'+
      '<span class="vgg-chip"><i class="succ"></i> Dependiente</span>'+
      '<span id="vgg-footer-source"></span>'+
      '</footer></section>';
    document.body.appendChild(overlay);

    const zoomEl = document.getElementById('vgg-zoom');
    if(zoomEl){
      zoomEl.value = ZOOM_WIDTHS[st.zoom] ? st.zoom : 'normal';
      zoomEl.addEventListener('change', ev => {
        st.zoom = ev.target.value;
        savePref(STORAGE_ZOOM_KEY, st.zoom);
        render();
      });
    }
    const darkEl = document.getElementById('vgg-dark-table');
    if(darkEl){
      darkEl.checked = darkTableMode;
      darkEl.addEventListener('change', ev => {
        darkTableMode = ev.target.checked;
        savePref(STORAGE_DARK_TABLE_KEY, darkTableMode ? '1' : '0');
        document.getElementById('bim-gantt-modal')?.classList.toggle('vgg-dark-table', darkTableMode);
      });
    }
    const fileInput = document.getElementById('vgg-excel-input');
    fileInput?.addEventListener('change', ev => {
      const f = ev.target.files?.[0];
      ev.target.value = '';
      if(f) handleExcelFileImport(f);
    });

    overlay.addEventListener('click', ev => {
      if(ev.target === overlay){ close(); return; }
      const columnPicker = document.getElementById('vgg-colchooser');
      if(columnPicker?.open && !columnPicker.contains(ev.target)) columnPicker.open = false;

      const openTaskBtn = ev.target.closest('[data-vgg-open-task]');
      if(openTaskBtn){ openLinkedTask(openTaskBtn.dataset.vggOpenTask); return; }

      const createTaskBtn = ev.target.closest('[data-vgg-create-task]');
      if(createTaskBtn){ createTaskFromGanttActivity(createTaskBtn.dataset.vggCreateTask); return; }

      const jumpBtn = ev.target.closest('[data-vgg-jump]');
      if(jumpBtn){
        const targetId = jumpBtn.dataset.vggJump;
        showDetail(targetId);
        const tr = overlay.querySelector('tr[data-gantt-activity="'+targetId+'"]');
        tr?.scrollIntoView({ block:'center', behavior:'smooth' });
        return;
      }

      const ownerToggle = ev.target.closest('tr[data-vgg-toggle-owner]');
      if(ownerToggle){
        const key = ownerToggle.dataset.vggToggleOwner;
        if(collapsedOwners.has(key)) collapsedOwners.delete(key);
        else collapsedOwners.add(key);
        render();
        return;
      }

      const groupToggle = ev.target.closest('tr[data-vgg-toggle-group]');
      if(groupToggle){
        const key = groupToggle.dataset.vggToggleGroup;
        if(collapsedGroups.has(key)) collapsedGroups.delete(key);
        else collapsedGroups.add(key);
        render();
        return;
      }

      const button = ev.target.closest('[data-vgg-action]');
      if(button){
        const act = button.dataset.vggAction;
        if(act === 'import-excel'){ fileInput?.click(); return; }
        if(act === 'restore-excel'){ restoreBaseSource(); return; }
        if(act === 'today'){
          const scroll = overlay.querySelector('.vgg-scroll');
          const todayCell = overlay.querySelector('th.today-header');
          if(scroll && todayCell){
            scroll.scrollTo({ left: Math.max(0, todayCell.offsetLeft - scroll.clientWidth/2), behavior:'smooth' });
          } else if(typeof toast === 'function'){
            toast('La fecha de hoy está fuera de la semana o mes visible.');
          }
          return;
        }
        if(act === 'toggle-collapse-all'){
          if(collapsedOwners.size > 0 || collapsedGroups.size > 0){
            collapsedOwners.clear();
            collapsedGroups.clear();
          } else {
            const acts = visibleActivities();
            acts.forEach(a => collapsedGroups.add(a.owner + '|' + a.group));
          }
          render();
          return;
        }
        if(act === 'reset-filters'){
          st.owner = ''; st.group = ''; st.week = ''; st.status = ''; st.search = ''; st.selected = '';
          ['owner','group','week','status','search'].forEach(k => {
            const el = document.getElementById('vgg-'+k);
            if(el) el.value = '';
          });
          redrawGroups();
          render();
          return;
        }
        if(act === 'all-columns'){
          hiddenColumns.clear();
          columnPicker.querySelectorAll('input[data-vgg-col]').forEach(input => input.checked = true);
          window.bimGanttColumnPreferences?.save?.([]);
          render();
          return;
        }
        if(act === 'close'){ close(); return; }
        if(act === 'expand'){
          const panel = document.getElementById('bim-gantt-modal');
          panel.classList.toggle('max');
          button.textContent = panel.classList.contains('max') ? 'Restaurar' : 'Pantalla completa';
          return;
        }
      }

      const tr = ev.target.closest('tr[data-gantt-activity]');
      if(tr) showDetail(tr.dataset.ganttActivity);
    });

    overlay.addEventListener('change', ev => {
      const input = ev.target.closest('input[data-vgg-col]');
      if(!input) return;
      const column = Number(input.dataset.vggCol);
      if(!Number.isInteger(column) || column<0 || column>=columns.length) return;
      if(!input.checked && visibleColumns().length<=1){ input.checked = true; return; }
      if(input.checked) hiddenColumns.delete(column);
      else hiddenColumns.add(column);
      window.bimGanttColumnPreferences?.save?.([...hiddenColumns]);
      render();
    });

    ['owner','group','week','status'].forEach(name => {
      document.getElementById('vgg-'+name).addEventListener('change', ev => {
        st[name] = ev.target.value;
        st.selected = '';
        if(name === 'owner') redrawGroups();
        render();
      });
    });

    document.getElementById('vgg-search').addEventListener('input', ev => {
      st.search = ev.target.value.trim();
      st.selected = '';
      render();
    });

    overlay.addEventListener('keydown', ev => {
      if(ev.key === 'Escape'){
        ev.preventDefault();
        const picker = document.getElementById('vgg-colchooser');
        if(picker?.open){ picker.open = false; return; }
        close();
        return;
      }
      if(ev.key === 'Enter' && ev.target.matches('tr[data-gantt-activity]')){
        showDetail(ev.target.dataset.ganttActivity);
      }
    });
  }

  rebuildFilterSelects();
  overlay.hidden = false;
  bodyOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  render();
  overlay.querySelector('[data-vgg-action="close"]').focus();
}

document.addEventListener('keydown', ev => {
  if(ev.key==='Escape' && overlay && !overlay.hidden) close();
});

const style = document.createElement('style');
style.id = 'bim-gantt-viewer-style';
style.textContent = VGG_CSS;
document.head.appendChild(style);
window.openBimGanttViewer = open;
})();
