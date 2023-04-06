Array.prototype.randomize = function () {
  return this[Math.floor(Math.random() * this.length)];
};

module.exports = function (friend, array) {
  const l = friend[1] === 'm' ? 'o' : 'a';

  const nome = friend[0];

  const frasi = {
    roast: [
      `${nome}, ti suggerisco di andare in practice tool per imparare a giocare. PER FAVORE! Succhi i cazzi amico!`,
      `${nome}, torna a giocare a tetris. Aspetta. Sai giocare a tetris?`,
      `${nome}, puoi fare qualcos'altro nella tua vita oltre che League? Fai veramente schifo`,
      'Oh mio dio. Non riesco più a guardarvi. Fate davvero shifo.',
      `${nome} smettila di giocare. Per favore.`,
      `Porca miseria ${nome}. Riesci a colpire qualocsa? Go next ${nome}`,
      `Dio santo sei veramente orrendo ${nome}`,
      `Wow ${nome}. Lo sai che è una vergogna che giochi così tanto a Lol, ma fai comunque schifo.`,
      `${nome}, gioca a qualcos'altro oltre che lol, per favore.`,
      `Non giocare mai più a lol ${nome}. Dai per favore. Odio vederti giocare una merda.`,
      `Sei una merda ${nome}. Lo sai vero?`,
      `FAI. DAVVERO. MERDA ${nome}`,
      `${nome}. Fai qualcos'altro nella tua vita. Ma non lol.`,
      `${nome} dai smettila. PER FAVOREEEEEE.`,
      `Get shit on ${nome}`,
      `Oddio. fai schifo ${nome}`,
      `Fai... fottutamente... schifo ${nome}`,
      `${nome} smettila di giocare. Vattene. Il resto della tua squadra sta meglio senza di te che fiddi.`,
      `${nome} FAI. DAVVERO. MERDA`,
      `Hai un'arachide al posto del cervello ${nome}`,
    ],
    morte: [
      `${nome} non fa niente, può capitare. cit`,
      `concentrati ${nome} vedrai che ti divertirai`,
      `fai un respiro profondo ${nome}`,
      `Eddai ${nome}, stai più attent${l}`,
      'boomrtrtrtrtrtrtrtrtrtrtrtrtrtrt',
      `Tranquill${l} ${nome} è solo una kill, è ancora recuperabile. Forse`,
      `8? biscotto? pivotto? sei mort${l} ${nome}`,
      `${nome} ora puoi solo pregare`,
      `${nome} cosa hai sbagliato qui secondo te?`,
      `${nome} se sei stat${l} gankat${l}, metti più ward, non è detto ma forse aiuta`,
      `${nome} l'avversario ha giocato meglio di te ora. Ma stai tranquill${l} lo batterai più avanti`,
      `Rip ${nome}, la prossima volta prova a non morire`,
      `Ora puoi solo pregare pische`,
      `${nome}, può capitare`,
    ],
    uccisione: [
      `ua fratm hai fatto un khill, ebbrav${l} ${nome}`,
      `Ma sei fortissim${l}, ${nome} hai spaccato`,
      `${nome} non ti montare la testa e rimani concentrat${l}`,
      `Non male ${nome}`,
      `${nome} ti sei superat${l}`,
      `Meccanicamente faceva schifo, ${nome}, ma una kill è una kill`,
      `Potevi giocartela meglio ${nome}`,
      `Mi sei piaciut${l} ${nome}, complimenti`,
      `Stava andando male, però dai ${nome}, non te la sei cavata male`,
      `Poteva andare peggio ${nome}`,
      `${nome} ti prego sfondami`,
    ],
    aceA: [
      'Bravissimi avete fatto eis, ora pensate bene cosa fare',
      'Ottimo eis, potreste fare il baron?',
      'Ottimo eis, potreste fare il drago?',
      'Ottimo eis, potrestre prendere una torre?',
      'Veloci, capitalizzate il tempo ottenuto. Ah comunque molto bravi',
      "Controllate i timer, forse c'è qualcosa da fare",
      'Potete chiudere il game?',
      'Vi ricordo la lista delle priorità: Inibitori, Torri, Baron o Herald, Elder, Montagna, Fuoco, Oceano, Aria',
    ],
    aceN: ['gli avversari hanno fatto un eis'],
    audioMorte: [
      'babysitt',
      'duh',
      'tbc',
      'ff-notok',
      'rockbuild',
      'bruh',
      'badumtss',
    ],
    audioUccisione: [
      'bravo',
      'fkyou',
      'ff-boss',
      'fottissimo',
      'inculo',
      'bruh',
      'mlg',
      'pace',
      'planoculo',
    ],
    inizioGame: [
      'ue uagliu, divertitevi',
      'com è bel sta partitel',
      'sono spawnati i minion',
      'cacca',
      'corri in lain',
      'daje',
      'carichi',
      'ti voglio carico',
      'daje raga',
    ],
    fineGame: [
      'Il game è finito andate in pace',
      'è finita ragazzi',
      'vediamo i danni',
    ],
    primoSangueA: [
      `Wow ma che hai combinato ${nome}, complimenti per il primo sangue`,
    ],
    primoSangueN: [
      `Primo sangue? Ma ti rendi conto ${nome}? È una kill importante questa`,
    ],
    primaTorre: [
      `Ok complimenti ${nome}, hai preso la prima torre, ma cerca di non farti sopraffare dalla sindrome dello yorick`,
    ],
    tripleKill: [`tripol kill, bravo ${nome}`],
    quadraKill: [`ma chi ti ha imparato ${nome}`],
    pentaKill: [`penda! penda! uni penda! siiiiuuum ${nome}`],
  };
  const { [array]: scelto } = frasi;
  return scelto ? scelto.randomize() : '';
  /* if (frasi.hasOwnProperty(array)) return frasi[array].randomize();
  else {
    console.log("non esiste questa frase");
    return "";
  }*/
};
