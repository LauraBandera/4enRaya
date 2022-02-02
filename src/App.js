import React, { Component } from 'react';
import { Button, TabContent } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const MapaBotones = (props) => {
  let lista = [];
  let contC = props.contadorC;
  let contF = props.contadorF;
  //Comprobamos ganadores
  if(contC[0] == 4 || contF[0] == 4 || contF[1] == 4 || contF[1] == 4){
    if(contF[1] == 4 || contF[1] == 4){
      lista.push(<h1>Ganan los Rojos</h1>);
    }else{
      lista.push(<h1>Ganan los Azules</h1>);
    }
    //Desabilitamos el click de todos los botones
    for(let i = 0; i < props.tablero.length; i++){
      for(let j = 0; j < props.tablero[i].length; j++){
        let boton = <Button outline/>;
        if(props.tablero[i][j] != "secondary"){
          boton = <Button color={props.tablero[i][j]}/>;
        }
        lista.push(boton);
      }
      lista.push(<br/>);
    }
  }else{
    //Miramos de quién es el turno
    let turno = "Rojas";
    if(props.turno == 0){
      turno = "Azules";
    }
    lista.push(<h1>Turno jugador {turno}</h1>);
    //Añadimos la matriz con el tablero
    for(let i = 0; i < props.tablero.length; i++){
      for(let j = 0; j < props.tablero[i].length; j++){
        let boton = <Button outline onClick={() => props.click(i, j)}/>;
        if(props.tablero[i][j] != "secondary"){
          boton = <Button color={props.tablero[i][j]} onClick={() => props.click(i, j)}/>;
        }
        lista.push(boton);
      }
      lista.push(<br/>);
    }
  }
  return (lista);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaBotones: Array(9).fill(null),
      listaColores: ["primary", "danger"],
      numFila: Array(9).fill(null),
      contadoresF: [0, 0],
      contadoresC: [0, 0],
      flag: 0
    }
  }

  componentWillMount() {
    let tablero = this.state.listaBotones;
    let pos = this.state.numFila;
    for(let i = 0; i < tablero.length; i++){
      let fila = Array(9).fill("secondary");
      let p = 8;
      tablero[i] = fila;
      pos[i] = p;
    }
    this.setState({listaBotones: tablero, numFila: pos});
  }

  ponerFicha(f, c){
    let tablero = this.state.listaBotones;
    let turno = this.state.flag;
    let pos = this.state.numFila;
    if(f == 0 && tablero[pos[c]][c] == "secondary"){
      tablero[pos[c]][c] = this.state.listaColores[turno];
      //Miramos si hay ganador
      this.encontrarGanador(pos[c], c, tablero[pos[c]][c], turno);
      //Cambios el siguiente valor de la fila al que hemos metido
      if(pos[c] > 0){
        pos[c]--;
      }
      //Cambiamos el turno
      if(turno == 0){
        turno = 1;
      }else{
        turno = 0;
      }
    }
    this.setState({listaBotones: tablero, flag: turno, numFila: pos});
  }

  encontrarGanador(i, j, color, flag){
    let tab = this.state.listaBotones;
    let contF = [0,0];
    let f = 0;
    //Primero contamos la linea
    while(f < tab.length && contF[flag] < 4){
      if(tab[f][j] == color){
        contF[flag]++;
      }else{
        contF[flag] = 0;
      }
      f++;
    }
    let contC = [0,0];
    let c = 0;
    //luego contamos la columna
    while(c < tab[i].length && contC[flag] < 4){
      if(tab[i][c] == color){
        contC[flag]++;
      }else{
        contC[flag] = 0;
      }
      c++;
    }
    this.setState({contadoresC: contC, contadoresF: contF});
  }

  render() {
    return (
      <div className="App">
        <MapaBotones 
          contadorC={this.state.contadoresC} 
          contadorF={this.state.contadoresF} 
          click={(f, c) => this.ponerFicha(f, c)} 
          tablero={this.state.listaBotones} 
          turno={this.state.flag} 
          color={this.state.listaColores}
        />
      </div>
    );
  }
}
export default App;