const mappa_note = [
  { nota: "A", valore: 0 },
  { nota: "A#", valore: 1 },
  { nota: "B", valore: 2 },
  { nota: "C", valore: 3 },
  { nota: "C#", valore: 4 },
  { nota: "D", valore: 5 },
  { nota: "D#", valore: 6 },
  { nota: "E", valore: 7 },
  { nota: "F", valore: 8 },
  { nota: "F#", valore: 9 },
  { nota: "G", valore: 10 },
  { nota: "G#", valore: 11 }
];

// Funzione per normalizzare le note bemolle in diesis
function normalizzaBemolle(nota) {
  nota = nota.toUpperCase();
  if (nota === "BB") return "A#";
  if (nota === "DB") return "C#";
  if (nota === "EB") return "D#";
  if (nota === "GB") return "F#";
  if (nota === "AB") return "G#";
  return nota;
}

// Funzione che calcola la scala musicale
function scala(inizio, tipo) {
  const maggiore = [2, 2, 1, 2, 2, 2, 1];  // Intervalli della scala maggiore
  const minore = [2, 1, 2, 2, 1, 2, 2];   // Intervalli della scala minore
  const intervallo = tipo === 0 ? maggiore : minore;  // Usa gli intervalli giusti per il tipo di scala

  let risultato = [mappa_note[inizio].nota];
  let notaCorrente = inizio;

  for (let i = 0; i < 7; i++) {
    notaCorrente = (notaCorrente + intervallo[i]) % 12;
    risultato.push(mappa_note[notaCorrente].nota);
  }

  return risultato;
}

// Funzione che calcola la relativa
function calcolaRelativa(valoreNota, tipoScala) {
  let nuovoIndice;
  if (tipoScala === 0) { // Scala maggiore
    nuovoIndice = (valoreNota - 3 + 12) % 12;
  } else { // Scala minore
    nuovoIndice = (valoreNota + 3) % 12;
  }
  return mappa_note[nuovoIndice].nota;
}

// Funzione che calcola la scala
function calcolaScala() {
  const inputNota = document.getElementById('nota').value.trim();
  const tipoScala = parseInt(document.getElementById('tipo').value);
  const risultatoDiv = document.getElementById('risultato');

  let nota = normalizzaBemolle(inputNota);

  // Trova il valore numerico della nota
  let valoreNota = mappa_note.find(n => n.nota === nota);

  if (!valoreNota) {
    risultatoDiv.innerHTML = "<p style='color: red;'>Nota non valida, vai a fare in culo!</p>";
    return;
  }

  // Calcoliamo la scala in base alla nota e al tipo di tonalità (maggiore o minore)
  const noteScala = scala(valoreNota.valore, tipoScala);  // Passiamo il valore della nota e il tipo di scala

  const tipoNome = tipoScala === 0 ? "Maggiore" : "Minore";

  // Calcoliamo la relativa per informare l'utente
  const relativa = calcolaRelativa(valoreNota.valore, tipoScala);

  risultatoDiv.innerHTML = `
    <h3>La relativa di ${nota} ${tipoNome} è: ${relativa}</h3>
    <p>Le note della scala sono: ${noteScala.join(' - ')}</p>
  `;
}
