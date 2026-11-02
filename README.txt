Mika Wezelman — Stageportfolio
=============================

Een statisch portfolio in HTML, CSS en JavaScript. Geen buildstap nodig.
Open index.html lokaal in een moderne browser.

Actieve bestanden
-----------------
index.html: inhoud en semantische structuur.
assets/css/portfolio.css: zelfstandig responsive ontwerp en printstijl.
assets/js/portfolio.js: optionele afbeeldingsdialoog met native dialog.
De oorspronkelijke templatebestanden worden niet geladen en zijn behouden.

Projecten invullen
-----------------
High5Kidz en Cabbiecat hebben elk een eigen projectkaart en screenshotgalerij.
Vul de projectcases aan met je eigen bijdrage, resultaat en geleerde lessen.
Zie Screenshotgalerijen hieronder voor het toevoegen van echte afbeeldingen.

Delen
-----
Gebruik een werkende website-link in je mail aan een stagebedrijf.
GitHub Pages kan de repositoryroot als statische website hosten.
Publicatie is niet automatisch gegarandeerd door het pushen van code.
Voor een PDF: browser > Afdrukken > Opslaan als PDF.
De projectsectie is nog in voorbereiding; vermeld dat bij het delen.

Controles
---------
Zie CONTROLES.txt. Lokale verwijzingen, IDs, ankers, JS-syntax en contrast
zijn gecontroleerd. Visuele browser-, mobiele, toetsenbord- en printtests
staan nog open doordat de lokale browserinstallatie niet beschikbaar was.



Screenshotgalerijen
-------------------
Elke projectkaart heeft een eigen slider met pijlen, pijltoetsen en swipe.
Klik op Vergroten voor de dialoog; Escape of Sluiten sluit deze weer.
De galerij speelt niet automatisch af. Zonder JS blijft een melding zichtbaar.

1. Sla screenshots op in images/projects/high5kidz/ of images/projects/cabbiecat/.
2. Open assets/js/project-gallery-data.js.
3. Vervang src: null door bijvoorbeeld:
   src: "images/projects/high5kidz/startscherm.png"
4. Vul alt (beschrijving van het beeld) en caption (bijschrift) in.
5. Voeg extra objecten toe om meer screenshots te tonen.
Er zijn nog geen echte screenshots toegevoegd: de drie plaatsen per project
zijn herkenbare lege plekken. De knop Vergroten wordt actief na het invullen.
