/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Routes } from  "./Routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/authContext";

import {SortContext} from "./context/sortContext";
import {useSort} from "./hooks/sort.hook";

import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });


const App = () => {
  const {token, login, logout, ready, list} = useAuth();
  const isAuthenticated = !!token;
  const routes = Routes(isAuthenticated);
  const {listConveniences, changeListConveniences} = useSort();

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

  return (
    <AuthContext.Provider value={{
      token, login, logout, isAuthenticated, list
  }}>
    <SortContext.Provider value={{
            listConveniences, changeListConveniences
        }}>
      {routes}
      </SortContext.Provider>
  </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
