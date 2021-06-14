import React, { Component, useContext, useState, useCallback, useEffect } from 'react';
import { Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  TextInput,
  Pressable,
  ImageBackground,
  AsyncStorage
} from 'react-native';
import {AuthContext} from "../context/authContext";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import { openDatabase } from 'react-native-sqlite-storage';
import GlobalStyle from "../components/GlobalStyle";

var db = openDatabase({ name: 'UserDatabase.db' });

function AuthorizationScreen({ navigation }) {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState([
        {text: "Московское долголетие", status: false},
        {text: "Концерты", status: false},
        {text: "Спектакли", status: false},
        {text: "Выставки", status: false},
        {text: "Игры", status: false},
        {text: "Экскурсии", status: false},
        {text: "События в парках", status: false},
        {text: "Спортивные события", status: false},
        {text: "Праздники", status: false},
        {text: "Лекции", status: false},
        {text: "Мастер-классы", status: false},
        {text: "Кино", status: false},
        {text: "Городские фестивали", status: false},
        {text: "Квесты", status: false},
        {text: "Образование", status: false},
        {text: "Акции", status: false},
        {text: "Чтения", status: false},
    ]);
    const [form1, setForm1] = useState({text: "Московское долголетие", status: false});
    const [form2, setForm2] = useState({text: "Концерты", status: false});
    const [form3, setForm3] = useState({text: "Спектакли", status: false});
    const [form4, setForm4] = useState({text: "Выставки", status: false});
    const [form5, setForm5] = useState({text: "Игры", status: false});
    const [form6, setForm6] = useState({text: "Экскурсии", status: false});
    const [form7, setForm7] = useState({text: "События в парках", status: false});
    const [form8, setForm8] = useState({text: "Спортивные события", status: false});
    const [form9, setForm9] = useState({text: "Праздники", status: false});
    const [form10, setForm10] = useState({text: "Лекции", status: false});
    const [form11, setForm11] = useState({text: "Мастер-классы", status: false});
    const [form12, setForm12] = useState({text: "Кино", status: false});
    const [form13, setForm13] = useState({text: "Городские фестивали", status: false});
    const [form14, setForm14] = useState({text: "Квесты", status: false});
    const [form15, setForm15] = useState({text: "Образование", status: false});
    const [form16, setForm16] = useState({text: "Акции", status: false});
    const [form17, setForm17] = useState({text: "Чтения", status: false});

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

    const AuthHandler = () => {
        auth.login(3);
        navigation.navigate('Home');
    }

    if (loading) {
        return <Loader />
    }

    return (
        <View style={styles.body}>
            <Text 
            style={[
                GlobalStyle.CustomFontBold,
                styles.textHeader,
            ]}
            >
                Выберите 3 сферы мероприятий, которые вам интересны
            </Text>
            <View style={styles.cart}>
                {/* 1 */}
                <View style={styles.liner}>
                    <Pressable 
                    onPress={() => setForm1({text: form1.text, status: !form1.status})}
                    style={form1.status ? styles.buttonActiv : styles.button}
                    >   
                    {form1.status ? (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButtonActiv,
                        ]}
                        >
                            {form1.text}
                        </Text>
                    ): (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButton,
                        ]}
                        >
                            {form1.text}
                        </Text>
                    )}  
                    </Pressable>
                    
                    <Pressable 
                    onPress={() => setForm2({text: form2.text, status: !form2.status})}
                    style={form2.status ? styles.buttonActiv : styles.button}
                    >   
                    {form2.status ? (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButtonActiv,
                        ]}
                        >
                            {form2.text}
                        </Text>
                    ): (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButton,
                        ]}
                        >
                            {form2.text}
                        </Text>
                    )}  
                    </Pressable>
                </View>
                {/* 2 */}
                <View style={styles.liner}>
                    <Pressable 
                    onPress={() => setForm3({text: form3.text, status: !form3.status})}
                    style={form3.status ? styles.buttonActiv : styles.button}
                    >   
                    {form3.status ? (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButtonActiv,
                        ]}
                        >
                            {form3.text}
                        </Text>
                    ): (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButton,
                        ]}
                        >
                            {form3.text}
                        </Text>
                    )}  
                    </Pressable>
                    
                    <Pressable 
                    onPress={() => setForm4({text: form4.text, status: !form4.status})}
                    style={form4.status ? styles.buttonActiv : styles.button}
                    >   
                    {form4.status ? (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButtonActiv,
                        ]}
                        >
                            {form4.text}
                        </Text>
                    ): (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButton,
                        ]}
                        >
                            {form2.text}
                        </Text>
                    )}  
                    </Pressable>

                    <Pressable 
                    onPress={() => setForm5({text: form5.text, status: !form5.status})}
                    style={form5.status ? styles.buttonActiv : styles.button}
                    >   
                    {form5.status ? (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButtonActiv,
                        ]}
                        >
                            {form5.text}
                        </Text>
                    ): (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButton,
                        ]}
                        >
                            {form5.text}
                        </Text>
                    )}  
                    </Pressable>
                </View>
                {/* 3 */}
                <View style={styles.liner}>
                    <Pressable 
                    onPress={() => setForm6({text: form6.text, status: !form6.status})}
                    style={form6.status ? styles.buttonActiv : styles.button}
                    >   
                    {form6.status ? (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButtonActiv,
                        ]}
                        >
                            {form6.text}
                        </Text>
                    ): (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButton,
                        ]}
                        >
                            {form6.text}
                        </Text>
                    )}  
                    </Pressable>
                    
                    <Pressable 
                    onPress={() => setForm7({text: form7.text, status: !form7.status})}
                    style={form7.status ? styles.buttonActiv : styles.button}
                    >   
                    {form7.status ? (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButtonActiv,
                        ]}
                        >
                            {form7.text}
                        </Text>
                    ): (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButton,
                        ]}
                        >
                            {form7.text}
                        </Text>
                    )}  
                    </Pressable>
                </View>
                {/* 4 */}
                <View style={styles.liner}>
                    <Pressable 
                    onPress={() => setForm8({text: form8.text, status: !form8.status})}
                    style={form8.status ? styles.buttonActiv : styles.button}
                    >   
                    {form8.status ? (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButtonActiv,
                        ]}
                        >
                            {form8.text}
                        </Text>
                    ): (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButton,
                        ]}
                        >
                            {form8.text}
                        </Text>
                    )}  
                    </Pressable>
                    
                    <Pressable 
                    onPress={() => setForm9({text: form9.text, status: !form9.status})}
                    style={form9.status ? styles.buttonActiv : styles.button}
                    >   
                    {form9.status ? (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButtonActiv,
                        ]}
                        >
                            {form9.text}
                        </Text>
                    ): (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButton,
                        ]}
                        >
                            {form9.text}
                        </Text>
                    )}  
                    </Pressable>
                </View>
                {/* 5 */}
                <View style={styles.liner}>
                    <Pressable 
                    onPress={() => setForm10({text: form10.text, status: !form10.status})}
                    style={form10.status ? styles.buttonActiv : styles.button}
                    >   
                    {form10.status ? (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButtonActiv,
                        ]}
                        >
                            {form10.text}
                        </Text>
                    ): (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButton,
                        ]}
                        >
                            {form10.text}
                        </Text>
                    )}  
                    </Pressable>
                    
                    <Pressable 
                    onPress={() => setForm11({text: form11.text, status: !form11.status})}
                    style={form11.status ? styles.buttonActiv : styles.button}
                    >   
                    {form11.status ? (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButtonActiv,
                        ]}
                        >
                            {form11.text}
                        </Text>
                    ): (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButton,
                        ]}
                        >
                            {form11.text}
                        </Text>
                    )}  
                    </Pressable>

                    <Pressable 
                    onPress={() => setForm12({text: form12.text, status: !form12.status})}
                    style={form12.status ? styles.buttonActiv : styles.button}
                    >   
                    {form12.status ? (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButtonActiv,
                        ]}
                        >
                            {form12.text}
                        </Text>
                    ): (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButton,
                        ]}
                        >
                            {form12.text}
                        </Text>
                    )}  
                    </Pressable>
                </View>
                {/* 6 */}
                <View style={styles.liner}>
                    <Pressable 
                    onPress={() => setForm13({text: form13.text, status: !form13.status})}
                    style={form13.status ? styles.buttonActiv : styles.button}
                    >   
                    {form13.status ? (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButtonActiv,
                        ]}
                        >
                            {form13.text}
                        </Text>
                    ): (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButton,
                        ]}
                        >
                            {form13.text}
                        </Text>
                    )}  
                    </Pressable>
                    
                    <Pressable 
                    onPress={() => setForm14({text: form14.text, status: !form14.status})}
                    style={form14.status ? styles.buttonActiv : styles.button}
                    >   
                    {form14.status ? (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButtonActiv,
                        ]}
                        >
                            {form14.text}
                        </Text>
                    ): (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButton,
                        ]}
                        >
                            {form14.text}
                        </Text>
                    )}  
                    </Pressable>
                </View>
                {/* 7 */}
                <View style={styles.liner}>
                    <Pressable 
                    onPress={() => setForm15({text: form15.text, status: !form15.status})}
                    style={form15.status ? styles.buttonActiv : styles.button}
                    >   
                    {form15.status ? (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButtonActiv,
                        ]}
                        >
                            {form15.text}
                        </Text>
                    ): (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButton,
                        ]}
                        >
                            {form15.text}
                        </Text>
                    )}  
                    </Pressable>
                    
                    <Pressable 
                    onPress={() => setForm16({text: form16.text, status: !form16.status})}
                    style={form16.status ? styles.buttonActiv : styles.button}
                    >   
                    {form16.status ? (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButtonActiv,
                        ]}
                        >
                            {form16.text}
                        </Text>
                    ): (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButton,
                        ]}
                        >
                            {form16.text}
                        </Text>
                    )}  
                    </Pressable>

                    <Pressable 
                    onPress={() => setForm17({text: form17.text, status: !form17.status})}
                    style={form17.status ? styles.buttonActiv : styles.button}
                    >   
                    {form17.status ? (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButtonActiv,
                        ]}
                        >
                            {form17.text}
                        </Text>
                    ): (
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButton,
                        ]}
                        >
                            {form17.text}
                        </Text>
                    )}  
                    </Pressable>
                </View>
            </View>

            <Pressable 
            onPress={() => AuthHandler()}
            style={styles.buttonAuth}
            >   
                <Text 
                style={[
                    GlobalStyle.CustomFontRegular,
                    styles.textAuth,
                ]}
                >
                    Составить ленту мероприятий
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
    textHeader: {
        marginTop: 20,
        width: '100%',
    },
    cart: {
        width: '100%',
        marginTop: 0,
    },
    liner: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 35,
    },
    button: {

    },
    buttonActiv: {

    },
    textButton: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 11,
        paddingRight: 11,
        borderRadius: 15,
        marginRight: 20,
        color: '#0060CC',
        height: 30,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#96B8EB',
    },
    textButtonActiv: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 11,
        paddingRight: 11,
        borderRadius: 15,
        marginRight: 20,
        color: '#fff',
        height: 30,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#0060CC',
        backgroundColor: '#0060CC',
    },
    buttonAuth: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        height: 50,
        backgroundColor: '#E5E6E8',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textAuth: {
        color: '#8E8E8E'
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

