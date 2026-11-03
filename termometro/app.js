/* Pulso Ciudadano — motor de la simulación. Todo local, sin dependencias. */
(function () {
  'use strict';

  /* ── estado ── */
  var paused = false;
  var simMin = 20 * 60 + 30;              // reloj simulado, arranca 20:30
  var lastBg = -1;
  var feedTimes = [];                     // para señales/min
  var scenario = null;                    // escenario en curso
  var incident = null;                    // incidente activo
  var history = {};                       // sparklines por tema

  var $ = function (id) { return document.getElementById(id); };
  var feed = $('feed'), thermos = $('thermos'), mapSvg = $('map');

  function fmt(min) {
    var h = Math.floor(min / 60) % 24, m = Math.floor(min % 60);
    return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
  }

  /* ── reloj simulado: 1 s real = 40 s simulados ── */
  setInterval(function () {
    if (paused) return;
    simMin += 40 / 60;
    $('simClock').textContent = fmt(simMin);
  }, 1000);

  /* ── feed de fondo ── */
  function addFeed(item, official) {
    var li = document.createElement('li');
    var geo = item.geo ? '<span class="chip f-geo">⌖ ' + item.geo + '</span>' : '';
    var toneChip = official
      ? '<span class="chip" style="color:#9fdcff;border-color:#1d5f7a">CANAL OFICIAL</span>'
      : '<span class="chip tone-' + item.tone + '">' + item.tone + '</span>';
    var net = official ? '<span class="f-net">110</span>'
      : '<span class="f-net net-' + item.net + '">' + NETS[item.net] + '</span>';
    var topicChip = item.topic ? '<span class="chip chip-topic">' + item.topic + '</span>' : '';
    li.innerHTML =
      '<div class="f-meta">' + net + toneChip + topicChip + geo +
      '<span class="f-time">' + fmt(simMin) + '</span></div>' +
      '<div class="f-text">' + item.text + '</div>';
    feed.insertBefore(li, feed.firstChild);
    while (feed.children.length > 40) feed.removeChild(feed.lastChild);
    feedTimes.push(Date.now());
    if (item.topic) bumpTopic(item.topic, 3 + Math.random() * 4);
  }

  function bumpTopic(id, delta) {
    for (var i = 0; i < TOPICS.length; i++) {
      if (TOPICS[i].id === id) {
        TOPICS[i].temp = Math.max(5, Math.min(98, TOPICS[i].temp + delta));
        return;
      }
    }
  }

  setInterval(function () {
    if (paused || scenario) return;       // el ruido sigue, pero pausamos lo random durante el guion
    var i;
    do { i = Math.floor(Math.random() * BG_FEED.length); } while (i === lastBg);
    lastBg = i;
    addFeed(BG_FEED[i]);
  }, 2600);

  /* señales/min */
  setInterval(function () {
    var now = Date.now();
    feedTimes = feedTimes.filter(function (t) { return now - t < 60000; });
    $('sigRate').textContent = feedTimes.length;
  }, 2000);

  /* ── termómetros ── */
  TOPICS.forEach(function (t) {
    history[t.id] = [];
    var li = document.createElement('li');
    li.innerHTML =
      '<span class="t-name">' + t.name + '</span><span class="t-val" id="tv-' + t.id + '"></span>' +
      '<div class="t-bar"><div class="t-fill" id="tb-' + t.id + '" style="background:' + t.color + '"></div></div>' +
      '<canvas class="t-spark" id="ts-' + t.id + '" width="220" height="22"></canvas>';
    thermos.appendChild(li);
  });

  function drawSpark(id) {
    var cv = $('ts-' + id); if (!cv) return;
    var ctx = cv.getContext('2d'), h = history[id], w = cv.width, hh = cv.height;
    ctx.clearRect(0, 0, w, hh);
    if (h.length < 2) return;
    ctx.strokeStyle = 'rgba(150,160,180,.55)'; ctx.lineWidth = 1; ctx.beginPath();
    for (var i = 0; i < h.length; i++) {
      var x = (i / (h.length - 1)) * w, y = hh - 2 - (h[i] / 100) * (hh - 4);
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    }
    ctx.stroke();
  }

  setInterval(function () {
    if (paused) return;
    var sum = 0;
    TOPICS.forEach(function (t) {
      t.temp = Math.max(5, Math.min(98, t.temp + (Math.random() - 0.52) * 2.2));
      history[t.id].push(t.temp);
      if (history[t.id].length > 60) history[t.id].shift();
      $('tv-' + t.id).textContent = Math.round(t.temp) + '°';
      $('tb-' + t.id).style.width = t.temp + '%';
      drawSpark(t.id);
      sum += t.temp;
    });
    var g = Math.round(sum / TOPICS.length);
    $('globalTempFill').style.width = g + '%';
    $('globalTempVal').textContent = g + '°';
    $('globalTempVal').style.color = g > 60 ? 'var(--bad)' : g > 40 ? 'var(--warn)' : 'var(--acc)';
  }, 1400);

  /* ── mapa de anillos ── */
  function buildMap() {
    var s = '';
    for (var r = 12; r <= 96; r += 12)
      s += '<circle cx="100" cy="100" r="' + r + '" fill="none" stroke="#232a38" stroke-width="1"/>';
    for (var a = 0; a < 360; a += 30) {
      var rad = a * Math.PI / 180;
      s += '<line x1="100" y1="100" x2="' + (100 + 96 * Math.cos(rad)) + '" y2="' + (100 + 96 * Math.sin(rad)) + '" stroke="#1a212c" stroke-width="1"/>';
    }
    // avenida principal vertical
    s += '<line x1="118" y1="6" x2="118" y2="194" stroke="#2c3648" stroke-width="2.5"/>';
    s += '<text x="122" y="14" fill="#55607a" font-size="7" font-family="monospace">Av. Banzer</text>';
    s += '<text x="104" y="98" fill="#55607a" font-size="7" font-family="monospace">centro</text>';
    s += '<g id="mapPoint"></g>';
    mapSvg.innerHTML = s;
  }

  function setMapPoint(x, y, conf) {
    var g = mapSvg.querySelector('#mapPoint');
    if (!g) return;
    var r = Math.max(4, conf / 6);
    g.innerHTML =
      '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="rgba(239,68,68,.15)" stroke="#ef4444" stroke-width="1" stroke-dasharray="3 2">' +
      '<animate attributeName="r" values="' + r + ';' + r + '" dur="0.5s"/></circle>' +
      '<circle cx="' + x + '" cy="' + y + '" r="3" fill="#ef4444">' +
      '<animate attributeName="opacity" values="1;0.3;1" dur="0.8s" repeatCount="indefinite"/></circle>';
  }

  /* ── fotos ciudadanas (canvas generado) ── */
  function rng(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function drawPhoto(scene, label, w, h) {
    w = w || 320; h = h || 200;
    var cv = document.createElement('canvas');
    cv.width = w; cv.height = h;
    var c = cv.getContext('2d'), R = rng(label.length * 7919 + w);

    // cielo/fondo según escena
    var grad = c.createLinearGradient(0, 0, 0, h);
    if (scene === 'flood' || scene === 'flood2') {
      grad.addColorStop(0, '#0a1220'); grad.addColorStop(0.55, '#0d1a2c'); grad.addColorStop(1, '#123047');
    } else if (scene === 'flashes') {
      grad.addColorStop(0, '#05070c'); grad.addColorStop(1, '#0a0e18');
    } else {
      grad.addColorStop(0, '#070a12'); grad.addColorStop(0.6, '#0b101c'); grad.addColorStop(1, '#10141f');
    }
    c.fillStyle = grad; c.fillRect(0, 0, w, h);

    var i, x, y;
    if (scene === 'street' || scene === 'chaos') {
      // letreros de neón y edificios
      for (i = 0; i < 6; i++) {
        var bw = 20 + R() * 60, bh = 60 + R() * 90, bx = R() * w;
        c.fillStyle = '#0e1420'; c.fillRect(bx, h * 0.25 - bh * 0.2, bw, bh);
        c.fillStyle = ['rgba(255,140,60,.8)', 'rgba(80,200,255,.7)', 'rgba(255,220,120,.7)'][i % 3];
        c.fillRect(bx + 3, h * 0.3 + R() * 20, bw - 6, 5 + R() * 6);
      }
      // calle
      c.fillStyle = '#0c0f16'; c.fillRect(0, h * 0.62, w, h * 0.38);
      c.strokeStyle = 'rgba(255,255,255,.25)'; c.setLineDash([8, 8]);
      c.beginPath(); c.moveTo(0, h * 0.78); c.lineTo(w, h * 0.78); c.stroke(); c.setLineDash([]);
      // figuras corriendo
      var n = scene === 'chaos' ? 7 : 3;
      for (i = 0; i < n; i++) {
        x = 20 + R() * (w - 40); y = h * 0.68 + R() * (h * 0.2);
        c.fillStyle = '#000';
        c.beginPath(); c.ellipse(x, y, 3, 8, (R() - 0.5) * 0.8, 0, Math.PI * 2); c.fill();
        c.beginPath(); c.arc(x, y - 10, 2.6, 0, Math.PI * 2); c.fill();
      }
      // faro de auto
      var hg = c.createRadialGradient(w * (0.2 + R() * 0.6), h * 0.72, 2, w * 0.5, h * 0.72, 60);
      hg.addColorStop(0, 'rgba(255,240,190,.85)'); hg.addColorStop(1, 'rgba(255,240,190,0)');
      c.fillStyle = hg; c.fillRect(0, h * 0.5, w, h * 0.5);
    }
    if (scene === 'chaos') {
      c.save(); c.translate(w / 2, h / 2); c.rotate(-0.06); c.translate(-w / 2, -h / 2);
      c.strokeStyle = 'rgba(255,255,255,.15)';
      for (i = 0; i < 10; i++) {
        c.beginPath(); var ly = R() * h; c.moveTo(R() * w, ly); c.lineTo(R() * w, ly + (R() - 0.5) * 10); c.stroke();
      }
      c.restore();
    }
    if (scene === 'flashes') {
      var g1 = c.createRadialGradient(w * 0.3, h * 0.5, 4, w * 0.3, h * 0.5, 110);
      g1.addColorStop(0, 'rgba(240,60,60,.9)'); g1.addColorStop(1, 'rgba(240,60,60,0)');
      c.fillStyle = g1; c.fillRect(0, 0, w, h);
      var g2 = c.createRadialGradient(w * 0.7, h * 0.55, 4, w * 0.7, h * 0.55, 110);
      g2.addColorStop(0, 'rgba(70,120,255,.9)'); g2.addColorStop(1, 'rgba(70,120,255,0)');
      c.fillStyle = g2; c.fillRect(0, 0, w, h);
      for (i = 0; i < 4; i++) {
        c.fillStyle = '#05070c';
        c.fillRect(i * (w / 4) + 6, h * 0.55, w / 4 - 12, h * 0.45);
      }
    }
    if (scene === 'flood' || scene === 'flood2') {
      // techos y agua
      for (i = 0; i < 5; i++) {
        c.fillStyle = '#0a0f18';
        var rx = i * (w / 4.4), ry = h * (0.28 + R() * 0.12);
        c.fillRect(rx, ry, w / 5, h * 0.3);
        c.beginPath(); c.moveTo(rx - 4, ry); c.lineTo(rx + w / 10, ry - 14); c.lineTo(rx + w / 5 + 4, ry); c.fill();
      }
      c.fillStyle = 'rgba(40,90,120,.75)'; c.fillRect(0, h * 0.58, w, h * 0.42);
      for (i = 0; i < 26; i++) {
        c.strokeStyle = 'rgba(160,200,230,' + (0.08 + R() * 0.2) + ')';
        y = h * 0.6 + R() * h * 0.36; x = R() * w;
        c.beginPath(); c.moveTo(x, y); c.lineTo(x + 20 + R() * 50, y); c.stroke();
      }
      if (scene === 'flood2') {                       // techo de auto sumergido
        c.fillStyle = '#141a26'; c.beginPath();
        c.ellipse(w * 0.55, h * 0.66, 34, 9, 0, 0, Math.PI * 2); c.fill();
        c.strokeStyle = 'rgba(200,230,255,.3)'; c.stroke();
      }
      for (i = 0; i < 60; i++) {                      // lluvia
        c.strokeStyle = 'rgba(180,210,240,' + (0.05 + R() * 0.12) + ')';
        x = R() * w; y = R() * h;
        c.beginPath(); c.moveTo(x, y); c.lineTo(x - 3, y + 9); c.stroke();
      }
    }

    // grano + viñeta + overlay de cámara
    for (i = 0; i < 1400; i++) {
      c.fillStyle = 'rgba(255,255,255,' + R() * 0.06 + ')';
      c.fillRect(R() * w, R() * h, 1, 1);
    }
    var vg = c.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, h * 0.85);
    vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.6)');
    c.fillStyle = vg; c.fillRect(0, 0, w, h);

    c.font = 'bold 10px monospace';
    c.fillStyle = '#ff5555'; c.beginPath(); c.arc(10, 12, 3.4, 0, Math.PI * 2); c.fill();
    c.fillStyle = 'rgba(255,255,255,.9)'; c.fillText('EN VIVO', 18, 15);
    c.fillStyle = 'rgba(255,255,255,.75)'; c.textAlign = 'right';
    c.fillText(label, w - 8, h - 8); c.textAlign = 'left';
    c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 1.4;
    [[6, 6, 1, 1], [w - 6, 6, -1, 1], [6, h - 6, 1, -1], [w - 6, h - 6, -1, -1]].forEach(function (k) {
      c.beginPath(); c.moveTo(k[0] + 14 * k[2], k[1]); c.lineTo(k[0], k[1]); c.lineTo(k[0], k[1] + 14 * k[3]); c.stroke();
    });
    return cv;
  }

  /* ── incidente ── */
  function startIncident(sc) {
    incident = { sc: sc, v: 0, derived: false };
    $('incidentEmpty').hidden = true;
    $('incidentCard').hidden = false;
    $('incTitle').textContent = sc.title;
    $('incPlace').textContent = sc.place;
    $('incTime').textContent = 'primeras señales ' + fmt(simMin);
    $('incPattern').textContent = 'analizando patrón…';
    $('incGeoConf').textContent = 'consenso geo: —';
    $('incStatus').textContent = 'DETECTADO';
    $('incStatus').className = 'inc-status';
    $('incPhotos').innerHTML = '';
    $('vSources').innerHTML = '';
    setV(0);
    $('incRouting').hidden = true;
    $('dispatchLog').hidden = true;
    $('gainPanel').hidden = true;
    setMapPoint(sc.mapPoint.x, sc.mapPoint.y, 600);
  }

  function setV(v) {
    if (!incident) return;
    incident.v = v;
    $('vValue').textContent = v + '%';
    $('vFill').style.width = v + '%';
    $('vValue').style.color = v >= 90 ? 'var(--ok)' : v >= 40 ? 'var(--warn)' : 'var(--bad)';
  }

  function setStatus(s, pattern, route, alarm) {
    $('incStatus').textContent = s;
    var cls = { CORROBORANDO: 'st-corroborando', ALARMA: 'st-alarma', VERIFICADO: 'st-verificado', DERIVADO: 'st-despachado' }[s];
    $('incStatus').className = 'inc-status' + (cls ? ' ' + cls : '');
    if (pattern) $('incPattern').textContent = pattern;
    if (route) {
      $('incRouting').hidden = false;
      $('routeBody').textContent = route.body;
      $('routeBody').className = /DEFENSA|SEAC|BOMBEROS/.test(route.body) ? 'ok-body' : '';
      $('routeWhy').textContent = route.why;
      if (route.sec) { $('routeSec').hidden = false; $('routeSec').textContent = route.sec; }
      $('btnDerivar').textContent = 'derivar a ' + route.body;
    }
    if (alarm) $('alarmEdge').classList.add('on');
  }

  function addSource(s) {
    var li = document.createElement('li');
    li.innerHTML = '<span class="src-type">' + SRC_TYPES[s.type] + '</span>' +
      '<span>' + s.desc + '</span><span class="src-pts">+' + s.pts + '</span>';
    $('vSources').appendChild(li);
    if (s.geo != null) {
      $('incGeoConf').textContent = 'consenso geo: ±' + s.geo + ' m';
      if (incident) setMapPoint(incident.sc.mapPoint.x, incident.sc.mapPoint.y, s.geo);
    }
    setV(s.v);
  }

  /* botones del operador */
  $('btnDerivar').addEventListener('click', function () {
    if (!incident || incident.derived) return;
    incident.derived = true;
    var body = $('routeBody').textContent;
    $('dispatchLog').hidden = false;
    $('dispatchLog').textContent =
      fmt(simMin) + ' · alerta derivada a ' + body + ' — ' + (BODIES[body] || 'red de emergencias') + ' · acuse recibido';
    setStatus('DERIVADO');
    $('alarmEdge').classList.remove('on');
    $('routeActions').style.opacity = '.4';
  });
  $('btnFalso').addEventListener('click', function () {
    $('alarmEdge').classList.remove('on');
    $('incidentCard').hidden = true;
    $('incidentEmpty').hidden = false;
    $('routeActions').style.opacity = '1';
    incident = null;
  });

  /* ── escenarios ── */
  function runScenario(sc) {
    scenario = { sc: sc, elapsed: 0, idx: 0 };
    startIncident(sc);
    bumpTopic(sc.topic, 25);
  }

  setInterval(function () {
    if (!scenario || paused) return;
    scenario.elapsed += 0.5;                          // tick cada 500 ms
    var steps = scenario.sc.steps;
    while (scenario.idx < steps.length && steps[scenario.idx].t <= scenario.elapsed) {
      execStep(steps[scenario.idx], scenario.sc);
      scenario.idx++;
    }
    if (scenario.idx >= steps.length) scenario.done = true;
  }, 500);

  function execStep(st, sc) {
    switch (st.kind) {
      case 'feed':
        addFeed({ net: st.net, tone: st.tone, text: st.text, topic: sc.topic, geo: st.geo });
        break;
      case 'photo':
        $('incPhotos').appendChild(drawPhoto(st.scene, st.label));
        break;
      case 'source':
        addSource(st);
        break;
      case 'status':
        setStatus(st.status, st.pattern, st.route, st.alarm);
        break;
      case 'call110':
        addFeed({ text: 'Registro 110: primera llamada ciudadana por el incidente (' + sc.place + ')' }, true);
        break;
      case 'gain':
        showGain(st);
        break;
    }
  }

  function showGain(g) {
    $('gainPanel').hidden = false;
    var axis = 40;                                     // ventana de 40 min desde 20:30
    var sMin = parseInt(g.first.split(':')[1], 10) - 30;
    var oMin = (parseInt(g.official.split(':')[0], 10) - 20) * 60 + parseInt(g.official.split(':')[1], 10) - 30;
    $('gSocialT').textContent = g.first;
    $('gOfficialT').textContent = g.official;
    setTimeout(function () {
      $('gSocial').style.width = (sMin / axis * 100) + '%';
      $('gOfficial').style.width = (oMin / axis * 100) + '%';
    }, 60);
    $('gainResult').textContent = 'la señal social adelantó ' + g.mins + ' min al canal oficial';
  }

  /* ── controles ── */
  $('btnAsalto').addEventListener('click', function () { if (!incident || !incident.derived) runScenario(SC_ASALTO); });
  $('btnLluvia').addEventListener('click', function () { if (!incident || !incident.derived) runScenario(SC_LLUVIA); });
  $('btnPause').addEventListener('click', function () {
    paused = !paused;
    $('btnPause').textContent = paused ? 'reanudar' : 'pausa';
  });
  $('btnReset').addEventListener('click', function () {
    scenario = null; incident = null; paused = false;
    $('btnPause').textContent = 'pausa';
    $('alarmEdge').classList.remove('on');
    $('incidentCard').hidden = true;
    $('incidentEmpty').hidden = false;
    $('gainPanel').hidden = true;
    $('routeActions').style.opacity = '1';
    feed.innerHTML = '';
    mapSvg.querySelector('#mapPoint').innerHTML = '';
  });

  buildMap();
})();
