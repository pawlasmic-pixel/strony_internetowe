// Czytnik: dzieli tekst na kartki pasujące do ekranu i przewija je przyciskami.
// Pisane w starym JavaScripcie (var, function), żeby działało w przeglądarkach czytników.
//
// Wszystko traktujemy jak listę rozdziałów. Opowiadanie to jeden rozdział,
// a długie książki dzielimy na kartki tylko po jednym rozdziale naraz (tak jest szybciej).

var strona = document.getElementById("strona");
var kartka = document.getElementById("kartka");
var numer = document.getElementById("numer");
var przyciskWstecz = document.getElementById("wstecz");
var przyciskDalej = document.getElementById("dalej");

var tekst = null;      // aktualne opowiadanie / książka / komiks
var rozdzialy = [];    // lista rozdziałów: { tytul: "...", akapity: [...] }
var rozdzial = 0;      // numer aktualnego rozdziału
var kartki = [];       // kartki aktualnego rozdziału: { html: "...", akapit: numer pierwszego akapitu }
var obecna = 0;        // numer aktualnej kartki w rozdziale
var czcionka = 20;     // wielkość czcionki w pikselach
var otwartySpis = false;

// ---------- Zapisywanie w pamięci (może nie działać w niektórych czytnikach) ----------
function zapisz(klucz, wartosc) {
  try { localStorage.setItem(klucz, wartosc); } catch (e) {}
}
function wczytaj(klucz) {
  try { return localStorage.getItem(klucz); } catch (e) { return null; }
}

// ---------- Szukanie tekstu po ?id= w adresie ----------
function pobierzId() {
  var m = /[?&]id=([^&]+)/.exec(window.location.search);
  return m ? decodeURIComponent(m[1]) : null;
}

function znajdzTekst(id) {
  for (var i = 0; i < TEKSTY.length; i++) {
    if (TEKSTY[i].id === id) return TEKSTY[i];
  }
  return null;
}

// ---------- Dzielenie rozdziału na kartki ----------
function zaDuzo() {
  return strona.scrollHeight > strona.clientHeight + 1;
}

// Ile pierwszych słów zmieści się jeszcze w akapicie p (szukanie binarne - mało przeliczeń)
function ileSlowSieZmiesci(p, slowa, od) {
  var min = 0, max = slowa.length - od;
  while (min < max) {
    var srodek = Math.ceil((min + max) / 2);
    p.innerHTML = slowa.slice(od, od + srodek).join(" ");
    if (zaDuzo()) max = srodek - 1;
    else min = srodek;
  }
  return min;
}

function podzielRozdzial() {
  kartki = [];
  var r = rozdzialy[rozdzial];
  var akapity = r.akapity;
  var poczatekKartki = 0;
  strona.className = "";
  strona.innerHTML = r.tytul ? "<h2>" + r.tytul + "</h2>" : "";

  function zamknijKartke(nastepnyAkapit) {
    kartki.push({ html: strona.innerHTML, akapit: poczatekKartki });
    strona.innerHTML = "";
    poczatekKartki = nastepnyAkapit;
  }

  for (var i = 0; i < akapity.length; i++) {
    var p = document.createElement("p");
    p.innerHTML = akapity[i];
    strona.appendChild(p);
    if (!zaDuzo()) continue;

    // Akapit się nie mieści - dzielimy go między kartki
    var slowa = akapity[i].split(" ");
    var w = 0;
    while (w < slowa.length) {
      var ile = ileSlowSieZmiesci(p, slowa, w);
      if (ile === 0 && strona.childNodes.length === 1) ile = 1; // bardzo długie słowo na pustej kartce
      if (ile === 0) {
        strona.removeChild(p);
      } else {
        p.innerHTML = slowa.slice(w, w + ile).join(" ");
        w += ile;
      }
      if (w >= slowa.length) break; // reszta akapitu się zmieściła
      zamknijKartke(i);
      p = document.createElement("p");
      if (w > 0) p.style.textIndent = "0"; // ciąg dalszy akapitu
      strona.appendChild(p);
    }
  }
  if (strona.innerHTML) zamknijKartke(akapity.length);
  if (!kartki.length) kartki.push({ html: "", akapit: 0 });
}

function podzielKomiks() {
  kartki = [];
  for (var i = 0; i < tekst.strony.length; i++) {
    var s = tekst.strony[i];
    var obrazek = s.obrazek.charAt(0) === "<" ? s.obrazek : '<img src="' + s.obrazek + '" alt="">';
    kartki.push({ html: obrazek + '<p class="dymek">' + s.tekst + "</p>", akapit: i });
  }
}

function podziel() {
  strona.style.fontSize = czcionka + "px";
  if (tekst.typ === "komiks") podzielKomiks();
  else podzielRozdzial();
}

// ---------- Pokazywanie kartki ----------
function pokaz(n) {
  if (n < 0) n = 0;
  if (n > kartki.length - 1) n = kartki.length - 1;
  obecna = n;
  otwartySpis = false;
  strona.className = tekst.typ === "komiks" ? "komiks" : "";
  strona.innerHTML = kartki[n].html;

  var ostatniRozdzial = rozdzial === rozdzialy.length - 1;
  przyciskWstecz.disabled = n === 0 && rozdzial === 0;
  przyciskDalej.disabled = n === kartki.length - 1 && ostatniRozdzial;

  var opis = "str. " + (n + 1) + "/" + kartki.length;
  if (rozdzialy.length > 1) opis = "rozdz. " + (rozdzial + 1) + "/" + rozdzialy.length + "<br>" + opis;
  numer.innerHTML = opis;

  zapisz("miejsce_" + tekst.id, rozdzial + "," + kartki[n].akapit);
  var postep = "strona " + (n + 1) + " z " + kartki.length;
  if (rozdzialy.length > 1) postep = "rozdział " + (rozdzial + 1) + " z " + rozdzialy.length + ", " + postep;
  zapisz("postep_" + tekst.id, postep);
}

