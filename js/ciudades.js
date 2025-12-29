class Kyoto extends Entrada {
  static contador = 0;

  constructor(titulo, parrafos) {
    Kyoto.contador += 1;
    super(Kyoto.contador, titulo, parrafos, "Kyoto");
  }
}

class Osaka extends Entrada {
  static contador = 0;

  constructor(titulo, parrafos) {
    Osaka.contador += 1;
    super(Osaka.contador, titulo, parrafos, "Osaka");
  }
}

class Nagoya extends Entrada {
  static contador = 0;

  constructor(titulo, parrafos) {
    Nagoya.contador += 1;
    super(Nagoya.contador, titulo, parrafos, "Nagoya");
  }
}

class Tokyo extends Entrada {
  static contador = 0;

  constructor(titulo, parrafos) {
    Tokyo.contador += 1;
    super(Tokyo.contador, titulo, parrafos, "Tokyo");
  }
}
