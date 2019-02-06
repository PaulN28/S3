import java.util.*;

/**
* Diese Klasse Dialog ermöglicht es mit einer Benutzer Oberfläche, die Klasse Lager zu bedienen
*
* @author Paul Nicolas & Nils Gamlin
* @date 01/12/2018
*/

public class LagerDialog
{

  //------------------ATTRIBUTE----------------------------------

  private Lager lager;
  private Scanner input;
  private boolean existiert_lager;

  private static final int NEUES_STANDARD_LAGER      = 1;
  private static final int NEUES_LAGER               = 2;
  private static final int ARTIKEL_ANLEGEN           = 3;
  private static final int ARTIKEL_LOESCHEN          = 4;
  private static final int ZUGANG                    = 5;
  private static final int ABGANG                    = 6;
  private static final int PREIS_AENDERN             = 7;
  private static final int PREIS_AENDERN_FUER_ALLE_ARTIKEL = 8;
  private static final int BESTANDS_LISTE            = 9;
  private static final int ENDE                      = 0;

  private static final String MSG_LAGER_EXISTIERT_NICHT = "Lager existiert nicht";
  private static final String MSG_LAGER_EXISTIERT_SCHON = "Lager existiert schon";


  private static final int ARTIKEL      = 100;
  private static final int CD           = 101;
  private static final int BUCH         = 102;
  private static final int DVD          = 103;

  //------------------KONSTRUKTOREN-------------------------------

  /**
  * Konstruktor der Klasse LagerDialog
  */

  public LagerDialog()
  {
    input = new Scanner(System.in); // initalise les valeurs de départ
    existiert_lager = false;
  }

  //------------------Start-------------------------------

  /*
  * Fuehrt die Methode einlesenFunktion und ausfuehrenFunktion aus
  * bis der Benutzer entscheidet die Methode zu beenden
  * Beinhaltet auch die Fehlerbehandlung
  */

  public void start() {
    int funktion = -1;

    while (funktion != ENDE) {
      try {
        funktion = einlesenFunktion();
        ausfuehrenFunktion(funktion);
      } catch (IllegalArgumentException e) {
        System.out.println("Ausnahme gefangen: " + e);
      } catch (InputMismatchException e) {
        System.out.println(e);
        input.next();
      }  catch (NullPointerException e) {
        System.out.println(e);
        input.next();
      }
      catch (Exception e) {
        System.out.println("Ausnahme gefangen: " + e);
        e.printStackTrace(System.out);
      }
    }
  }

  //------------------Einlesen + ausfuehren Funktion-------------------------------

  /**
  * Dient dazu ein Menue im Terminal anzuzeigen
  * Fraegt den Benutzer welche Methoden ausgefuehrt werden sollen
  * @return Auswahl des Benutzers
  */

  private int einlesenFunktion() {
    int funktion;
    System.out.print(NEUES_STANDARD_LAGER     + ": Neues Standardlager; \n" +
    NEUES_LAGER     + ": Neues Lager; \n" +
    ARTIKEL_ANLEGEN     + ": Artikel anlegen; \n" +
    ARTIKEL_LOESCHEN   + ": Artikel loeschen; \n" +
    ZUGANG     + ": Zugang; \n" +
    ABGANG    + ": Abgang; \n" +
    PREIS_AENDERN + ": Preis aendern; \n" +
    PREIS_AENDERN_FUER_ALLE_ARTIKEL + ": Preis aendern fuer alle Artikel; \n" +
    BESTANDS_LISTE + ": Bestandsliste des Lagers; \n" +
    ENDE        + ": beenden \n" +
    "->");

    funktion = input.nextInt();
    input.nextLine();
    return funktion;
  }

  /**
  * Fraegt den Benutzer welcher Typ von Artikel angelegt werden soll
  * @return Auswahl des Benutzers
  */

  private int einlesenArtikel() {
    int artikelTyp;
    System.out.print("\n" + ARTIKEL     + ": Artikel; \n" +
    CD     + ": CD; \n" +
    BUCH     + ": Buch; \n" +
    DVD   + ": DVD; \n");

    artikelTyp = input.nextInt();
    input.nextLine();
    return artikelTyp;

  }