// Kartka, na której jest dany akapit (po zmianie czcionki zostajemy w tym samym miejscu)
function kartkaZAkapitem(akapit) {
  var wynik = 0;
  for (var i = 0; i < kartki.length; i++) {
    if (kartki[i].akapit === akapit) return i;
    if (kartki[i].akapit > akapit) break;
    wynik = i;
  }
  return wynik;
}

function otworzRozdzial(r, akapit) {
  rozdzial = r;
  podziel();
  pokaz(akapit === "koniec" ? kartki.length - 1 : kartkaZAkapitem(akapit));
}

function zmienCzcionke(o) {
  var nowa = czcionka + o;
  if (nowa < 14 || nowa > 40) return;
  czcionka = nowa;
  zapisz("czcionka", czcionka);
  otworzRozdzial(rozdzial, kartki[obecna].akapit);
}

function dalej() {
  if (otwartySpis) return pokaz(obecna);
  if (obecna < kartki.length - 1) pokaz(obecna + 1);
  else if (rozdzial < rozdzialy.length - 1) otworzRozdzial(rozdzial + 1, 0);
}

function wstecz() {
  if (otwartySpis) return pokaz(obecna);
  if (obecna > 0) pokaz(obecna - 1);
  else if (rozdzial > 0) otworzRozdzial(rozdzial - 1, "koniec");
}

// ---------- Spis treści ----------
function pokazSpis() {
  if (otwartySpis) return pokaz(obecna);
  otwartySpis = true;
  var html = "<h2>Spis treści</h2>";
  for (var i = 0; i < rozdzialy.length; i++) {
    var nazwa = rozdzialy[i].tytul || ("Rozdział " + (i + 1));
    html += '<a class="rozdzial-link' + (i === rozdzial ? " obecny" : "") +
            '" href="#" data-r="' + i + '">' + nazwa + "</a>";
  }
  strona.className = "spis";
  strona.innerHTML = html;
  strona.scrollTop = 0;
}

// ---------- Start ----------
function wczytanoKsiazke(dane) {
  rozdzialy = dane;
  if (rozdzialy.length < 2) document.getElementById("spis").style.display = "none";
  var miejsce = (wczytaj("miejsce_" + tekst.id) || "0,0").split(",");
  var r = parseInt(miejsce[0], 10);
  var a = parseInt(miejsce[1], 10);
  if (isNaN(r) || r < 0 || r >= rozdzialy.length) r = 0;
  if (isNaN(a)) a = 0;
  otworzRozdzial(r, a);
}

function start() {
  tekst = znajdzTekst(pobierzId());
  if (!tekst) {
    window.location.href = "index.html";
    return;
  }
  document.title = tekst.tytul;
  document.getElementById("tytul").innerHTML = tekst.tytul;

  var zapisana = parseInt(wczytaj("czcionka"), 10);
  if (zapisana >= 14 && zapisana <= 40) czcionka = zapisana;

  if (tekst.typ === "ksiazka") {
    strona.innerHTML = "<p>Wczytywanie książki...</p>";
    var skrypt = document.createElement("script");
    skrypt.charset = "UTF-8";
    skrypt.src = tekst.plik; // plik woła wczytanoKsiazke([...])
    skrypt.onerror = function () { strona.innerHTML = "<p>Nie udało się wczytać książki.</p>"; };
    document.body.appendChild(skrypt);
  } else if (tekst.typ === "komiks") {
    wczytanoKsiazke([{ tytul: tekst.tytul, akapity: [] }]);
  } else {
    wczytanoKsiazke([{ tytul: tekst.tytul, akapity: tekst.akapity }]);
  }
}

przyciskDalej.onclick = dalej;
przyciskWstecz.onclick = wstecz;
document.getElementById("wieksza").onclick = function () { zmienCzcionke(2); };
document.getElementById("mniejsza").onclick = function () { zmienCzcionke(-2); };
document.getElementById("spis").onclick = pokazSpis;

// Dotknięcie lewej części kartki = wstecz, prawej = dalej (w spisie: wybór rozdziału)
kartka.onclick = function (e) {
  e = e || window.event;
  var cel = e.target || e.srcElement;
  if (otwartySpis) {
    if (cel.getAttribute && cel.getAttribute("data-r") !== null) {
      otworzRozdzial(parseInt(cel.getAttribute("data-r"), 10), 0);
    }
    return false;
  }
  if (e.clientX < window.innerWidth / 3) wstecz();
  else dalej();
};

// Strzałki, PageUp/PageDown, spacja (przyciski boczne w niektórych czytnikach)
document.onkeydown = function (e) {
  e = e || window.event;
  var k = e.keyCode;
  if (otwartySpis) return;
  if (k === 39 || k === 34 || k === 32 || k === 40) { dalej(); return false; }
  if (k === 37 || k === 33 || k === 38) { wstecz(); return false; }
};

// Po obróceniu ekranu dzielimy tekst od nowa
var czekaj = null;
window.onresize = function () {
  clearTimeout(czekaj);
  czekaj = setTimeout(function () {
    if (kartki.length && !otwartySpis) otworzRozdzial(rozdzial, kartki[obecna].akapit);
  }, 300);
};

start();
