import { useState } from 'react'

import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Pressable, 
  FlatList
} from 'react-native';

//Gerenciador de tarefas
export default function App() {

  //Estado inicial para a tarefa e para as listas de tarefas
  const [tarefa, setTarefa] = useState ('') //Para o objeto
  const [tarefas, setTarefas] = useState ([]) //Para a lista de tarefas

  function adicionarTarefa(){

    //Verificar se o campo de tarefa está vazio
    if (tarefa === ''){
      return
    }

    //Criar um novo objeto de tarefa
    const novaTarefa = {
      id: Date.now(),
      nome: tarefa,
      concluida: false
    }

    //Adicionar a nova tarefa à lista de tarefas
    setTarefas([...tarefas, novaTarefa])

    //Setar o campo de tarefa para vazio após adicionar a tarefa
    setTarefa('')
  }

  function concluirTarefa(id){
    //Criar uma nova lista de tarefas autalizada,
    //onde a tarefa com o id correspondente tem seu estado
    //de conclusão invertido
    const listaAtualizada = tarefas.map(item => {

      if (item.id === id){
        return{
          ...item,
          concluida: !item.concluida
        }
      }
      return item
    })
    setTarefas(listaAtualizada)
  }
  function excluirTarefa(id){
    //Criar uma nova lista de tarefas atualizada,
    //onde a tarefa com o id correspondente é removida
    const listaAtualizada = tarefas.filter(
      item => item.id !== id
    )
    //Atualizar a nova lista de tarefas
    setTarefas(listaAtualizada)
  }
  //renderizar a interface do aplicativo
return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Gerenciador de Tarefas
      </Text>

      <Text style={styles.label}>
        Digite uma tarefa que deseja adicionar a lista.
      </Text>
      <TextInput
        style={styles.input}
        placeholder='Digite uma tarefa'
        value={tarefa}
        onChangeText={setTarefa}
      />
       
      {/* Botão para adicionar tarefa */}
      <Pressable
        style={styles.botao}
        onPress={adicionarTarefa}
      >
        <Text style={styles.textoBotao}>
          Adicionar
        </Text>
      </Pressable>

      <Text>
        Total de Tarefas: {tarefas.length}
      </Text>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (

          <View style={styles.item}>

            <Pressable
              onPress={() => concluirTarefa(item.id)}
            >
              <Text
                style={[
                  styles.nome,
                  item.concluida && styles.concluida
                ]}
              >
                {item.nome}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => excluirTarefa(item.id)}
            >
              <Text style={styles.excluir}>
                X
              </Text>
            </Pressable>

          </View>

        )}
      />

    </View>

  )
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#473636',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },

  label: {
    marginBottom: 10,
    fontSize: 16,
  },
  
  resultado: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10
  },

  nome: {
    fontSize: 18
  },

  concluida: {
    textDecorationLine: 'line-through',
    color: '#f01b1b'
  },

  excluir: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18
  },

});