  /**
  * Dient dazu die Methode auszufuehren die vom Benutzer gewaehlt wurde
  */

  private void ausfuehrenFunktion(int funktion) {
    String lagername;
    int lagergroesse;

    int artikelnummer, bestand;
    String artikelbezeichnung;
    double artikelpreis;

    switch (funktion) {
      // Variablen gleich "false", aendert sich zu "true" wenn Konstruktor ausgefuehrt wird
      case NEUES_STANDARD_LAGER :
      if (!existiert_lager) {
        lager = new Lager();
        existiert_lager = true;
      }
      else {
        System.out.println(MSG_LAGER_EXISTIERT_SCHON);
      }
      break;

      case NEUES_LAGER:
        if (!existiert_lager) {
          lager = new Lager(einleseLagerName(), einleseLagerGroesse());
          existiert_lager = true;
        }
        else {
          System.out.println(MSG_LAGER_EXISTIERT_SCHON);
        }
        break;

      case ARTIKEL_ANLEGEN:
        if (existiert_lager) {
          TypVonArtikel();
        }
        else {
          System.out.println(MSG_LAGER_EXISTIERT_NICHT);
        }
        break;

      case ARTIKEL_LOESCHEN:
        if (existiert_lager) {
          lager.loescheArtikel(einleseArtikelNummer());
        }
        else {
          System.out.println(MSG_LAGER_EXISTIERT_NICHT);
        }
        break;

      case ZUGANG:
        if (existiert_lager) {
          lager.zugang(einleseArtikelNummer(), bestand());
        }
        else {
          System.out.println(MSG_LAGER_EXISTIERT_NICHT);
        }
        break;

      case ABGANG:
        if (existiert_lager) {
          lager.abgang(einleseArtikelNummer(), bestand());
        }
        else {
          System.out.println(MSG_LAGER_EXISTIERT_NICHT);
        }
        break;

      case PREIS_AENDERN:
        if (existiert_lager) {
          lager.aenderePreis(einleseArtikelNummer(), einleseProzensatz());
        }
        else {
          System.out.println(MSG_LAGER_EXISTIERT_NICHT);
        }
        break;

      case PREIS_AENDERN_FUER_ALLE_ARTIKEL:
        if (existiert_lager) {
          lager.aenderePreisFuerAlleArtikel(einleseProzensatz());
        }
        else {
          System.out.println(MSG_LAGER_EXISTIERT_NICHT);
        }
        break;

      case BESTANDS_LISTE:
        if (existiert_lager) {
          System.out.println(lager.ausgebenBestandsListe());
        }
        else {
          System.out.println(MSG_LAGER_EXISTIERT_NICHT);
        }
        break;

      case ENDE:
        System.out.println("Programmende");
        break;

      default:
        System.out.println("Falsche Funktion!");
    }
    System.out.println(lager+"\n");
  }

  //------------------EINLESEN METHODEN-------------------------------

  /**
  * Die checks werden in der Hauptfunktion (zB legeArtikelAn) ausgefuehrt
  *
  */

  //------------------LAGER-------------------------------

  int intZahl = 0;
  double doubleZahl = 0.0;


  private String einleseLagerName() {
    System.out.print("Lagername: ");
    return input.nextLine();
  }

  private int einleseLagerGroesse() {
    System.out.print("Lagergroesse: ");
    intZahl = input.nextInt();
    input.nextLine();
    return intZahl;
  }

  //------------------ARTIKEL-------------------------------
  private int einleseArtikelNummer() {
    System.out.print("Artikelnummer: ");
    intZahl = input.nextInt();
    input.nextLine();
    return intZahl;
  }

  private String einleseArtikelBezeichnung() {
    System.out.print("Artikelbezeichnung: ");
    return input.nextLine();
  }

  private int einleseArtikelBestand() {
    System.out.print("Artikelbestand: ");
    intZahl = input.nextInt();
    input.nextLine();
    return intZahl;
  }

  private double einleseArtikelPreis() {
    System.out.print("Artikelpreis: ");
    doubleZahl =input.nextDouble();
    input.nextLine();
    return doubleZahl;
  }


