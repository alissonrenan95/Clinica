CREATE TABLE Paciente (
  id INTEGER UNSIGNED  NOT NULL   AUTO_INCREMENT,
  cpf BIGINT UNSIGNED  NOT NULL  ,
  nome VARCHAR(150)  NOT NULL  ,
  datanascimento DATE  NOT NULL  ,
  telefone BIGINT UNSIGNED  NOT NULL  ,
  urlimagem VARCHAR(200)  NOT NULL    ,
PRIMARY KEY(id)  ,
UNIQUE INDEX Paciente_uniqueindex(cpf))
TYPE=InnoDB;



CREATE TABLE Atendimento (
  id INTEGER UNSIGNED  NOT NULL   AUTO_INCREMENT,
  pacienteid INTEGER UNSIGNED  NOT NULL  ,
  datahoraatendimento DATETIME  NOT NULL  ,
  concluido BOOL  NOT NULL    ,
PRIMARY KEY(id)  ,
INDEX Atendimento_FKIndex1(pacienteid),
  FOREIGN KEY(pacienteid)
    REFERENCES Paciente(id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION)
TYPE=InnoDB;



CREATE TABLE Examecovid (
  id INTEGER UNSIGNED  NOT NULL   AUTO_INCREMENT,
  atendimentoid INTEGER UNSIGNED  NOT NULL  ,
  febre BOOL  NOT NULL  ,
  coriza BOOL  NOT NULL  ,
  narizentupido BOOL  NOT NULL  ,
  cansaco BOOL  NOT NULL  ,
  tosse BOOL  NOT NULL  ,
  dordecabeca BOOL  NOT NULL  ,
  doresnocorpo BOOL  NOT NULL  ,
  malestargeral BOOL  NOT NULL  ,
  dordegarganta BOOL  NOT NULL  ,
  dificuldadederespirar BOOL  NOT NULL  ,
  faltadepaladar BOOL  NOT NULL  ,
  faltadeolfato BOOL  NOT NULL  ,
  dificuldadedelocomocao BOOL  NOT NULL  ,
  diarreia BOOL  NOT NULL  ,
  concluido BOOL  NULL    ,
PRIMARY KEY(id)  ,
INDEX Examecovid_FKIndex1(atendimentoid),
  FOREIGN KEY(atendimentoid)
    REFERENCES Atendimento(id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION)
TYPE=InnoDB;



CREATE TABLE Examegeral (
  id INTEGER UNSIGNED  NOT NULL   AUTO_INCREMENT,
  atendimentoid INTEGER UNSIGNED  NOT NULL  ,
  pressaosistolica INTEGER UNSIGNED  NOT NULL  ,
  pressaodiastolica INTEGER UNSIGNED  NOT NULL  ,
  pulsacao INTEGER UNSIGNED  NOT NULL  ,
  respiracao INTEGER UNSIGNED  NOT NULL  ,
  temperatura FLOAT  NOT NULL  ,
  concluido BOOL  NOT NULL    ,
PRIMARY KEY(id)  ,
INDEX Examegeral_FKIndex1(atendimentoid),
  FOREIGN KEY(atendimentoid)
    REFERENCES Atendimento(id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION)
TYPE=InnoDB;




