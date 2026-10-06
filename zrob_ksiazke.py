"""
Pobiera książkę z Wolnych Lektur (plik .txt) i zamienia ją na plik ksiazki/<id>.js dla czytnika.

Użycie:  python narzedzia/zrob_ksiazke.py <slug-z-wolnych-lektur> <id>
Przykład: python narzedzia/zrob_ksiazke.py makuszynski-szatan-z-siodmej-klasy szatan

Potem dopisz książkę do teksty.js (typ: "ksiazka", plik: "ksiazki/<id>.js").
"""
import json
import os
import re
import sys
import urllib.request

NAGLOWEK = re.compile(r"^(ROZDZIAŁ|Rozdział|\d+\.\s*$)")


def podziel_na_rozdzialy(tekst):
    tekst = tekst.replace("\r\n", "\n")
    tekst = tekst.split("\n-----")[0]  # stopka z licencją jest na końcu
    linie = tekst.split("\n")

    rozdzialy = []
    puste = 0
    poczatek = True  # pomijamy autora, tytuł i ISBN na górze
    i = 0
    while i < len(linie):
        linia = linie[i].strip()
        i += 1
        if not linia:
            puste += 1
            continue

        if puste >= 3 and len(linia) < 150 and NAGLOWEK.match(linia):
            tytul = linia
            # "1." + tytuł w następnej linii
            if re.match(r"^\d+\.$", linia) and i < len(linie) and linie[i].strip():
                tytul = linia + " " + linie[i].strip()
                i += 1
            rozdzialy.append({"tytul": tytul, "akapity": []})
            poczatek = False
        elif not poczatek:
            rozdzialy[-1]["akapity"].append(linia)
        puste = 0

    if not rozdzialy:  # brak rozdziałów - cała książka jako jeden
        akapity = [l.strip() for l in linie if l.strip()][3:]
        rozdzialy = [{"tytul": "", "akapity": akapity}]
    return rozdzialy


def main():
    slug, id_ = sys.argv[1], sys.argv[2]
    url = "https://wolnelektury.pl/media/book/txt/%s.txt" % slug
    tekst = urllib.request.urlopen(url).read().decode("utf-8")
    rozdzialy = podziel_na_rozdzialy(tekst)
    rozdzialy[-1]["akapity"].append(
        "Źródło: Wolne Lektury (wolnelektury.pl/katalog/lektura/%s). Utwór w domenie publicznej." % slug
    )

    folder = os.path.join(os.path.dirname(__file__), "..", "ksiazki")
    os.makedirs(folder, exist_ok=True)
    sciezka = os.path.join(folder, id_ + ".js")
    with open(sciezka, "w", encoding="utf-8") as f:
        f.write("wczytanoKsiazke(")
        json.dump(rozdzialy, f, ensure_ascii=False, indent=0)
        f.write(");\n")
    print("%s: %d rozdziałów -> %s" % (slug, len(rozdzialy), sciezka))


if __name__ == "__main__":
    main()
