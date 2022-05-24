/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import axios from 'axios';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {View, Text, FlatList, ScrollView, SafeAreaView} from 'react-native';

const App = () => {
  const names = 'Xavier';
  const jobs = 'Empresario';
  const [data, setData] = useState([]);
  const [any, setLoading] = useState(true);
  const [dataPost, setDataPost] = useState('');
  const [dataPut, setDataPut] = useState('');
  const [dataDelete, setDataDelete] = useState('');

  useEffect(() => {
    axios
      .get('https://reqres.in/api/users?page=2')
      .then(({data}) => {
        setData(data.data);
      })
      .catch(({error}) => console.log(error))
      .finally(() => setLoading(false));

    axios
      .post('https://reqres.in/api/users', {name: names, job: jobs})
      .then(({data}) => {
        setDataPost(
          `Su cuenta esta creada: Nombre: ${data.name}, Trabajo: ${data.job}, Creación: ${data.createdAt}, ${data.id}`,
        );
      })
      .then(() => {
        console.log(dataPost);
      });

    axios
      .put('https://reqres.in/api/users/2', {
        name: 'Jonathan',
        job: 'Programador',
      })
      .then(({data}) => {
        setDataPut(
          `Editada la cuenta: Nombre:${data.name}, Trabajo: ${data.job}, Actualizacion: ${data.updatedAt}`,
        );
      });

    axios.delete('https://reqres.in/api/users/2').then(() => {
      setDataDelete(`Se Elimino la cuenta con exito`);
    });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <View style={styles.textB}>
            <Text style={styles.text}>Función GET</Text>
            <FlatList
              data={data}
              renderItem={({item}) => (
                <Text style={styles.container}>
                  Id: {item.id}, Nombre: {item.first_name}, Apellido:{' '}
                  {item.last_name}, Correo: {item.email}
                </Text>
              )}
            />
          </View>

          <View style={styles.textB}>
            <Text style={styles.text}>Función Post</Text>
            <Text>{dataPost}</Text>
          </View>

          <View style={styles.textB}>
            <Text style={styles.text}>Función Put</Text>
            <Text>{dataPut}</Text>
          </View>

          <View style={styles.textB}>
            <View>
              <Text style={styles.text}>Función Delete</Text>
              <Text>{dataDelete}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
