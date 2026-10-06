/*
  Tu są wszystkie opowiadania i komiksy.
  Żeby dodać nowe opowiadanie, skopiuj jeden blok { ... } i zmień:
    id      - krótka nazwa bez spacji i polskich liter
    typ     - "opowiadanie" albo "komiks"
    tytul, opis
    akapity - (dla opowiadania) lista akapitów tekstu
    strony  - (dla komiksu) lista stron: { obrazek: "plik.png" albo kod SVG, tekst: "podpis" }
    plik    - (dla typu "ksiazka") plik z rozdziałami zrobiony skryptem narzedzia/zrob_ksiazke.py
*/
var TEKSTY = [
  {
    id: "szatan",
    typ: "ksiazka",
    tytul: "Szatan z siódmej klasy",
    opis: "Kornel Makuszyński. Adam Cisowski, najsprytniejszy uczeń w szkole, rozwiązuje zagadkę starego dworu i ukrytego skarbu.",
    plik: "ksiazki/szatan.js"
  },
  {
    id: "ksiezyc",
    typ: "ksiazka",
    tytul: "O dwóch takich, co ukradli księżyc",
    opis: "Kornel Makuszyński. Zabawna historia bliźniaków Jacka i Placka, którzy postanowili ukraść księżyc.",
    plik: "ksiazki/ksiezyc.js"
  },
  {
    id: "pustynia",
    typ: "ksiazka",
    tytul: "W pustyni i w puszczy",
    opis: "Henryk Sienkiewicz. Staś i Nel porwani w Afryce - wielka przygoda przez pustynię i dżunglę.",
    plik: "ksiazki/pustynia.js"
  },
  {
    id: "latarnik",
    typ: "opowiadanie",
    tytul: "Ostatnia latarnia",
    opis: "Opowiadanie o chłopcu, który pilnował światła na końcu świata.",
    akapity: [
      "Na samym końcu lądu, tam gdzie kończyły się drogi, a zaczynało morze, stała stara latarnia morska. Jej biała farba dawno już odpadła, a schody skrzypiały przy każdym kroku. Mieszkał w niej dziadek Antoni i jego wnuk, Kuba.",
      "Każdego wieczoru, kiedy słońce chowało się za horyzontem, dziadek wspinał się na szczyt i zapalał wielką lampę. Jej światło obracało się powoli, przecinając ciemność jak miecz ze złota.",
      "– Po co to robimy, dziadku? – zapytał kiedyś Kuba. – Przecież statki mają teraz GPS i radary. Nikt już nie patrzy na latarnie.",
      "Dziadek uśmiechnął się pod siwym wąsem i długo nie odpowiadał. Patrzył na morze, jakby czegoś na nim szukał.",
      "– Zawsze ktoś patrzy – powiedział w końcu. – Nawet jeśli o tym nie wiemy.",
      "Kuba nie bardzo w to wierzył. Ale lubił siedzieć z dziadkiem na górze, słuchać wiatru i liczyć obroty światła. Raz, dwa, trzy… błysk. Raz, dwa, trzy… błysk.",
      "Pewnej jesieni dziadek zachorował. Lekarz z miasteczka kazał mu leżeć w łóżku przez cały tydzień i nie wchodzić po schodach. Tego samego dnia nad morzem rozpętała się burza, jakiej Kuba nigdy wcześniej nie widział.",
      "Fale biły o skały tak mocno, że cała latarnia drżała. Deszcz walił w okna, a wiatr wył w szczelinach jak stado wilków. A potem zgasł prąd.",
      "– Kuba – wyszeptał dziadek z łóżka. – W szafce na dole jest stara lampa naftowa. Ta, której używałem, zanim przyszła elektryczność. Musisz ją zapalić.",
      "– Ale po co? Przecież nikogo tam nie ma!",
      "– Zrób to dla mnie – poprosił dziadek.",
      "Kuba znalazł lampę, zapałki i bańkę nafty. Wspinał się po ciemnych schodach, licząc stopnie: sto dwadzieścia osiem. Na górze wiatr prawie wyrwał mu zapałki z ręki. Udało się dopiero za piątym razem.",
      "Mały płomyk zamigotał, a potem urósł. Wielkie szkła latarni złapały go i pomnożyły, aż zrobiło się z niego jasne, ciepłe światło. Nie obracało się, bo silnik nie miał prądu, więc Kuba sam kręcił korbą. Raz, dwa, trzy… błysk.",
      "Kręcił przez całą noc. Ręce bolały go tak, że chciało mu się płakać. Ale nie przestawał.",
      "Rano burza ucichła. Kuba zszedł na dół, a przy drzwiach latarni stał mokry, zmęczony rybak w żółtym płaszczu.",
      "– To ty świeciłeś w nocy? – zapytał. – Mój silnik padł, a elektronika zalała się wodą. Nie wiedziałem, gdzie są skały. Gdyby nie twoje światło, rozbiłbym się o nie razem z synem.",
      "Kuba nie wiedział, co powiedzieć. Pobiegł na górę, do dziadka.",
      "– Dziadku! Ktoś patrzył! Naprawdę ktoś patrzył!",
      "Dziadek otworzył oczy i uśmiechnął się, jakby wcale nie był zdziwiony.",
      "– Zawsze ktoś patrzy, Kuba – powtórzył. – Dlatego nigdy nie gasimy światła.",
      "Od tamtej pory, każdego wieczoru, to Kuba wspina się po stu dwudziestu ośmiu schodach. I zawsze, zanim zapali lampę, przez chwilę patrzy na morze. Tak na wszelki wypadek.",
      "KONIEC"
    ]
  },
  {
    id: "smok",
    typ: "opowiadanie",
    tytul: "Smok, który bał się ciemności",
    opis: "Zabawna bajka o smoku Bartku i jego wielkim sekrecie.",
    akapity: [
      "W Górach Mglistych żył smok o imieniu Bartek. Był wielki jak stodoła, miał zielone łuski, pazury ostre jak noże i potrafił zionąć ogniem na odległość trzech drzew. Wszyscy w okolicy się go bali.",
      "Ale Bartek miał sekret. Straszny, wstydliwy sekret, którego nie zdradził nigdy nikomu.",
      "Bartek bał się ciemności.",
      "Dlatego w jego jaskini zawsze paliło się ognisko. Kiedy szedł spać, zostawiał mały płomyk w nosie, żeby choć trochę świeciło. Raz przez to kichnął przez sen i spalił sobie poduszkę.",
      "Pewnego dnia do jaskini przyszedł rycerz. Miał błyszczącą zbroję, długi miecz i bardzo poważną minę.",
      "– Smoku! – zawołał. – Przybyłem, żeby z tobą walczyć!",
      "– Dobrze – westchnął Bartek. – Tylko szybko, bo zaraz się ściemni.",
      "Rycerz zmarszczył brwi.",
      "– A co ma do tego ciemność?",
      "Bartek zrobił się czerwony, co u zielonego smoka wygląda dość dziwnie. Przez chwilę mamrotał coś pod nosem, aż w końcu się przyznał.",
      "– Boję się ciemności – powiedział cicho. – Proszę, nie mów nikomu.",
      "Rycerz przez chwilę milczał. Potem odłożył miecz, zdjął hełm i usiadł na kamieniu.",
      "– Wiesz co? – powiedział. – Ja też się czegoś boję. Pająków. Mam na sobie trzydzieści kilo żelaza, a jak zobaczę pająka, to uciekam z krzykiem.",
      "Smok zaczął się śmiać. Śmiał się tak bardzo, że z nosa poleciały mu iskry. Rycerz też się roześmiał.",
      "– To może zrobimy tak – zaproponował rycerz. – Ty będziesz świecił mi w nocy, a ja będę cię pilnował, żebyś się nie bał.",
      "– A ja wypędzę z twojego zamku wszystkie pająki – dodał Bartek. – Jeden mały płomień i po sprawie. Bez krzywdy, tylko je przestraszę.",
      "Tak zaczęła się najdziwniejsza przyjaźń w historii królestwa. Od tamtej pory rycerz i smok podróżują razem. W dzień rycerz chroni smoka przed ludźmi, którzy chcą z nim walczyć. W nocy smok świeci rycerzowi drogę.",
      "A kiedy ktoś pyta, czy wielki smok naprawdę niczego się nie boi, Bartek tylko puszcza do rycerza oko.",
      "KONIEC"
    ]
  },
  {
    id: "robot",
    typ: "komiks",
    tytul: "Robot i kot (komiks)",
    opis: "Krótki komiks o robocie, który chciał zaprzyjaźnić się z kotem.",
    strony: [
      {
        tekst: "Robot R-2 wraca z pracy. Nagle słyszy: MIAU!",
        obrazek:
          '<svg viewBox="0 0 300 200" width="600" height="400" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000" stroke-width="3">' +
          '<line x1="0" y1="170" x2="300" y2="170"/>' +
          '<rect x="60" y="70" width="50" height="60"/><rect x="65" y="30" width="40" height="35"/>' +
          '<circle cx="77" cy="45" r="5" fill="#000"/><circle cx="93" cy="45" r="5" fill="#000"/>' +
          '<line x1="85" y1="30" x2="85" y2="15"/><circle cx="85" cy="12" r="4"/>' +
          '<line x1="70" y1="130" x2="70" y2="170"/><line x1="100" y1="130" x2="100" y2="170"/>' +
          '<line x1="60" y1="85" x2="40" y2="110"/><line x1="110" y1="85" x2="130" y2="110"/>' +
          '<ellipse cx="230" cy="155" rx="25" ry="14"/><circle cx="250" cy="135" r="12"/>' +
          '<polyline points="242,126 244,114 250,123"/><polyline points="252,123 258,114 259,126"/>' +
          '<path d="M205,150 Q190,130 200,120"/>' +
          '<path d="M180,40 h80 v35 h-50 l-15,15 v-15 h-15 z"/>' +
          '<text x="198" y="64" font-size="18" fill="#000" stroke="none" font-family="Arial">MIAU!</text>' +
          '</svg>'
      },
      {
        tekst: "– Cześć, mały! Chcesz być moim przyjacielem? – pyta robot.",
        obrazek:
          '<svg viewBox="0 0 300 200" width="600" height="400" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000" stroke-width="3">' +
          '<line x1="0" y1="170" x2="300" y2="170"/>' +
          '<rect x="120" y="70" width="50" height="60"/><rect x="125" y="30" width="40" height="35"/>' +
          '<circle cx="137" cy="45" r="5" fill="#000"/><circle cx="153" cy="45" r="5" fill="#000"/>' +
          '<path d="M137,56 Q145,62 153,56"/>' +
          '<line x1="145" y1="30" x2="145" y2="15"/><circle cx="145" cy="12" r="4"/>' +
          '<line x1="130" y1="130" x2="130" y2="170"/><line x1="160" y1="130" x2="160" y2="170"/>' +
          '<line x1="170" y1="85" x2="205" y2="140"/><line x1="120" y1="85" x2="100" y2="110"/>' +
          '<ellipse cx="235" cy="155" rx="25" ry="14"/><circle cx="215" cy="135" r="12"/>' +
          '<polyline points="207,126 208,114 214,123"/><polyline points="217,123 222,114 224,126"/>' +
          '<path d="M260,150 Q275,130 265,120"/>' +
          '<text x="225" y="100" font-size="22" fill="#000" stroke="none" font-family="Arial">?</text>' +
          '</svg>'
      },
      {
        tekst: "Kot ucieka! Robot jest smutny. Może coś zrobił źle?",
        obrazek:
          '<svg viewBox="0 0 300 200" width="600" height="400" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000" stroke-width="3">' +
          '<line x1="0" y1="170" x2="300" y2="170"/>' +
          '<rect x="60" y="70" width="50" height="60"/><rect x="65" y="30" width="40" height="35"/>' +
          '<circle cx="77" cy="45" r="5" fill="#000"/><circle cx="93" cy="45" r="5" fill="#000"/>' +
          '<path d="M77,60 Q85,53 93,60"/>' +
          '<line x1="85" y1="30" x2="85" y2="15"/><circle cx="85" cy="12" r="4"/>' +
          '<line x1="70" y1="130" x2="70" y2="170"/><line x1="100" y1="130" x2="100" y2="170"/>' +
          '<line x1="60" y1="85" x2="50" y2="120"/><line x1="110" y1="85" x2="120" y2="120"/>' +
          '<path d="M98,48 q3,8 0,12" />' +
          '<ellipse cx="260" cy="155" rx="22" ry="12"/><circle cx="280" cy="140" r="10"/>' +
          '<line x1="200" y1="145" x2="230" y2="145"/><line x1="195" y1="155" x2="228" y2="155"/><line x1="205" y1="165" x2="232" y2="165"/>' +
          '</svg>'
      },
      {
        tekst: "Następnego dnia robot przynosi miskę mleka i czeka cierpliwie...",
        obrazek:
          '<svg viewBox="0 0 300 200" width="600" height="400" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000" stroke-width="3">' +
          '<line x1="0" y1="170" x2="300" y2="170"/>' +
          '<rect x="60" y="70" width="50" height="60"/><rect x="65" y="30" width="40" height="35"/>' +
          '<circle cx="77" cy="45" r="5" fill="#000"/><circle cx="93" cy="45" r="5" fill="#000"/>' +
          '<line x1="77" y1="57" x2="93" y2="57"/>' +
          '<line x1="85" y1="30" x2="85" y2="15"/><circle cx="85" cy="12" r="4"/>' +
          '<line x1="70" y1="130" x2="70" y2="170"/><line x1="100" y1="130" x2="100" y2="170"/>' +
          '<line x1="60" y1="85" x2="45" y2="115"/><line x1="110" y1="85" x2="125" y2="115"/>' +
          '<path d="M150,155 h40 l-5,15 h-30 z"/><line x1="155" y1="160" x2="185" y2="160"/>' +
          '<text x="210" y="60" font-size="16" fill="#000" stroke="none" font-family="Arial">tik... tak...</text>' +
          '</svg>'
      },
      {
        tekst: "MRRRR! Kot wraca, pije mleko i mruczy. Teraz są przyjaciółmi! KONIEC",
        obrazek:
          '<svg viewBox="0 0 300 200" width="600" height="400" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000" stroke-width="3">' +
          '<line x1="0" y1="170" x2="300" y2="170"/>' +
          '<rect x="60" y="70" width="50" height="60"/><rect x="65" y="30" width="40" height="35"/>' +
          '<path d="M72,45 q5,-6 10,0"/><path d="M88,45 q5,-6 10,0"/>' +
          '<path d="M75,55 Q85,65 95,55"/>' +
          '<line x1="85" y1="30" x2="85" y2="15"/><circle cx="85" cy="12" r="4"/>' +
          '<line x1="70" y1="130" x2="70" y2="170"/><line x1="100" y1="130" x2="100" y2="170"/>' +
          '<line x1="60" y1="85" x2="40" y2="60"/><line x1="110" y1="85" x2="130" y2="60"/>' +
          '<path d="M150,155 h40 l-5,15 h-30 z"/>' +
          '<ellipse cx="215" cy="150" rx="25" ry="15"/><circle cx="192" cy="148" r="12"/>' +
          '<polyline points="184,140 185,127 191,136"/><polyline points="194,136 199,127 201,140"/>' +
          '<path d="M240,145 Q258,125 248,112"/>' +
          '<path d="M140,30 l5,-8 l5,8 l-5,8 z"/><path d="M200,25 c-8,-10 -18,2 0,14 c18,-12 8,-24 0,-14 z"/>' +
          '<text x="205" y="95" font-size="16" fill="#000" stroke="none" font-family="Arial">MRRRR</text>' +
          '</svg>'
      }
    ]
  }
];
