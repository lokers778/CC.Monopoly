import ChanceCard from './Cards/chanceCards';
import CommunityChestCard from './Cards/communityChestCards';

const chance1 = new ChanceCard('1', 'Idż na ulice płowiecką.', 3, 11);
const chance2 = new ChanceCard('2', 'Idź na Dworzec Zachodni.', 3, 5);
const chance3 = new ChanceCard('3', 'Zrobiłeś błąd w kalkulacjach podatkowych. Tracisz M 50', 2, 50);
const chance4 = new ChanceCard('4', 'Zrobiłeś błąd w kalkulacjach podatkowych. Tracisz M 50', 2, 50);;
const chance5 = new ChanceCard('5', 'Idź do więzienia.', 5, 10);;
const chance6 = new ChanceCard('6', 'Idź do Elektrowni.', 3, 12);
const chance7 = new ChanceCard('7', 'Przeprowadź remont generalny wszystkich swoich nieruchomości: Zapłać za każdy dom M 25. Zapłać za każdy hotel M 100', '1', 15);
const chance8 = new ChanceCard('8', 'Idź do więzienia.', 5, 10);
const chance9 = new ChanceCard('9', 'Wyjdź bezpłatnie z więzienia. (Tę kartę możesz zatrzymać do późniejszego wykorzystania lub sprzedaży)', 4, '');
const chance10 = new ChanceCard('10', 'Idź na Plac Wilson.', 3, 24);
const chance11 = new ChanceCard('11', 'Bank wypłaca Ci M 50', 1, 50);
const chance12 = new ChanceCard('12', 'Zwrot podatku.Pobierz M 150', 1, 150);
const chance13 = new ChanceCard('13', 'Przejdź na START.', 3, 0);
const chance14 = new ChanceCard('14', 'Zapłać grzywne - M 15', 2, 15);
const chance15 = new ChanceCard('15', 'Idź na Aleje Ujazdowskie', 3, 39);
const chance16 = new ChanceCard('16', 'Idź na Aleje Ujazdowskie', 3, 39);

const comunity1 = new CommunityChestCard('1', 'Zapłać: M 40.', 2, 40);
const comunity2 = new CommunityChestCard('2', 'Zająłeś 2 miejsce w konkursie piękności. Pobierz M 10', 1, 10);
const comunity3 = new CommunityChestCard('3', 'Błąd bankowy na twoim koncie! Pobierz M 200', 1, 200);
const comunity4 = new CommunityChestCard('4', 'Wyjdź bezpłatnie z więzienia. (Tę kartę możesz zatrzymać do późniejszego wykorzystania lub sprzedaży)', 4, '');
const comunity5 = new CommunityChestCard('5', 'Idź do więzienia.', 3, 10);
const comunity6 = new CommunityChestCard('6', 'Masz urodziny! Pobierz M 100.', 1, 10);
const comunity7 = new CommunityChestCard('7', 'Fundusz Zdrowotny. Pobierz M 100', 1, 100);
const comunity8 = new CommunityChestCard('8', 'Zapłać za wizytę u dentysty- M 100', 2, 100);
const comunity9 = new CommunityChestCard('9', 'Zapłać czesne-M 50', '2', 50);
const comunity10 = new CommunityChestCard('10', 'Przejdź na START', 3, 0);
const comunity11 = new CommunityChestCard('11', 'Wyprzedaż! Pobierz M 50', 1, 50);
const comunity12 = new CommunityChestCard('12', 'Zapłać za wizytę Lekarską-M 50', 2, 50);
const comunity13 = new CommunityChestCard('13', 'Zwrot podatku. Pobierz M 20', 1, 20);
const comunity14 = new CommunityChestCard('14', 'Otrzymujesz M 25 za porady finansowe', 1, 25);
const comunity15 = new CommunityChestCard('15', 'Odziedziczyłeś spadek. Pobierz M 100', 1, 100);
const comunity16 = new CommunityChestCard('16', 'Dostałeś premię! Pobierz M 100', 1, 100);

let chanceDeck = [
  chance1,
  chance2,
  chance3,
  chance4,
  chance5,
  chance6,
  chance7,
  chance8,
  chance9,
  chance10,
  chance11,
  chance12,
  chance13,
  chance14,
  chance15,
  chance16,
];

let communityChestDeck = [
  comunity1,
  comunity2,
  comunity3,
  comunity4,
  comunity5,
  comunity6,
  comunity7,
  comunity8,
  comunity9,
  comunity10,
  comunity11,
  comunity12,
  comunity13,
  comunity14,
  comunity15,
  comunity16,
];

export { chanceDeck, communityChestDeck };
