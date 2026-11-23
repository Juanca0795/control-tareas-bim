const VGG_CSS = `
#bim-gantt-overlay{position:fixed;inset:0;background:rgba(4,9,20,.82);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);z-index:99990;display:flex;align-items:center;justify-content:center;padding:12px;box-sizing:border-box}
#bim-gantt-overlay[hidden]{display:none!important}
#bim-gantt-overlay *{box-sizing:border-box}
#bim-gantt-modal{display:flex;flex-direction:column;width:min(97vw,1820px);height:min(94dvh,1120px);min-width:0;max-height:100dvh;overflow:hidden;border:1px solid var(--border-strong,#334155);border-radius:16px;background:var(--bg-panel,#10182a);color:var(--ink-primary,#f8fafc);box-shadow:0 24px 80px rgba(0,0,0,.55);position:relative}
#bim-gantt-modal.max{width:100vw;height:100dvh;border-radius:0;border:0}
#bim-gantt-overlay:has(#bim-gantt-modal.max){padding:0}

.vgg-header{padding:12px 18px;display:flex;align-items:center;justify-content:space-between;gap:12px;border-bottom:1px solid var(--border-base,#253048);background:rgba(13,19,32,.88);flex-wrap:wrap}
html[data-theme="light"] .vgg-header{background:rgba(248,250,252,.96)}
.vgg-header h2{font-family:'Space Grotesk',Inter,sans-serif;font-size:14px;font-weight:800;margin:0 0 3px;letter-spacing:.015em;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.vgg-source-badge{font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:600;padding:2px 8px;border-radius:999px;background:rgba(59,130,246,.15);color:#60a5fa;border:1px solid rgba(59,130,246,.35)}
.vgg-source-badge.live{background:rgba(16,185,129,.15);color:#34d399;border-color:rgba(16,185,129,.35)}
html[data-theme="light"] .vgg-source-badge{background:#eff6ff;color:#1d4ed8;border-color:#bfdbfe}
html[data-theme="light"] .vgg-source-badge.live{background:#ecfdf5;color:#047857;border-color:#a7f3d0}
.vgg-header p{font-size:11px;color:var(--ink-secondary,#aab6ca);margin:0;line-height:1.45}
.vgg-header-actions{display:flex;align-items:center;gap:7px;flex-wrap:wrap;flex-shrink:0}
.vgg-header-actions button{height:32px;padding:0 11px;background:var(--bg-subtle,#1e293b);color:var(--ink-primary,#f8fafc);border:1px solid var(--border-base,#334155);border-radius:8px;cursor:pointer;font-size:11px;font-weight:600;display:inline-flex;align-items:center;gap:5px;transition:background-color .15s,border-color .15s,color .15s}
.vgg-header-actions button:hover{border-color:var(--accent-blue,#5da7ff);background:var(--bg-hover,#1a2333)}
.vgg-header-actions button[data-vgg-action="new-activity"]{background:#d71920;border-color:#d71920;color:#fff}
.vgg-header-actions button[data-vgg-action="new-activity"]:hover{background:#b51218;border-color:#b51218}
.vgg-header-actions button[data-vgg-action="open-excel-sync"]{border-color:rgba(16,185,129,.45);color:#34d399;background:rgba(16,185,129,.12)}
.vgg-header-actions button[data-vgg-action="open-excel-sync"]:hover{background:rgba(16,185,129,.22)}
html[data-theme="light"] .vgg-header-actions button[data-vgg-action="open-excel-sync"]{color:#047857;background:#ecfdf5;border-color:#6ee7b7}
.vgg-header-actions button[data-vgg-action="today"]{border-color:rgba(93,167,255,.45);color:var(--accent-blue,#60a5fa)}
.vgg-header-actions button[hidden]{display:none!important}

.vgg-controls{padding:9px 18px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;border-bottom:1px solid var(--border-base,#253048);position:relative;z-index:40;overflow:visible}
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
.vgg-scroll{flex:1;min-height:0;overflow:auto;overscroll-behavior:contain;background:#f8fafc;scrollbar-width:thin;position:relative;z-index:1}
.vgg-links-svg{position:absolute;top:0;left:0;pointer-events:none;z-index:4;overflow:visible}
.vgg-link-path{fill:none;stroke:#64748b;stroke-width:1.25;stroke-linecap:round;stroke-linejoin:round;opacity:.52;transition:opacity .15s ease,stroke .15s ease,stroke-width .15s ease}
#bim-gantt-modal.vgg-dark-table .vgg-link-path{stroke:#94a3b8;opacity:.48}
.vgg-links-svg.has-selection .vgg-link-path{opacity:.14}
.vgg-links-svg.has-selection .vgg-link-path.is-pred{stroke:#f59e0b;stroke-width:1.9;opacity:1}
.vgg-links-svg.has-selection .vgg-link-path.is-succ{stroke:#06b6d4;stroke-width:1.9;opacity:1}
.vgg-table{border-collapse:separate;border-spacing:0;table-layout:fixed;width:max-content;font-family:Inter,Arial,sans-serif;font-size:11px;color:#1e293b;background:#fff}
.vgg-table th,.vgg-table td{border-bottom:1px solid #e2e8f0;border-right:1px solid #edf2f7;padding:4px 7px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;height:30px}

/* Sticky real de cabeceras y columnas congeladas */
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

/* Filas colapsables de Responsable y Grupo + botones inline */
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
.vgg-inline-act{margin-left:5px;width:20px;height:20px;border-radius:5px;border:1px solid rgba(30,58,95,.25);background:rgba(255,255,255,.75);color:#1e3a5f;font-size:11px;font-weight:800;line-height:1;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;vertical-align:middle}
.vgg-inline-act:hover{background:#2563eb;color:#fff;border-color:#2563eb}
#bim-gantt-modal.vgg-dark-table .vgg-inline-act{background:rgba(255,255,255,.12);color:#e2e8f0;border-color:rgba(255,255,255,.22)}

.vgg-table .vgg-id{font-weight:800;color:#2563eb;text-align:center;font-family:'JetBrains Mono',monospace;font-size:10.5px}
.vgg-table .vgg-center{text-align:center}
.vgg-table .vgg-day{padding:0;position:relative;vertical-align:middle}

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

.vgg-table tbody td.vgg-day.weekend{background:#fff5f6!important}
.vgg-table tbody td.vgg-day.holiday{background:#ffe4e6!important}
.vgg-table tbody tr.vgg-activity td.vgg-day.day-off,
.vgg-table tbody tr.vgg-activity:hover td.vgg-day.day-off{background:#f3ecff!important}
.vgg-table tbody tr.vgg-group-row td.vgg-day.weekend,
.vgg-table tbody tr.vgg-group-row td.vgg-day.holiday,
.vgg-table tbody tr.vgg-group-row td.vgg-day.day-off{background:#f1f5f9!important}

/* Barras continuas */
.vgg-table tbody td.vgg-day.scheduled{border-right-color:transparent}
.vgg-table tbody td.vgg-day.scheduled.bar-end{border-right-color:#edf2f7}
.vgg-bar-seg{display:flex;align-items:center;justify-content:center;height:20px;margin:0;width:100%;background:linear-gradient(180deg,#4f83cc 0%,#3b6db5 100%);box-shadow:0 1px 2px rgba(15,23,42,.18);border-right:1px solid rgba(255,255,255,.22);transition:filter .15s ease}
.vgg-day.bar-start .vgg-bar-seg{border-top-left-radius:6px;border-bottom-left-radius:6px;margin-left:2px;width:calc(100% - 2px)}
.vgg-day.bar-end .vgg-bar-seg{border-top-right-radius:6px;border-bottom-right-radius:6px;border-right:0;margin-right:2px;width:calc(100% - 2px)}
.vgg-day.bar-start.bar-end .vgg-bar-seg{margin-left:2px;margin-right:2px;width:calc(100% - 4px)}
.vgg-bar-seg.done{background:linear-gradient(180deg,#14b89a 0%,#0d947b 100%)}
.vgg-bar-seg.partial{background:linear-gradient(90deg,#10b981 0%,#10b981 var(--vgg-real-fill),#4679c2 var(--vgg-real-fill),#4679c2 100%)}
.vgg-bar-seg.late{background:linear-gradient(180deg,#e5a13e 0%,#c98324 100%)}
.vgg-table tbody tr.vgg-activity:hover .vgg-bar-seg{filter:brightness(1.07)}
.vgg-cell-percent{font:700 8.5px/1 'JetBrains Mono',Inter,sans-serif;color:#ffffff;letter-spacing:-.2px;font-variant-numeric:tabular-nums;text-shadow:0 1px 1px rgba(0,0,0,.22)}

/* Barra Resumen ultra fina (2px) */
.vgg-table tbody tr.vgg-group-row td.vgg-day.scheduled{overflow:visible}
.vgg-group-bar{display:block;height:2px;width:calc(100% + 1px);margin-right:-1px;background:#1e3a5f;position:relative}
.vgg-day.bar-start .vgg-group-bar{border-top-left-radius:1px;margin-left:3px;width:calc(100% - 2px)}
.vgg-day.bar-end .vgg-group-bar{border-top-right-radius:1px;margin-right:3px;width:calc(100% - 3px)}
.vgg-day.bar-start.bar-end .vgg-group-bar{margin-left:3px;margin-right:3px;width:calc(100% - 6px)}
.vgg-day.bar-start .vgg-group-bar::before{content:"";position:absolute;left:0;top:2px;width:0;height:0;border-left:3px solid #1e3a5f;border-bottom:3px solid transparent}
.vgg-day.bar-end .vgg-group-bar::after{content:"";position:absolute;right:0;top:2px;width:0;height:0;border-right:3px solid #1e3a5f;border-bottom:3px solid transparent}

.vgg-table .vgg-title{overflow:hidden;text-overflow:ellipsis}

/* Selección y dependencias */
.vgg-table tbody tr.vgg-activity.vgg-selected td:not(.weekend):not(.holiday):not(.day-off){background:#dbeafe!important}
.vgg-table tbody tr.vgg-activity.vgg-selected td:first-child{box-shadow:inset 4px 0 0 #2563eb}
.vgg-table tbody tr.vgg-activity.vgg-predecessor td:not(.weekend):not(.holiday):not(.day-off){background:#fef3c7!important}
.vgg-table tbody tr.vgg-activity.vgg-predecessor td:first-child{box-shadow:inset 4px 0 0 #f59e0b}
.vgg-table tbody tr.vgg-activity.vgg-successor td:not(.weekend):not(.holiday):not(.day-off){background:#cffafe!important}
.vgg-table tbody tr.vgg-activity.vgg-successor td:first-child{box-shadow:inset 4px 0 0 #06b6d4}

/* Tabla oscura opcional */
#bim-gantt-modal.vgg-dark-table .vgg-scroll{background:#0b1120}
#bim-gantt-modal.vgg-dark-table .vgg-table{background:#0f172a;color:#e2e8f0}
#bim-gantt-modal.vgg-dark-table .vgg-table th,
#bim-gantt-modal.vgg-dark-table .vgg-table td{border-bottom-color:#1e293b;border-right-color:#1e293b}
#bim-gantt-modal.vgg-dark-table .vgg-table tbody tr.vgg-activity td{background:#0f172a}
#bim-gantt-modal.vgg-dark-table .vgg-table tbody tr.vgg-activity.vgg-row-alt td{background:#131d31}
#bim-gantt-modal.vgg-dark-table .vgg-table tbody tr.vgg-activity:hover td:not(.weekend):not(.holiday):not(.day-off){background:#1c2a44!important}
#bim-gantt-modal.vgg-dark-table .vgg-table tr.vgg-group-row td{background:#17253f;color:#e2e8f0;border-color:#263959}
#bim-gantt-modal.vgg-dark-table .vgg-table tr.vgg-group-row .vgg-row-badge{background:rgba(255,255,255,.14);color:#cbd5e1}
#bim-gantt-modal.vgg-dark-table .vgg-group-bar{background:#60a5fa}
#bim-gantt-modal.vgg-dark-table .vgg-day.bar-start .vgg-group-bar::before{border-left-color:#60a5fa}
#bim-gantt-modal.vgg-dark-table .vgg-day.bar-end .vgg-group-bar::after{border-right-color:#60a5fa}
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

.vgg-table thead .vgg-week th.vgg-week-start,
.vgg-table thead .vgg-date th.vgg-week-start,
.vgg-table thead .vgg-weekday th.vgg-week-start,
.vgg-table tbody td.vgg-day.vgg-week-start{border-left:1px solid #cbd5e1!important}
#bim-gantt-modal.vgg-dark-table .vgg-table tbody td.vgg-day.vgg-week-start{border-left-color:#334155!important}
.vgg-table tbody td.vgg-day.today{background:rgba(37,99,235,.06)!important;box-shadow:none!important}
#bim-gantt-modal.vgg-dark-table .vgg-table tbody td.vgg-day.today{background:rgba(59,130,246,.10)!important;box-shadow:none!important}
.vgg-table tbody tr.vgg-activity:focus-visible{outline:2px solid #2563eb;outline-offset:-2px}

/* Panel inferior accionable */
.vgg-detail{border-top:1px solid var(--border-base,#334155);padding:10px 18px;font-size:11.5px;line-height:1.5;min-height:48px;max-height:115px;overflow:auto;color:var(--ink-secondary,#cbd5e1);display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
.vgg-detail-text{flex:1 1 360px}
.vgg-detail b{color:var(--ink-primary,#fff)}
.vgg-detail-actions{display:flex;align-items:center;gap:7px;flex-wrap:wrap}
.vgg-action-btn{height:30px;padding:0 11px;border-radius:8px;border:1px solid rgba(93,167,255,.45);background:rgba(59,130,246,.16);color:#60a5fa;font-size:11px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:5px}
.vgg-action-btn:hover{background:rgba(59,130,246,.28)}
.vgg-action-btn.create{border-color:rgba(52,211,153,.45);background:rgba(16,185,129,.16);color:#34d399}
.vgg-action-btn.create:hover{background:rgba(16,185,129,.28)}
.vgg-action-btn.edit{border-color:rgba(245,158,11,.45);background:rgba(245,158,11,.15);color:#fbbf24}
.vgg-action-btn.edit:hover{background:rgba(245,158,11,.25)}
.vgg-action-btn.danger{border-color:rgba(239,68,68,.45);background:rgba(239,68,68,.15);color:#f87171}
.vgg-action-btn.danger:hover{background:rgba(239,68,68,.26)}
html[data-theme="light"] .vgg-action-btn{background:#eff6ff;color:#1d4ed8;border-color:#93c5fd}
html[data-theme="light"] .vgg-action-btn.create{background:#ecfdf5;color:#047857;border-color:#6ee7b7}
html[data-theme="light"] .vgg-action-btn.edit{background:#fffbeb;color:#b45309;border-color:#fcd34d}
html[data-theme="light"] .vgg-action-btn.danger{background:#fef2f2;color:#b91c1c;border-color:#fecaca}
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

/* Submodales internos del visor Gantt */
.vgg-submodal-back{position:absolute;inset:0;z-index:90;background:rgba(4,9,20,.72);backdrop-filter:blur(5px);display:flex;align-items:center;justify-content:center;padding:16px}
.vgg-submodal-back[hidden]{display:none!important}
.vgg-submodal{width:min(620px,96vw);max-height:90vh;display:flex;flex-direction:column;background:var(--bg-panel,#111827);color:var(--ink-primary,#f8fafc);border:1px solid var(--border-strong,#334155);border-radius:14px;box-shadow:0 24px 64px rgba(0,0,0,.55);overflow:hidden}
.vgg-submodal.narrow{width:min(460px,95vw)}
.vgg-submodal-hd{padding:14px 18px;border-bottom:1px solid var(--border-base,#253048);display:flex;align-items:center;justify-content:space-between;gap:12px}
.vgg-submodal-hd h3{margin:0;font-family:'Space Grotesk',Inter,sans-serif;font-size:14px;font-weight:700}
.vgg-submodal-close{width:28px;height:28px;border-radius:7px;border:1px solid var(--border-base,#334155);background:var(--bg-subtle,#1e293b);color:var(--ink-primary,#f8fafc);font-size:16px;cursor:pointer;display:grid;place-items:center}
.vgg-submodal-body{padding:16px 18px;overflow-y:auto;display:flex;flex-direction:column;gap:12px;font-size:12px}
.vgg-submodal-ft{padding:12px 18px;border-top:1px solid var(--border-base,#253048);display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap}
.vgg-form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}
.vgg-form-field{display:flex;flex-direction:column;gap:4px}
.vgg-form-field.wide{grid-column:1 / -1}
.vgg-form-field label{font-size:11px;font-weight:600;color:var(--ink-secondary,#cbd5e1)}
.vgg-form-field input,.vgg-form-field select{height:34px;padding:6px 10px;border-radius:8px;border:1px solid var(--border-strong,#334155);background:var(--bg-subtle,#1e293b);color:var(--ink-primary,#f8fafc);font-size:12px}
.vgg-form-field input[hidden],.vgg-form-field select[hidden]{display:none!important}
.vgg-sub-btn{height:34px;padding:0 14px;border-radius:8px;border:1px solid var(--border-strong,#334155);background:var(--bg-subtle,#1e293b);color:var(--ink-primary,#f8fafc);font-size:12px;font-weight:600;cursor:pointer}
.vgg-sub-btn.primary{background:#2563eb;border-color:#2563eb;color:#fff}
.vgg-sub-btn.primary:hover{background:#1d4ed8}
.vgg-sub-btn.success{background:#059669;border-color:#059669;color:#fff}
.vgg-sub-btn.success:hover{background:#047857}
.vgg-sub-btn.danger{background:#dc2626;border-color:#dc2626;color:#fff}
.vgg-sub-btn.danger:hover{background:#b91c1c}
.vgg-sub-error{padding:8px 10px;border-radius:8px;background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.38);color:#fca5a5;font-size:11.5px}
html[data-theme="light"] .vgg-sub-error{background:#fef2f2;color:#b91c1c;border-color:#fecaca}
.vgg-sub-error[hidden]{display:none!important}
.vgg-sub-warn{padding:9px 11px;border-radius:8px;background:rgba(245,158,11,.14);border:1px solid rgba(245,158,11,.38);color:#fde68a;font-size:11.5px;line-height:1.45}
html[data-theme="light"] .vgg-sub-warn{background:#fffbeb;color:#92400e;border-color:#fde68a}
.vgg-daily-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(78px,1fr));gap:6px;padding:10px;border:1px solid var(--border-base,#334155);border-radius:10px;background:rgba(15,23,42,.35)}
html[data-theme="light"] .vgg-daily-grid{background:#f8fafc}
.vgg-daily-cell{display:flex;flex-direction:column;gap:2px;font-size:10px}
.vgg-daily-cell input{height:28px;padding:2px 6px;font-family:'JetBrains Mono',monospace;font-size:11px;text-align:center}
.vgg-excel-card{padding:12px 14px;border:1px solid var(--border-base,#334155);border-radius:10px;background:var(--bg-subtle,#1e293b);display:flex;flex-direction:column;gap:8px}
.vgg-excel-card h4{margin:0;font-size:12.5px;font-weight:700}
.vgg-excel-card p{margin:0;font-size:11.5px;color:var(--ink-secondary,#cbd5e1);line-height:1.45}

@media(max-width:780px){#bim-gantt-overlay{padding:0}#bim-gantt-modal{width:100vw;height:100dvh;border-radius:0}.vgg-header{padding:9px}.vgg-controls{padding:7px}.vgg-count{margin-left:0}.vgg-form-grid{grid-template-columns:1fr}}
`;

