import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { colors } from '../theme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      setError('');
    } catch (e) {
      setError('Incorrect email or password.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome Back</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.gray}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={colors.gray}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      <Button title="Log In" onPress={handleLogin} color={colors.navy} />
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: colors.white },
  heading: { fontSize: 28, fontWeight: 'bold', color: colors.navy, marginBottom: 24, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#D8DEE9', borderRadius: 8, padding: 12, marginBottom: 12, color: colors.navy },
  error: { color: colors.red, marginBottom: 12, textAlign: 'center' },
  link: { color: colors.teal, textAlign: 'center', marginTop: 20 },
});
