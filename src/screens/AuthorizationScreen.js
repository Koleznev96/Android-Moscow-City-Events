import React, {useContext, useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Pressable,
    AsyncStorage
} from 'react-native';
import {AuthContext} from "../context/authContext";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

function AuthorizationScreen({ navigation }) {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    });

    useEffect(() => {
        db.transaction(function (txn) {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
            [],
            function (tx, res) {
              console.log('item:', res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), like VARCHAR(20))',
                  []
                );
              }
            }
          );
        });
    }, []);

    const AuthHandler = (user) => {
        auth.login(user);
    }

    if (loading) {
        return <Loader />
    }

    return (
        <View style={styles.body}>
            <Pressable
                onPress={() => AuthHandler(1) }
                style={styles.buttonAuth} 
                >
                    <Text style={styles.text}>
                        Пользователь №1
                    </Text>
                    <Text style={styles.text}>
                        Данные пользователя:
                    </Text>
            </Pressable>
            <Pressable
                onPress={() => AuthHandler(2) }
                style={styles.buttonAuth} 
                >
                    <Text style={styles.text}>
                        Пользователь №2
                    </Text>
                    <Text style={styles.text}>
                        Данные пользователя:
                    </Text>
            </Pressable>
            <Pressable
                onPress={() => AuthHandler(3) }
                style={styles.buttonAuth} 
                >
                    <Text style={styles.text}>
                        Пользователь №3
                    </Text>
                    <Text style={styles.text}>
                        Данные пользователя:
                    </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 10,
        paddingLeft: 16,
        paddingRight: 16,
    },
    buttonAuth: {
        width: '100%',
        backgroundColor: 'red',
        borderRadius: 10,
        marginBottom: 20,
    },
    panel: {

        flex: 1,
    },
    item: {
        margin: 10,
        backgroundColor: '#4ae1fa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#000',
        fontSize: 18,
        fontStyle: 'italic',
        margin: 10,
    },
    input: {
        width: 300,
        height: 32,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },
    inputMultiline: {
        width: 300,
        height: 100,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },
    buttonSend: {
        marginTop: 20,
    },
});

export default AuthorizationScreen;