/* Visor Gantt colaborativo en Supabase + Actualización de Excel exclusiva para AREA_BIM2. */
(function(){
'use strict';
if(!window.BIM_GANTT_VIEW_SOURCE) return;

try { localStorage.removeItem('bim-gantt-excel-override-v1'); } catch {}

const STORAGE_ZOOM_KEY = 'bim-gantt-zoom-v1';
const STORAGE_DARK_TABLE_KEY = 'bim-gantt-dark-table-v1';
const STORAGE_LINKS_KEY = 'bim-gantt-show-links-v1';
const ZOOM_WIDTHS = { compact: 22, normal: 30, wide: 42 };

const st = { owner:'', group:'', week:'', status:'', search:'', selected:'', zoom: readPref(STORAGE_ZOOM_KEY, 'normal') };
let darkTableMode = readPref(STORAGE_DARK_TABLE_KEY, '0') === '1';
let showLinksP6 = readPref(STORAGE_LINKS_KEY, '1') !== '0';
let overlay = null, bodyOverflow = '', lastTrigger = null;
const hiddenColumns = new Set();
const collapsedOwners = new Set();
const collapsedGroups = new Set();

const columns = [
  ['ID',56],['EDT',62],['Actividad / hito',310],['Responsable',148],
  ['Tipo',56],['Dur. (dc)',67],['Inicio',86],['Fin',86],
  ['Predecesor',84],['Dependencia',84],['Desfase (dc)',86]
];
const STICKY_INDICES = new Set([0, 1, 2]);

function getSource(){ return window.BIM_GANTT_VIEW_SOURCE; }
function readPref(key, fallback){
  try { return localStorage.getItem(key) || fallback; } catch { return fallback; }
}
function savePref(key, value){
  try { localStorage.setItem(key, String(value)); } catch {}
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
function getAllDates(){ const S = getSource(); return dates(S.start, S.end); }
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
function owners(){ return [...new Set(getSource().rows.filter(r=>r.kind==='activity' && r.owner).map(r=>r.owner))]; }
function ownerOfSection(row){
  if(row.kind !== 'owner') return '';
  const text = normalizeKey(row.label);
  return owners().find(o => text.includes(normalizeKey(o))) || row.label.replace(/^actividades\s+/i, '');
}

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

function parsePredecessorCodes(predecessorStr){
  if(!predecessorStr) return [];
  const matches = String(predecessorStr).toUpperCase().match(/[A-Z]+\d+|\b\d+(?:\.\d+)?\b/g);
  return matches ? [...new Set(matches)] : [];
}
function findDependencies(activityRow){
  if(!activityRow) return { predecessors: [], successors: [] };
  const acts = getSource().rows.filter(r => r.kind === 'activity');
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
  return getSource().rows.filter(row => {
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
  const S = getSource();
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
  const showEmptyGroups = !st.status && !st.search && !st.week;
  const result = [];
  let currentOwner = '';
  for(const row of S.rows){
    if(row.kind === 'owner'){
      currentOwner = ownerOfSection(row);
      const hasOwnerGroups = showEmptyGroups && S.rows.some(r => r.kind==='group' && (r._ownerName===currentOwner || ownerOfSection({kind:'owner',label:r.owner})===currentOwner) && (!st.owner || currentOwner===st.owner));
      if(presentOwners.has(currentOwner) || hasOwnerGroups){
        result.push({ ...row, _ownerKey: currentOwner, _count: countByOwner.get(currentOwner)||0 });
      }
    } else if(row.kind === 'group'){
      const gKey = currentOwner + '|' + row.title;
      const groupMatchesFilter = showEmptyGroups && (!st.owner || currentOwner===st.owner) && (!st.group || row.title===st.group);
      if(!groups.has(gKey) && !groupMatchesFilter) continue;
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
function nonWorkingDate(d){ const S = getSource(); return S.holidays?.[d] || window.BIM_GANTT_BASE_SOURCE?.holidays?.[d] || ''; }
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
  const S = getSource();
  const info = dayInfo(d);
  const today = d === (typeof todayString==='function' ? todayString() : new Date().toISOString().slice(0,10));
  const personalLeave = (S.nonWorkingByOwner || window.BIM_GANTT_BASE_SOURCE?.nonWorkingByOwner)?.[row.owner||'']?.[d] || '';
  const boundary = info.dow===1 ? ' vgg-week-start' : '';
  const dateAttr = ' data-vgg-date="'+d+'"';
  const cls = 'vgg-day'+(info.weekend?' weekend':'')+(info.holiday?' holiday':'')+
    (personalLeave?' day-off':'')+(today?' today':'')+boundary;
  if(row.kind === 'group'){
    if(!row.start || !row.end || d < row.start || d > row.end) return '<td class="'+cls+'"'+dateAttr+'></td>';
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

function visibleColumns(){
  const list = columns.map((col,i) => ({ label:col[0], width:col[1], index:i }))
    .filter(col => !hiddenColumns.has(col.index));
  let offset = 0, lastStickyPos = -1;
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
      const addBtn = '<button type="button" class="vgg-inline-act" data-vgg-add-in-group="'+escapeText(groupExtra.owner)+'|'+escapeText(row.title)+'" title="Agregar actividad en este grupo">+</button>';
      const editBtn = groupExtra.gid
        ? '<button type="button" class="vgg-inline-act" data-vgg-edit-group="'+escapeText(groupExtra.gid)+'" title="Editar o eliminar grupo">✎</button>'
        : '';
      content = '<span class="vgg-chevron" aria-hidden="true">'+icon+'</span>' + content +
        '<span class="vgg-row-badge">'+groupExtra.count+'</span>' + addBtn + editBtn;
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
  const S = getSource();
  const sub = document.getElementById('vgg-header-sub');
  const badge = document.getElementById('vgg-source-badge');
  const syncBtn = document.getElementById('vgg-excel-sync-btn');
  const footerSource = document.getElementById('vgg-footer-source');
  const isCustom = window.bimGanttScheduleStore?.isCustomized?.();
  if(sub){
    sub.textContent = S.project + ' · Inicio ' + readable(S.start) + ' · Fin ' + readable(S.end) +
      ' · ' + S.calendarDays + ' días calendario' + (S.workingDays ? ' · ' + S.workingDays + ' días laborables' : '');
  }
  if(badge){
    if(isCustom){
      badge.textContent = 'Supabase colaborativo · editable';
      badge.classList.add('live');
    } else {
      badge.textContent = 'Base Excel (editable en Supabase)';
      badge.classList.remove('live');
    }
  }
  if(syncBtn){
    const verified = window.bimArea2Auth?.isVerified?.();
    syncBtn.innerHTML = verified ? '↓ Actualizar Excel (AREA_BIM2)' : '🔒 Actualizar Excel';
  }
  if(footerSource){
    footerSource.textContent = isCustom
      ? 'Cronograma compartido en Supabase · Actualización a Excel exclusiva AREA_BIM2'
      : 'Base Excel 13/11/2026 · Editable por cualquier usuario en Supabase';
  }
}

function render(){
  if(!overlay || overlay.hidden) return;
  const S = getSource();
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
        rowMeta(copy, displayed, { collapsed:isCol, count:row._count, owner:row._ownerKey, gid:row._gid||'' }) +
        days.map((d, idx) => dayBar(row, d, { state:'group' }, days, idx)).join('') + '</tr>';
      continue;
    }
    const state = taskState(row);
    const depCls = st.selected===row.id ? ' vgg-selected' : predIds.has(row.id) ? ' vgg-predecessor' : succIds.has(row.id) ? ' vgg-successor' : '';
    body += '<tr class="vgg-activity'+((activityIndex++%2)?' vgg-row-alt':'')+depCls+
      '" data-gantt-activity="'+escapeText(row.id)+'" tabindex="0" title="Clic para ver detalle · Doble clic para editar">'+
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
    clearDependencyLinksSvg();
  } else {
    if(emptyBox) emptyBox.hidden = true;
    node.innerHTML = '<colgroup>'+colgroup+'</colgroup><thead>'+heads+datesRow+dowsRow+'</thead><tbody>'+body+'</tbody>';
    requestAnimationFrame(drawDependencyLinksSvg);
  }

  document.getElementById('vgg-count').textContent = values.length + ' de ' + totalActivities + ' actividades';
  if(!body){
    document.getElementById('vgg-detail').innerHTML = '<div class="vgg-detail-text">No se encontraron actividades para los filtros seleccionados.</div>';
  } else if(selectedRow){
    showDetail(selectedRow.id);
  } else {
    st.selected = '';
    document.getElementById('vgg-detail').innerHTML = '<div class="vgg-detail-text">Haz clic en una actividad para revisar dependencias y acciones, o <b>doble clic</b> para editarla directamente.</div>';
  }
}

/* Enlaces visuales ortogonales estilo Primavera P6 */
function clearDependencyLinksSvg(){
  const svg = document.getElementById('vgg-links-svg');
  if(svg) svg.innerHTML = '';
}
function updateDependencyLinkHighlight(){
  const svg = document.getElementById('vgg-links-svg');
  if(!svg) return;
  const sel = st.selected || '';
  svg.classList.toggle('has-selection', Boolean(sel));
  svg.querySelectorAll('path[data-from]').forEach(p => {
    const isPred = Boolean(sel) && p.dataset.to === sel;
    const isSucc = Boolean(sel) && p.dataset.from === sel;
    p.classList.toggle('is-pred', isPred);
    p.classList.toggle('is-succ', isSucc);
    p.setAttribute('marker-end', isPred ? 'url(#vgg-arrow-pred)' : isSucc ? 'url(#vgg-arrow-succ)' : 'url(#vgg-arrow-base)');
  });
}
function drawDependencyLinksSvg(){
  const S = getSource();
  const svg = document.getElementById('vgg-links-svg');
  const scroll = overlay?.querySelector('.vgg-scroll');
  const table = document.getElementById('vgg-table');
  if(!svg || !scroll || !table) return;
  if(!showLinksP6 || !table.tBodies[0]?.rows.length){
    svg.innerHTML = '';
    return;
  }

  const scrollRect = scroll.getBoundingClientRect();
  const sLeft = scroll.scrollLeft;
  const sTop = scroll.scrollTop;
  const fullW = Math.max(table.scrollWidth, scroll.clientWidth);
  const fullH = Math.max(table.scrollHeight, scroll.clientHeight);
  svg.setAttribute('width', String(fullW));
  svg.setAttribute('height', String(fullH));
  svg.setAttribute('viewBox', '0 0 ' + fullW + ' ' + fullH);

  const boxes = new Map();
  const rowByCode = new Map();
  const visibleActs = [];
  table.querySelectorAll('tr[data-gantt-activity]').forEach(tr => {
    const id = tr.dataset.ganttActivity;
    const row = S.rows.find(r => r.kind === 'activity' && r.id === id);
    if(!row) return;
    const bars = tr.querySelectorAll('.vgg-bar-seg');
    if(!bars.length) return;
    const first = bars[0].getBoundingClientRect();
    const last = bars[bars.length - 1].getBoundingClientRect();
    const startX = (first.left - scrollRect.left) + sLeft;
    const endX = (last.right - scrollRect.left) + sLeft;
    const midY = (first.top + first.height / 2 - scrollRect.top) + sTop;
    const box = { id, row, startX, endX, midY };
    boxes.set(id, box);
    visibleActs.push(box);
    if(row.id) rowByCode.set(String(row.id).toUpperCase(), id);
    if(row.excelId) rowByCode.set(String(row.excelId).toUpperCase(), id);
    if(row.edt) rowByCode.set(String(row.edt).toUpperCase(), id);
  });

  const defs = '<defs>'+
    '<marker id="vgg-arrow-base" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5.5" markerHeight="5.5" orient="auto"><path d="M1 1.2 L7 4 L1 6.8 Z" fill="#64748b"/></marker>'+
    '<marker id="vgg-arrow-pred" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M1 1.2 L7 4 L1 6.8 Z" fill="#f59e0b"/></marker>'+
    '<marker id="vgg-arrow-succ" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M1 1.2 L7 4 L1 6.8 Z" fill="#06b6d4"/></marker>'+
    '</defs>';

  let paths = '';
  const stub = 7;
  for(const succ of visibleActs){
    const predCodes = parsePredecessorCodes(succ.row.predecessor);
    if(!predCodes.length) continue;
    const depType = String(succ.row.dependency || '').toUpperCase();
    const isSS = /^(SS|CC|II)/.test(depType);
    const seenPreds = new Set();
    for(const code of predCodes){
      const predId = rowByCode.get(code);
      if(!predId || predId === succ.id || seenPreds.has(predId)) continue;
      seenPreds.add(predId);
      const pred = boxes.get(predId);
      if(!pred) continue;

      let d = '';
      const x1 = isSS ? pred.startX : pred.endX;
      const y1 = pred.midY;
      const x2 = succ.startX - 1;
      const y2 = succ.midY;

      if(isSS){
        const leftX = Math.min(x1, x2) - 8;
        d = `M ${x1} ${y1} H ${leftX} V ${y2} H ${x2}`;
      } else if(x2 >= x1 + stub + 4){
        const turnX = Math.min(x1 + stub, x2 - 4);
        d = `M ${x1} ${y1} H ${turnX} V ${y2} H ${x2}`;
      } else {
        const outX = x1 + stub;
        const backX = x2 - stub;
        const dir = y2 >= y1 ? 1 : -1;
        const midRowY = Math.abs(y2 - y1) > 18 ? (y2 - dir * 14) : (y1 + dir * 13);
        d = `M ${x1} ${y1} H ${outX} V ${midRowY} H ${backX} V ${y2} H ${x2}`;
      }

      paths += '<path class="vgg-link-path" data-from="'+escapeText(pred.id)+'" data-to="'+escapeText(succ.id)+'" d="'+d+'" marker-end="url(#vgg-arrow-base)"/>';
    }
  }

  svg.innerHTML = defs + paths;
  updateDependencyLinkHighlight();
}

function showDetail(id){
  const S = getSource();
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
  actions += '<button type="button" class="vgg-action-btn edit" data-vgg-edit-activity="'+escapeText(row.id)+'">✎ Editar</button>';
  actions += '<button type="button" class="vgg-action-btn danger" data-vgg-delete-activity="'+escapeText(row.id)+'">🗑 Eliminar</button>';
  if(status.taskIds.length){
    actions += status.taskIds.slice(0,2).map(tid =>
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
  updateDependencyLinkHighlight();
}

function openLinkedTask(taskId){
  if(typeof openEditor !== 'function') return;
  close();
  setTimeout(() => openEditor(taskId), 30);
}

function createTaskFromGanttActivity(activityId){
  const row = getSource().rows.find(r => r.kind==='activity' && r.id===activityId);
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

/* ============================================================================
   SUBMODALES DE EDICIÓN ABIERTA (CUALQUIER USUARIO -> SUPABASE)
   ============================================================================ */
function closeSubmodal(){
  const back = document.getElementById('vgg-submodal-back');
  if(back){
    back.hidden = true;
    back.innerHTML = '';
  }
}

function allOwnerOptions(){
  const set = new Set(owners());
  if(typeof catalogs !== 'undefined' && Array.isArray(catalogs.owners)){
    catalogs.owners.forEach(o => { if(o && !/^X\s+/i.test(o)) set.add(o); });
  }
  return [...set];
}

function groupsForOwner(ownerName){
  const rows = getSource().rows;
  const out = new Set();
  rows.forEach(r => {
    if(r.kind==='group'){
      const o = r._ownerName || ownerOfSection({kind:'owner',label:r.owner});
      if(!ownerName || normalizeKey(o)===normalizeKey(ownerName)) out.add(r.title);
    } else if(r.kind==='activity'){
      if(!ownerName || normalizeKey(r.owner)===normalizeKey(ownerName)) out.add(r.group);
    }
  });
  return [...out];
}

function openActivityModal({ activityId='', presetOwner='', presetGroup='' } = {}){
  const store = window.bimGanttScheduleStore;
  if(!store) return;
  const S = getSource();
  const existing = activityId ? S.rows.find(r => r.kind==='activity' && r.id===activityId) : null;
  const isEdit = Boolean(existing);

  const ownerList = allOwnerOptions();
  const initialOwner = existing?.owner || presetOwner || st.owner || ownerList[0] || '';
  const initialGroup = existing?.group || presetGroup || st.group || groupsForOwner(initialOwner)[0] || '';
  const suggestedCode = existing?.excelId || existing?.id || store.nextSuggestedExcelId();
  const predOptions = S.rows.filter(r => r.kind==='activity' && r.id!==activityId)
    .map(r => '<option value="'+escapeText(r.excelId||r.id)+'">'+escapeText((r.excelId||r.id)+' — '+r.title)+'</option>').join('');

  const back = document.getElementById('vgg-submodal-back');
  back.innerHTML = '<div class="vgg-submodal" role="dialog" aria-modal="true" aria-label="'+(isEdit?'Editar actividad':'Nueva actividad Gantt')+'">'+
    '<div class="vgg-submodal-hd"><h3>'+(isEdit ? 'Editar actividad ' + escapeText(existing.excelId||existing.id) : 'Nueva actividad en Gantt')+'</h3>'+
    '<button type="button" class="vgg-submodal-close" data-vgg-sub-close>×</button></div>'+
    '<form id="vgg-activity-form"><div class="vgg-submodal-body">'+
    '<div id="vgg-act-err" class="vgg-sub-error" hidden></div>'+
    '<div class="vgg-form-grid">'+
    '<div class="vgg-form-field"><label for="vgg-f-code">Código visible (ID)</label><input id="vgg-f-code" value="'+escapeText(suggestedCode)+'" maxlength="20" required></div>'+
    '<div class="vgg-form-field"><label for="vgg-f-type">Tipo</label><select id="vgg-f-type"><option value="Act."'+(existing?.type!=='Hito'?' selected':'')+'>Actividad</option><option value="Hito"'+(existing?.type==='Hito'?' selected':'')+'>Hito</option></select></div>'+
    '<div class="vgg-form-field wide"><label for="vgg-f-title">Actividad / hito *</label><input id="vgg-f-title" value="'+escapeText(existing?.title||'')+'" maxlength="200" required placeholder="Ej.: Modelado BIM · Sector 2"></div>'+
    '<div class="vgg-form-field"><label for="vgg-f-owner">Responsable *</label><select id="vgg-f-owner"></select><input id="vgg-f-owner-custom" placeholder="Nombre del responsable" hidden></div>'+
    '<div class="vgg-form-field"><label for="vgg-f-group">Grupo *</label><select id="vgg-f-group"></select><input id="vgg-f-group-custom" placeholder="Nombre del nuevo grupo" hidden></div>'+
    '<div class="vgg-form-field"><label for="vgg-f-start">Fecha inicio *</label><input id="vgg-f-start" type="date" value="'+escapeText(existing?.start||S.start)+'" required></div>'+
    '<div class="vgg-form-field"><label for="vgg-f-end">Fecha fin *</label><input id="vgg-f-end" type="date" value="'+escapeText(existing?.end||existing?.start||S.start)+'" required></div>'+
    '<div class="vgg-form-field"><label for="vgg-f-pred">Predecesor (ID)</label><input id="vgg-f-pred" list="vgg-pred-datalist" value="'+escapeText(existing?.predecessor||'')+'" placeholder="Ej.: A01"><datalist id="vgg-pred-datalist">'+predOptions+'</datalist></div>'+
    '<div class="vgg-form-field"><label for="vgg-f-dep">Dependencia / Desfase</label><div style="display:flex;gap:6px"><select id="vgg-f-dep" style="flex:1"><option value="">Sin dep.</option><option value="FC">FC</option><option value="CC">CC</option><option value="FF">FF</option><option value="CF">CF</option></select><input id="vgg-f-lag" style="width:72px" value="'+escapeText(existing?.lag||'')+'" placeholder="Desf."></div></div>'+
    '</div>'+
    '<label style="display:flex;align-items:center;gap:7px;font-size:11.5px;cursor:pointer"><input type="checkbox" id="vgg-f-manual-pct"'+(isEdit?' checked':'')+'> Ajustar porcentajes diarios manualmente (si se desmarca, se reparte automático entre días laborables)</label>'+
    '<div id="vgg-daily-wrap" class="vgg-daily-grid"'+(isEdit?'':' hidden')+'></div>'+
    '</div>'+
    '<div class="vgg-submodal-ft"><button type="button" class="vgg-sub-btn" data-vgg-sub-close>Cancelar</button><button type="submit" class="vgg-sub-btn primary">'+(isEdit?'Guardar cambios':'Crear actividad')+'</button></div>'+
    '</form></div>';
  back.hidden = false;

  const ownerSel = document.getElementById('vgg-f-owner');
  const ownerCustom = document.getElementById('vgg-f-owner-custom');
  const groupSel = document.getElementById('vgg-f-group');
  const groupCustom = document.getElementById('vgg-f-group-custom');
  const depSel = document.getElementById('vgg-f-dep');
  const manualChk = document.getElementById('vgg-f-manual-pct');
  const dailyWrap = document.getElementById('vgg-daily-wrap');
  const startEl = document.getElementById('vgg-f-start');
  const endEl = document.getElementById('vgg-f-end');

  ownerSel.innerHTML = ownerList.map(o => '<option value="'+escapeText(o)+'">'+escapeText(o)+'</option>').join('') +
    '<option value="__custom__">+ Otro responsable…</option>';
  if(ownerList.includes(initialOwner)) ownerSel.value = initialOwner;
  else if(initialOwner){ ownerSel.value = '__custom__'; ownerCustom.hidden = false; ownerCustom.value = initialOwner; }

  function getChosenOwner(){
    return ownerSel.value === '__custom__' ? ownerCustom.value.trim() : ownerSel.value;
  }
  function refreshGroupSelect(preferred){
    const list = groupsForOwner(getChosenOwner());
    groupSel.innerHTML = list.map(g => '<option value="'+escapeText(g)+'">'+escapeText(g)+'</option>').join('') +
      '<option value="__custom__">+ Nuevo grupo…</option>';
    if(preferred && list.includes(preferred)){
      groupSel.value = preferred;
      groupCustom.hidden = true;
    } else if(list.length && preferred !== '__custom__'){
      groupSel.value = list[0];
      groupCustom.hidden = true;
    } else {
      groupSel.value = '__custom__';
      groupCustom.hidden = false;
      if(preferred && preferred !== '__custom__') groupCustom.value = preferred;
    }
  }
  refreshGroupSelect(initialGroup);
  if(existing?.dependency) depSel.value = existing.dependency;

  function renderDailyGrid(){
    if(!manualChk.checked){ dailyWrap.hidden = true; return; }
    dailyWrap.hidden = false;
    const sVal = startEl.value, eVal = endEl.value;
    if(!sVal || !eVal || eVal < sVal){ dailyWrap.innerHTML = '<span style="grid-column:1/-1;opacity:.75">Rango de fechas inválido.</span>'; return; }
    const rangeDates = dates(sVal, eVal);
    const autoMap = store.computeAutoPercentByDay(getChosenOwner(), sVal, eVal);
    const currentMap = isEdit && sVal === existing.start && eVal === existing.end ? (existing.percentByDay || {}) : autoMap;
    dailyWrap.innerHTML = rangeDates.map(d => {
      const dayKey = String(Number(d.slice(8,10)));
      const raw = currentMap[dayKey] ?? autoMap[dayKey] ?? 0;
      const pct = raw ? Number((raw * 100).toFixed(1)) : 0;
      return '<label class="vgg-daily-cell"><span>'+readable(d)+'</span><input type="number" min="0" max="100" step="0.1" data-vgg-day="'+dayKey+'" value="'+pct+'"></label>';
    }).join('');
  }
  renderDailyGrid();

  ownerSel.addEventListener('change', () => {
    ownerCustom.hidden = ownerSel.value !== '__custom__';
    refreshGroupSelect('');
    renderDailyGrid();
  });
  groupSel.addEventListener('change', () => {
    groupCustom.hidden = groupSel.value !== '__custom__';
    if(!groupCustom.hidden) groupCustom.value = '';
  });
  startEl.addEventListener('change', () => { if(endEl.value < startEl.value) endEl.value = startEl.value; renderDailyGrid(); });
  endEl.addEventListener('change', renderDailyGrid);
  manualChk.addEventListener('change', renderDailyGrid);

  document.getElementById('vgg-activity-form').addEventListener('submit', ev => {
    ev.preventDefault();
    const errBox = document.getElementById('vgg-act-err');
    const chosenOwner = getChosenOwner();
    const chosenGroup = groupSel.value === '__custom__' ? groupCustom.value.trim() : groupSel.value;
    const sVal = startEl.value, eVal = endEl.value;
    if(!chosenOwner || !chosenGroup){
      errBox.textContent = 'Completa el responsable y el grupo de la actividad.';
      errBox.hidden = false;
      return;
    }
    if(eVal < sVal){
      errBox.textContent = 'La fecha fin no puede ser menor a la fecha inicio.';
      errBox.hidden = false;
      return;
    }
    let percentByDay = {};
    if(manualChk.checked){
      dailyWrap.querySelectorAll('input[data-vgg-day]').forEach(inp => {
        const val = Number(inp.value);
        if(Number.isFinite(val) && val > 0){
          percentByDay[inp.dataset.vggDay] = Number((val / 100).toFixed(6));
        }
      });
    }
    try {
      const saved = store.upsertActivity({
        id: existing?.id || '',
        excelId: document.getElementById('vgg-f-code').value.trim(),
        type: document.getElementById('vgg-f-type').value,
        title: document.getElementById('vgg-f-title').value.trim(),
        owner: chosenOwner,
        group: chosenGroup,
        start: sVal,
        end: eVal,
        predecessor: document.getElementById('vgg-f-pred').value.trim(),
        dependency: depSel.value,
        lag: document.getElementById('vgg-f-lag').value.trim(),
        manualPercent: manualChk.checked,
        percentByDay
      });
      closeSubmodal();
      st.selected = saved.id;
      rebuildFilterSelects();
      render();
      if(typeof toast === 'function') toast((isEdit ? 'Actividad actualizada: ' : 'Actividad creada: ') + (saved.excelId || saved.id));
    } catch (err) {
      errBox.textContent = err?.message || 'No se pudo guardar la actividad.';
      errBox.hidden = false;
    }
  });
  document.getElementById('vgg-f-title')?.focus();
}

function openGroupModal(gid=''){
  const store = window.bimGanttScheduleStore;
  if(!store) return;
  const sched = store.getSchedule();
  const existing = gid ? sched.groups[gid] : null;
  const ownerList = allOwnerOptions();
  const initialOwner = existing?.owner || st.owner || ownerList[0] || '';
  const hasActs = existing ? Object.values(sched.activities).some(a => a.owner===existing.owner && a.group.toLocaleLowerCase('es')===existing.title.toLocaleLowerCase('es')) : false;

  const back = document.getElementById('vgg-submodal-back');
  back.innerHTML = '<div class="vgg-submodal narrow" role="dialog" aria-modal="true" aria-label="'+(existing?'Editar grupo':'Nuevo grupo Gantt')+'">'+
    '<div class="vgg-submodal-hd"><h3>'+(existing ? 'Editar grupo' : 'Nuevo grupo en Gantt')+'</h3>'+
    '<button type="button" class="vgg-submodal-close" data-vgg-sub-close>×</button></div>'+
    '<form id="vgg-group-form"><div class="vgg-submodal-body">'+
    '<div id="vgg-grp-err" class="vgg-sub-error" hidden></div>'+
    '<div class="vgg-form-field"><label for="vgg-g-owner">Responsable *</label><select id="vgg-g-owner"></select><input id="vgg-g-owner-custom" placeholder="Nombre del responsable" hidden></div>'+
    '<div class="vgg-form-field"><label for="vgg-g-title">Nombre del grupo *</label><input id="vgg-g-title" value="'+escapeText(existing?.title||'')+'" maxlength="160" required placeholder="Ej.: Modelado BIM · Sector 3"></div>'+
    (existing && hasActs ? '<p style="margin:0;opacity:.8;font-size:11px">Renombrar este grupo actualizará automáticamente todas sus actividades.</p>' : '')+
    '</div>'+
    '<div class="vgg-submodal-ft">'+
    (existing && !hasActs ? '<button type="button" id="vgg-g-delete" class="vgg-sub-btn danger" style="margin-right:auto">Eliminar grupo</button>' : '')+
    '<button type="button" class="vgg-sub-btn" data-vgg-sub-close>Cancelar</button><button type="submit" class="vgg-sub-btn primary">'+(existing?'Guardar grupo':'Crear grupo')+'</button></div>'+
    '</form></div>';
  back.hidden = false;

  const ownerSel = document.getElementById('vgg-g-owner');
  const ownerCustom = document.getElementById('vgg-g-owner-custom');
  ownerSel.innerHTML = ownerList.map(o => '<option value="'+escapeText(o)+'">'+escapeText(o)+'</option>').join('') +
    '<option value="__custom__">+ Otro responsable…</option>';
  if(ownerList.includes(initialOwner)) ownerSel.value = initialOwner;
  else if(initialOwner){ ownerSel.value = '__custom__'; ownerCustom.hidden = false; ownerCustom.value = initialOwner; }
  ownerSel.addEventListener('change', () => { ownerCustom.hidden = ownerSel.value !== '__custom__'; });

  document.getElementById('vgg-g-delete')?.addEventListener('click', () => {
    try {
      store.deleteGroup(existing.id);
      closeSubmodal();
      rebuildFilterSelects();
      render();
      if(typeof toast === 'function') toast('Grupo eliminado del cronograma.');
    } catch (err) {
      const errBox = document.getElementById('vgg-grp-err');
      errBox.textContent = err?.message || 'No se pudo eliminar.';
      errBox.hidden = false;
    }
  });

  document.getElementById('vgg-group-form').addEventListener('submit', ev => {
    ev.preventDefault();
    const errBox = document.getElementById('vgg-grp-err');
    const chosenOwner = ownerSel.value === '__custom__' ? ownerCustom.value.trim() : ownerSel.value;
    const title = document.getElementById('vgg-g-title').value.trim();
    if(!chosenOwner || !title){
      errBox.textContent = 'Completa responsable y nombre del grupo.';
      errBox.hidden = false;
      return;
    }
    try {
      store.upsertGroup({ id: existing?.id || '', owner: chosenOwner, title });
      closeSubmodal();
      rebuildFilterSelects();
      render();
      if(typeof toast === 'function') toast(existing ? 'Grupo actualizado.' : 'Grupo creado.');
    } catch (err) {
      errBox.textContent = err?.message || 'Error al guardar grupo.';
      errBox.hidden = false;
    }
  });
  document.getElementById('vgg-g-title')?.focus();
}

function openDeleteActivityConfirm(activityId){
  const store = window.bimGanttScheduleStore;
  const row = getSource().rows.find(r => r.kind==='activity' && r.id===activityId);
  if(!store || !row) return;
  const linked = store.linkedTasksForActivity(activityId);
  const back = document.getElementById('vgg-submodal-back');
  back.innerHTML = '<div class="vgg-submodal narrow" role="dialog" aria-modal="true" aria-label="Confirmar eliminación">'+
    '<div class="vgg-submodal-hd"><h3>Eliminar actividad del Gantt</h3>'+
    '<button type="button" class="vgg-submodal-close" data-vgg-sub-close>×</button></div>'+
    '<div class="vgg-submodal-body">'+
    '<p style="margin:0">¿Seguro que deseas eliminar <b>'+escapeText((row.excelId||row.id)+' — '+row.title)+'</b>?</p>'+
    (linked.length ? '<div class="vgg-sub-warn">Atención: esta actividad está vinculada a <b>'+linked.map(t=>escapeText(t.id)).join(', ')+'</b>. Al eliminarla, esas tareas quedarán desvinculadas del Gantt.</div>' : '')+
    '</div>'+
    '<div class="vgg-submodal-ft"><button type="button" class="vgg-sub-btn" data-vgg-sub-close>Cancelar</button>'+
    '<button type="button" id="vgg-confirm-del-btn" class="vgg-sub-btn danger">Eliminar actividad</button></div></div>';
  back.hidden = false;
  document.getElementById('vgg-confirm-del-btn')?.addEventListener('click', () => {
    store.deleteActivity(activityId);
    if(st.selected === activityId) st.selected = '';
    closeSubmodal();
    rebuildFilterSelects();
    render();
    if(typeof toast === 'function') toast('Actividad eliminada del cronograma.');
  });
}

/* ============================================================================
   EXPORTACIÓN Y ACTUALIZACIÓN DE EXCEL EXCLUSIVA PARA AREA_BIM2
   ============================================================================ */
function loadSheetJs(){
  if(window.XLSX) return Promise.resolve(window.XLSX);
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js';
    s.onload = () => window.XLSX ? resolve(window.XLSX) : reject(new Error('XLSX no disponible'));
    s.onerror = () => reject(new Error('No se pudo cargar SheetJS (verifica tu conexión a internet)'));
    document.head.appendChild(s);
  });
}

function buildGantWorksheet(XLSX){
  const S = getSource();
  const allDates = getAllDates();
  const dnames = ['D','L','M','X','J','V','S'];
  const metaHeaders = ['ID','EDT','Actividad / hito','Responsable','Tipo','Dur. (dc)','Inicio','Fin','Predecesor','Dependencia','Desfase (dc)'];

  const row1 = new Array(metaHeaders.length).fill('');
  const row2 = [...metaHeaders];
  const row3 = new Array(metaHeaders.length).fill('');
  const merges = [];

  // Encabezados de semanas (fila 1), días (fila 2) y letras D-L-M (fila 3)
  let colIdx = metaHeaders.length;
  let lastW = '', wStartCol = colIdx;
  allDates.forEach((d, idx) => {
    const w = week(d);
    const info = dayInfo(d);
    row2.push(Number(d.slice(-2)));
    row3.push(dnames[info.dow]);
    if(w !== lastW){
      if(lastW && colIdx - 1 > wStartCol){
        merges.push({ s:{ r:0, c:wStartCol }, e:{ r:0, c:colIdx-1 } });
      }
      row1.push(w);
      lastW = w;
      wStartCol = colIdx;
    } else {
      row1.push('');
    }
    colIdx++;
    if(idx === allDates.length - 1 && colIdx - 1 > wStartCol){
      merges.push({ s:{ r:0, c:wStartCol }, e:{ r:0, c:colIdx-1 } });
    }
  });

  const aoa = [row1, row2, row3];
  const percentCells = [];

  for(const r of S.rows){
    if(r.kind === 'owner'){
      const line = new Array(metaHeaders.length + allDates.length).fill('');
      line[0] = r.label;
      aoa.push(line);
      continue;
    }
    if(r.kind === 'group'){
      const line = [
        '', r.id, r.title, '', 'Resumen', r.duration || '',
        r.start ? new Date(r.start + 'T12:00:00Z') : '',
        r.end ? new Date(r.end + 'T12:00:00Z') : '',
        '', '', ''
      ];
      allDates.forEach(() => line.push(''));
      aoa.push(line);
      continue;
    }
    const rowIdx = aoa.length;
    const line = [
      r.excelId || r.id,
      r.edt || '',
      r.title || '',
      r.owner || '',
      r.type || 'Act.',
      r.duration || '',
      r.start ? new Date(r.start + 'T12:00:00Z') : '',
      r.end ? new Date(r.end + 'T12:00:00Z') : '',
      r.predecessor || '',
      r.dependency || '',
      r.lag || ''
    ];
    allDates.forEach((d, dIdx) => {
      const val = r.percentByDay?.[String(Number(d.slice(8,10)))] || 0;
      if(val > 0){
        line.push(Number(val));
        percentCells.push({ r: rowIdx, c: metaHeaders.length + dIdx, v: Number(val) });
      } else {
        line.push('');
      }
    });
    aoa.push(line);
  }

  const ws = XLSX.utils.aoa_to_sheet(aoa, { cellDates: true });
  ws['!merges'] = merges;
  ws['!cols'] = [
    { wch: 7 }, { wch: 7 }, { wch: 44 }, { wch: 22 }, { wch: 9 }, { wch: 9 },
    { wch: 11 }, { wch: 11 }, { wch: 11 }, { wch: 11 }, { wch: 10 },
    ...allDates.map(() => ({ wch: 5.5 }))
  ];
  for(const pc of percentCells){
    const addr = XLSX.utils.encode_cell({ r: pc.r, c: pc.c });
    if(ws[addr]) ws[addr].z = pc.v < 0.1 ? '0.0%' : '0%';
  }
  return ws;
}

function buildActualProgressWorksheet(XLSX){
  const S = getSource();
  const labels = { completed:'Completada', pending:'Pendiente', unassigned:'Sin asignar' };
  const aoa = [['ID Excel','ID Interno','EDT','Actividad / hito','Responsable','Grupo','Inicio','Fin','Estado Gantt','Entregables BIM','Avance real (%)','Fin real']];
  for(const r of S.rows){
    if(r.kind !== 'activity') continue;
    const stInfo = taskState(r);
    aoa.push([
      r.excelId || r.id,
      r.id,
      r.edt || '',
      r.title,
      r.owner,
      r.group,
      r.start,
      r.end,
      labels[stInfo.state] || stInfo.state,
      stInfo.taskIds.join(', ') || 'Sin vincular',
      Number.isFinite(stInfo.actual) ? stInfo.actual : '',
      stInfo.completedAt || ''
    ]);
  }
  const ws = XLSX.utils.aoa_to_sheet(aoa);
  ws['!cols'] = [
    {wch:10},{wch:10},{wch:8},{wch:44},{wch:22},{wch:28},{wch:12},{wch:12},{wch:14},{wch:18},{wch:14},{wch:12}
  ];
  return ws;
}

function openArea2AuthThenExcelSync(){
  if(window.bimArea2Auth?.isVerified?.()){
    openExcelSyncModal();
    return;
  }
  const back = document.getElementById('vgg-submodal-back');
  back.innerHTML = '<div class="vgg-submodal narrow" role="dialog" aria-modal="true" aria-label="Autenticación AREA_BIM2">'+
    '<div class="vgg-submodal-hd"><h3>Acceso exclusivo AREA_BIM2</h3>'+
    '<button type="button" class="vgg-submodal-close" data-vgg-sub-close>×</button></div>'+
    '<form id="vgg-auth-form"><div class="vgg-submodal-body">'+
    '<p style="margin:0;line-height:1.45">Solo el usuario <b>AREA_BIM2</b> está autorizado para transferir los cambios del cronograma al Excel original.</p>'+
    '<div id="vgg-auth-err" class="vgg-sub-error" hidden></div>'+
    '<div class="vgg-form-field"><label for="vgg-a-user">Usuario</label><input id="vgg-a-user" autocomplete="username" required placeholder="AREA_BIM2"></div>'+
    '<div class="vgg-form-field"><label for="vgg-a-pass">Contraseña</label><input id="vgg-a-pass" type="password" autocomplete="current-password" required></div>'+
    '</div>'+
    '<div class="vgg-submodal-ft"><button type="button" class="vgg-sub-btn" data-vgg-sub-close>Cancelar</button>'+
    '<button type="submit" class="vgg-sub-btn success">Verificar y continuar</button></div>'+
    '</form></div>';
  back.hidden = false;
  document.getElementById('vgg-auth-form').addEventListener('submit', ev => {
    ev.preventDefault();
    const u = document.getElementById('vgg-a-user').value.trim().toUpperCase();
    const p = document.getElementById('vgg-a-pass').value;
    const errBox = document.getElementById('vgg-auth-err');
    if(!window.bimArea2Auth?.verify?.(u, p)){
      errBox.textContent = u && u !== 'AREA_BIM2'
        ? 'Solo el usuario AREA_BIM2 está autorizado para actualizar el Excel.'
        : 'Usuario o contraseña incorrectos.';
      errBox.hidden = false;
      document.getElementById('vgg-a-pass').value = '';
      document.getElementById('vgg-a-pass').focus();
      return;
    }
    renderHeaderMeta();
    openExcelSyncModal();
  });
  document.getElementById('vgg-a-user')?.focus();
}

function openExcelSyncModal(){
  const actsCount = getSource().rows.filter(r => r.kind === 'activity').length;
  const back = document.getElementById('vgg-submodal-back');
  back.innerHTML = '<div class="vgg-submodal" role="dialog" aria-modal="true" aria-label="Actualizar Excel AREA_BIM2">'+
    '<div class="vgg-submodal-hd"><h3>Actualizar Excel del Cronograma · AREA_BIM2</h3>'+
    '<button type="button" class="vgg-submodal-close" data-vgg-sub-close>×</button></div>'+
    '<div class="vgg-submodal-body">'+
    '<div id="vgg-xls-err" class="vgg-sub-error" hidden></div>'+
    '<div class="vgg-excel-card"><h4>Opción 1 · Reemplazar hoja «Gant» en tu Excel original (OneDrive)</h4>'+
    '<p>Selecciona tu archivo <code>Actividades Área Bim - Noviembre.xlsx</code>. Se conservarán todas las demás pestañas del libro y se reescribirá únicamente la hoja <b>Gant</b> con las <b>'+actsCount+' actividades</b> actuales de Supabase.</p>'+
    '<input type="file" id="vgg-xls-target" accept=".xlsx,.xlsm" hidden>'+
    '<div><button type="button" id="vgg-xls-merge-btn" class="vgg-sub-btn success">Elegir mi Excel (.xlsx) y actualizar hoja Gant</button></div></div>'+
    '<div class="vgg-excel-card"><h4>Opción 2 · Descargar libro Excel nuevo</h4>'+
    '<p>Genera un archivo <code>Actividades Área Bim - Actualizado.xlsx</code> desde cero con la hoja <b>Gant</b> y una pestaña adicional <b>Avance_Real_BIM</b> con el avance real y las tareas vinculadas.</p>'+
    '<div><button type="button" id="vgg-xls-new-btn" class="vgg-sub-btn primary">Descargar Excel nuevo (.xlsx)</button></div></div>'+
    '</div>'+
    '<div class="vgg-submodal-ft"><button type="button" class="vgg-sub-btn" data-vgg-sub-close>Cerrar</button></div></div>';
  back.hidden = false;

  const errBox = document.getElementById('vgg-xls-err');
  const targetInput = document.getElementById('vgg-xls-target');
  document.getElementById('vgg-xls-merge-btn')?.addEventListener('click', () => targetInput?.click());
  targetInput?.addEventListener('change', async ev => {
    const file = ev.target.files?.[0];
    ev.target.value = '';
    if(!file) return;
    errBox.hidden = true;
    try {
      const XLSX = await loadSheetJs();
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf, { type:'array', cellDates:true });
      const targetSheetName = wb.SheetNames.find(n => /^gant+$/i.test(n.trim())) || 'Gant';
      const ws = buildGantWorksheet(XLSX);
      if(!wb.SheetNames.includes(targetSheetName)) wb.SheetNames.unshift(targetSheetName);
      wb.Sheets[targetSheetName] = ws;
      XLSX.writeFile(wb, file.name);
      closeSubmodal();
      if(typeof toast === 'function') toast('Excel actualizado (' + targetSheetName + ') descargado como ' + file.name);
    } catch (err) {
      errBox.textContent = 'No se pudo actualizar el archivo: ' + (err?.message || 'error desconocido');
      errBox.hidden = false;
    }
  });

  document.getElementById('vgg-xls-new-btn')?.addEventListener('click', async () => {
    errBox.hidden = true;
    try {
      const XLSX = await loadSheetJs();
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, buildGantWorksheet(XLSX), 'Gant');
      XLSX.utils.book_append_sheet(wb, buildActualProgressWorksheet(XLSX), 'Avance_Real_BIM');
      XLSX.writeFile(wb, 'Actividades Area Bim - Actualizado.xlsx');
      closeSubmodal();
      if(typeof toast === 'function') toast('Excel nuevo generado con hojas Gant y Avance_Real_BIM.');
    } catch (err) {
      errBox.textContent = 'No se pudo generar el Excel: ' + (err?.message || 'error desconocido');
      errBox.hidden = false;
    }
  });
}

function rebuildFilterSelects(){
  const ownerSel = document.getElementById('vgg-owner');
  if(ownerSel){
    ownerSel.innerHTML = '<option value="">Todos</option>' +
      owners().map(o => '<option value="'+escapeText(o)+'">'+escapeText(o)+'</option>').join('');
    if(owners().includes(st.owner)) ownerSel.value = st.owner;
    else { st.owner = ''; ownerSel.value = ''; }
  }
  const weekSel = document.getElementById('vgg-week');
  if(weekSel){
    const wList = getWeeks();
    weekSel.innerHTML = '<option value="">Mes completo</option>' +
      wList.map(w => '<option value="'+w+'">'+w+'</option>').join('');
    if(wList.includes(st.week)) weekSel.value = st.week;
    else { st.week = ''; weekSel.value = ''; }
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

window.addEventListener('bim-gantt-schedule-updated', () => {
  if(!overlay || overlay.hidden) return;
  const scroll = overlay.querySelector('.vgg-scroll');
  const left = scroll?.scrollLeft || 0, top = scroll?.scrollTop || 0;
  rebuildFilterSelects();
  render();
  if(scroll){ scroll.scrollLeft = left; scroll.scrollTop = top; }
});

function redrawGroups(){
  const select = document.getElementById('vgg-group');
  if(!select) return;
  const groups = [...new Set(getSource().rows.filter(r => r.kind==='activity' && (!st.owner || r.owner===st.owner)).map(r => r.group))];
  if(!groups.includes(st.group)) st.group = '';
  select.innerHTML = '<option value="">Todos los grupos</option>' + groups.map(g =>
    '<option value="'+escapeText(g)+'">'+escapeText(g)+'</option>').join('');
  select.value = st.group;
}

function close(){
  if(!overlay || overlay.hidden) return;
  closeSubmodal();
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
    overlay.setAttribute('aria-label','Visor Gantt Colaborativo');
    overlay.innerHTML = '<section id="bim-gantt-modal"><header class="vgg-header"><div>'+
      '<h2>CRONOGRAMA DEL PROYECTO — DIAGRAMA DE GANTT <span id="vgg-source-badge" class="vgg-source-badge"></span></h2>'+
      '<p id="vgg-header-sub"></p></div>'+
      '<div class="vgg-header-actions">'+
      '<button type="button" data-vgg-action="new-activity" title="Agregar nueva actividad al cronograma">+ Nueva actividad</button>'+
      '<button type="button" data-vgg-action="new-group" title="Crear nuevo grupo de actividades">+ Grupo</button>'+
      '<button type="button" id="vgg-excel-sync-btn" data-vgg-action="open-excel-sync" title="Solo AREA_BIM2: transferir datos del Gantt a Excel">🔒 Actualizar Excel</button>'+
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
      '<label class="vgg-theme-toggle" title="Mostrar u ocultar líneas de relación predecesor-sucesor estilo Primavera P6">'+
      '<input type="checkbox" id="vgg-show-links"> Enlaces P6</label>'+
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
      '<div class="vgg-scroll"><table class="vgg-table" id="vgg-table" aria-label="Cronograma Gantt editable"></table>'+
      '<svg id="vgg-links-svg" class="vgg-links-svg" aria-hidden="true"></svg>'+
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
      '</footer>'+
      '<div id="vgg-submodal-back" class="vgg-submodal-back" hidden></div>'+
      '</section>';
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
    const linksEl = document.getElementById('vgg-show-links');
    if(linksEl){
      linksEl.checked = showLinksP6;
      linksEl.addEventListener('change', ev => {
        showLinksP6 = ev.target.checked;
        savePref(STORAGE_LINKS_KEY, showLinksP6 ? '1' : '0');
        drawDependencyLinksSvg();
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

    overlay.addEventListener('dblclick', ev => {
      const tr = ev.target.closest('tr[data-gantt-activity]');
      if(tr) openActivityModal({ activityId: tr.dataset.ganttActivity });
    });

    overlay.addEventListener('click', ev => {
      if(ev.target === overlay){ close(); return; }
      const subBack = document.getElementById('vgg-submodal-back');
      if(ev.target === subBack || ev.target.closest('[data-vgg-sub-close]')){ closeSubmodal(); return; }

      const columnPicker = document.getElementById('vgg-colchooser');
      if(columnPicker?.open && !columnPicker.contains(ev.target)) columnPicker.open = false;

      const addInGroup = ev.target.closest('[data-vgg-add-in-group]');
      if(addInGroup){
        ev.stopPropagation();
        const [pOwner, pGroup] = addInGroup.dataset.vggAddInGroup.split('|');
        openActivityModal({ presetOwner: pOwner, presetGroup: pGroup });
        return;
      }
      const editGroupBtn = ev.target.closest('[data-vgg-edit-group]');
      if(editGroupBtn){
        ev.stopPropagation();
        openGroupModal(editGroupBtn.dataset.vggEditGroup);
        return;
      }

      const editActBtn = ev.target.closest('[data-vgg-edit-activity]');
      if(editActBtn){ openActivityModal({ activityId: editActBtn.dataset.vggEditActivity }); return; }

      const delActBtn = ev.target.closest('[data-vgg-delete-activity]');
      if(delActBtn){ openDeleteActivityConfirm(delActBtn.dataset.vggDeleteActivity); return; }

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
        if(act === 'new-activity'){ openActivityModal(); return; }
        if(act === 'new-group'){ openGroupModal(); return; }
        if(act === 'open-excel-sync'){ openArea2AuthThenExcelSync(); return; }
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
            visibleActivities().forEach(a => collapsedGroups.add(a.owner + '|' + a.group));
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
          requestAnimationFrame(drawDependencyLinksSvg);
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
        const sub = document.getElementById('vgg-submodal-back');
        if(sub && !sub.hidden){ closeSubmodal(); return; }
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
  if(ev.key==='Escape' && overlay && !overlay.hidden){
    const sub = document.getElementById('vgg-submodal-back');
    if(sub && !sub.hidden){ closeSubmodal(); return; }
    close();
  }
});
window.addEventListener('resize', () => {
  if(overlay && !overlay.hidden) requestAnimationFrame(drawDependencyLinksSvg);
});

const style = document.createElement('style');
style.id = 'bim-gantt-viewer-style';
style.textContent = VGG_CSS;
document.head.appendChild(style);
window.openBimGanttViewer = open;
})();
