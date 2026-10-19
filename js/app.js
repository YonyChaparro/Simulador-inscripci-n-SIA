/* Simulador del proceso de inscripción de asignaturas — SIA UNAL
   SPA sin dependencias: rutas por hash, estado en localStorage. */

/* ------------------------------------------------------------------ */
/* Íconos                                                              */
/* ------------------------------------------------------------------ */
const ICONS = {
  person: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
  idcard: 'M20 7h-5V4c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM9 12c.83 0 1.5.67 1.5 1.5S9.83 15 9 15s-1.5-.67-1.5-1.5S8.17 12 9 12zm3 6H6v-.75c0-1 2-1.5 3-1.5s3 .5 3 1.5V18zm1-9h-2V4h2v5zm5 7.5h-4V15h4v1.5zm0-3h-4V12h4v1.5z',
  book: 'M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z',
  edit: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
  search: 'M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  dollar: 'M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z',
  folder: 'M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z',
  assign: 'M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z',
  down: 'M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z',
  up: 'M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z',
  left: 'M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z',
  right: 'M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z',
  check: 'M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
  info: 'M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
  warn: 'M12 5.99 19.53 19H4.47L12 5.99M12 2 1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z',
  power: 'M13 3h-2v10h2V3zm4.83 2.17-1.42 1.42A6.92 6.92 0 0 1 19 12c0 3.87-3.13 7-7 7A6.995 6.995 0 0 1 7.58 6.58L6.17 5.17A8.932 8.932 0 0 0 3 12a9 9 0 0 0 18 0c0-2.74-1.23-5.18-3.17-6.83z',
  arrowUp: 'M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z',
  arrowRight: 'M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z',
  arrowLeft: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z',
  clock: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z',
  calendar: 'M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z',
  download: 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z',
  external: 'M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z',
  lock: 'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z',
  logout: 'M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z',
  refresh: 'M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z',
  caret: 'M7 10l5 5 5-5z',
  pin: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z',
  home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  print: 'M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z',
};

function ic(name, cls = '') {
  return `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${ICONS[name]}"/></svg>`;
}

const UXXI = `<svg class="icon" viewBox="0 0 44 18" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true">
  <circle cx="8" cy="9" r="5.5"/><circle cx="20" cy="9" r="5.5"/><circle cx="34" cy="9" r="5.5" stroke-dasharray="3 2"/></svg>`;

/* ------------------------------------------------------------------ */
/* Utilidades                                                          */
/* ------------------------------------------------------------------ */
const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const DIAS_SEMANA = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = (n) => String(n).padStart(2, '0');
const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseISO = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const dmy = (s) => { const [y, m, d] = s.split('-'); return `${d}/${m}/${y}`; };
const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };
const lunesDe = (d) => addDays(d, -((d.getDay() + 6) % 7));
const minutos = (h) => { const [a, b] = h.split(':').map(Number); return a * 60 + b; };
const hoy = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };

/* ------------------------------------------------------------------ */
/* Estado                                                              */
/* ------------------------------------------------------------------ */
const KEY = 'simulador-sia-unal-v1';
const ESTADO_INICIAL = { usuario: null, perfil: null, inscritos: {}, seleccion: null, ultimaMod: null, confirmado: null };

function cargar() {
  try { return { ...ESTADO_INICIAL, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { return { ...ESTADO_INICIAL }; }
}
let state = cargar();
function guardar() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* sin almacenamiento */ } }

/* Cada sesión tiene un perfil aleatorio (carrera, estudiante, asignaturas) definido por una semilla */
function nuevaSesion(usuario) {
  state = { ...ESTADO_INICIAL, usuario, perfil: nuevaSemilla() };
  generarPerfil(state.perfil);
  guardar();
}
if (state.usuario) state.perfil == null ? nuevaSesion(state.usuario) : generarPerfil(state.perfil);

/* Estado de interfaz (no persiste) */
const ui = {
  menu: null, userMenu: false, mUserMenu: false,
  tipAbiertas: new Set(['Disciplinar optativa']), verSeleccionadas: false,
  detalles: new Set(), horarios: new Set(),
  calVista: 'mensual', calFecha: hoy(), layout: 'ambos',
};

const asig = (codigo) => ASIGNATURAS.find((a) => a.codigo === codigo);
const grupoDe = (a, num) => a.grupos.find((g) => g.numero === Number(num));
const seleccionadas = (sel) => ASIGNATURAS.filter((a) => sel[a.codigo] != null);
const creditosDe = (sel) => seleccionadas(sel).reduce((t, a) => t + a.creditos, 0);

function motivoNoSeleccionable(a) {
  if (a.bloqueo) return a.bloqueo;
  if (a.grupos.every((g) => g.cupos <= 0)) return 'No es seleccionable porque no quedan cupos libres.';
  return null;
}

/* Cruces de horario: { codigo: [codigos con los que se cruza] } */
function crucesDe(sel) {
  const lista = seleccionadas(sel).map((a) => ({ a, g: grupoDe(a, sel[a.codigo]) }));
  const res = {};
  for (let i = 0; i < lista.length; i++) {
    for (let j = i + 1; j < lista.length; j++) {
      const x = lista[i], y = lista[j];
      const choca = x.g.sesiones.some((s) => y.g.sesiones.some((t) =>
        s.dia === t.dia && minutos(s.inicio) < minutos(t.fin) && minutos(t.inicio) < minutos(s.fin)));
      if (choca) {
        (res[x.a.codigo] ||= []).push(y.a.codigo);
        (res[y.a.codigo] ||= []).push(x.a.codigo);
      }
    }
  }
  return res;
}

/* ------------------------------------------------------------------ */
/* Modal y toast                                                       */
/* ------------------------------------------------------------------ */
let modalBotones = [];
function modal({ titulo, cuerpo, icono = 'info', botones = [{ t: 'Aceptar' }] }) {
  modalBotones = botones;
  document.getElementById('modal-root').innerHTML = `
    <div class="modal-back" data-a="modal-cerrar">
      <div class="modal" role="dialog" aria-modal="true" aria-label="${esc(titulo)}">
        <div class="modal-head">${ic(icono)}${titulo}</div>
        <div class="modal-body">${cuerpo}</div>
        <div class="modal-foot">${botones.map((b, i) => `<button class="btn ${b.cls || ''}" data-a="modal-btn" data-i="${i}">${b.t}</button>`).join('')}</div>
      </div>
    </div>`;
}
function cerrarModal() { document.getElementById('modal-root').innerHTML = ''; }
function toast(msg) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  document.getElementById('toast-root').appendChild(el);
  setTimeout(() => el.remove(), 2800);
}