  //------------------CD-------------------------------

  private String einleseTitel(){
    System.out.print("Titel: ");
    return input.nextLine();
  }

  private String einleseInterpret(){
    System.out.print("Interpret: ");
    return input.nextLine();
  }

  private int einleseAintZahlMusikTitel(){
    System.out.print("AintZahlMusikTitel: ");
    intZahl = input.nextInt();
    input.nextLine();
    return intZahl;
  }

  //------------------DVD-------------------------------

  private int einleseSpieldauer(){
    System.out.print("Spieldauer: ");
    intZahl = input.nextInt();
    input.nextLine();
    return intZahl;
  }

  private int einleseErscheinungsjahr(){
    System.out.print("Erscheinungsjahr: ");
    intZahl = input.nextInt();
    input.nextLine();
    return intZahl;
  }

  //------------------BUCH-------------------------------

  private String einleseAutor(){
    System.out.print("Autor: ");
    return input.nextLine();
  }

  private String einleseVerlag(){
    System.out.print("Verlag: ");
    return input.nextLine();
  }

  //------------------METHODE-------------------------------

  private int bestand() {
    System.out.print("Menge von Artikeln: ");
    intZahl = input.nextInt();
    input.nextLine();
    return intZahl;
  }

  private double einleseProzensatz() {
    System.out.print("Prozensatz (kann positiv oder negativ sein): ");
    doubleZahl = input.nextDouble();
    input.nextLine();
    return doubleZahl;
  }

  //------------------TypVonArtikel-------------------------------

  /**
  *  Erfragt vom Benutzer die Daten
  *  fuer einen Artikel(Artikel, Cd, DVD oder Buch)
  *  und veranlasst das Lager den erzeugen Artikel
  *  aufzunehmen
  */

  private void TypVonArtikel()
  {
    int artikelTyp = -100;

    //Attribute eines Artikels
    int    artikelnummer, artikelbestand;
    double artikelpreis;
    String artikelbezeichnung;

    //Attribute einer CD
    String interpret, titel;
    int    aintZahlMusikTitel;

    //Attribute eines DVD
    int  spieldauer;
    int    erscheinungsjahr;

    //Attribute eines Buches
    String autor, verlag;

    artikelnummer = einleseArtikelNummer();
    artikelbezeichnung = einleseArtikelBezeichnung();
    artikelbestand = einleseArtikelBestand();
    artikelpreis = einleseArtikelPreis();

    artikelTyp = einlesenArtikel();

    switch (artikelTyp)
    {
      case ARTIKEL :
        lager.legeArtikelAn(new Artikel( artikelnummer, artikelbezeichnung,
        artikelbestand,
        artikelpreis
        ));
        break;

      case CD :
        titel = einleseTitel();
        interpret = einleseInterpret();
        aintZahlMusikTitel = einleseAintZahlMusikTitel();
        lager.legeArtikelAn( new CD( artikelnummer, artikelbezeichnung,
        artikelbestand,
        artikelpreis, interpret,
        titel, aintZahlMusikTitel));
        break;
        
      case BUCH :
        titel = einleseTitel();
        autor = einleseAutor();
        verlag = einleseVerlag();
        lager.legeArtikelAn( new Buch( artikelnummer, artikelbezeichnung,
        artikelbestand,
        artikelpreis, titel,
        autor, verlag));
        break;

      case DVD :
        titel = einleseTitel();
        spieldauer = einleseSpieldauer();
        erscheinungsjahr = einleseErscheinungsjahr();
        lager.legeArtikelAn( new DVD( artikelnummer, artikelbezeichnung,
        artikelbestand,
        artikelpreis, titel,
        spieldauer, erscheinungsjahr));
        break;

      default:
      System.out.println("Falsche Funktion");

    }
  }



  /**
  * Main-Methode zum Erzeugen des LagerDialog-Objektes und zum starten der Testschleife
  */
  public static void main (String[] args) {
    try {
      new LagerDialog().start();
    } catch(Throwable e) {
      System.out.println("main: Ausnahme gefangen: " + e);
    }
  }
}
