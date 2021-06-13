import {useState, useCallback, useEffect} from 'react';
import {AsyncStorage} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const storageName = 'JWT';

export const useAuth = () => {
    const [token, setToken] = useState(3);
    const [ready, setReady] = useState(false);
    const [list, setList] = useState(null);

    const login = useCallback((jwtToken) => {
        

        db.transaction((tx) => {
            tx.executeSql(
            'SELECT * FROM table_user',
            [],
            (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i) {
                    if (results.rows.item(i).user_name == jwtToken) {
                        console.log("yeeesss")
                        temp.push(results.rows.item(i).like);
                    }
                    
                    console.log("db-", temp);
                    
                }
                setList(temp)
                console.log("temp-", temp)  
            }
            );
        });
        setToken(jwtToken);
        AsyncStorage.setItem("JWT", jwtToken);

    }, []);

    const logout = useCallback(()=> {
        setToken(null);

        AsyncStorage.removeItem("JWT");
    }, []);

    useEffect( async () => {
        db.transaction((tx) => {
            tx.executeSql(
            'SELECT * FROM table_user',
            [],
            (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i) {
                    if (results.rows.item(i).user_name == 3) {
                        console.log("yeeesss")
                        temp.push(results.rows.item(i).like);
                    }
                    
                    console.log("db-", temp);
                    
                }
                setList(temp)
                console.log("temp-", temp)  
            }
            );
        });

        const jwt = await AsyncStorage.getItem("JWT");

        if (jwt) {
            login(jwt);
        }
        setReady(true);
    }, [login]);


    return { login, logout, token, ready, list };
}