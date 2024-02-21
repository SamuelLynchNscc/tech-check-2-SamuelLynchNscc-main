(function (tests) {
  const DATA_URL = "https://prog2700.onrender.com/dna/dnaMap.json";
  const DNA_SEQUENCE = "GTGCCAATGTTACTGCTAAATCTCTATATACAGTGGCTTAAGGATGGGGGGCCCAGCAGCGGCCGACCCCCCCCCTCAGTGTGGAATCAACCGGAATTGAGG";

  const extractCodonsFromDNA = (dnaSequence) => {
    const codons = [];

    for (let i = 0; i < dnaSequence.length; i += 3) {
      if (i + 3 <= dnaSequence.length) {
        codons.push(dnaSequence.substr(i, 3));
      }
    }

    return codons;
  };

  const translateCodonsToAminos = (codons, jsonData) => {
    const aminos = [];

    for (const codon of codons) {
      let found = false;

      for (const aminoAcid of jsonData) {
        if (aminoAcid.codons.includes(codon)) {
          aminos.push(aminoAcid.abbr);
          found = true;
          break;
        }
      }

      if (!found) {
        aminos.push('Unknown');
      }
    }

    return aminos;
  };

  const runProgram = async () => {
    const codons = extractCodonsFromDNA(DNA_SEQUENCE);
    let aminos;

    try {
      const response = await fetch(DATA_URL);
      const json = await response.json();
      aminos = translateCodonsToAminos(codons, json);
      tests.runTests(codons, aminos);
    } catch (error) {
      console.error('Error fetching or parsing JSON:', error);
    }
  };

  runProgram();
})(tests);