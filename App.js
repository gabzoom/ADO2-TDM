import * as React from 'react';
import { Text, View, StyleSheet, FlatList, Pressable, Image,Modal } from 'react-native';
import Constants from 'expo-constants';

async function executeGet(url,jsonState){
  await fetch(url)
  .then(response => {
        if (response.status === 200) {
          console.log('Acesso a API com sucesso!');
          response.json().then(function(result){ 
            jsonState(result)
            });
        } else {
          throw new Error('Erro ao consumir a API!');
        }
    })
    .then(response => {
      //console.debug(response);
    }).catch(error => {
      console.error(error);
    });
}

const ShowDetalhes = ({display,toogleModal,mensagem}) => (   
  <Modal
        animationType="slide"
        transparent={true}
        visible={display}
        onRequestClose={toogleModal}
  >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
              <Pressable onPress={toogleModal}>
                <Text>Titulo da Foto:</Text>
                <Text>{mensagem}</Text>
              </Pressable>
        </View>
      </View>    
  </Modal>        
)

const Foto = ({userId, id, title, completed}) => {    
    const [modal,setModal] = React.useState(false)
    function mudaModal(){
      setModal(!modal)
    }

    return(
    <View>
      <ShowDetalhes display={modal} toogleModal={mudaModal} mensagem={title}/>      
      <Pressable onPress={mudaModal}>      
        <Text style={styles.paragraph}>Title: {title}</Text>
        <Text style={styles.paragraph}>Id: {id}</Text>        
      </Pressable>
   
    <View
        style={{
          marginTop:20,
          borderBottomColor: '#50fa7b',
          borderBottomWidth: 1,
        }}
      />
    </View>
    )
}

const ListHeader = () => {
    //View to set in Header
    return (
      <View style={styles.headerFooterStyle}>
        <Text style={styles.textStyle}>ADO - Requisição GET e Cabeçalho Flatlist</Text>
      </View>
    );
  };

export default function App() {
  const [jsonData,setJsonData] = React.useState({})
  executeGet("https://jsonplaceholder.typicode.com/todos",setJsonData)
  function meuItem({item}){    
    return(
      <Foto userId={item.userId} 
              id={item.id}
              title={item.title}
              completed={item.completed}
      />
    )
  }  

  return (
    <View style={styles.container}>
      <FlatList      
       ListHeaderComponent={ListHeader}
        data={jsonData}
        renderItem={meuItem}
        keyExtractor={item => item.id}
      />      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  paragraph: {
    padding: 12,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottomColor: 'black',
    borderWidth: 2
  },
  modalView: {
    margin: 20,
    backgroundColor: "black",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerFooterStyle: {
    width: '100%',
    height: 45,
    marginBottom: 20,
    backgroundColor: 'black',
  },
  textStyle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    padding: 7,
  },
});