import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

const tokenCreate = gql`
  mutation TokenCreate($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      token
      user {
        id
      }
      errors {
        message
        field
      }
    }
  }
`;

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [formSubmit, setFormSubmit] = React.useState({ email: '', password: '' });
  const [mutaFunc, { data, error, loading }] = useMutation(tokenCreate);
  const onChangeText = (text: string, name: string) => {
    setFormSubmit({ ...formSubmit, [name]: text });
  };

  const handleSubmit = () => {
    mutaFunc({ variables: { ...formSubmit } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Text style={styles.title}>Login</Text>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TextInput
        style={{ backgroundColor: '#fff', width: '100%', marginBottom: 10 }}
        onChangeText={(text) => onChangeText(text, 'email')}
        value={formSubmit.email}
      />
      <TextInput
        style={{ backgroundColor: '#fff', width: '100%' }}
        onChangeText={(text) => onChangeText(text, 'password')}
        value={formSubmit.password}
      />

      <TouchableOpacity onPress={handleSubmit}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