/* ------------------------------------------------------------------ */
/* Router                                                              */
/* ------------------------------------------------------------------ */
const ir = (h) => { location.hash = h; };
const rutaActual = () => location.hash.replace(/^#/, '') || '/login';

function render(conservarScroll = true) {
  const y = window.scrollY;
  const ruta = rutaActual();
  const partes = ruta.split('/').filter(Boolean);

  if (!state.usuario && partes[0] !== 'login') return ir('/login');
  if (state.usuario && partes[0] === 'login') return ir('/portal');

  let html;
  switch (partes[0]) {
    case 'login': html = vistaLogin(); break;
    case 'portal': html = vistaPortal(partes[1]); break;
    case 'citas': html = vistaCitas(); break;
    case 'matricula': {
      const paso = partes[1];
      if (['seleccion', 'resumen', 'validacion'].includes(paso) && !state.seleccion) return ir('/matricula');
      html = vistaMatricula(paso);
      break;
    }
    case 'imprimir': html = vistaImprimir(); break;
    default: return ir('/portal');
  }
  document.getElementById('app').innerHTML = html;
  window.scrollTo(0, conservarScroll ? y : 0);
  if (partes[0] === 'login') document.getElementById('usuario')?.focus();
}

window.addEventListener('hashchange', () => {
  ui.userMenu = ui.mUserMenu = false;
  cerrarModal();
  render(false);
});

/* ------------------------------------------------------------------ */
/* LOGIN                                                               */
/* ------------------------------------------------------------------ */
function vistaLogin() {
  return `
  <div class="lg-page">
    <header class="lg-header">
      <div class="lg-logo"><img src="assets/escudoUnal.png" alt="Universidad Nacional de Colombia"></div>
      <div class="lg-site">${ic('pin')} Portal de servicios académicos</div>
    </header>
    <div class="lg-servicios" aria-hidden="true">${ic('left')}<span>Servicios</span></div>
    <main class="lg-body">
      <div class="lg-card">
        <h1>Ingrese su usuario y contraseña</h1>
        <div class="lg-cols">
          <form class="lg-form" id="form-login" autocomplete="off" novalidate>
            <label class="lg-input"><span>${ic('person')}</span><input id="usuario" name="usuario" aria-label="Usuario"></label>
            <label class="lg-input"><span>${ic('lock')}</span><input id="clave" name="clave" type="password" aria-label="Contraseña"></label>
            <div class="lg-error" id="login-error"></div>
            <button class="lg-btn" type="submit">Iniciar Sesión</button>
          </form>
          <div class="lg-marca"><b>DNINFOA</b><small>DIRECCIÓN NACIONAL DE INFORMACIÓN ACADÉMICA / <em>SIA</em></small></div>
        </div>
        <p class="lg-nota">Simulador de práctica: ingrese con cualquier usuario y contraseña. No use su contraseña real del SIA.</p>
      </div>
    </main>
    <footer class="lg-footer">
      <div class="contacto"><b>Contacto página web:</b><br>Cra 30 # 45-03<br>Edificio 608 - 2 Piso<br>Bogotá D.C., Colombia</div>
      <div class="copy">© Copyright 2018<br>Algunos derechos reservados.</div>
      <div class="marcas"><span>orgullo<i>un</i></span><span></span><span>agencia<i>un</i></span></div>
    </footer>
  </div>`;
}

document.addEventListener('submit', (e) => {
  if (e.target.id !== 'form-login') return;
  e.preventDefault();
  const usuario = e.target.usuario.value.trim().replace(/@.*$/, '');
  const clave = e.target.clave.value;
  const err = document.getElementById('login-error');
  if (!usuario) { err.textContent = 'Ingrese su usuario.'; return; }
  if (!clave) { err.textContent = 'Ingrese su contraseña.'; return; }
  nuevaSesion(usuario);
  ir('/portal');
});

/* ------------------------------------------------------------------ */
/* PORTAL                                                              */
/* ------------------------------------------------------------------ */
const MENU = [
  { id: 'datos', t: 'Datos personales', icon: 'idcard', items: [['mis-datos', 'Mis datos personales']] },
  { id: 'academica', t: 'Información académica', icon: 'book', items: [
    ['historia', 'Mi historia académica'], ['calificaciones', 'Mis Calificaciones'], ['horario', 'Mi horario'], ['planes', 'Mis planes'], ['tutores', 'Mis tutores']] },
  { id: 'inscripcion', t: 'Proceso de inscripción', icon: 'edit', items: [
    ['cita', 'Cita de inscripción/cancelación', '/citas'], ['disponibles', 'Asignaturas disponibles para cursar'],
    ['inscripcion', 'Inscripción/cancelación', '/matricula'], ['resumen', 'Resumen de inscripción y pago']] },
  { id: 'buscador', t: 'Buscador de cursos', icon: 'search', items: [['buscador-nuevo', 'Mi buscador de cursos (nuevo)'], ['buscador-antiguo', 'Mi buscador de cursos (antiguo)']] },
  { id: 'financiera', t: 'Información Financiera', icon: 'dollar', items: [
    ['recibos', 'Mis recibos de pago'], ['pagos', 'Pagos en línea'], ['ayuda-pago', 'Ayuda pago en línea'], ['gratuidad', 'Estado Política Gratuidad']] },
  { id: 'tramites', t: 'Trámites y solicitudes', icon: 'folder', items: [['solicitudes', 'Mis solicitudes'], ['certificados', 'Descarga certificados']] },
  { id: 'evaluacion', t: 'Evaluación docente', icon: 'assign', items: [['evaluacion', 'Evaluación docente']] },
];

function footerPortal() {
  return `<footer class="p-footer">
    <span>Universidad Nacional de Colombia--Dirección Nacional de Información Académica</span>
    <span class="right">Portal de Servicios Académicos (V. ${CONFIG.versionPortal}) | ${UXXI} Todos los derechos reservados</span>
  </footer>`;
}

function vistaPortal(opcion) {
  if (opcion && ui.menu == null) ui.menu = MENU.find((m) => m.items.some((i) => i[0] === opcion))?.id ?? null;
  const side = MENU.map((m) => `
    <button class="p-side-item" data-a="menu" data-id="${m.id}" aria-expanded="${ui.menu === m.id}">${ic(m.icon)}${m.t}</button>
    ${ui.menu === m.id ? `<div class="p-sub">${m.items.map(([id, t, ruta]) =>
      `<a href="#${ruta || '/portal/' + id}" title="${t}" class="${opcion === id ? 'on' : ''}">${t}</a>`).join('')}</div>` : ''}`).join('');

  return `
  <div class="portal">
    <header class="p-header">
      <a class="p-brand" href="#/portal" data-a="inicio"><img src="assets/escudoUnal.png" alt="Universidad Nacional de Colombia"><span>PORTAL DE SERVICIOS ACADÉMICOS</span></a>
      <div class="p-user">
        <button class="p-user-btn" data-a="user-menu">${esc(state.usuario)} ${ic('person')}</button>
        ${ui.userMenu ? `<div class="p-user-menu">
          <a href="#/portal" data-a="inicio">${ic('home')} Inicio</a>
          <button data-a="reiniciar">${ic('refresh')} Reiniciar simulación</button>
          <button data-a="logout">${ic('logout')} Cerrar sesión</button>
        </div>` : ''}
      </div>
    </header>
    <div class="p-body">
      <nav class="p-side" aria-label="Menú principal">${side}</nav>
      <main class="p-main">${opcion ? contenidoPortal(opcion) : `
        <div class="p-banner">
          <div class="p-banner-titles"><h1>Portal de Servicios Académicos</h1><h2>Proyecto Cultural y Colectivo de Nación</h2></div>
        </div>`}
      </main>
    </div>
    ${footerPortal()}
  </div>`;
}

function contenidoPortal(op) {
  const titulo = MENU.flatMap((m) => m.items).find((i) => i[0] === op)?.[1] || '';
  const cab = (sub = '') => `<h1 class="p-content-title">${titulo}</h1><p class="p-content-sub">${sub}</p>`;
  const vistas = {
    'mis-datos': () => `${cab('Consulta de la información personal registrada')}
      <div class="panel"><div class="panel-head">Información personal</div><div class="panel-body"><dl class="kv">
        <dt>Nombre</dt><dd>${ESTUDIANTE.nombre}</dd>
        <dt>Documento de identidad</dt><dd>${ESTUDIANTE.documento}</dd>
        <dt>Usuario</dt><dd>${esc(state.usuario)}</dd>
        <dt>Correo institucional</dt><dd>${esc(state.usuario)}@unal.edu.co</dd>
        <dt>Sede</dt><dd>${ESTUDIANTE.sede}</dd>
      </dl></div></div>
      <div class="panel"><div class="panel-head">Información académica</div><div class="panel-body"><dl class="kv">
        <dt>Facultad</dt><dd>${ESTUDIANTE.facultad}</dd>
        <dt>Plan de estudios</dt><dd>${ESTUDIANTE.codigoPlan} ${ESTUDIANTE.plan}</dd>
        <dt>Nivel</dt><dd>${ESTUDIANTE.nivel}</dd>
      </dl></div></div>`,

    historia: () => `${cab('Resumen de la historia académica')}
      <div class="panel"><div class="panel-head">${ESTUDIANTE.codigoPlan} ${ESTUDIANTE.plan}</div><div class="panel-body"><dl class="kv">
        <dt>P.A.P.A.</dt><dd>${ESTUDIANTE.papa}</dd>
        <dt>Promedio académico (P.A.)</dt><dd>${ESTUDIANTE.pa}</dd>
        <dt>Porcentaje de avance</dt><dd>${ESTUDIANTE.avance}</dd>
        <dt>Asignaturas inscritas ${CONFIG.periodo}</dt><dd>${seleccionadas(state.inscritos).length} (${creditosDe(state.inscritos)} créditos)</dd>
      </dl></div></div>`,

    horario: () => `${cab(`Horario del periodo ${CONFIG.periodo}`)}${bloqueHorario(state.inscritos)}`,

    planes: () => `${cab('Planes de estudio asociados')}
      <div class="tabla-wrap"><table class="tabla"><thead><tr><th>Plan</th><th>Nivel</th><th>Facultad</th><th>Estado</th></tr></thead><tbody>
      ${PLANES.map((p) => `<tr><td>${p.nombre}</td><td>${p.nivel}</td><td>${ESTUDIANTE.facultad}</td>
        <td><span class="tag ok">Activo</span></td></tr>`).join('')}
      </tbody></table></div>`,

    disponibles: () => `${cab(`Asignaturas del plan ${ESTUDIANTE.plan} disponibles para el periodo ${CONFIG.periodo}`)}
      ${TIPOLOGIAS.map((t) => `<div class="panel"><div class="panel-head">${t}</div><div class="tabla-wrap"><table class="tabla">
        <thead><tr><th>Código</th><th>Asignatura</th><th>Créditos</th><th>Grupos</th><th>Cupos libres</th><th>Estado</th></tr></thead><tbody>
        ${ASIGNATURAS.filter((a) => a.tipologia === t).map((a) => {
          const motivo = motivoNoSeleccionable(a);
          return `<tr><td>${a.codigo}</td><td>${a.nombre}</td><td>${a.creditos}</td><td>${a.grupos.length}</td>
            <td>${a.grupos.reduce((s, g) => s + g.cupos, 0)}</td>
            <td><span class="tag ${motivo ? 'no' : 'ok'}" title="${motivo || ''}">${motivo ? (a.bloqueo ? 'Prerrequisitos' : 'Sin cupos') : 'Disponible'}</span></td></tr>`;
        }).join('')}</tbody></table></div></div>`).join('')}`,

    resumen: () => {
      const lista = seleccionadas(state.inscritos);
      if (!lista.length) return `${cab()}<div class="panel"><div class="empty">No tiene asignaturas inscritas para el periodo ${CONFIG.periodo}.<br><br>
        <a class="btn" href="#/matricula">Ir a Inscripción/cancelación</a></div></div>`;
      return `${cab(`Periodo ${CONFIG.periodo} · ${ESTUDIANTE.plan}`)}
        <div class="panel"><div class="panel-head">Estado de la inscripción</div><div class="panel-body"><dl class="kv">
          <dt>Estado</dt><dd><span class="tag ok">Inscripción confirmada</span></dd>
          <dt>Fecha de confirmación</dt><dd>${state.confirmado ? new Date(state.confirmado).toLocaleString('es-CO') : '—'}</dd>
          <dt>Asignaturas inscritas</dt><dd>${lista.length}</dd>
          <dt>Créditos inscritos</dt><dd>${creditosDe(state.inscritos)}</dd>
          <dt>Recibo de pago</dt><dd>Consulte su recibo en <a href="#/portal/recibos">Información Financiera › Mis recibos de pago</a>.</dd>
        </dl></div></div>
        <div class="tabla-wrap"><table class="tabla"><thead><tr><th>Código</th><th>Asignatura</th><th>Tipología</th><th>Grupo</th><th>Créditos</th></tr></thead>
        <tbody>${lista.map((a) => `<tr><td>${a.codigo}</td><td>${a.nombre}</td><td>${a.tipologia}</td><td>Grupo ${state.inscritos[a.codigo]}</td><td>${a.creditos}</td></tr>`).join('')}</tbody>
        <tfoot><tr><td colspan="4">Total</td><td>${creditosDe(state.inscritos)}</td></tr></tfoot></table></div>
        <p style="margin-top:18px"><a class="btn outline" href="#/imprimir" target="_blank">${ic('print')} Imprimir horario</a></p>`;
    },

    'buscador-nuevo': () => buscador(cab),
    'buscador-antiguo': () => buscador(cab),
  };
  return `<div class="p-content">${(vistas[op] || (() => `${cab()}
    <div class="alert info">${ic('info')}<span>Esta opción no hace parte del simulador de inscripción. Use las opciones de
    <b>Proceso de inscripción</b> para practicar el proceso.</span></div>`))()}</div>`;
}

function buscador(cab) {
  return `${cab(`Consulte la programación de cursos del periodo ${CONFIG.periodo}`)}
    <div class="panel"><div class="panel-body" style="display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end">
      <div class="field" style="flex:2;min-width:220px;margin:0"><label for="b-texto">Nombre o código de la asignatura</label>
        <div class="input-wrap">${ic('search')}<input id="b-texto" data-b placeholder="Ej: ${ASIGNATURAS[0].nombre}, ${ASIGNATURAS[0].codigo}"></div></div>
      <div class="field" style="flex:1;min-width:180px;margin:0"><label for="b-tipo">Tipología</label>
        <div class="input-wrap"><select id="b-tipo" data-b style="border:0;padding:10px;width:100%;background:transparent">
          <option value="">Todas</option>${TIPOLOGIAS.map((t) => `<option>${t}</option>`).join('')}</select></div></div>
      <label style="display:flex;gap:6px;align-items:center;font-size:14px;padding-bottom:10px"><input type="checkbox" id="b-cupos" data-b> Solo grupos con cupos</label>
    </div></div>
    <div id="b-res">${resultadosBuscador()}</div>`;
}

function resultadosBuscador() {
  const texto = (document.getElementById('b-texto')?.value || '').trim().toLowerCase();
  const tipo = document.getElementById('b-tipo')?.value || '';
  const soloCupos = document.getElementById('b-cupos')?.checked;
  const filas = [];
  ASIGNATURAS.forEach((a) => {
    if (tipo && a.tipologia !== tipo) return;
    if (texto && !(`${a.nombre} ${a.codigo}`.toLowerCase().includes(texto))) return;
    a.grupos.forEach((g) => {
      if (soloCupos && g.cupos <= 0) return;
      filas.push(`<tr><td>${a.codigo}</td><td>${a.nombre}<br><small style="color:#777">${a.tipologia} · ${a.creditos} créditos</small></td>
        <td>Grupo ${g.numero}</td><td>${g.profesor}</td>
        <td>${g.sesiones.map((s) => `${DIAS[s.dia]} ${s.inicio}–${s.fin} <small style="color:#777">(${s.aula})</small>`).join('<br>')}</td>
        <td><span class="tag ${g.cupos > 0 ? 'ok' : 'no'}">${g.cupos} / ${g.capacidad}</span></td></tr>`);
    });
  });
  if (!filas.length) return '<div class="panel"><div class="empty">No se encontraron cursos con los criterios indicados.</div></div>';
  return `<div class="tabla-wrap"><table class="tabla"><thead><tr><th>Código</th><th>Asignatura</th><th>Grupo</th><th>Profesor</th><th>Horario</th><th>Cupos</th></tr></thead>
    <tbody>${filas.join('')}</tbody></table></div>`;
}

document.addEventListener('input', (e) => {
  if (e.target.matches('[data-b]')) document.getElementById('b-res').innerHTML = resultadosBuscador();
});

/* Horario semanal + tabla de asignaturas (portal e impresión) */
function bloqueHorario(sel) {
  const lista = seleccionadas(sel);
  if (!lista.length) return `<div class="panel"><div class="empty">No tiene asignaturas inscritas para el periodo ${CONFIG.periodo}.<br><br>
    <a class="btn no-print" href="#/matricula">Ir a Inscripción/cancelación</a></div></div>`;
  return `<div class="panel"><div class="panel-body">${semana(sel, null)}</div></div>
    <div class="tabla-wrap"><table class="tabla"><thead><tr><th>Código</th><th>Asignatura</th><th>Grupo</th><th>Profesor</th><th>Horario</th><th>Créditos</th></tr></thead>
    <tbody>${lista.map((a) => {
      const g = grupoDe(a, sel[a.codigo]);
      return `<tr><td>${a.codigo}</td><td>${a.nombre}</td><td>Grupo ${g.numero}</td><td>${g.profesor}</td>
        <td>${g.sesiones.map((s) => `${DIAS[s.dia]} ${s.inicio}–${s.fin} · ${s.aula}${new Set(g.sesiones.map((x) => x.tipo)).size > 1 ? ` <small>(${s.tipo})</small>` : ''}`).join('<br>')}</td>
        <td>${a.creditos}</td></tr>`;
    }).join('')}</tbody>
    <tfoot><tr><td colspan="5">Total créditos</td><td>${creditosDe(sel)}</td></tr></tfoot></table></div>`;
}

/* ------------------------------------------------------------------ */
/* CITAS (dinara)                                                      */
/* ------------------------------------------------------------------ */
function vistaCitas() {
  const c1 = hoy(), c2 = addDays(hoy(), 2);
  return `
  <div class="d-page">
    <header class="d-header">
      <div class="d-logo"><img src="assets/escudoUnal.png" alt="Universidad Nacional de Colombia"></div>
      <div class="d-nav">
        <div class="d-site">${ic('pin')} dinara.unal.edu.co</div>
        <div class="d-menu"><span>La Dirección</span><span>Sistema de Información Académica</span><span>Servicios DINARA</span><span>Oficinas de Registro</span><span>Contacto</span></div>
      </div>
    </header>
    <main class="d-main">
      <div class="d-box">
        <h1>Citas</h1>
        <p>Consulta de citas las vigentes del estudiante</p>
        <section class="d-sec"><h2>Datos básicos y adadémicos</h2>
          <div class="c">${ESTUDIANTE.nombre}<br>${ESTUDIANTE.plan}<br>${ESTUDIANTE.facultad}</div></section>
        <section class="d-sec"><h2>Citas programadas</h2>
          <div class="c">
            <p>Cita 1<br>${iso(c1)} de 13:00 a 18:30<br><span class="activa">Cita activa (simulador)</span></p>
            <p>Cita 2<br>${iso(c2)} de 13:00 a 18:30</p>
          </div></section>
        <section class="d-sec"><h2>Criterios de priorización utilizados</h2>
          <div class="c">${Object.entries(ESTUDIANTE.criterios).map(([k, v]) => `<p>${k}: ${v}</p>`).join('')}</div></section>
        <button class="d-salir" data-a="ir" data-h="/portal">Salir</button>
      </div>
    </main>
    <footer class="d-footer">
      <div><span>Régimen Legal</span><span>Contratación</span><span>Rendición de cuentas</span></div>
      <div><span>Talento humano</span><span>Ofertas de empleo</span><span>Concurso docente</span></div>
      <div><span>Correo institucional</span><span>Redes Sociales</span><span>Quejas y reclamos</span></div>
      <div><span>Mapa del sitio</span><span>FAQ</span><span>Atención en línea</span></div>
      <div><b>Contacto página web:</b><span>Bogotá D.C., Colombia</span></div>
      <div style="text-align:right"><span>© Copyright 2014</span><span>Algunos derechos reservados.</span></div>
    </footer>
  </div>`;
}

/* ------------------------------------------------------------------ */
/* MATRÍCULA                                                           */
/* ------------------------------------------------------------------ */
function headerMatricula() {
  return `<header class="m-header">
    <div class="m-logo"><img src="assets/escudoUnal.png" alt="Universidad Nacional de Colombia"></div>
    <div class="m-title"><b>INSCRIPCIÓN ${CONFIG.periodo} Matrícula</b><small>Última modificación: ${state.ultimaMod ? dmy(state.ultimaMod) : '—'}</small></div>
    <div class="m-right">
      <small>${ESTUDIANTE.plan}</small>
      <button class="m-user-btn" data-a="m-user-menu">${ic('person')} ${ESTUDIANTE.nombre} ${ic('caret', 'caret')}</button>
      ${ui.mUserMenu ? `<div class="m-user-menu">
        <button data-a="salir-matricula">${ic('home')} Volver al portal</button>
        <button data-a="desconectar">${ic('power')} Desconectar del proceso</button>
      </div>` : ''}
    </div>
  </header>`;
}

function footerMatricula() {
  return `<footer class="m-footer">
    <div class="l"><div>Matrícula online &nbsp;(${CONFIG.versionMatricula})</div>
      <a data-a="toast" data-msg="Opción no disponible en el simulador.">Accesibilidad</a><span class="sep"></span><a data-a="toast" data-msg="Opción no disponible en el simulador.">Aviso legal y política de privacidad</a></div>
    <div class="c"><img src="assets/escudoUnal.png" alt=""></div>
    <div class="r"><div>Por</div><div>${UXXI} <u>UXXI Académico</u></div><div>© 2026. Todos los derechos reservados</div></div>
  </footer>
  <button class="fab-top" data-a="arriba" aria-label="Volver arriba">${ic('arrowUp')}</button>`;
}

function vistaMatricula(paso) {
  const contenido = {
    undefined: pasoBienvenida,
    cargando: () => `<div class="m-loading"><div class="spinner"></div>Cargando la matrícula…</div>`,
    seleccion: pasoSeleccion,
    resumen: pasoResumen,
    validacion: pasoValidacion,
    fin: pasoFin,
  }[paso] || pasoBienvenida;
  const conHeader = ['seleccion', 'resumen', 'validacion'].includes(paso);
  return `<div class="m-page">${conHeader ? headerMatricula() : ''}<main class="m-main">${contenido()}</main>${footerMatricula()}</div>`;
}

function pasoBienvenida() {
  return `<div class="m-welcome">
    <img class="logo-claro" src="assets/escudoUnal.png" alt="Universidad Nacional de Colombia">
    <h1>Bienvenido(a) ${ESTUDIANTE.nombre}</h1>
    <p>Seleccione el plan de estudios para el que va a realizar inscripción. Solo podrá ingresar al plan para el que tenga cita activa en el momento.</p>
    ${PLANES.map((p) => `<div class="plan-card">
      <div class="plan-head"><h2>${p.nombre} <span class="nivel">${p.nivel}</span></h2><span><b>inscripción ${CONFIG.periodo}</b> - Matrícula</span></div>
      <div class="alert info">${ic('info')}<span>Cita de inscripción activa: ${iso(hoy())} de 13:00 a 18:30. Puede adicionar, cancelar y cambiar el grupo de sus asignaturas.</span></div>
      ${Object.keys(state.inscritos).length ? `<div class="alert info">${ic('info')}<span>Ya tiene ${Object.keys(state.inscritos).length} asignatura(s) inscrita(s) en este periodo. Puede modificarlas durante su cita.</span></div>` : ''}
      <button class="btn-comenzar" data-a="comenzar">Comenzar la inscripción</button>
    </div>`).join('')}
    <a class="link-desconectar" data-a="desconectar">${ic('power')} Desconectar del proceso de inscripción</a>
  </div>`;
}

/* ---------- Tarjeta de asignatura ---------- */
function tiposDe(g) { return [...new Set(g.sesiones.map((s) => s.tipo))]; }

function detalleGrupo(a, g, tipo) {
  const ses = g.sesiones.filter((s) => !tipo || s.tipo === tipo);
  return `<div class="grupo-detalle">
    Descripción del grupo:<b>${g.numero}.Grupo ${g.numero}</b><br>
    Descripción de la duración:<b>${g.duracion}</b><br>
    Turno:<b>${g.jornada}</b><br>
    Profesores:<b>${g.profesor}.</b><br>
    Capacidad:<b>${g.capacidad}</b><br>
    Cupos libres:<b>${g.cupos}</b><br>
    Horario:<ul>${ses.map((s) => `<li>${DIAS[s.dia]} de ${s.inicio} a ${s.fin} · Aula ${s.aula}${tipo ? '' : ` (${s.tipo})`}</li>`).join('')}</ul>
  </div>`;
}

function filaGrupoActual(a, g, tipo, multiple) {
  const key = `${a.codigo}|cur|${tipo}`;
  const abierto = ui.detalles.has(key);
  return `<div class="grupo-row ${abierto ? 'abierto' : ''}" data-a="detalle" data-k="${key}">
      <span class="g">Grupo ${g.numero}</span><span class="dur">${g.duracion}</span><span>${g.jornada}</span>
      <span class="estado" style="text-align:left;color:#555">${multiple ? `${tipo} (${a.codigo})` : ''}</span>
      ${ic(abierto ? 'up' : 'down', 'chev')}
    </div>${abierto ? detalleGrupo(a, g, multiple ? tipo : null) : ''}`;
}

function filaOpcion(a, g, actual) {
  const key = `${a.codigo}|opt|${g.numero}`;
  const abierto = ui.detalles.has(key);
  const esActual = g.numero === actual;
  const sinCupo = g.cupos <= 0 && !esActual;
  const estado = sinCupo ? '¡Sin cupos!'
    : `<span class="estado-col"><button class="radio ${esActual ? 'on' : ''}" data-a="grupo" data-c="${a.codigo}" data-g="${g.numero}" aria-label="Seleccionar grupo ${g.numero}"></button>
       ${g.cupos > 0 && g.cupos <= 2 ? '<small class="ult">¡Últimos cupos!</small>' : `<small>${g.cupos} cupos</small>`}</span>`;
  return `<div class="grupo-row opcion ${sinCupo ? 'sin-cupo' : ''} ${abierto ? 'abierto' : ''}" data-a="detalle" data-k="${key}">
      <span class="g">Grupo ${g.numero}</span><span class="dur">${g.duracion}</span><span>${g.jornada}</span>
      <span class="estado">${estado}</span>${ic(abierto ? 'up' : 'down', 'chev')}
    </div>${abierto ? detalleGrupo(a, g, null) : ''}`;
}

function tarjetaCurso(a, ctx, sel, cruces) {
  const num = sel[a.codigo];
  const elegido = num != null;
  const motivo = elegido ? null : motivoNoSeleccionable(a);
  const etiqueta = ctx === 'plan' ? (elegido ? 'Curso 1' : 'Sin curso asociado') : a.tipologia;
  let cuerpo = '';

  if (motivo) cuerpo += `<div class="curso-msg">${ic('warn')}${motivo}</div>`;
  if (elegido) {
    (cruces[a.codigo] || []).forEach((otro) => {
      cuerpo += `<div class="curso-msg error">${ic('warn')}Cruce de horario con ${asig(otro).nombre} [${otro}].</div>`;
    });
    const g = grupoDe(a, num);
    const tipos = tiposDe(g);
    cuerpo += tipos.map((t) => filaGrupoActual(a, g, t, tipos.length > 1)).join('');
    if (ctx !== 'resumen') {
      const abiertos = ui.horarios.has(a.codigo);
      if (abiertos) cuerpo += `<div class="horarios-list">${a.grupos.map((x) => filaOpcion(a, x, num)).join('')}</div>`;
      cuerpo += `<div class="horarios-link"><a data-a="horarios" data-c="${a.codigo}">${abiertos ? '- horarios' : '+ horarios'}</a></div>`;
    }
  }

  const check = ctx === 'resumen' ? '' : `<button class="chk ${elegido ? 'on' : ''}" data-a="check" data-c="${a.codigo}" ${motivo ? 'disabled' : ''}
      aria-label="${elegido ? 'Quitar' : 'Seleccionar'} ${a.nombre}" aria-pressed="${elegido}">${elegido ? ic('check') : ''}</button>`;

  return `<div class="curso ${elegido ? `sel c${a.color % 10}` : ''}">
    <div class="curso-gutter">${ic('clock')}</div>
    <div class="curso-body">
      <div class="curso-head"><div class="info"><b>${a.nombre} [${a.codigo}]</b>${a.creditos} ${ctx === 'resumen' ? 'Créditos' : 'créditos'}<em>${etiqueta}</em></div>${check}</div>
      ${cuerpo}
    </div>
  </div>`;
}

/* ---------- Calendario ---------- */
function enLectivo(d) { const s = iso(d); return s >= CONFIG.inicioLectivo && s <= CONFIG.finLectivo; }

function calendario(sel) {
  const f = ui.calFecha;
  const mensual = ui.calVista === 'mensual';
  let etiqueta;
  if (mensual) etiqueta = `${MESES[f.getMonth()]} ${f.getFullYear()}`;
  else {
    const l = lunesDe(f), d = addDays(l, 6);
    etiqueta = `${l.getDate()} ${MESES[l.getMonth()].slice(0, 3).toLowerCase()} – ${d.getDate()} ${MESES[d.getMonth()].slice(0, 3).toLowerCase()} ${d.getFullYear()}`;
  }
  return `<div class="cal-toolbar">
      <select class="cal-vista" data-a="vista" aria-label="Vista del calendario">
        <option value="mensual" ${mensual ? 'selected' : ''}>Mensual</option>
        <option value="semanal" ${mensual ? '' : 'selected'}>Semanal</option>
      </select>
      <div class="cal-nav">
        <button class="pill" data-a="lectivo">1er. lectivo</button>
        <button class="arr" data-a="cal-mover" data-d="-1" aria-label="Anterior">${ic('left')}</button>
        <span class="mes">${etiqueta}</span>
        <button class="arr" data-a="cal-mover" data-d="1" aria-label="Siguiente">${ic('right')}</button>
      </div>
    </div>
    <div class="cal">${mensual ? mes(sel) : semana(sel, lunesDe(f))}</div>`;
}

function mes(sel) {
  const f = ui.calFecha;
  const primero = new Date(f.getFullYear(), f.getMonth(), 1);
  const ultimo = new Date(f.getFullYear(), f.getMonth() + 1, 0);
  let d = lunesDe(primero);
  const fin = addDays(lunesDe(ultimo), 6);
  const lista = seleccionadas(sel);
  const hoyISO = iso(hoy());
  let celdas = '';
  while (d <= fin) {
    const dia = d.getDay();
    const evs = enLectivo(d) ? lista.filter((a) => grupoDe(a, sel[a.codigo]).sesiones.some((s) => s.dia === dia)) : [];
    celdas += `<div class="cal-dia ${d.getMonth() !== f.getMonth() ? 'fuera' : ''}">
      <span class="n ${iso(d) === hoyISO ? 'hoy' : ''}">${d.getDate()}</span>
      ${evs.map((a) => {
        const ses = grupoDe(a, sel[a.codigo]).sesiones.filter((s) => s.dia === dia);
        return `<div class="ev c${a.color % 10}" title="${a.nombre} · ${ses.map((s) => `${s.inicio}-${s.fin}`).join(', ')}"><i></i><b>${a.codigo}</b><span>${a.nombre}</span></div>`;
      }).join('')}
    </div>`;
    d = addDays(d, 1);
  }
  return `<div class="cal-head">${DIAS_SEMANA.map((x) => `<div>${x}</div>`).join('')}</div><div class="cal-mes">${celdas}</div>`;
}

/* lunes = null → horario tipo (sin fechas) */
function semana(sel, lunes) {
  const H0 = 6, H1 = 22, ALTO = 44;
  const lista = seleccionadas(sel);
  const cruces = crucesDe(sel);
  const hoyISO = iso(hoy());
  const horas = Array.from({ length: H1 - H0 }, (_, i) => `<div>${pad(H0 + i)}:00</div>`).join('');
  let cab = '<div></div>', cols = '';
  for (let i = 0; i < 7; i++) {
    const fecha = lunes ? addDays(lunes, i) : null;
    const dia = (i + 1) % 7;
    cab += `<div class="${fecha && iso(fecha) === hoyISO ? 'hoy' : ''}">${DIAS_SEMANA[i].slice(0, 3)}${fecha ? ' ' + fecha.getDate() : ''}</div>`;
    const bloques = (!fecha || enLectivo(fecha)) ? lista.flatMap((a) => grupoDe(a, sel[a.codigo]).sesiones.filter((s) => s.dia === dia).map((s) => {
      const top = (minutos(s.inicio) - H0 * 60) / 60 * ALTO;
      const alto = (minutos(s.fin) - minutos(s.inicio)) / 60 * ALTO;
      return `<div class="blk c${a.color % 10} ${cruces[a.codigo] ? 'cruce' : ''}" style="top:${top}px;height:${alto - 2}px" title="${a.nombre} · ${s.inicio}-${s.fin} · ${s.aula}">
        <b>${a.codigo}</b>${a.nombre}<br>${s.inicio}–${s.fin} · ${s.aula}</div>`;
    })).join('') : '';
    cols += `<div class="dcol">${Array.from({ length: H1 - H0 }, () => '<div class="slot"></div>').join('')}${bloques}</div>`;
  }
  return `<div class="cal-sem-head">${cab}</div><div class="cal-sem"><div class="hcol">${horas}</div>${cols}</div>`;
}

/* ---------- Paso: selección ---------- */
function pasoSeleccion() {
  const sel = state.seleccion;
  const cruces = crucesDe(sel);
  const lista = seleccionadas(sel);
  const n = lista.length;

  let izquierda;
  if (ui.verSeleccionadas) {
    izquierda = n ? `<div class="sel-list">${lista.map((a) => tarjetaCurso(a, 'sel', sel, cruces)).join('')}</div>`
      : `<div class="sel-list"><div class="empty">Aún no ha seleccionado asignaturas.</div></div>`;
  } else {
    izquierda = `
      <div class="tabs"><span>ASIGNATURAS DEL PLAN</span></div>
      <div class="sel-actions">
        <a data-a="deseleccionar">Deseleccionar todas</a>
        <a data-a="seleccionar-todas">Seleccionar todas (${n} de ${ASIGNATURAS.length})</a>
      </div>
      ${TIPOLOGIAS.map((t) => {
        const abierta = ui.tipAbiertas.has(t);
        return `<div class="tipologia">
          <div class="tipologia-head" data-a="tipologia" data-t="${t}" role="button" aria-expanded="${abierta}">${t}${ic(abierta ? 'up' : 'down')}</div>
          ${abierta ? ASIGNATURAS.filter((a) => a.tipologia === t).map((a) => tarjetaCurso(a, 'plan', sel, cruces)).join('') : ''}
        </div>`;
      }).join('')}
      <div class="por-que"><a data-a="por-que">¿Por qué no encuentro una asignatura?</a></div>`;
  }

  return `<div class="m-wrap">
    <div class="m-titlebar"><h1>Selección de asignaturas</h1>
      <div class="acciones"><button class="btn" data-a="ver-resumen">Ver resumen ${ic('arrowRight')}</button></div></div>
    <div class="m-cols ${ui.layout === 'lista' ? 'solo-lista' : ui.layout === 'cal' ? 'solo-cal' : ''}">
      <div class="m-left">
        <div class="resumen-bar" data-a="ver-seleccionadas" role="button" aria-expanded="${ui.verSeleccionadas}">
          <div class="cred"><b>${creditosDe(sel)}</b><span>Créditos</span></div>
          <div class="sel">Asignaturas seleccionadas <span class="badge">${n}</span>${ic(ui.verSeleccionadas ? 'up' : 'down', 'chev')}</div>
        </div>
        ${izquierda}
      </div>
      <div class="m-arrows">
        <button data-a="layout" data-d="-1" aria-label="Ampliar calendario">${ic('left')}</button>
        <button data-a="layout" data-d="1" aria-label="Ampliar lista">${ic('right')}</button>
      </div>
      <div class="m-right-col">${calendario(sel)}</div>
    </div>
  </div>`;
}

/* ---------- Paso: resumen ---------- */
function pasoResumen() {
  const sel = state.seleccion;
  const cruces = crucesDe(sel);
  const lista = seleccionadas(sel);
  const porTipo = TIPOLOGIAS.map((t) => [t, lista.filter((a) => a.tipologia === t).reduce((s, a) => s + a.creditos, 0)]).filter(([, c]) => c);
  return `<div class="m-wrap">
    <div class="m-titlebar"><h1>Resumen de asignaturas</h1>
      <div class="acciones">
        <button class="btn outline" data-a="ir" data-h="/matricula/seleccion">${ic('arrowLeft')} Volver</button>
        <button class="btn" data-a="confirmar">Confirmar ${ic('arrowRight')}</button>
      </div></div>
    <div class="m-cols">
      <div class="m-left">
        <div class="resumen-bar estatico">
          <div class="cred"><b>${creditosDe(sel)}</b><span>Créditos</span></div>
          <div class="tipos">${porTipo.map(([t, c]) => `<span>${t}<b>${c}</b></span>`).join('')}</div>
        </div>
        <div style="margin-top:14px">${lista.map((a) => tarjetaCurso(a, 'resumen', sel, cruces)).join('<div style="height:10px"></div>')}</div>
      </div>
      <div class="m-arrows"></div>
      <div class="m-right-col">
        <div class="resumen-bar estatico" style="background:#ececec;box-shadow:none;margin-bottom:22px">
          <div class="sel" style="font-weight:400;padding-left:18px"><b style="color:var(--vino)">${lista.length}</b> Asignaturas seleccionadas</div>
        </div>
        ${calendario(sel)}
      </div>
    </div>
  </div>`;
}

/* ---------- Paso: validación ---------- */
function pasoValidacion() {
  const sel = state.seleccion;
  const cred = creditosDe(sel);
  return `<div class="m-valid">
    <div class="m-titlebar"><h1>Validación inscripción</h1>
      <div class="acciones">
        <button class="btn outline" data-a="ir" data-h="/matricula/resumen">${ic('arrowLeft')} Volver</button>
        <button class="btn" data-a="finalizar">Confirmar y finalizar</button>
      </div></div>
    <div class="valid-stats">
      <div><b>${seleccionadas(sel).length}</b><span>asignaturas matriculadas</span></div>
      <div><b>${cred}</b><span>créditos matriculados</span></div>
    </div>
    ${cred < CONFIG.minimoCreditos ? `<div class="valid-avisos"><div class="alert warn">${ic('warn')}<span>Su inscripción tiene ${cred} créditos, por debajo de la carga mínima de ${CONFIG.minimoCreditos} créditos. Verifique que cumple las condiciones para inscribir una carga inferior a la mínima.</span></div></div>` : ''}
    <p class="valid-text">Al confirmar se grabará tu matrícula. Una vez confirmada, podrás consultar, imprimir o descargar tu impreso de matricula.</p>
  </div>`;
}

/* ---------- Paso: fin ---------- */
function pasoFin() {
  return `<div class="m-fin">
    <img class="logo-claro" src="assets/escudoUnal.png" alt="Universidad Nacional de Colombia">
    <div class="fin-box">
      ${ic('check', 'check')}
      <h1>Felicitaciones ${ESTUDIANTE.nombreCorto}</h1>
      <p>Has finalizado correctamente tu inscripción</p>
      <div class="alert info">${ic('info')}<span>Su inscripción ha sido realizada, por favor imprima y verifique que su horario esté correcto. Recuerde revisar su inscripción desde el servicio "Resumen de inscripción".</span></div>
      <a class="horario-card" href="#/imprimir" target="_blank" title="Descargar horario">${ic('calendar')}Tu horario<i></i>${ic('download', 'dl')}</a>
      <a class="link-salir" data-a="salir-matricula">Salir de la matricula ${ic('external')}</a>
    </div>
  </div>`;
}

/* ------------------------------------------------------------------ */
/* IMPRESIÓN DE HORARIO                                                */
/* ------------------------------------------------------------------ */
function vistaImprimir() {
  return `<div class="print-page">
    <div class="print-head">
      <img class="logo-claro" src="assets/escudoUnal.png" alt="Universidad Nacional de Colombia">
      <div><h1>Horario de clases · ${CONFIG.periodo}</h1>
        <p>${ESTUDIANTE.nombre} · ${esc(state.usuario)}</p><p>${ESTUDIANTE.codigoPlan} ${ESTUDIANTE.plan}</p></div>
      <div class="no-print" style="margin-left:auto;display:flex;gap:10px">
        <button class="btn" onclick="window.print()">${ic('print')} Imprimir</button>
        <a class="btn outline" href="#/portal/resumen">Volver</a>
      </div>
    </div>
    ${bloqueHorario(state.inscritos)}
  </div>`;
}

/* ------------------------------------------------------------------ */
/* Acciones                                                            */
/* ------------------------------------------------------------------ */
function alternarCurso(codigo) {
  const sel = state.seleccion;
  const a = asig(codigo);
  if (sel[codigo] != null) {
    delete sel[codigo];
    ui.horarios.delete(codigo);
  } else {
    if (motivoNoSeleccionable(a)) return;
    if (creditosDe(sel) + a.creditos > CONFIG.limiteCreditos) {
      return modal({ titulo: 'Límite de créditos', icono: 'warn', cuerpo:
        `No es posible seleccionar <b>${a.nombre}</b>. Con esta asignatura tendría ${creditosDe(sel) + a.creditos} créditos y el máximo permitido es de <b>${CONFIG.limiteCreditos}</b> créditos.` });
    }
    sel[codigo] = a.grupos.find((g) => g.cupos > 0).numero;
    ui.horarios.add(codigo);
  }
  guardar();
  render();
}

function seleccionarTodas() {
  const sel = state.seleccion;
  let omitidas = 0;
  ASIGNATURAS.forEach((a) => {
    if (sel[a.codigo] != null || motivoNoSeleccionable(a)) return;
    if (creditosDe(sel) + a.creditos > CONFIG.limiteCreditos) { omitidas++; return; }
    sel[a.codigo] = a.grupos.find((g) => g.cupos > 0).numero;
  });
  guardar();
  render();
  if (omitidas) toast(`${omitidas} asignatura(s) no se seleccionaron por superar el límite de ${CONFIG.limiteCreditos} créditos.`);
}

function irAConfirmar() {
  const sel = state.seleccion;
  const cruces = crucesDe(sel);
  const conCruce = Object.keys(cruces);
  if (!seleccionadas(sel).length) {
    return modal({ titulo: 'Sin asignaturas', icono: 'warn', cuerpo: 'Debe seleccionar al menos una asignatura para continuar.' });
  }
  if (conCruce.length) {
    return modal({ titulo: 'Cruce de horarios', icono: 'warn', cuerpo:
      `No es posible confirmar la inscripción porque las siguientes asignaturas tienen cruce de horario. Cambie de grupo o retire alguna de ellas:
      <ul>${conCruce.map((c) => `<li>${asig(c).nombre} [${c}] — Grupo ${sel[c]}</li>`).join('')}</ul>`,
      botones: [{ t: 'Corregir', fn: () => ir('/matricula/seleccion') }] });
  }
  ir('/matricula/validacion');
}

function finalizar() {
  state.inscritos = { ...state.seleccion };
  state.seleccion = null;
  state.ultimaMod = iso(hoy());
  state.confirmado = new Date().toISOString();
  guardar();
  ir('/matricula/fin');
}

function salirMatricula(confirmarPerdida) {
  const pendiente = state.seleccion && JSON.stringify(state.seleccion) !== JSON.stringify(state.inscritos);
  const salir = () => { state.seleccion = null; guardar(); ui.menu = 'inscripcion'; ir('/portal'); };
  if (confirmarPerdida && pendiente) {
    return modal({ titulo: 'Salir sin confirmar', icono: 'warn',
      cuerpo: 'Tiene cambios en su selección que no han sido confirmados. Si sale ahora se perderán. ¿Desea salir?',
      botones: [{ t: 'Cancelar', cls: 'outline' }, { t: 'Salir', fn: salir }] });
  }
  salir();
}

const ACCIONES = {
  'modal-cerrar': (el, e) => { if (e.target === el) cerrarModal(); },
  'modal-btn': (el) => { const b = modalBotones[el.dataset.i]; cerrarModal(); b?.fn?.(); },
  toast: (el) => toast(el.dataset.msg),
  ir: (el) => ir(el.dataset.h),
  arriba: () => window.scrollTo({ top: 0, behavior: 'smooth' }),

  menu: (el) => { ui.menu = ui.menu === el.dataset.id ? null : el.dataset.id; render(); },
  inicio: () => { ui.menu = null; ui.userMenu = false; if (rutaActual() === '/portal') render(); },
  'user-menu': () => { ui.userMenu = !ui.userMenu; render(); },
  logout: () => { state = { ...ESTADO_INICIAL }; guardar(); ui.menu = null; ir('/login'); },
  reiniciar: () => {
    ui.userMenu = false; render();
    modal({ titulo: 'Reiniciar simulación', icono: 'refresh',
      cuerpo: 'Se generará un nuevo perfil de estudiante (carrera, asignaturas y horarios) y se eliminarán las asignaturas inscritas. ¿Desea continuar?',
      botones: [{ t: 'Cancelar', cls: 'outline' }, { t: 'Reiniciar', fn: () => {
        nuevaSesion(state.usuario); ui.menu = null; ir('/portal'); render(); toast('La simulación fue reiniciada con un nuevo perfil.');
      } }] });
  },

  comenzar: () => {
    state.seleccion = { ...state.inscritos };
    guardar();
    ui.verSeleccionadas = false; ui.detalles.clear(); ui.horarios.clear(); ui.calFecha = hoy(); ui.layout = 'ambos';
    ir('/matricula/cargando');
    setTimeout(() => { if (rutaActual() === '/matricula/cargando') ir('/matricula/seleccion'); }, 1100);
  },
  desconectar: () => salirMatricula(true),
  'salir-matricula': () => salirMatricula(true),
  'm-user-menu': () => { ui.mUserMenu = !ui.mUserMenu; render(); },

  tipologia: (el) => { const t = el.dataset.t; ui.tipAbiertas.has(t) ? ui.tipAbiertas.delete(t) : ui.tipAbiertas.add(t); render(); },
  'ver-seleccionadas': () => { ui.verSeleccionadas = !ui.verSeleccionadas; render(); },
  check: (el) => alternarCurso(el.dataset.c),
  grupo: (el) => { state.seleccion[el.dataset.c] = Number(el.dataset.g); guardar(); render(); },
  detalle: (el) => { const k = el.dataset.k; ui.detalles.has(k) ? ui.detalles.delete(k) : ui.detalles.add(k); render(); },
  horarios: (el) => { const c = el.dataset.c; ui.horarios.has(c) ? ui.horarios.delete(c) : ui.horarios.add(c); render(); },
  deseleccionar: () => { state.seleccion = {}; ui.horarios.clear(); guardar(); render(); },
  'seleccionar-todas': seleccionarTodas,
  'por-que': () => modal({ titulo: '¿Por qué no encuentro una asignatura?', cuerpo: `
    En esta lista solo aparecen las asignaturas de su plan de estudios que tienen programación en el periodo ${CONFIG.periodo}. Una asignatura puede no aparecer o no ser seleccionable porque:
    <ul><li>No tiene grupos programados en el periodo.</li><li>No cumple con los prerrequisitos o correquisitos.</li>
    <li>No quedan cupos libres en ninguno de sus grupos.</li><li>Ya fue aprobada en su historia académica.</li></ul>
    Para asignaturas de libre elección utilice el <b>Buscador de cursos</b>.` }),
  'ver-resumen': () => {
    if (!seleccionadas(state.seleccion).length) return modal({ titulo: 'Sin asignaturas', icono: 'warn', cuerpo: 'Debe seleccionar al menos una asignatura para ver el resumen.' });
    ir('/matricula/resumen');
  },
  confirmar: irAConfirmar,
  finalizar,

  layout: (el) => {
    const d = Number(el.dataset.d);
    ui.layout = d < 0 ? (ui.layout === 'lista' ? 'ambos' : 'cal') : (ui.layout === 'cal' ? 'ambos' : 'lista');
    render();
  },
  lectivo: () => { ui.calFecha = parseISO(CONFIG.inicioLectivo); render(); },
  'cal-mover': (el) => {
    const d = Number(el.dataset.d), f = ui.calFecha;
    ui.calFecha = ui.calVista === 'mensual' ? new Date(f.getFullYear(), f.getMonth() + d, 1) : addDays(f, 7 * d);
    render();
  },
};

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-a]');
  // Cierra los menús desplegables con cualquier clic que no sea su propio botón
  if ((ui.userMenu || ui.mUserMenu) && !['user-menu', 'm-user-menu'].includes(el?.dataset.a)) {
    ui.userMenu = ui.mUserMenu = false;
    render();
  }
  if (!el) return;
  const accion = ACCIONES[el.dataset.a];
  if (!accion) return;
  if (el.tagName === 'A' && !el.getAttribute('href')) e.preventDefault();
  // El radio y el checkbox están dentro de filas clicables: no propagar
  if (el.dataset.a === 'grupo' || el.dataset.a === 'check') e.stopPropagation();
  accion(el, e);
});

document.addEventListener('change', (e) => {
  if (e.target.dataset.a === 'vista') { ui.calVista = e.target.value; render(); }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.getElementById('modal-root').innerHTML) cerrarModal();
});

render(false);
