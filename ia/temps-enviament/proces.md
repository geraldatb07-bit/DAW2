## 1r prompt 

Escriu una funció en TypeScript per a una plataforma de venda online que mostri quant de temps tardarà a arribar una comanda.

La funció rebrà un llistat dels productes que hi ha al carro de compra. Cada producte té un temps estimat de preparació, que depèn del proveïdor.

Hi ha dos tipus d’enviament: express i standard. En l’enviament express hi ha un temps límit d’entrega, mentre que en el standard la comanda arribarà quan tots els productes estiguin preparats.

Les dades venen d’una base de dades, però han estat introduïdes manualment i poden contenir errors.
## Anàlisis
El codi funciona be amb els casos basic pero tot i aixo la IA assumeix que els productes es preparen en paral·lel, inventa un límit express de 2 dies que no apareix a l’enunciat, no controla Infinity i no queda clar com tractar 0, decimals o valors com " Express " i "standart".

## 2n prompt
Analitza la implementació anterior sense modificar encara el codi. He detectat diversos casos ambigus: no sabem si els productes es preparen en paral·lel, el límit de 2 dies de l’enviament express no apareix a l’enunciat, no queda clar què significa exactament aquest límit, i les dades poden contenir errors introduïts manualment. També vull considerar valors com 0, decimals, Infinity i tipus d’enviament com "Express", " express " o "standart". Explica quines decisions prendries per a cadascun d’aquests casos i justifica-les.incorrecte.

## Resposta 

Després d’analitzar la resposta de la IA, considero raonable assumir que
els productes es preparen en paral·lel, ja que poden provenir de diferents
proveïdors. Per tant, el temps de preparació de la comanda serà el temps
del producte que trigui més.

També he decidit permetre el valor 0 i els nombres decimals, però rebutjar
NaN i Infinity perquè no representen temps de preparació vàlids.

Pel que fa al tipus d’enviament, considero acceptable eliminar espais i
ignorar diferències entre majúscules i minúscules. En canvi, errors
ortogràfics com "standart" retornaran un error, ja que corregir-los
automàticament podria provocar interpretacions incorrectes.

La primera implementació havia establert arbitràriament un límit de 2 dies
per a l’enviament express. La segona resposta detecta aquest problema,
però encara no queda resolt d’on ha de sortir aquest límit. Per aquest
motiu, abans d’implementar una nova versió, faré una nova consulta a la IA.

## 3r prompt

Estic d’acord amb mantenir la preparació dels productes en paral·lel, permetre 0 i decimals, rebutjar NaN i Infinity, normalitzar majúscules i espais del tipus d’enviament i retornar error davant d’errors ortogràfics com "standart".

No obstant això, encara queda un problema: l’enunciat indica que l’enviament express té un temps límit, però no especifica quin és aquest límit ni d’on surt.

No vull que inventis cap valor. Analitza quines opcions tenim per representar aquest límit a la funció TypeScript (per exemple, paràmetre, propietat o una altra alternativa) i explica els avantatges i inconvenients de cada opció. Encara no implementis la funció.

Després de comparar les diferents opcions proposades, he decidit passar
el límit de l’enviament express com a paràmetre de la funció.

## Resultat
He escollit aquesta opció perquè és senzilla i evita definir arbitràriament
un valor dins del codi, com passava a la primera implementació amb
els 2 dies. D’aquesta manera, el límit pot venir de la configuració de la
plataforma i la funció només s’encarrega de validar-lo i utilitzar-lo.

Per simplificar l’exercici, consideraré que aquest límit representa el
temps màxim d’entrega de la comanda.

## 4t prompt
Implementa ara una segona versió de la funció en TypeScript aplicant les decisions que hem pres.

La funció ha de rebre els productes, el tipus d’enviament i limitExpress com a paràmetre.

Decisions:

Els productes es preparen en paral·lel, per tant s’utilitza el temps de preparació més gran.
Es permeten temps iguals a 0 i nombres decimals.
S’han de rebutjar valors negatius, NaN i Infinity.
El tipus d’enviament s’ha de normalitzar eliminant espais al principi i al final i ignorant majúscules/minúscules.
Només s’accepten "standard" i "express". Errors com "standart" han de retornar error.
No s’ha d’inventar cap límit express: s’utilitzarà el paràmetre limitExpress.
limitExpress també s’ha de validar.
Considerarem limitExpress com el temps màxim d’entrega permès.
Si el carro està buit, s’ha d’indicar.

Genera una implementació senzilla, adequada per a un exercici de TypeScript. No afegeixis funcionalitats que no hem decidit.

Quan et doni aquest codi, no necessites tornar a fer tres rondes més. El següent serà provar-lo amb uns quants casos (normal, 0, decimal, negatiu, Infinity, " Express ", "standart", carro buit i límit express) i escriure una conclusió final curta. Així tindràs una pràctica molt més coherent que simplement entregar codi generat per IA.