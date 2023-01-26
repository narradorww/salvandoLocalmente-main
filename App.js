import React, { useState, useEffect }from 'react'
import { SafeAreaView, StatusBar, StyleSheet, FlatList } from "react-native"
import NotaEditor from "./src/componentes/NotaEditor"
import { Nota } from './src/componentes/Nota'
import { criaTabela, buscaNotas, verificaTabela, mostraConteudoTabela, apagaTabela} from './src/services/Notas'


export default function App() {

  const [notas, setNotas] = useState([])
  const [notaSelecionada, setNotaSelecionada] = useState({})

  useEffect(() => {
    criaTabela();
    verificaTabela();
    mostraConteudoTabela();
    mostraNotas()
    apagaTabela('PostIt')
    
  }, [])
  


async function mostraNotas(){
  const todasNotas =  buscaNotas()
  setNotas(todasNotas)
  console.log("mostranotas",todasNotas)
  }

  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={notas}
        renderItem={(nota) => <Nota {...nota} setNotaSelecionada={setNotaSelecionada}/>}
        keyExtractor={nota => nota.id}
       />
      <NotaEditor mostraNotas={mostraNotas} notaSelecionada={notaSelecionada}/>
      <StatusBar/>
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "flex-start",
	},
})

