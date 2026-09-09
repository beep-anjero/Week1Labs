import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { colors } from '../theme';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSignup() {
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      setError('');
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Account</Text>
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
        placeholder="Password (6+ characters)"
        placeholderTextColor={colors.gray}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      <Button title="Sign Up" onPress={handleSignup} color={colors.navy} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Log In</Text>
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
