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
.vgg-header-actions button#vgg-header-clear-filters{opacity:.68}
.vgg-header-actions button#vgg-header-clear-filters.is-active{opacity:1;border-color:rgba(93,167,255,.55);color:var(--accent-blue,#60a5fa);background:rgba(59,130,246,.14)}
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

/* Barras continuas limpias sin porcentajes ni cortes internos */
.vgg-table tbody td.vgg-day.scheduled{border-right-color:transparent;overflow:visible}
.vgg-table tbody td.vgg-day.scheduled.bar-end{border-right-color:#edf2f7}
.vgg-bar-seg{position:relative;z-index:2;display:flex;align-items:center;justify-content:center;height:20px;margin:0;width:calc(100% + 1px);margin-right:-1px;background:linear-gradient(180deg,#4f83cc 0%,#3b6db5 100%);box-shadow:0 1px 2px rgba(15,23,42,.15);border-right:0;transition:filter .15s ease}
.vgg-day.bar-start .vgg-bar-seg{border-top-left-radius:6px;border-bottom-left-radius:6px;margin-left:2px;width:calc(100% - 1px)}
.vgg-day.bar-end .vgg-bar-seg{border-top-right-radius:6px;border-bottom-right-radius:6px;margin-right:2px;width:calc(100% - 2px)}
.vgg-day.bar-start.bar-end .vgg-bar-seg{margin-left:2px;margin-right:2px;width:calc(100% - 4px)}
.vgg-bar-seg.done{background:linear-gradient(180deg,#14b89a 0%,#0d947b 100%)}
.vgg-bar-seg.partial{background:linear-gradient(180deg,#14b89a 0%,#0d947b 100%) left/var(--vgg-real-fill) 100% no-repeat,linear-gradient(180deg,#4f83cc 0%,#3b6db5 100%)}
.vgg-bar-seg.late{background:linear-gradient(180deg,#e5a13e 0%,#c98324 100%)}
.vgg-bar-seg.culminated{box-shadow:none}
.vgg-table tbody td.vgg-day.vgg-week-start.scheduled:not(.bar-start){border-left-color:transparent!important}
.vgg-table tbody td.vgg-day.vgg-week-start.scheduled:not(.bar-start) .vgg-bar-seg{margin-left:-1px;width:calc(100% + 2px)}
.vgg-table tbody td.vgg-day.vgg-week-start.scheduled.bar-end:not(.bar-start) .vgg-bar-seg{width:calc(100% - 1px)}
.vgg-table tbody tr.vgg-activity:hover .vgg-bar-seg{filter:brightness(1.07)}
.vgg-bar-center-pct{position:absolute;top:50%;transform:translate(-50%,-50%);z-index:4;font:700 9px/1 'JetBrains Mono',Inter,sans-serif;color:#ffffff;letter-spacing:-.2px;font-variant-numeric:tabular-nums;text-shadow:0 1px 3px rgba(0,0,0,.5);pointer-events:none;white-space:nowrap}

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
  const actual = Number.isFinite(state.actual) ? Math.min(100, Math.max(0, state.actual)) : 0;
  let status = '', style = '';
  if(actual >= 99.999){
    status = state.late ? ' late culminated' : ' done culminated';
  } else if(actual > 0.001){
    const fill = realFillOfGanttDay(row, d, actual);
    status = fill >= 99.999 ? ' done' : fill > 0.001 ? ' partial' : '';
    if(status === ' partial') style = ' style="--vgg-real-fill:' + Number(fill.toFixed(3)) + '%"';
  }
  let pctLabel = '';
  if(!prevHas && actual > 0.001 && actual < 99.999){
    // Encontrar en qué bloque contiguo cae el frente de avance para mostrar un único % centrado en ese bloque
    let frontierIdx = -1;
    for(let i = 0; i < days.length; i++){
      const vDay = row.percentByDay?.[String(Number(days[i].slice(8,10)))] || 0;
      if(vDay > 0 && realFillOfGanttDay(row, days[i], actual) > 0.001) frontierIdx = i;
    }
    if(frontierIdx >= idx){
      let blockEnd = idx;
      while(blockEnd + 1 < days.length && Boolean(row.percentByDay?.[String(Number(days[blockEnd + 1].slice(8,10)))])){
        blockEnd++;
      }
      if(frontierIdx <= blockEnd){
        const blockLen = blockEnd - idx + 1;
        const actualTxt = actual < 10 ? Number(actual.toFixed(1)) : Math.round(actual);
        pctLabel = '<span class="vgg-bar-center-pct" style="left:calc(' + blockLen + ' * 50%)">' + actualTxt + '%</span>';
      }
    }
  }
  const tip = (row.excelId||row.id)+' · '+row.title+' · '+readable(row.start)+' al '+readable(row.end)+
    (actual >= 99.999 ? ' · Culminada (100 %)'+(state.late?' · Fuera de plazo':'')
      : actual > 0.001 ? ' · Avance real acumulado: '+Number(actual.toFixed(1))+' %'
      : ' · Programada (0 % ejecutado)');
  return '<td class="'+cls+' scheduled'+segCls+'"'+dateAttr+' title="'+escapeText(tip)+'">'+
    '<div class="vgg-bar-seg'+status+'"'+style+'></div>'+pctLabel+'</td>';
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
    syncBtn.innerHTML = verified ? '↓ Actualizar Excel' : '🔒 Actualizar Excel';
  }
  if(footerSource){
    footerSource.textContent = isCustom
      ? 'Cronograma compartido en Supabase'
      : 'Base Excel 13/11/2026 · Editable en Supabase';
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
  const clearHdrBtn = document.getElementById('vgg-header-clear-filters');
  if(clearHdrBtn){
    clearHdrBtn.classList.toggle('is-active', activeFilters > 0);
    clearHdrBtn.textContent = activeFilters > 0 ? 'Quitar filtros (' + activeFilters + ')' : 'Quitar filtros';
  }
  ['owner','group','week','status','search'].forEach(k => {
    const el = document.getElementById('vgg-'+k);
    if(el) el.classList.toggle('vgg-filter-active', Boolean(st[k]));
  });
  updateCollapseAllButton();

  if(!body){
    const emptyRow = '<tr><td colspan="'+(displayed.length + days.length)+'" style="padding:18px;text-align:center;color:#64748b">Sin actividades para los filtros seleccionados.</td></tr>';
    node.innerHTML = '<colgroup>'+colgroup+'</colgroup><thead>'+heads+datesRow+dowsRow+'</thead><tbody>'+emptyRow+'</tbody>';
    clearDependencyLinksSvg();
  } else {
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
  actions += '<button type="button" class="vgg-action-btn create" data-vgg-insert-before="'+escapeText(row.id)+'" title="Insertar una nueva actividad justo arriba de esta">+ Arriba</button>';
  actions += '<button type="button" class="vgg-action-btn create" data-vgg-insert-after="'+escapeText(row.id)+'" title="Insertar una nueva actividad justo debajo de esta">+ Debajo</button>';
  actions += '<button type="button" class="vgg-action-btn" data-vgg-move-act="-1" title="Subir una fila dentro de este grupo">↑</button>';
  actions += '<button type="button" class="vgg-action-btn" data-vgg-move-act="1" title="Bajar una fila dentro de este grupo">↓</button>';
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

function openActivityModal({ activityId='', presetOwner='', presetGroup='', presetPosition='' } = {}){
  const store = window.bimGanttScheduleStore;
  if(!store) return;
  const S = getSource();
  const existing = activityId ? S.rows.find(r => r.kind==='activity' && r.id===activityId) : null;
  const isEdit = Boolean(existing);
  const selectedAct = !isEdit && st.selected ? S.rows.find(r => r.kind==='activity' && r.id===st.selected) : null;

  const ownerList = allOwnerOptions();
  const initialOwner = existing?.owner || presetOwner || selectedAct?.owner || st.owner || ownerList[0] || '';
  const initialGroup = existing?.group || presetGroup || selectedAct?.group || st.group || groupsForOwner(initialOwner)[0] || '';
  const initialPosition = presetPosition || (isEdit ? 'keep' : (selectedAct && normalizeKey(selectedAct.owner)===normalizeKey(initialOwner) && normalizeKey(selectedAct.group)===normalizeKey(initialGroup) ? 'after:' + selectedAct.id : 'end'));
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
    '<div class="vgg-form-field wide"><label for="vgg-f-position">Ubicación dentro del grupo</label><select id="vgg-f-position"></select></div>'+
    '<div class="vgg-form-field"><label for="vgg-f-start">Fecha inicio *</label><input id="vgg-f-start" type="date" value="'+escapeText(existing?.start||selectedAct?.start||S.start)+'" required></div>'+
    '<div class="vgg-form-field"><label for="vgg-f-end">Fecha fin *</label><input id="vgg-f-end" type="date" value="'+escapeText(existing?.end||existing?.start||selectedAct?.end||S.start)+'" required></div>'+
    '<div class="vgg-form-field"><label for="vgg-f-pred">Predecesor (ID)</label><input id="vgg-f-pred" list="vgg-pred-datalist" value="'+escapeText(existing?.predecessor||'')+'" placeholder="Ej.: A01"><datalist id="vgg-pred-datalist">'+predOptions+'</datalist></div>'+
    '<div class="vgg-form-field"><label for="vgg-f-dep">Dependencia / Desfase</label><div style="display:flex;gap:6px"><select id="vgg-f-dep" style="flex:1"><option value="">Sin dep.</option><option value="FC">FC</option><option value="CC">CC</option><option value="FF">FF</option><option value="CF">CF</option></select><input id="vgg-f-lag" style="width:72px" value="'+escapeText(existing?.lag||'')+'" placeholder="Desf."></div></div>'+
    '</div>'+
    '<label style="display:flex;align-items:center;gap:7px;font-size:11.5px;cursor:pointer"><input type="checkbox" id="vgg-f-renumber" checked> Renumerar IDs correlativos (A01, A02…) como en Excel y ajustar predecesoras</label>'+
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
  const posSel = document.getElementById('vgg-f-position');
  const codeEl = document.getElementById('vgg-f-code');
  const renumChk = document.getElementById('vgg-f-renumber');
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
  function getChosenGroup(){
    return groupSel.value === '__custom__' ? groupCustom.value.trim() : groupSel.value;
  }
  function refreshPositionSelect(preferredPos){
    const oName = getChosenOwner();
    const gTitle = getChosenGroup();
    const siblings = S.rows.filter(r =>
      r.kind==='activity' && r.id!==activityId &&
      normalizeKey(r.owner)===normalizeKey(oName) &&
      normalizeKey(r.group)===normalizeKey(gTitle)
    );
    const sameGroupEdit = isEdit && normalizeKey(existing.owner)===normalizeKey(oName) && normalizeKey(existing.group)===normalizeKey(gTitle);
    const opts = [];
    if(sameGroupEdit) opts.push('<option value="keep">Mantener ubicación actual</option>');
    opts.push('<option value="start">Al inicio del grupo</option>');
    if(preferredPos && preferredPos.startsWith('before:')){
      const targetBefore = siblings.find(s => ('before:' + s.id) === preferredPos);
      if(targetBefore){
        opts.push('<option value="'+escapeText(preferredPos)+'">Antes de '+escapeText((targetBefore.excelId||targetBefore.id)+' — '+targetBefore.title.slice(0,48))+'</option>');
      }
    }
    siblings.forEach(s => {
      opts.push('<option value="after:'+escapeText(s.id)+'">Después de '+escapeText((s.excelId||s.id)+' — '+s.title.slice(0,48))+'</option>');
    });
    opts.push('<option value="end">Al final del grupo</option>');
    posSel.innerHTML = opts.join('');
    const targetVal = preferredPos || (sameGroupEdit ? 'keep' : 'end');
    if([...posSel.options].some(o => o.value === targetVal)) posSel.value = targetVal;
    else posSel.value = sameGroupEdit ? 'keep' : 'end';
  }
  function refreshGroupSelect(preferred, preferredPos){
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
    refreshPositionSelect(preferredPos);
  }
  refreshGroupSelect(initialGroup, initialPosition);
  if(existing?.dependency) depSel.value = existing.dependency;

  function syncCodeReadonlyState(){
    if(!codeEl || !renumChk) return;
    codeEl.readOnly = renumChk.checked;
    codeEl.style.opacity = renumChk.checked ? '0.72' : '1';
    codeEl.title = renumChk.checked ? 'Se asignará automáticamente según la posición en el cronograma' : 'Código manual';
  }
  syncCodeReadonlyState();
  renumChk.addEventListener('change', syncCodeReadonlyState);

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
    refreshGroupSelect('', 'end');
    renderDailyGrid();
  });
  ownerCustom.addEventListener('input', () => refreshPositionSelect('end'));
  groupSel.addEventListener('change', () => {
    groupCustom.hidden = groupSel.value !== '__custom__';
    if(!groupCustom.hidden) groupCustom.value = '';
    refreshPositionSelect('end');
  });
  groupCustom.addEventListener('input', () => refreshPositionSelect('end'));
  startEl.addEventListener('change', () => { if(endEl.value < startEl.value) endEl.value = startEl.value; renderDailyGrid(); });
  endEl.addEventListener('change', renderDailyGrid);
  manualChk.addEventListener('change', renderDailyGrid);

  document.getElementById('vgg-activity-form').addEventListener('submit', ev => {
    ev.preventDefault();
    const errBox = document.getElementById('vgg-act-err');
    const chosenOwner = getChosenOwner();
    const chosenGroup = getChosenGroup();
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
        excelId: codeEl.value.trim(),
        type: document.getElementById('vgg-f-type').value,
        title: document.getElementById('vgg-f-title').value.trim(),
        owner: chosenOwner,
        group: chosenGroup,
        position: posSel.value,
        autoRenumber: renumChk.checked,
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
      if(typeof toast === 'function') toast((isEdit ? 'Actividad actualizada: ' : 'Actividad insertada: ') + (saved.excelId || saved.id));
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
    '<div class="vgg-form-field"><label for="vgg-g-position">Ubicación entre grupos</label><select id="vgg-g-position"></select></div>'+
    (existing && hasActs ? '<p style="margin:0;opacity:.8;font-size:11px">Renombrar o reubicar este grupo actualizará sus actividades y renumerará IDs correlativos.</p>' : '')+
    '</div>'+
    '<div class="vgg-submodal-ft">'+
    (existing ? '<button type="button" id="vgg-g-up" class="vgg-sub-btn" title="Subir grupo">↑</button><button type="button" id="vgg-g-down" class="vgg-sub-btn" title="Bajar grupo">↓</button>' : '')+
    (existing && !hasActs ? '<button type="button" id="vgg-g-delete" class="vgg-sub-btn danger" style="margin-right:auto">Eliminar grupo</button>' : '<span style="margin-right:auto"></span>')+
    '<button type="button" class="vgg-sub-btn" data-vgg-sub-close>Cancelar</button><button type="submit" class="vgg-sub-btn primary">'+(existing?'Guardar grupo':'Crear grupo')+'</button></div>'+
    '</form></div>';
  back.hidden = false;

  const ownerSel = document.getElementById('vgg-g-owner');
  const ownerCustom = document.getElementById('vgg-g-owner-custom');
  const posSel = document.getElementById('vgg-g-position');
  ownerSel.innerHTML = ownerList.map(o => '<option value="'+escapeText(o)+'">'+escapeText(o)+'</option>').join('') +
    '<option value="__custom__">+ Otro responsable…</option>';
  if(ownerList.includes(initialOwner)) ownerSel.value = initialOwner;
  else if(initialOwner){ ownerSel.value = '__custom__'; ownerCustom.hidden = false; ownerCustom.value = initialOwner; }

  function getGroupOwner(){ return ownerSel.value === '__custom__' ? ownerCustom.value.trim() : ownerSel.value; }
  function refreshGroupPos(){
    const oName = getGroupOwner();
    const list = Object.values(sched.groups).filter(g => g.owner===oName && (!existing || g.id!==existing.id))
      .sort((a,b)=>(a.order-b.order)||a.title.localeCompare(b.title,'es'));
    const sameOwner = existing && existing.owner===oName;
    const opts = [];
    if(sameOwner) opts.push('<option value="keep">Mantener ubicación actual</option>');
    opts.push('<option value="start">Al inicio del responsable</option>');
    list.forEach(g => opts.push('<option value="after:'+escapeText(g.id)+'">Después de '+escapeText(g.title)+'</option>'));
    opts.push('<option value="end">Al final del responsable</option>');
    posSel.innerHTML = opts.join('');
    posSel.value = sameOwner ? 'keep' : 'end';
  }
  refreshGroupPos();
  ownerSel.addEventListener('change', () => {
    ownerCustom.hidden = ownerSel.value !== '__custom__';
    refreshGroupPos();
  });

  document.getElementById('vgg-g-up')?.addEventListener('click', () => {
    if(store.moveGroup(existing.id, -1)){
      closeSubmodal(); rebuildFilterSelects(); render();
      if(typeof toast === 'function') toast('Grupo movido arriba.');
    }
  });
  document.getElementById('vgg-g-down')?.addEventListener('click', () => {
    if(store.moveGroup(existing.id, 1)){
      closeSubmodal(); rebuildFilterSelects(); render();
      if(typeof toast === 'function') toast('Grupo movido abajo.');
    }
  });

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
    const chosenOwner = getGroupOwner();
    const title = document.getElementById('vgg-g-title').value.trim();
    if(!chosenOwner || !title){
      errBox.textContent = 'Completa responsable y nombre del grupo.';
      errBox.hidden = false;
      return;
    }
    try {
      store.upsertGroup({ id: existing?.id || '', owner: chosenOwner, title, position: posSel.value });
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
function loadExcelJs(){
  if(window.ExcelJS) return Promise.resolve(window.ExcelJS);
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/exceljs@4.4.0/dist/exceljs.min.js';
    s.onload = () => window.ExcelJS ? resolve(window.ExcelJS) : reject(new Error('ExcelJS no disponible'));
    s.onerror = () => reject(new Error('No se pudo cargar ExcelJS (verifica tu conexión a internet)'));
    document.head.appendChild(s);
  });
}

function excelColLetter(n){
  let col = '', num = n;
  while(num > 0){
    const rem = (num - 1) % 26;
    col = String.fromCharCode(65 + rem) + col;
    num = Math.floor((num - 1) / 26);
  }
  return col;
}
function isoToUtcDate(iso){
  if(!iso || !/^\d{4}-\d{2}-\d{2}/.test(iso)) return null;
  return new Date(Date.UTC(Number(iso.slice(0,4)), Number(iso.slice(5,7)) - 1, Number(iso.slice(8,10))));
}
function ownerInitials(name){
  const parts = String(name||'').trim().split(/\s+/).filter(Boolean);
  if(!parts.length) return 'BM';
  if(parts.length === 1) return parts[0].slice(0,2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
function downloadExcelBuffer(buffer, fileName){
  const blob = new Blob([buffer], { type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { a.remove(); URL.revokeObjectURL(url); }, 1000);
}

/* Replicación fiel de la plantilla "Actividades Área Bim - Noviembre.xlsx" (hojas Gant, Config, Alertas y Control Semanal) */
function buildActividadesBimTemplateIntoWorkbook(wb){
  const S = getSource();
  const allDates = getAllDates();
  const baseStartIso = S.start || allDates[0] || new Date().toISOString().slice(0,10);
  const baseStartUtc = isoToUtcDate(baseStartIso) || new Date(Date.UTC(2026, 10, 1));
  const plazoDias = Math.max(allDates.length || 30, 1);
  const calStartCol = 13; // Columna M
  const calSpan = Math.max(plazoDias + 15, 45);
  const calEndCol = calStartCol + calSpan - 1;
  const helperCol = calEndCol + 1; // Columna oculta auxiliar (equiv. a GI)
  const lastCalL = excelColLetter(calEndCol);
  const helperL = excelColLetter(helperCol);
  const FONT = 'Century Gothic';

  // Forzar recálculo completo al abrir en Excel
  wb.calcProperties = { fullCalcOnLoad: true };

  // Helpers para resultados en caché (para que Excel muestre todo al instante incluso en Vista Protegida)
  const isoWeekNum = dt => {
    const t = new Date(Date.UTC(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate()));
    const dayNum = t.getUTCDay() || 7;
    t.setUTCDate(t.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
    return Math.ceil((((t - yearStart) / 86400000) + 1) / 7);
  };
  const weekdayMon1 = dt => { const d = dt.getUTCDay(); return d === 0 ? 7 : d; };
  const dayLetters = ['','L','M','X','J','V','S','D'];
  const calDatesUtc = Array.from({ length: calSpan }, (_, i) => new Date(baseStartUtc.getTime() + i * 86400000));
  const calDatesIso = calDatesUtc.map(dt => dt.toISOString().slice(0, 10));
  const finCalUtc = new Date(baseStartUtc.getTime() + (plazoDias - 1) * 86400000);

  const thinBorder = {
    top:{style:'thin',color:{argb:'FFD0D7E2'}},
    left:{style:'thin',color:{argb:'FFD0D7E2'}},
    bottom:{style:'thin',color:{argb:'FFD0D7E2'}},
    right:{style:'thin',color:{argb:'FFD0D7E2'}}
  };
  const fillSolid = argb => ({ type:'pattern', pattern:'solid', fgColor:{ argb } });
  // IMPORTANTE OOXML: en formato condicional (<dxf>), Excel usa bgColor para rellenos sólidos
  const cfFill = argb => ({ type:'pattern', pattern:'solid', bgColor:{ argb } });

  // Regenerar limpiamente las 4 hojas de la plantilla conservando cualquier otra hoja del libro
  ['Gant','Config','Alertas','Control Semanal'].forEach(name => {
    const existing = wb.getWorksheet(name);
    if(existing) wb.removeWorksheet(existing.id);
  });

  const wsGant = wb.addWorksheet('Gant', {
    views:[{ state:'frozen', xSplit:12, ySplit:9, showGridLines:false }]
  });
  const wsCfg = wb.addWorksheet('Config', { views:[{ showGridLines:true }] });
  const wsAlert = wb.addWorksheet('Alertas', {
    views:[{ state:'frozen', ySplit:4, showGridLines:true }]
  });
  const wsCtrl = wb.addWorksheet('Control Semanal', { views:[{ showGridLines:false }] });

  // ==================== 1. HOJA GANT ====================
  wsGant.columns = [
    { width:4.3 }, { width:7.6 }, { width:12.3 }, { width:62.7 }, { width:21 },
    { width:8.6 }, { width:8.6 }, { width:10.5 }, { width:10.5 }, { width:9.7 },
    { width:12.4 }, { width:8.3 },
    ...Array.from({ length: calSpan }, () => ({ width:3.75 })),
    { width:0.1, hidden:true }
  ];

  // Encabezado superior exacto (Fila 1 banda azul marino #1B2A49 con texto blanco Century Gothic 14)
  wsGant.getRow(1).height = 30;
  for(let col = 2; col <= calEndCol; col++){
    const c = wsGant.getCell(1, col);
    c.fill = fillSolid('FF1B2A49');
  }
  wsGant.getCell('B1').value = 'CRONOGRAMA DEL PROYECTO – DIAGRAMA DE GANTT';
  wsGant.getCell('B1').font = { name:FONT, size:14, bold:true, color:{ argb:'FFFFFFFF' } };
  wsGant.getCell('B1').alignment = { vertical:'middle' };

  wsGant.getRow(2).height = 4;
  wsGant.getRow(3).height = 19.5;
  wsGant.getCell('B3').value = S.project || 'PROYECTO BIM';
  wsGant.getCell('B3').font = { name:FONT, size:11, bold:true, color:{ argb:'FF1B2A49' } };
  wsGant.getCell('B3').alignment = { vertical:'middle' };

  wsGant.getRow(4).height = 19.5;
  wsGant.getCell('B4').value = 'Inicio:';
  wsGant.getCell('B4').font = { name:FONT, size:8, bold:true, color:{ argb:'FF1B2A49' } };
  wsGant.getCell('B4').alignment = { vertical:'middle' };
  const cC4 = wsGant.getCell('C4');
  cC4.value = baseStartUtc;
  cC4.numFmt = 'dd/mm/yy';
  cC4.font = { name:FONT, size:10, bold:true, color:{ argb:'FF0000FF' } };
  cC4.fill = fillSolid('FFFFF4D6');
  cC4.alignment = { horizontal:'center', vertical:'middle' };
  cC4.border = thinBorder;

  wsGant.getCell('E4').value = 'Fin:';
  wsGant.getCell('E4').font = { name:FONT, size:8, bold:true, color:{ argb:'FF1B2A49' } };
  wsGant.getCell('E4').alignment = { horizontal:'right', vertical:'middle' };
  wsGant.mergeCells('F4:G4');
  const cF4 = wsGant.getCell('F4');
  cF4.numFmt = 'dd/mm/yy';
  cF4.font = { name:FONT, size:10, bold:true, color:{ argb:'FF1F2328' } };
  cF4.alignment = { horizontal:'center', vertical:'middle' };
  cF4.border = thinBorder;

  wsGant.mergeCells('M4:N4');
  wsGant.getCell('M4').value = 'Plazo (dc):';
  wsGant.getCell('M4').font = { name:FONT, size:8, bold:true, color:{ argb:'FF1B2A49' } };
  wsGant.getCell('M4').alignment = { horizontal:'right', vertical:'middle' };

  wsGant.mergeCells('O4:P4');
  const cO4 = wsGant.getCell('O4');
  cO4.value = plazoDias;
  cO4.font = { name:FONT, size:10, bold:true, color:{ argb:'FF1F2328' } };
  cO4.fill = fillSolid('FFFFF4D6');
  cO4.alignment = { horizontal:'center', vertical:'middle' };
  cO4.border = thinBorder;
  cO4.dataValidation = { type:'whole', operator:'between', allowBlank:true, formulae:[1,180], showErrorMessage:true, errorTitle:'Plazo (dc)', error:'Ingresa un número entero entre 1 y 180.' };

  wsGant.getRow(5).height = 10;
  wsGant.getRow(6).height = 10;

  // Encabezados de tabla (Filas 7-9)
  wsGant.getRow(7).height = 21;
  wsGant.getRow(8).height = 17.25;
  wsGant.getRow(9).height = 17.25;

  const colHeaders = [
    ['B','ID'], ['C','EDT'], ['D','Actividad / hito'], ['E','Responsable'], ['F','Tipo'],
    ['G','Dur. (dc)'], ['H','Inicio'], ['I','Fin'], ['J','Predecesor'], ['K','Dependencia'], ['L','Desfase (dc)']
  ];
  colHeaders.forEach(([colL, title]) => {
    wsGant.mergeCells(`${colL}8:${colL}9`);
    const cell = wsGant.getCell(`${colL}8`);
    cell.value = title;
    cell.font = { name:FONT, size:8, bold:true, color:{ argb:'FFFFFFFF' } };
    cell.fill = fillSolid('FF1B2A49');
    cell.alignment = { horizontal:'center', vertical:'middle', wrapText:true };
    cell.border = thinBorder;
    wsGant.getCell(`${colL}9`).border = thinBorder;
  });

  // Encabezado del calendario (M7:<lastCalL>9) con valores en caché + colores exactos por semana ISO
  for(let i = 0; i < calSpan; i++){
    const col = calStartCol + i;
    const cL = excelColLetter(col);
    const dt = calDatesUtc[i];
    const inRange = i < plazoDias;
    const wkNum = isoWeekNum(dt);
    const wd = weekdayMon1(dt);
    const weekStartMs = Math.max(baseStartUtc.getTime(), dt.getTime() - (wd - 1) * 86400000);
    const weekEndMs = Math.min(finCalUtc.getTime(), dt.getTime() + (7 - wd) * 86400000);
    const midMs = weekStartMs + Math.floor((weekEndMs - weekStartMs) / 86400000 / 2) * 86400000;
    const wkLabel = (inRange && dt.getTime() === midMs) ? ('S' + wkNum) : '';
    const isEvenWk = wkNum % 2 === 0;
    const hdrBg = !inRange ? 'FFFFFFFF' : (isEvenWk ? 'FF1B2A49' : 'FFDCE3EE');
    const hdrFg = !inRange ? 'FFFFFFFF' : (isEvenWk ? 'FFFFFFFF' : 'FF1B2A49');

    const c7 = wsGant.getCell(7, col);
    c7.value = {
      formula: `_xlfn.LET(_xlpm.a,MAX($M$8,${cL}$8-WEEKDAY(${cL}$8,2)+1),_xlpm.b,MIN(FinCalendario,${cL}$8-WEEKDAY(${cL}$8,2)+7),IF(${cL}$8=_xlpm.a+INT((_xlpm.b-_xlpm.a)/2),"S"&_xlfn.ISOWEEKNUM(${cL}$8),""))`,
      result: wkLabel
    };
    c7.font = { name:FONT, size:7, bold:true, color:{ argb:hdrFg } };
    c7.fill = fillSolid(hdrBg);
    c7.alignment = { horizontal:'center', vertical:'middle' };
    c7.border = thinBorder;

    const c8 = wsGant.getCell(8, col);
    c8.value = i === 0
      ? { formula: '$C$4', result: dt }
      : { formula: `${excelColLetter(col - 1)}8+1`, result: dt };
    c8.numFmt = 'd';
    c8.font = { name:FONT, size:8, bold:true, color:{ argb:hdrFg } };
    c8.fill = fillSolid(hdrBg);
    c8.alignment = { horizontal:'center', vertical:'middle' };
    c8.border = thinBorder;

    const c9 = wsGant.getCell(9, col);
    c9.value = {
      formula: `UPPER(CHOOSE(WEEKDAY(${cL}8,2),"L","M","X","J","V","S","D"))`,
      result: dayLetters[wd]
    };
    c9.font = { name:FONT, size:8, bold:true, color:{ argb:hdrFg } };
    c9.fill = fillSolid(hdrBg);
    c9.alignment = { horizontal:'center', vertical:'middle' };
    c9.border = thinBorder;
  }

  // --- Escribir filas del cronograma desde la fila 10 ---
  const rowsList = S.rows || [];
  let curRow = 10;
  const firstDataRow = 10;
  const actMeta = []; // { gantRow, alertRow, act, stInfo }

  const firstWorkIso = allDates.find(d => {
    const info = dayInfo(d);
    return !info.weekend && !info.holiday;
  }) || baseStartIso;

  const mappedRows = rowsList.map(r => ({ r, rowNum: curRow++ }));
  const lastDataRow = Math.max(12, curRow - 1);

  // Calcular fecha máxima real para caché de F4
  const maxEndIso = rowsList.reduce((acc, r) => (r.end && r.end > acc ? r.end : acc), S.end || baseStartIso);
  cF4.value = { formula: `IF(COUNT(I12:I${lastDataRow})=0,"",MAX(I12:I${lastDataRow}))`, result: isoToUtcDate(maxEndIso) };

  // Calcular rangos de actividades hijas para cada grupo
  mappedRows.forEach((item, idx) => {
    if(item.r.kind === 'group'){
      let firstA = null, lastA = null;
      for(let j = idx + 1; j < mappedRows.length; j++){
        const nxt = mappedRows[j];
        if(nxt.r.kind === 'group' || nxt.r.kind === 'owner') break;
        if(nxt.r.kind === 'activity'){
          if(firstA === null) firstA = nxt.rowNum;
          lastA = nxt.rowNum;
        }
      }
      item.firstAct = firstA;
      item.lastAct = lastA;
    }
  });

  const calRange = `$M$8:$${lastCalL}$8`;
  const idFormula = rn =>
    `IF($F${rn}="Hito",IF(COUNTIF($F${rn+1}:$F$${lastDataRow},"Hito")=0,"HF","H"&(COUNTIF($F$11:$F${rn},"Hito")-1)),IF($F${rn}="Act.","A"&TEXT(COUNTIF($F$11:$F${rn},"Act."),"00"),""))`;
  const edtFormula = rn =>
    `IF($F${rn}="Hito","—",IF($F${rn}="Resumen",COUNTIF($F$11:$F${rn},"Resumen"),IF($F${rn}="","",IFERROR(COUNTIF($F$11:$F${rn},"Resumen")&"."&(ROW()-LOOKUP(2,1/($F$11:$F${rn}="Resumen"),ROW($F$11:$F${rn}))),""))))`;
  const startDepFormula = rn => {
    const p = rn - 1;
    const fExpr = `(COUNTIFS(Feriados,${calRange},FeriadosAbrev,IFERROR(INDEX(RespAbrev,MATCH($E${rn},Responsables,0)),"#"))+COUNTIFS(Feriados,${calRange},FeriadosAbrev,"")=0)`;
    const wExpr = `(COUNTIFS(DiasNoLaborables,${calRange},DiaLaborableSiNo,"<>SI")=0)`;
    return `IF(AND($J${rn}<>"",OR(UPPER(TRIM($K${rn}))="FF",UPPER(TRIM($K${rn}))="CF")),IFERROR(_xlfn.LET(_xlpm.ids,_xlfn.TEXTSPLIT(SUBSTITUTE($J${rn}," ",""),{",",";"}),_xlpm.p,_xlfn.XLOOKUP(_xlpm.ids,$B$11:$B${p},IF(UPPER(TRIM($K${rn}))="FF",$I$11:$I${p},$H$11:$H${p}),""),_xlpm.fin,MAX(_xlpm.p)+N($L${rn}),_xlpm.dias,_xlfn._xlws.FILTER(${calRange},(${calRange}>=$C$4)*(${calRange}<=_xlpm.fin)*${wExpr}*${fExpr}),IF(AND(AND(COUNT(_xlpm.p)=COUNTA(_xlpm.ids),MIN(_xlpm.p)>0,N($G${rn})>0,_xlpm.fin<=FinCalendario),COLUMNS(_xlpm.dias)>=$G${rn}),INDEX(_xlpm.dias,1,COLUMNS(_xlpm.dias)-$G${rn}+1),"")),""),IF(AND(UPPER($K${rn})="CC",$J${rn}<>""),IFERROR(_xlfn.LET(_xlpm.p,_xlfn.XLOOKUP(_xlfn.TEXTSPLIT(SUBSTITUTE($J${rn}," ",""),{",",";"}),$B$11:$B${p},$H$11:$H${p},""),IF(OR(N($G${rn})=0,COUNT(_xlpm.p)=0),"",MAX(_xlpm.p)+N($L${rn}))),""),_xlfn.LET(_xlpm.inicio,IF(N($G${rn})=0,"",IF(TRIM($J${rn})="",IFERROR(INDEX(_xlfn._xlws.FILTER(${calRange},(${calRange}>=$C$4)*(${calRange}<=FinCalendario)*${wExpr}*${fExpr}),1),""),_xlfn.LET(_xlpm.p,IFERROR(_xlfn.XLOOKUP(_xlfn.TEXTSPLIT(SUBSTITUTE($J${rn}," ",""),{",",";"}),$B$11:$B${p},$${helperL}$11:$${helperL}${p}),""),IF(COUNT(_xlpm.p)=0,"",IFERROR(INDEX(_xlfn._xlws.FILTER(${calRange},(${calRange}>MAX(_xlpm.p))*(${calRange}<=FinCalendario)*${wExpr}*${fExpr}),1),""))))),IF(_xlpm.inicio="","",_xlpm.inicio+N($L${rn})))))`;
  };
  const endDepFormula = rn => {
    const p = rn - 1;
    const fExpr = `(COUNTIFS(Feriados,${calRange},FeriadosAbrev,IFERROR(INDEX(RespAbrev,MATCH($E${rn},Responsables,0)),"#"))+COUNTIFS(Feriados,${calRange},FeriadosAbrev,"")=0)`;
    const wExpr = `(COUNTIFS(DiasNoLaborables,${calRange},DiaLaborableSiNo,"<>SI")=0)`;
    return `IF(AND($J${rn}<>"",OR(UPPER(TRIM($K${rn}))="FF",UPPER(TRIM($K${rn}))="CF")),IFERROR(_xlfn.LET(_xlpm.ids,_xlfn.TEXTSPLIT(SUBSTITUTE($J${rn}," ",""),{",",";"}),_xlpm.p,_xlfn.XLOOKUP(_xlpm.ids,$B$11:$B${p},IF(UPPER(TRIM($K${rn}))="FF",$I$11:$I${p},$H$11:$H${p}),""),_xlpm.fin,MAX(_xlpm.p)+N($L${rn}),IF(AND(AND(COUNT(_xlpm.p)=COUNTA(_xlpm.ids),MIN(_xlpm.p)>0,N($G${rn})>0,_xlpm.fin<=FinCalendario),ISNUMBER($H${rn})),_xlpm.fin,"")),""),IFERROR(INDEX(_xlfn._xlws.FILTER(${calRange},(${calRange}>=H${rn})*${wExpr}*${fExpr}*(${calRange}<=FinCalendario)),G${rn}),""))`;
  };

  let grpCounter = 0, actInGrpCounter = 0, actGlobalCounter = 0;
  const dailyTotals = Array(calSpan).fill(0);
  const totalActCount = rowsList.filter(r => r.kind === 'activity').length || 1;
  const baseHols = S.holidays || window.BIM_GANTT_BASE_SOURCE?.holidays || {};
  const baseLeaves = S.nonWorkingByOwner || window.BIM_GANTT_BASE_SOURCE?.nonWorkingByOwner || {};

  mappedRows.forEach(({ r, rowNum, firstAct, lastAct }) => {
    wsGant.getRow(rowNum).height = 15;
    if(r.kind === 'owner'){
      wsGant.getCell(rowNum, 4).value = r.label || 'ACTIVIDADES';
      for(let col = 2; col <= 12; col++){
        const c = wsGant.getCell(rowNum, col);
        c.font = { name:FONT, size:8.5, bold:true, color:{ argb:'FF1B2A49' } };
        c.fill = fillSolid('FFE9EDF4');
        c.alignment = { horizontal: col===4 ? 'left' : 'center', vertical:'middle' };
        c.border = thinBorder;
      }
      for(let col = calStartCol; col <= calEndCol; col++){
        const inRange = (col - calStartCol) < plazoDias;
        const c = wsGant.getCell(rowNum, col);
        c.fill = fillSolid(inRange ? 'FFE9EDF4' : 'FFFFFFFF');
        c.border = thinBorder;
      }
    } else if(r.kind === 'group'){
      grpCounter++;
      actInGrpCounter = 0;
      const gStartUtc = isoToUtcDate(r.start);
      const gEndUtc = isoToUtcDate(r.end);
      const gDur = (gStartUtc && gEndUtc) ? Math.round((gEndUtc - gStartUtc) / 86400000) + 1 : '';
      wsGant.getCell(rowNum, 2).value = { formula: idFormula(rowNum), result: '' };
      wsGant.getCell(rowNum, 3).value = { formula: edtFormula(rowNum), result: grpCounter };
      wsGant.getCell(rowNum, 4).value = r.title;
      wsGant.getCell(rowNum, 6).value = 'Resumen';
      wsGant.getCell(rowNum, 7).value = { formula: `IF(COUNT(H${rowNum}:I${rowNum})<2,"",I${rowNum}-H${rowNum}+1)`, result: gDur };
      if(firstAct && lastAct){
        wsGant.getCell(rowNum, 8).value = { formula: `IF(COUNT(H${firstAct}:H${lastAct})=0,"",MIN(H${firstAct}:H${lastAct}))`, result: gStartUtc || '' };
        wsGant.getCell(rowNum, 9).value = { formula: `IF(COUNT(I${firstAct}:I${lastAct})=0,"",MAX(I${firstAct}:I${lastAct}))`, result: gEndUtc || '' };
      }
      for(let col = 2; col <= 12; col++){
        const c = wsGant.getCell(rowNum, col);
        c.font = { name:FONT, size:8, bold:true, color:{ argb:'FF1B2A49' } };
        c.fill = fillSolid('FFE9EDF4');
        c.alignment = { horizontal: col===4 ? 'left' : 'center', vertical:'middle' };
        c.border = thinBorder;
        if(col === 8 || col === 9) c.numFmt = 'dd/mm/yy';
      }
      for(let i = 0; i < calSpan; i++){
        const col = calStartCol + i;
        const dIso = calDatesIso[i];
        const inRange = i < plazoDias;
        const inSpan = inRange && r.start && r.end && dIso >= r.start && dIso <= r.end;
        const c = wsGant.getCell(rowNum, col);
        c.fill = fillSolid(!inRange ? 'FFFFFFFF' : (inSpan ? 'FF1B2A49' : 'FFE9EDF4'));
        c.border = thinBorder;
      }
    } else if(r.kind === 'activity'){
      actGlobalCounter++;
      actInGrpCounter++;
      const aIdText = r.excelId || ('A' + String(actGlobalCounter).padStart(2, '0'));
      const aEdtText = r.edt || (grpCounter + '.' + actInGrpCounter);
      const aStartUtc = isoToUtcDate(r.start);
      const aEndUtc = isoToUtcDate(r.end);
      const aDur = Math.max(1, Number(r.duration) || 1);
      const alertRow = 5 + actMeta.length;
      const stInfo = taskState(r);
      actMeta.push({ gantRow: rowNum, alertRow, act: r, stInfo, aIdText, aStartUtc, aEndUtc, aDur });

      wsGant.getCell(rowNum, 2).value = { formula: idFormula(rowNum), result: aIdText };
      wsGant.getCell(rowNum, 3).value = { formula: edtFormula(rowNum), result: aEdtText };
      wsGant.getCell(rowNum, 4).value = r.title;
      wsGant.getCell(rowNum, 5).value = r.owner || '';
      wsGant.getCell(rowNum, 6).value = r.type || 'Act.';
      wsGant.getCell(rowNum, 7).value = aDur;

      const hasPred = Boolean(String(r.predecessor || '').trim());
      if(hasPred || !r.start || r.start === firstWorkIso){
        wsGant.getCell(rowNum, 8).value = { formula: startDepFormula(rowNum), result: aStartUtc || '' };
      } else {
        wsGant.getCell(rowNum, 8).value = aStartUtc;
      }
      wsGant.getCell(rowNum, 9).value = { formula: endDepFormula(rowNum), result: aEndUtc || '' };
      if(hasPred) wsGant.getCell(rowNum, 10).value = String(r.predecessor).trim();
      if(r.dependency) wsGant.getCell(rowNum, 11).value = String(r.dependency).trim();
      if(r.lag !== '' && r.lag !== null && r.lag !== undefined && Number(r.lag) !== 0){
        wsGant.getCell(rowNum, 12).value = Number(r.lag);
      }
      wsGant.getCell(rowNum, helperCol).value = { formula: `I${rowNum}`, result: aEndUtc || '' };

      for(let col = 2; col <= 12; col++){
        const c = wsGant.getCell(rowNum, col);
        c.font = { name:FONT, size:8, color:{ argb:'FF1F2328' } };
        c.alignment = { horizontal: (col===4 || col===5) ? 'left' : 'center', vertical:'middle' };
        c.border = thinBorder;
        if(col === 8 || col === 9) c.numFmt = 'dd/mm/yy';
      }
      wsGant.getCell(rowNum, 7).dataValidation = { type:'custom', allowBlank:true, formulae:[`OR(G${rowNum}="",IFERROR(AND(ISNUMBER(G${rowNum}),G${rowNum}>0,MOD(G${rowNum},1)=0),FALSE))`], showErrorMessage:true, errorTitle:'Entrada no válida', error:'Duración: entero positivo o vacío.' };
      wsGant.getCell(rowNum, 10).dataValidation = { type:'custom', allowBlank:true, formulae:[`INDIRECT("'Alertas'!G${alertRow}")="OK"`], showErrorMessage:true, errorTitle:'Entrada no válida', error:'Solo IDs de actividades anteriores; separados por coma.' };
      wsGant.getCell(rowNum, 11).dataValidation = { type:'list', allowBlank:true, formulae:['"FC,CC,FF,CF"'], showErrorMessage:true, errorTitle:'Dependencia', error:'FC, CC, FF o CF. Vacío = FC.' };
      wsGant.getCell(rowNum, 12).dataValidation = { type:'custom', allowBlank:true, formulae:[`OR(L${rowNum}="",IFERROR(AND(ISNUMBER(L${rowNum}),MOD(L${rowNum},1)=0),FALSE))`], showErrorMessage:true, errorTitle:'Entrada no válida', error:'Desfase: entero positivo, negativo o vacío.' };

      // Matriz de % diario en calendario (M<r>:<lastCalL><r>) con resultado en caché + color base fiel
      const ownerLeaveMap = baseLeaves[r.owner || ''] || {};
      for(let i = 0; i < calSpan; i++){
        const col = calStartCol + i;
        const cL = excelColLetter(col);
        const dIso = calDatesIso[i];
        const inRange = i < plazoDias;
        const wd = weekdayMon1(calDatesUtc[i]);
        const isWknd = wd > 5;
        const isHol = Boolean(baseHols[dIso] || ownerLeaveMap[dIso]);
        const inSpan = inRange && r.start && r.end && dIso >= r.start && dIso <= r.end && !isWknd && !isHol;
        const dayVal = inSpan ? (1 / aDur) : 0;
        if(inSpan) dailyTotals[i] += dayVal;

        const c = wsGant.getCell(rowNum, col);
        c.value = {
          formula: `IF(AND(${cL}$8>=$H${rowNum},${cL}$8<=$I${rowNum},COUNTIFS(DiasNoLaborables,${cL}$8,DiaLaborableSiNo,"<>SI")=0,COUNTIFS(Feriados,${cL}$8,FeriadosAbrev,IFERROR(INDEX(RespAbrev,MATCH($E${rowNum},Responsables,0)),"#"))+COUNTIFS(Feriados,${cL}$8,FeriadosAbrev,"")=0,${cL}$8<=FinCalendario),1/$G${rowNum},0)`,
          result: dayVal
        };
        c.numFmt = '0%;;""';
        c.font = { name:FONT, size:6, bold:true, color:{ argb: inSpan ? 'FFFFFFFF' : 'FF1B2A49' } };
        if(!inRange) c.fill = fillSolid('FFFFFFFF');
        else if(inSpan) c.fill = fillSolid('FF4F74AD');
        else if(isHol) c.fill = fillSolid('FFE8D9B5');
        else if(isWknd) c.fill = fillSolid('FFF6CFCB');
        c.alignment = { horizontal:'center', vertical:'middle' };
        c.border = thinBorder;
      }
    }
  });

  // Filas de resumen de avance proyectado + Leyenda
  const dailyRow = lastDataRow + 2;
  const cumRow = lastDataRow + 3;
  wsGant.getRow(dailyRow).height = 17;
  wsGant.getRow(cumRow).height = 17;
  wsGant.getCell(dailyRow, 3).value = 'Avance Diario Proyectado';
  wsGant.getCell(cumRow, 3).value = 'Avance Acumulado Proyectado';
  [dailyRow, cumRow].forEach(rn => {
    for(let col = 2; col <= 12; col++){
      const c = wsGant.getCell(rn, col);
      c.font = { name:FONT, size:8, bold:true, color:{ argb:'FF1B2A49' } };
      c.fill = fillSolid('FFE9EDF4');
      c.border = thinBorder;
    }
  });
  let cumAcc = 0;
  for(let i = 0; i < calSpan; i++){
    const col = calStartCol + i;
    const cL = excelColLetter(col);
    const dPct = dailyTotals[i] / totalActCount;
    cumAcc += dPct;
    const cD = wsGant.getCell(dailyRow, col);
    cD.value = { formula: `IFERROR(SUM(${cL}$11:${cL}$${lastDataRow})/COUNTIFS($F$11:$F$${lastDataRow},"Act.",$G$11:$G$${lastDataRow},">0"),0)`, result: dPct };
    cD.numFmt = '0.0%';
    cD.font = { name:FONT, size:6.5, color:{ argb: i < plazoDias ? 'FF1B2A49' : 'FFFFFFFF' } };
    cD.alignment = { horizontal:'center', vertical:'middle' };
    cD.border = thinBorder;

    const cC = wsGant.getCell(cumRow, col);
    cC.value = col === calStartCol
      ? { formula: `${cL}${dailyRow}`, result: cumAcc }
      : { formula: `${excelColLetter(col - 1)}${cumRow}+${cL}${dailyRow}`, result: cumAcc };
    cC.numFmt = '0.0%';
    cC.font = { name:FONT, size:6.5, bold:true, color:{ argb: i < plazoDias ? 'FF1B2A49' : 'FFFFFFFF' } };
    cC.alignment = { horizontal:'center', vertical:'middle' };
    cC.border = thinBorder;
  }

  // Leyenda al pie
  const legRow = cumRow + 2;
  wsGant.mergeCells(`B${legRow}:C${legRow}`);
  wsGant.getCell(`B${legRow}`).value = 'LEYENDA';
  wsGant.getCell(`B${legRow}`).font = { name:FONT, size:8.5, bold:true, color:{ argb:'FF1B2A49' } };
  const legItems = [
    ['Actividad programada', 'FF4F74AD'],
    ['Resumen de grupo', 'FF1B2A49'],
    ['Sábado / Domingo (no laborable)', 'FFF6CFCB'],
    ['Feriado / Día libre personal', 'FFE8D9B5'],
    ['Día actual (Hoy)', 'FFB08D57']
  ];
  legItems.forEach(([txt, color], idx) => {
    const rn = legRow + 1 + idx;
    wsGant.getCell(rn, 2).fill = fillSolid(color);
    wsGant.getCell(rn, 2).border = thinBorder;
    wsGant.getCell(rn, 3).value = txt;
    wsGant.getCell(rn, 3).font = { name:FONT, size:8, color:{ argb:'FF1B2A49' } };
  });

  // Formato condicional exacto de Actividades Área Bim - Noviembre.xlsx usando bgColor (OOXML dxf)
  wsGant.addConditionalFormatting({
    ref: `M7:${lastCalL}9`,
    rules: [
      { type:'expression', formulae:['M$8>FinCalendario'], priority:1, stopIfTrue:true, style:{ font:{color:{argb:'FFFFFFFF'}}, fill:cfFill('FFFFFFFF') } },
      { type:'expression', formulae:['MOD(_xlfn.ISOWEEKNUM(M$8),2)=0'], priority:2, style:{ font:{bold:true,color:{argb:'FFFFFFFF'}}, fill:cfFill('FF1B2A49') } },
      { type:'expression', formulae:['MOD(_xlfn.ISOWEEKNUM(M$8),2)=1'], priority:3, style:{ font:{bold:true,color:{argb:'FF1B2A49'}}, fill:cfFill('FFDCE3EE') } }
    ]
  });
  wsGant.addConditionalFormatting({
    ref: `M8:${lastCalL}9`,
    rules: [
      { type:'expression', formulae:['M$8=TODAY()'], priority:4, style:{ font:{bold:true,color:{argb:'FFFFFFFF'}}, fill:cfFill('FFB08D57') } }
    ]
  });
  wsGant.addConditionalFormatting({
    ref: `M${firstDataRow}:${lastCalL}${lastDataRow}`,
    rules: [
      { type:'expression', formulae:['M$8>FinCalendario'], priority:5, stopIfTrue:true, style:{ font:{color:{argb:'FFFFFFFF'}}, fill:cfFill('FFFFFFFF') } },
      { type:'expression', formulae:[`AND($F${firstDataRow}="Resumen",M$8>=$H${firstDataRow},M$8<=$I${firstDataRow})`], priority:6, stopIfTrue:true, style:{ font:{color:{argb:'FFFFFFFF'}}, fill:cfFill('FF1B2A49') } },
      { type:'expression', formulae:[`OR($F${firstDataRow}="Resumen",$D${firstDataRow}="HITOS DEL PROYECTO",AND($B${firstDataRow}="",COUNTA($D${firstDataRow})>0))`], priority:7, stopIfTrue:true, style:{ font:{bold:true,color:{argb:'FF1B2A49'}}, fill:cfFill('FFE9EDF4') } },
      { type:'expression', formulae:[`AND($F${firstDataRow}="Act.",M$8>=$H${firstDataRow},M$8<=$I${firstDataRow},COUNTIFS(DiasNoLaborables,M$8,DiaLaborableSiNo,"<>SI")=0,COUNTIFS(Feriados,M$8,FeriadosAbrev,IFERROR(INDEX(RespAbrev,MATCH($E${firstDataRow},Responsables,0)),"#"))+COUNTIFS(Feriados,M$8,FeriadosAbrev,"")=0)`], priority:8, style:{ font:{color:{argb:'FFFFFFFF'}}, fill:cfFill('FF4F74AD') } },
      { type:'expression', formulae:[`IF($E${firstDataRow}="",COUNTIF(Feriados,M$8)>0,COUNTIFS(Feriados,M$8,FeriadosAbrev,IFERROR(INDEX(RespAbrev,MATCH($E${firstDataRow},Responsables,0)),"#"))+COUNTIFS(Feriados,M$8,FeriadosAbrev,"")>0)`], priority:9, style:{ fill:cfFill('FFE8D9B5') } },
      { type:'expression', formulae:['COUNTIFS(DiasNoLaborables,M$8,DiaLaborableSiNo,"<>SI")>0'], priority:10, style:{ fill:cfFill('FFF6CFCB') } }
    ]
  });
  wsGant.addConditionalFormatting({
    ref: `M${dailyRow}:${lastCalL}${cumRow}`,
    rules: [
      { type:'expression', formulae:['M$8>FinCalendario'], priority:11, stopIfTrue:true, style:{ font:{color:{argb:'FFFFFFFF'}}, fill:cfFill('FFFFFFFF') } }
    ]
  });
  wsGant.pageSetup = { orientation:'landscape', fitToPage:true, fitToWidth:1, fitToHeight:0 };

  // ==================== 2. HOJA CONFIG ====================
  wsCfg.columns = [
    { width:17.3 }, { width:30.4 }, { width:11.6 }, { width:3 },
    { width:17.3 }, { width:16 }, { width:15.3 }, { width:4.6 },
    { width:21 }, { width:15.3 }, { width:4 },
    { width:24 }, { width:11.6 }, { width:40 }
  ];
  wsCfg.getRow(1).height = 20;
  wsCfg.getCell('A1').value = 'CONFIGURACIÓN DEL CRONOGRAMA';
  wsCfg.getCell('A1').font = { name:FONT, size:13, bold:true, color:{ argb:'FF1B2A49' } };
  wsCfg.getCell('A2').value = 'Feriados (col A): escríbelos tú. Abreviatura (col C): vacía = aplica a todos. Sábados y domingos (col E) se calculan solos; cambia col G a SI para habilitar trabajo ese día.';
  wsCfg.getCell('A2').font = { name:FONT, size:8.5, italic:true, color:{ argb:'FF595959' } };

  [['A3','Feriados (no laborables)'],['E3','Días no laborables (sáb y dom automáticos)'],['I3','Rango del cronograma'],['L3','Responsables (nombres)']].forEach(([ref, txt]) => {
    const c = wsCfg.getCell(ref);
    c.value = txt;
    c.font = { name:FONT, size:9.5, bold:true, color:{ argb:'FF1B2A49' } };
  });
  [['A4','Fecha'],['B4','Descripción'],['C4','Abreviatura'],['E4','Fecha'],['F4','Día'],['G4','¿Laborable?'],['I4','Inicio del Gantt'],['L4','Nombre'],['M4','Abreviatura']].forEach(([ref, txt]) => {
    const c = wsCfg.getCell(ref);
    c.value = txt;
    c.font = { name:FONT, size:8.5, bold:true, color:{ argb:'FFFFFFFF' } };
    c.fill = fillSolid('FF1B2A49');
    c.alignment = { horizontal:'center', vertical:'middle' };
    c.border = thinBorder;
  });
  wsCfg.getCell('N4').value = '← Escribe aquí los nombres (uno por fila, sin dejar filas vacías).';
  wsCfg.getCell('N4').font = { name:FONT, size:8, italic:true, color:{ argb:'FF595959' } };

  const ownerList = owners();
  ownerList.forEach((oName, i) => {
    const rn = 5 + i;
    wsCfg.getCell(rn, 12).value = oName;
    wsCfg.getCell(rn, 13).value = ownerInitials(oName);
    wsCfg.getCell(rn, 12).font = { name:FONT, size:8.5 };
    wsCfg.getCell(rn, 13).font = { name:FONT, size:8.5, bold:true };
    wsCfg.getCell(rn, 12).border = thinBorder;
    wsCfg.getCell(rn, 13).border = thinBorder;
    wsCfg.getCell(rn, 13).alignment = { horizontal:'center' };
  });

  const holidayEntries = [];
  Object.entries(baseHols).forEach(([iso, desc]) => holidayEntries.push({ iso, desc, abrev:'' }));
  Object.entries(baseLeaves).forEach(([oName, map]) => {
    const ab = ownerInitials(oName);
    Object.entries(map || {}).forEach(([iso, desc]) => holidayEntries.push({ iso, desc, abrev:ab }));
  });
  for(let r = 5; r <= 24; r++){
    const entry = holidayEntries[r - 5];
    const cA = wsCfg.getCell(r, 1), cB = wsCfg.getCell(r, 2), cC = wsCfg.getCell(r, 3);
    if(entry){
      cA.value = isoToUtcDate(entry.iso);
      cB.value = entry.desc;
      cC.value = entry.abrev;
    }
    cA.font = cB.font = cC.font = { name:FONT, size:8.5 };
    cA.numFmt = 'dd/mm/yy';
    cA.border = cB.border = cC.border = thinBorder;
    cC.alignment = { horizontal:'center' };
    cC.dataValidation = { type:'list', allowBlank:true, formulae:['=$M$5:$M$54'], showErrorMessage:true, errorStyle:'warning', errorTitle:'Abreviatura', error:'Usa una abreviatura de la columna M o déjalo vacío para todos.' };
  }

  wsCfg.getCell('J4').value = { formula: 'Gant!C4', result: baseStartUtc };
  wsCfg.getCell('J4').numFmt = 'dd/mm/yy';
  wsCfg.getCell('J4').font = { name:FONT, size:8.5 };
  wsCfg.getCell('J4').alignment = { horizontal:'center' };
  wsCfg.getCell('J4').border = thinBorder;

  wsCfg.getCell('I5').value = 'Fin del proyecto';
  wsCfg.getCell('I5').font = { name:FONT, size:8.5, bold:true, color:{ argb:'FF1B2A49' } };
  wsCfg.getCell('I5').border = thinBorder;
  wsCfg.getCell('J5').value = { formula: 'Gant!F4', result: isoToUtcDate(maxEndIso) };
  wsCfg.getCell('J5').numFmt = 'dd/mm/yy';
  wsCfg.getCell('J5').font = { name:FONT, size:8.5 };
  wsCfg.getCell('J5').alignment = { horizontal:'center' };
  wsCfg.getCell('J5').border = thinBorder;

  wsCfg.getCell('I6').value = 'Fin del calendario';
  wsCfg.getCell('I6').font = { name:FONT, size:8.5, bold:true, color:{ argb:'FF1B2A49' } };
  wsCfg.getCell('I6').border = thinBorder;
  wsCfg.getCell('J6').value = { formula: 'J4+DiasCronograma-1', result: finCalUtc };
  wsCfg.getCell('J6').numFmt = 'dd/mm/yy';
  wsCfg.getCell('J6').font = { name:FONT, size:8.5, bold:true };
  wsCfg.getCell('J6').alignment = { horizontal:'center' };
  wsCfg.getCell('J6').border = thinBorder;

  // Sábados y domingos automáticos (E5:G60) con resultado en caché
  const weekendDates = calDatesUtc.slice(0, plazoDias).filter(dt => weekdayMon1(dt) > 5);
  for(let r = 5; r <= 60; r++){
    const wkDt = weekendDates[r - 5] || null;
    const cE = wsCfg.getCell(r, 5), cF = wsCfg.getCell(r, 6), cG = wsCfg.getCell(r, 7);
    cE.value = {
      formula: `IF($J$4-WEEKDAY($J$4,2)+6+7*INT((ROW()-ROW($E$5)+(WEEKDAY($J$4,2)=7))/2)+MOD((ROW()-ROW($E$5)+(WEEKDAY($J$4,2)=7)),2)>$J$6,"",$J$4-WEEKDAY($J$4,2)+6+7*INT((ROW()-ROW($E$5)+(WEEKDAY($J$4,2)=7))/2)+MOD((ROW()-ROW($E$5)+(WEEKDAY($J$4,2)=7)),2))`,
      result: wkDt || ''
    };
    cE.numFmt = 'dd/mm/yy';
    cF.value = {
      formula: `IF(E${r}="","",IF(WEEKDAY(E${r},2)=6,"Sábado","Domingo"))`,
      result: wkDt ? (weekdayMon1(wkDt) === 6 ? 'Sábado' : 'Domingo') : ''
    };
    cG.value = 'NO';
    cE.font = cF.font = cG.font = { name:FONT, size:8.5 };
    cG.alignment = { horizontal:'center' };
    cG.dataValidation = { type:'list', allowBlank:true, formulae:['"SI,NO"'], showErrorMessage:true, errorTitle:'¿Laborable?', error:'Elige SI o NO.' };
    cE.border = cF.border = cG.border = thinBorder;
  }
  wsCfg.addConditionalFormatting({
    ref: 'G5:G60',
    rules: [{ type:'expression', formulae:['$G5="SI"'], priority:1, style:{ fill:cfFill('FFC6EFCE') } }]
  });

  // ==================== 3. HOJA ALERTAS ====================
  wsAlert.columns = [
    { width:7 }, { width:55 }, { width:26 }, { width:36 }, { width:36 }, { width:34 }, { width:34 }
  ];
  wsAlert.mergeCells('A1:G1');
  wsAlert.getRow(1).height = 23.25;
  wsAlert.getCell('A1').value = 'CONTROL DEL CRONOGRAMA';
  wsAlert.getCell('A1').font = { name:FONT, size:13, bold:true, color:{ argb:'FF1B2A49' } };
  wsAlert.mergeCells('A2:G2');
  wsAlert.getRow(2).height = 24;
  wsAlert.getCell('A2').value = 'Revisión automática. Las predecesoras deben estar arriba de la actividad. Cualquier celda distinta de "OK" resalta una observación.';
  wsAlert.getCell('A2').font = { name:FONT, size:8.5, italic:true, color:{ argb:'FF595959' } };

  ['ID','Actividad','Responsable','Entradas','Programación','Calendario','Vínculo'].forEach((h, i) => {
    const c = wsAlert.getCell(4, i + 1);
    c.value = h;
    c.font = { name:FONT, size:8.5, bold:true, color:{ argb:'FFFFFFFF' } };
    c.fill = fillSolid('FF1B2A49');
    c.alignment = { horizontal:'center', vertical:'middle' };
    c.border = thinBorder;
  });

  actMeta.forEach(({ gantRow, alertRow, act, aIdText }) => {
    const p = gantRow - 1;
    wsAlert.getCell(alertRow, 1).value = { formula: `Gant!B${gantRow}`, result: aIdText };
    wsAlert.getCell(alertRow, 2).value = { formula: `Gant!D${gantRow}&""`, result: act.title || '' };
    wsAlert.getCell(alertRow, 3).value = { formula: `Gant!E${gantRow}&""`, result: act.owner || '' };
    wsAlert.getCell(alertRow, 4).value = { formula: `IFERROR(_xlfn.LET(_xlpm.msg,_xlfn.TEXTJOIN("; ",TRUE,IF(Gant!D${gantRow}="","Falta actividad",""),IF(COUNTIF(Responsables,Gant!E${gantRow})=0,"Responsable no registrado",""),IF(Gant!G${gantRow}="","Falta duración",IF(IFERROR(AND(ISNUMBER(Gant!G${gantRow}),Gant!G${gantRow}>0,MOD(Gant!G${gantRow},1)=0),FALSE),"","Duración inválida")),IF(Gant!J${gantRow}="","",IFERROR(_xlfn.LET(_xlpm.ids,_xlfn.TEXTSPLIT(SUBSTITUTE(Gant!J${gantRow}," ",""),{",",";"}),IF(SUM(--(COUNTIF(Gant!$B$11:$B${p},_xlpm.ids)>0))=COUNTA(_xlpm.ids),"","Predecesora inexistente, propia o posterior")),"Predecesora inválida")),IF(OR(Gant!K${gantRow}="",Gant!K${gantRow}="FC",Gant!K${gantRow}="CC",Gant!K${gantRow}="FF",Gant!K${gantRow}="CF"),"","Dependencia inválida"),IF(OR(Gant!L${gantRow}="",IFERROR(AND(ISNUMBER(Gant!L${gantRow}),MOD(Gant!L${gantRow},1)=0),FALSE)),"","Desfase inválido")),IF(_xlpm.msg="","OK",_xlpm.msg)),"Revisar entradas")`, result: 'OK' };
    wsAlert.getCell(alertRow, 5).value = { formula: `IFERROR(IF(OR(Gant!D${gantRow}="",Gant!G${gantRow}=""),"Pendiente",IF(OR(Gant!H${gantRow}="",Gant!I${gantRow}=""),"Sin fechas: revisar vínculo y calendario",IF(OR(Gant!H${gantRow}<Gant!$C$4,Gant!I${gantRow}>FinCalendario,Gant!I${gantRow}<Gant!H${gantRow}),"Fuera del calendario o fechas invertidas","OK"))),"Error de cálculo")`, result: 'OK' };
    wsAlert.getCell(alertRow, 6).value = { formula: `IFERROR(IF(OR(Gant!H${gantRow}="",Gant!I${gantRow}=""),"Pendiente",IF(SUM(COUNTIFS(DiasNoLaborables,Gant!H${gantRow}:I${gantRow},DiaLaborableSiNo,"<>SI"))+SUM(COUNTIFS(Feriados,Gant!H${gantRow}:I${gantRow},FeriadosAbrev,""))+SUM(COUNTIFS(Feriados,Gant!H${gantRow}:I${gantRow},FeriadosAbrev,_xlfn.XLOOKUP(Gant!E${gantRow},Responsables,RespAbrev,"#")))>0,"Inicio o fin no laborable","OK")),"Revisar calendario")`, result: 'OK' };
    wsAlert.getCell(alertRow, 7).value = { formula: `IF(Gant!J${gantRow}="","OK",IFERROR(_xlfn.LET(_xlpm.ids,_xlfn.TEXTSPLIT(SUBSTITUTE(Gant!J${gantRow}," ",""),{",",";"}),IF(SUM(--(COUNTIF(Gant!$B$11:$B${p},_xlpm.ids)>0))=COUNTA(_xlpm.ids),"OK","Revisar predecesora")),"Revisar predecesora"))`, result: 'OK' };
    for(let col = 1; col <= 7; col++){
      const c = wsAlert.getCell(alertRow, col);
      c.font = { name:FONT, size:8.5, color:{ argb:'FF1B2A49' } };
      c.alignment = { horizontal: col===1||col>=4 ? 'center' : 'left', vertical:'middle' };
      c.border = thinBorder;
    }
  });
  const lastAlertRow = Math.max(5, 4 + actMeta.length);
  wsAlert.addConditionalFormatting({
    ref: `D5:G${lastAlertRow}`,
    rules: [{ type:'expression', formulae:['AND(D5<>"OK",D5<>"")'], priority:1, style:{ font:{color:{argb:'FF7A4500'}}, fill:cfFill('FFFFF0C2') } }]
  });

  // ==================== 4. HOJA CONTROL SEMANAL ====================
  wsCtrl.columns = [
    { width:7.5 }, { width:54.5 }, { width:22 }, { width:14.5 }, { width:14.5 },
    { width:12.7 }, { width:17.3 }, { width:17.3 }, { width:22 }, { width:18.3 }, { width:45 }
  ];
  wsCtrl.getRow(1).height = 23.25;
  wsCtrl.getCell('A1').value = 'CONTROL SEMANAL DEL CRONOGRAMA';
  wsCtrl.getCell('A1').font = { name:FONT, size:13, bold:true, color:{ argb:'FF1B2A49' } };
  wsCtrl.getCell('A2').value = 'Actividades cuya fecha de fin en el Gantt cae dentro de la semana seleccionada. Escribe SI o NO en "¿Cumplió?" para actualizar el cumplimiento.';
  wsCtrl.getCell('A2').font = { name:FONT, size:8.5, italic:true, color:{ argb:'FF595959' } };

  const nowUtc = new Date();
  const todayUtc = new Date(Date.UTC(nowUtc.getFullYear(), nowUtc.getMonth(), nowUtc.getDate()));
  const monUtc = new Date(todayUtc.getTime() - (weekdayMon1(todayUtc) - 1) * 86400000);
  const sunUtc = new Date(monUtc.getTime() + 6 * 86400000);

  wsCtrl.getCell('B4').value = 'Inicio de semana (lunes)';
  wsCtrl.getCell('C4').value = { formula: 'TODAY()-WEEKDAY(TODAY(),2)+1', result: monUtc };
  wsCtrl.getCell('C4').numFmt = 'dd/mm/yy';
  wsCtrl.getCell('C4').fill = fillSolid('FFFFF4D6');
  wsCtrl.getCell('D4').value = '← Por defecto es la semana actual; escribe cualquier lunes para revisar otra semana.';
  wsCtrl.getCell('D4').font = { name:FONT, size:8.5, italic:true, color:{ argb:'FF595959' } };

  wsCtrl.getCell('B5').value = 'Fecha de corte (domingo)';
  wsCtrl.getCell('C5').value = { formula: 'C4+6', result: sunUtc };
  wsCtrl.getCell('C5').numFmt = 'dd/mm/yy';

  wsCtrl.getCell('B6').value = 'Semana';
  wsCtrl.getCell('C6').value = { formula: '"S"&_xlfn.ISOWEEKNUM(C4)', result: 'S' + isoWeekNum(monUtc) };

  [4,5,6].forEach(rn => {
    wsCtrl.getCell(rn, 2).font = { name:FONT, size:8.5, bold:true, color:{ argb:'FF1B2A49' } };
    wsCtrl.getCell(rn, 2).border = thinBorder;
    wsCtrl.getCell(rn, 3).font = { name:FONT, size:8.5, bold:true, color:{ argb:'FF1B2A49' } };
    wsCtrl.getCell(rn, 3).alignment = { horizontal:'center' };
    wsCtrl.getCell(rn, 3).border = thinBorder;
  });

  wsCtrl.getCell('A8').value = 'RESUMEN POR RESPONSABLE';
  wsCtrl.getCell('A8').font = { name:FONT, size:9.5, bold:true, color:{ argb:'FF1B2A49' } };

  const sumStartRow = 10;
  const ownerCount = Math.max(1, ownerList.length);
  const sumEndRow = sumStartRow + ownerCount - 1;
  const sumTotalRow = sumEndRow + 1;
  const detTitleRow = sumTotalRow + 2;
  const detHdrRow = detTitleRow + 1;
  const detStartRow = detHdrRow + 1;
  const detEndRow = Math.max(detStartRow, detStartRow + actMeta.length - 1);

  wsCtrl.getRow(9).height = 24;
  ['Responsable','Controladas','Cumplió','No cumplió','Sin reporte','% cumplimiento','Resultado','Actividades no cumplidas / sin reporte (ID)'].forEach((h, i) => {
    const c = wsCtrl.getCell(9, i + 2);
    c.value = h;
    c.font = { name:FONT, size:8.5, bold:true, color:{ argb:'FFFFFFFF' } };
    c.fill = fillSolid('FF1B2A49');
    c.alignment = { horizontal:'center', vertical:'middle', wrapText:true };
    c.border = thinBorder;
  });

  for(let i = 0; i < ownerCount; i++){
    const rn = sumStartRow + i;
    const cfgRow = 5 + i;
    const oName = ownerList[i] || '';
    wsCtrl.getCell(rn, 2).value = { formula: `Config!L${cfgRow}&""`, result: oName };
    wsCtrl.getCell(rn, 3).value = { formula: `D${rn}+E${rn}+F${rn}`, result: 0 };
    wsCtrl.getCell(rn, 4).value = { formula: `COUNTIFS($C$${detStartRow}:$C$${detEndRow},$B${rn},$J$${detStartRow}:$J$${detEndRow},"Cumplió")`, result: 0 };
    wsCtrl.getCell(rn, 5).value = { formula: `COUNTIFS($C$${detStartRow}:$C$${detEndRow},$B${rn},$J$${detStartRow}:$J$${detEndRow},"No cumplió")`, result: 0 };
    wsCtrl.getCell(rn, 6).value = { formula: `COUNTIFS($C$${detStartRow}:$C$${detEndRow},$B${rn},$J$${detStartRow}:$J$${detEndRow},"Sin reporte")`, result: 0 };
    wsCtrl.getCell(rn, 7).value = { formula: `IF(C${rn}=0,"",D${rn}/C${rn})`, result: '' };
    wsCtrl.getCell(rn, 7).numFmt = '0%';
    wsCtrl.getCell(rn, 8).value = { formula: `IF(C${rn}=0,"Sin actividades",IF(E${rn}>0,"No cumplió",IF(F${rn}>0,"Pendiente de reporte","Cumplió")))`, result: 'Sin actividades' };
    wsCtrl.getCell(rn, 9).value = { formula: `_xlfn.TEXTJOIN(", ",TRUE,_xlfn._xlws.FILTER($A$${detStartRow}:$A$${detEndRow},($C$${detStartRow}:$C$${detEndRow}=$B${rn})*((($J$${detStartRow}:$J$${detEndRow}="No cumplió")+($J$${detStartRow}:$J$${detEndRow}="Sin reporte"))>0),""))`, result: '' };
    for(let col = 2; col <= 9; col++){
      const c = wsCtrl.getCell(rn, col);
      c.font = { name:FONT, size:8.5, color:{ argb:'FF1B2A49' } };
      c.alignment = { horizontal: (col===2||col===9) ? 'left' : 'center', vertical:'middle' };
      c.border = thinBorder;
    }
  }
  wsCtrl.getCell(sumTotalRow, 2).value = 'TOTAL';
  wsCtrl.getCell(sumTotalRow, 3).value = { formula: `SUM(C${sumStartRow}:C${sumEndRow})`, result: 0 };
  wsCtrl.getCell(sumTotalRow, 4).value = { formula: `SUM(D${sumStartRow}:D${sumEndRow})`, result: 0 };
  wsCtrl.getCell(sumTotalRow, 5).value = { formula: `SUM(E${sumStartRow}:E${sumEndRow})`, result: 0 };
  wsCtrl.getCell(sumTotalRow, 6).value = { formula: `SUM(F${sumStartRow}:F${sumEndRow})`, result: 0 };
  wsCtrl.getCell(sumTotalRow, 7).value = { formula: `IF(C${sumTotalRow}=0,"",D${sumTotalRow}/C${sumTotalRow})`, result: '' };
  wsCtrl.getCell(sumTotalRow, 7).numFmt = '0%';
  for(let col = 2; col <= 9; col++){
    const c = wsCtrl.getCell(sumTotalRow, col);
    c.font = { name:FONT, size:8.5, bold:true, color:{ argb:'FF1B2A49' } };
    c.fill = fillSolid('FFE9EDF4');
    c.alignment = { horizontal: col===2 ? 'left' : 'center', vertical:'middle' };
    c.border = thinBorder;
  }

  wsCtrl.getCell(detTitleRow, 1).value = 'DETALLE POR ACTIVIDAD';
  wsCtrl.getCell(detTitleRow, 1).font = { name:FONT, size:9.5, bold:true, color:{ argb:'FF1B2A49' } };
  wsCtrl.getRow(detHdrRow).height = 36;
  ['ID','Actividad','Responsable','Inicio','Fin','Dur. (dc)','% programado al corte','¿Cumplió? (SI/NO)','Debía entregarse en la semana','Estado','Observaciones'].forEach((h, i) => {
    const c = wsCtrl.getCell(detHdrRow, i + 1);
    c.value = h;
    c.font = { name:FONT, size:8.5, bold:true, color:{ argb:'FFFFFFFF' } };
    c.fill = fillSolid('FF1B2A49');
    c.alignment = { horizontal:'center', vertical:'middle', wrapText:true };
    c.border = thinBorder;
  });
  wsCtrl.autoFilter = `A${detHdrRow}:K${detEndRow}`;

  actMeta.forEach(({ gantRow, act, stInfo, aIdText, aStartUtc, aEndUtc, aDur }, idx) => {
    const rn = detStartRow + idx;
    const isDone = stInfo.state === 'completed' || (Number.isFinite(stInfo.actual) && stInfo.actual >= 99.999);
    const inWeek = Boolean(aEndUtc && aEndUtc >= monUtc && aEndUtc <= sunUtc);
    const estadoCache = !inWeek ? 'No programada' : (isDone ? 'Cumplió' : 'Sin reporte');
    wsCtrl.getCell(rn, 1).value = { formula: `Gant!B${gantRow}`, result: aIdText };
    wsCtrl.getCell(rn, 2).value = { formula: `Gant!D${gantRow}&""`, result: act.title || '' };
    wsCtrl.getCell(rn, 3).value = { formula: `Gant!E${gantRow}&""`, result: act.owner || '' };
    wsCtrl.getCell(rn, 4).value = { formula: `Gant!H${gantRow}`, result: aStartUtc || '' };
    wsCtrl.getCell(rn, 5).value = { formula: `Gant!I${gantRow}`, result: aEndUtc || '' };
    wsCtrl.getCell(rn, 6).value = { formula: `Gant!G${gantRow}`, result: aDur };
    wsCtrl.getCell(rn, 7).value = { formula: `IFERROR(MIN(1,SUMPRODUCT((Gant!$M$8:$${lastCalL}$8<=$C$5)*Gant!$M${gantRow}:$${lastCalL}${gantRow})),0)`, result: isDone ? 1 : 0 };
    wsCtrl.getCell(rn, 7).numFmt = '0%';
    if(isDone) wsCtrl.getCell(rn, 8).value = 'SI';
    wsCtrl.getCell(rn, 8).dataValidation = { type:'list', allowBlank:true, formulae:['"SI,NO"'], showErrorMessage:true, errorTitle:'¿Cumplió?', error:'Elige SI o NO.' };
    wsCtrl.getCell(rn, 9).value = { formula: `IF(AND(E${rn}>=$C$4,E${rn}<=$C$5),"SI","NO")`, result: inWeek ? 'SI' : 'NO' };
    wsCtrl.getCell(rn, 10).value = { formula: `IF(I${rn}<>"SI","No programada",IF(UPPER(TRIM(H${rn}))="SI","Cumplió",IF(UPPER(TRIM(H${rn}))="NO","No cumplió","Sin reporte")))`, result: estadoCache };
    if(stInfo.completedAt){
      wsCtrl.getCell(rn, 11).value = 'Fin real: ' + readable(stInfo.completedAt) + (stInfo.late ? ' (Fuera de plazo)' : '');
    } else if(Number.isFinite(stInfo.actual) && stInfo.actual > 0){
      wsCtrl.getCell(rn, 11).value = 'Avance web: ' + Math.round(stInfo.actual) + '%';
    }
    for(let col = 1; col <= 11; col++){
      const c = wsCtrl.getCell(rn, col);
      c.font = { name:FONT, size:8.5, color:{ argb:'FF1B2A49' } };
      c.alignment = { horizontal: (col===2||col===3||col===11) ? 'left' : 'center', vertical:'middle' };
      c.border = thinBorder;
      if(col === 4 || col === 5) c.numFmt = 'dd/mm/yy';
    }
  });

  const statusRules = [
    { type:'containsText', operator:'containsText', text:'No cumplió', priority:1, style:{ font:{color:{argb:'FF9C0006'}}, fill:cfFill('FFF8CBAD') } },
    { type:'containsText', operator:'containsText', text:'Sin reporte', priority:2, style:{ font:{color:{argb:'FF7F6000'}}, fill:cfFill('FFFFEB9C') } },
    { type:'containsText', operator:'containsText', text:'Pendiente', priority:3, style:{ font:{color:{argb:'FF7F6000'}}, fill:cfFill('FFFFEB9C') } },
    { type:'containsText', operator:'containsText', text:'Cumplió', priority:4, style:{ font:{color:{argb:'FF006100'}}, fill:cfFill('FFC6EFCE') } },
    { type:'containsText', operator:'containsText', text:'No programada', priority:5, style:{ font:{color:{argb:'FF7F7F7F'}}, fill:cfFill('FFEDEDED') } }
  ];
  wsCtrl.addConditionalFormatting({ ref: `H${sumStartRow}:H${sumEndRow}`, rules: statusRules });
  wsCtrl.addConditionalFormatting({ ref: `J${detStartRow}:J${detEndRow}`, rules: statusRules });

  // Nombres definidos (definedNames) exactos de Actividades Área Bim - Noviembre.xlsx
  const namedDefs = [
    ['Config!$A$5:$A$24', 'Feriados'],
    ['Config!$C$5:$C$24', 'FeriadosAbrev'],
    ['Config!$E$5:$E$60', 'DiasNoLaborables'],
    ['Config!$G$5:$G$60', 'DiaLaborableSiNo'],
    ['Config!$J$6', 'FinCalendario'],
    ['Config!$L$5:$L$54', 'Responsables'],
    ['Config!$M$5:$M$54', 'RespAbrev'],
    ['Gant!$O$4', 'DiasCronograma']
  ];
  namedDefs.forEach(([ref, name]) => {
    try { wb.definedNames.remove(ref, name); } catch {}
    try { wb.definedNames.add(ref, name); } catch {}
  });
}

function openArea2AuthThenExcelSync(){
  if(window.bimArea2Auth?.isVerified?.()){
    openExcelSyncModal();
    return;
  }
  const back = document.getElementById('vgg-submodal-back');
  back.innerHTML = '<div class="vgg-submodal narrow" role="dialog" aria-modal="true" aria-label="Acceso restringido">'+
    '<div class="vgg-submodal-hd"><h3>Acceso restringido</h3>'+
    '<button type="button" class="vgg-submodal-close" data-vgg-sub-close>×</button></div>'+
    '<form id="vgg-auth-form"><div class="vgg-submodal-body">'+
    '<p style="margin:0;line-height:1.45">Ingresa las credenciales autorizadas para transferir los cambios del cronograma al Excel.</p>'+
    '<div id="vgg-auth-err" class="vgg-sub-error" hidden></div>'+
    '<div class="vgg-form-field"><label for="vgg-a-user">Usuario</label><input id="vgg-a-user" autocomplete="username" required placeholder="Usuario"></div>'+
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
      errBox.textContent = 'Usuario o contraseña no autorizados.';
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
  back.innerHTML = '<div class="vgg-submodal" role="dialog" aria-modal="true" aria-label="Actualizar Excel">'+
    '<div class="vgg-submodal-hd"><h3>Actualizar Excel del Cronograma</h3>'+
    '<button type="button" class="vgg-submodal-close" data-vgg-sub-close>×</button></div>'+
    '<div class="vgg-submodal-body">'+
    '<div id="vgg-xls-err" class="vgg-sub-error" hidden></div>'+
    '<div class="vgg-excel-card"><h4>Opción 1 · Actualizar mi archivo Excel existente (.xlsx)</h4>'+
    '<p>Selecciona tu libro Excel local. Se actualizarán las hojas <b>Gant</b>, <b>Config</b>, <b>Alertas</b> y <b>Control Semanal</b> con el formato completo, fórmulas, validaciones y formato condicional de tu plantilla (<b>'+actsCount+' actividades</b>), conservando cualquier otra pestaña adicional que tenga tu archivo.</p>'+
    '<input type="file" id="vgg-xls-target" accept=".xlsx" hidden>'+
    '<div><button type="button" id="vgg-xls-merge-btn" class="vgg-sub-btn success">Elegir mi Excel (.xlsx) y actualizar</button></div></div>'+
    '<div class="vgg-excel-card"><h4>Opción 2 · Descargar libro Excel nuevo (Plantilla completa)</h4>'+
    '<p>Genera desde cero <code>Actividades_Area_BIM.xlsx</code> con las 4 hojas (<b>Gant</b>, <b>Config</b>, <b>Alertas</b> y <b>Control Semanal</b>), todas las fórmulas automáticas, validaciones y formato condicional tal cual tu plantilla.</p>'+
    '<div><button type="button" id="vgg-xls-new-btn" class="vgg-sub-btn primary">Descargar Excel con plantilla (.xlsx)</button></div></div>'+
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
      const ExcelJS = await loadExcelJs();
      const buf = await file.arrayBuffer();
      const wb = new ExcelJS.Workbook();
      await wb.xlsx.load(buf);
      buildActividadesBimTemplateIntoWorkbook(wb);
      const outBuf = await wb.xlsx.writeBuffer();
      downloadExcelBuffer(outBuf, file.name);
      closeSubmodal();
      if(typeof toast === 'function') toast('Excel actualizado con fórmulas y plantilla: ' + file.name);
    } catch (err) {
      errBox.textContent = 'No se pudo actualizar el archivo: ' + (err?.message || 'error desconocido');
      errBox.hidden = false;
    }
  });

  document.getElementById('vgg-xls-new-btn')?.addEventListener('click', async () => {
    errBox.hidden = true;
    try {
      const ExcelJS = await loadExcelJs();
      const wb = new ExcelJS.Workbook();
      buildActividadesBimTemplateIntoWorkbook(wb);
      const outBuf = await wb.xlsx.writeBuffer();
      downloadExcelBuffer(outBuf, 'Actividades_Area_BIM.xlsx');
      closeSubmodal();
      if(typeof toast === 'function') toast('Excel generado con plantilla completa (Gant, Config, Alertas y Control Semanal).');
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
      '<button type="button" id="vgg-header-clear-filters" data-vgg-action="reset-filters">Quitar filtros</button>'+
      '<button type="button" data-vgg-action="new-activity" title="Agregar nueva actividad al cronograma">+ Nueva actividad</button>'+
      '<button type="button" data-vgg-action="new-group" title="Crear nuevo grupo de actividades">+ Grupo</button>'+
      '<button type="button" id="vgg-excel-sync-btn" data-vgg-action="open-excel-sync">🔒 Actualizar Excel</button>'+
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
      '<details id="vgg-colchooser" class="vgg-colchooser"><summary>Columnas compartidas</summary>'+
      '<div class="vgg-colchooser-popover" aria-label="Columnas visibles para todos">'+
      '<p style="margin:0 0 7px;color:var(--ink-secondary,#abc1db);font-size:10px">La selección se comparte con todos mediante Supabase.</p>'+
      columns.map((col,i) => '<label class="vgg-col-item"><input type="checkbox"'+
        (hiddenColumns.has(i)?'':' checked')+' data-vgg-col="'+i+'"> '+escapeText(col[0])+'</label>').join('')+
      '<button type="button" data-vgg-action="all-columns">Mostrar todas</button></div></details>'+
      '<span class="vgg-count" id="vgg-count"></span></div>'+
      '<div class="vgg-scroll"><table class="vgg-table" id="vgg-table" aria-label="Cronograma Gantt editable"></table>'+
      '<svg id="vgg-links-svg" class="vgg-links-svg" aria-hidden="true"></svg></div>'+
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

      const insertBeforeBtn = ev.target.closest('[data-vgg-insert-before]');
      if(insertBeforeBtn){
        const ref = getSource().rows.find(r => r.kind==='activity' && r.id===insertBeforeBtn.dataset.vggInsertBefore);
        if(ref) openActivityModal({ presetOwner: ref.owner, presetGroup: ref.group, presetPosition: 'before:' + ref.id });
        return;
      }

      const insertAfterBtn = ev.target.closest('[data-vgg-insert-after]');
      if(insertAfterBtn){
        const ref = getSource().rows.find(r => r.kind==='activity' && r.id===insertAfterBtn.dataset.vggInsertAfter);
        if(ref) openActivityModal({ presetOwner: ref.owner, presetGroup: ref.group, presetPosition: 'after:' + ref.id });
        return;
      }

      const moveActBtn = ev.target.closest('[data-vgg-move-act]');
      if(moveActBtn && st.selected){
        const delta = Number(moveActBtn.dataset.vggMoveAct);
        if(window.bimGanttScheduleStore?.moveActivity?.(st.selected, delta)){
          rebuildFilterSelects();
          render();
          if(typeof toast === 'function') toast(delta < 0 ? 'Actividad movida arriba.' : 'Actividad movida abajo.');
        } else if(typeof toast === 'function'){
          toast(delta < 0 ? 'Ya es la primera actividad de este grupo.' : 'Ya es la última actividad de este grupo.');
        }
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
