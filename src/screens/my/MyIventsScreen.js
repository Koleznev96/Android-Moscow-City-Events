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
  RefreshControl
} from 'react-native';
var {height, width } = Dimensions.get('window');
import {useHttp} from "../../hooks/http.hook";
import {Loader} from "../../components/Loader";
import GlobalStyle from "../../components/GlobalStyle";
import {httpServer, api_key} from '../../const';
import { openDatabase } from 'react-native-sqlite-storage';
import {AuthContext} from "../../context/authContext";

var db = openDatabase({ name: 'UserDatabase.db' });

function MyIventsScreen({ navigation }) {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [myIvents, setMyIvents] = useState(null);
    const [saveIvents, setSaveIvents] = useState(null);
    const [menuStatus, setMenuStatus] = useState(true);
    const [Refreshing, setRefreshing] = useState(false);
    const [form, setForm] = useState({
        email: '', password: ''
    });

    const geSaveIventsList = useCallback(async (uri) => {
        console.log("uri-", uri)
        try {
            const data = await request(uri, 'GET', null, {});
            setSaveIvents(data.items);
            setMyIvents(data.items);
        } catch (e) {}
    }, [request]);

    const getSaveBdIventsList = useCallback(async () => {
        db.transaction((tx) => {
            tx.executeSql(
            'SELECT * FROM table_user',
            [],
            (tx, results) => {
                var temp = 'filter={"=id":[';
                for (let i = 0; i < results.rows.length; ++i) {
                    if (results.rows.item(i).user_name == auth.token) {
                        temp += '"' + results.rows.item(i).like + '",';
                    }                    
                }
                temp = temp.substring(0, temp.length-1) + ']}';
                console.log("temp-", temp)
                const uri = '?page=1&expand=spheres&fields=id,title,label,image,date_from,date_to,kind,free&' + temp;
                console.log(uri)
                geSaveIventsList(uri);
            }
            );
        });
    }, [request]);

    useEffect(() => {
        getSaveBdIventsList();
    }, [getSaveBdIventsList])

    const onPressHandler = async (id) => {
        console.log(id);
        navigation.navigate('event', {
            itemId: id,
        });
    };

    const onBiletHandler = async (id) => {
        console.log(id);
        navigation.navigate('Ticket', {
            itemId: id,
        });
    };

    const onLikeHandler = (item) => {
        const currentIndex = saveIvents.indexOf(item);
        const newChecked = [...saveIvents];

        newChecked.splice(currentIndex, 1);

        setSaveIvents(newChecked);
        setMyIvents(newChecked);

        db.transaction((tx) => {
            tx.executeSql(
              'DELETE FROM  table_user where like=?',
              [item.id]
            );
        });

        console.log("Like-", item.id);
    };

    const onMenuHomeHandler = () => {
        navigation.navigate('Home');
    };

    const onMenuIventsHandler = () => {
        navigation.navigate('Ivents');
    };
    
    
    const RenderItemA = ({item, index}) => {
        if(!myIvents) return null;
        return (
            <FlatList
                style={styles.flatList}
                keyExtractor={(item, index) => index.toString()}
                data={saveIvents}
                renderItem={({ item }) => (
                    <View style={styles.flatListItemLiner}>
                    <Pressable 
                    key={index}
                    style={styles.bannerItem} 
                    resizeMode="contain"
                    onPress={() => onPressHandler(item.id)}
                    >
                        <ImageBackground 
                        style={styles.imageBanner} 
                        source={{uri: "https://www.mos.ru" + item.image.small.src}}
                        >
                            <Pressable 
                            onPress={() => onLikeHandler(item)}
                            style={styles.likeButton}
                            >
                                <Image
                                    style={styles.iconLike}
                                    source={require('../../image/likeActive.png')}
                                />
                            </Pressable>
                        </ImageBackground>
                        <View style={styles.itemData}>

                            <Text 
                            style={[
                                GlobalStyle.CustomFontBold,
                                styles.textItemName,
                            ]}
                            >
                                {item.title}
                            </Text>

                            <Text 
                            style={[
                                GlobalStyle.CustomFontRegular,
                                styles.textItemDate,
                            ]}
                            >
                                {item.date_from.substring(0, item.date_from.length-9)}
                            </Text>
                            
                            <View style={styles.itemDataLiner}>
                                <View style={styles.itemDataLinerKategore}>
                                    <Text 
                                    style={[
                                        GlobalStyle.CustomFontRegular,
                                        styles.textitemDataLinerKategore,
                                    ]}
                                    >
                                        {item.free === 1 ? "Бесплатное" : "Платное"}
                                    </Text>

                                    <Text 
                                    style={[
                                        GlobalStyle.CustomFontRegular,
                                        styles.textitemDataLinerKategore,
                                    ]}
                                    >
                                        {/* {item.Cells.Name} */}
                                        Категория
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </Pressable>
                    </View>
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={Refreshing}
                        onRefresh={getSaveBdIventsList}
                        colors={['#F16844']}
                    />
                }
            />
        );
    }

    const RenderItemB = ({item, index}) => {
        return (
            <FlatList
                style={styles.flatList}
                keyExtractor={(item, index) => index.toString()}
                data={myIvents}
                renderItem={({ item }) => (
                    <View style={styles.flatListItemLiner}>
                    <Pressable 
                    key={index}
                    style={styles.bannerItem} 
                    resizeMode="contain"
                    >
                        <ImageBackground 
                        style={styles.imageBanner} 
                        source={{uri: "https://www.mos.ru" + item.image.small.src}}
                        >
                            <Pressable 
                            onPress={() => onLikeHandler(item)}
                            style={styles.likeButton}
                            >
                                <Image
                                    style={styles.iconLike}
                                    source={require('../../image/likeActive.png')}
                                />
                            </Pressable>
                        </ImageBackground>
                        <View style={styles.itemData}>

                            <Text 
                            style={[
                                GlobalStyle.CustomFontBold,
                                styles.textItemName,
                            ]}
                            >
                                {item.title}
                            </Text>

                            <Text 
                            style={[
                                GlobalStyle.CustomFontRegular,
                                styles.textItemDate,
                            ]}
                            >
                                {item.date_from.substring(0, item.date_from.length-9)}
                            </Text>
                            <View style={styles.linerButtonRegistr}>
                                <Pressable 
                                onPress={() => onBiletHandler(item.id)}
                                style={styles.buttonRegistr}
                                >
                                    <Text 
                                    style={[
                                        GlobalStyle.CustomFontRegular,
                                        styles.textItemBilet,
                                    ]}
                                    >
                                        Билет
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </Pressable>
                    </View>
                )}
            
            />
        );
    }

    return (
        <View style={styles.body}>

                <View style={styles.glavMenu}>
                <ScrollView 
                contentOffset={{x: 200, y: 0}}
                horizontal={true}
                style={styles.scrollViewMenu}
                >
                <Pressable 
                onPress={() => onMenuHomeHandler()}
                >
                    <Text 
                    style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textMenuItem,
                    ]}
                    >
                        Подборки
                    </Text>
                </Pressable>

                <Pressable 
                onPress={() => onMenuIventsHandler()}
                >
                    <Text 
                    style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textMenuItem,
                    ]}
                    >
                        Все мероприятия
                    </Text>
                </Pressable>
                
                <Pressable 
                
                >
                    <Text 
                    style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textMenuItemActiv,
                    ]}
                    >
                        Мои события
                    </Text>
                </Pressable>
                <Pressable 
                >
                    <Text 
                    style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textMenuItem,
                    ]}
                    >
                        Календарь
                    </Text>
                </Pressable>
                </ScrollView>
                </View>

            <View style={styles.cartSearch}>
                <View style={styles.cartSearchLiner}>
                    <TextInput
                    style={styles.input}
                    placeholder='Поиск мероприятий'
                    onChangeText={(value)=>setForm({email: value, password: form.password})}
                    />

                    <View style={styles.searchHr} />
                </View>
                <View style={styles.cartSearchKategoreLiner}>
                    <FlatList
                    horizontal={true}
                    data={[
                        {key: 'Devin'},
                        {key: 'Dan'},
                        {key: 'Dominic'},
                        {key: 'Jackson'},
                        {key: 'James'},
                        {key: 'Joel'},
                    ]}
                    renderItem={({item, index}) => 
                        <Text 
                        key={index}
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textitemDataLinerKategore,
                        ]}
                        >
                            {/* {item.Cells.Name} */}
                            Категория
                        </Text>
                    }
                    /> 
                </View>

                <View style={styles.cartMenu}>
                    <View style={styles.menuLinerStatus}>
                        <Pressable 
                        style={styles.menuItem} 
                        onPress={() => setMenuStatus(true)}
                        >  
                            <Text 
                            style={[
                                GlobalStyle.CustomFontRegular,
                                styles.textMenuItem,
                            ]}
                            >
                                Избранное
                            </Text>
                        </Pressable>
                        <Pressable 
                        style={styles.menuItem} 
                        onPress={() => setMenuStatus(false)}
                        >  
                            <Text 
                            style={[
                                GlobalStyle.CustomFontRegular,
                                styles.textMenuItem,
                            ]}
                            >
                                Иду
                            </Text>
                        </Pressable>
                    </View>
                    <View style={styles.menuLinerStatus}>
                        <View style={menuStatus ? styles.menuStatusActive : styles.menuStatus}/> 
                        <View style={!menuStatus ? styles.menuStatusActive : styles.menuStatus}/> 
                    </View>
                </View>
            </View>
            <View style={styles.mainList}>
                {menuStatus ? (
                    saveIvents ? <RenderItemA /> : null
                ): (
                    myIvents ? <RenderItemB /> : null
                )}
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
    },
    scrollViewMenu: {
        height: 40,
    },
    glavMenu: {
        width: '100%',
        height: 60,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    textMenuItem: {
        color: '#888B8E',
        fontSize: 20,
        paddingLeft: 25,
        paddingTop: 5,

    },
    textMenuItemActiv: {
        color: '#0060CC',
        fontSize: 20,
        paddingLeft: 25,
        paddingTop: 5,
    },
    likeButton: {
        width: '100%',
        height: 50,
    },
    flatList: {
        width: '100%',
    },
    mainList: {
        width: '100%',
        marginTop: 10,
        paddingLeft: 16,
        paddingRight: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide: {
        backgroundColor: 'red',
    },
    flatListItemLiner: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerItem: {
        width: '98%',
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    imageBanner: {
        height: 100,
        width: '100%',
        borderRadius: 5,
    },
    itemData: {
        width: '100%',
        padding: 16,
    },
    textItemName: {
        color: '#000',
        fontSize: 14,
    },
    textItemDate: {
        color: '#5E5E5E',
        fontSize: 12,
        marginTop: 6,
    },
    itemDataLiner: {
        width: '100%',
        marginTop: 8,
        flexDirection: 'row',
        marginBottom: 10,
    },
    itemDataLinerKategore: {
        width: 250,
        flexDirection: 'row',
    },
    textitemDataLinerKategore: {
        paddingLeft: 11,
        paddingRight: 11,
        borderRadius: 10,
        marginRight: 10,
        color: '#17569E',
        height: 18,
        fontSize: 12,
        borderWidth: 1,
        borderColor: '#96B8EB',
    },
    itemDataLinerLike: {
    },
    cartMenu: {
        marginTop: 10,
        width: '100%',
    },
    menuLinerStatus: {
        marginBottom: 10,
        width: '100%',
        flexDirection: 'row',
    },
    menuItem: {
        width: '50%',
        alignItems: 'center',
    },
    menuStatus: {
        width: '50%',
        backgroundColor: '#9E9E9E',
        height: 1,
    },
    menuStatusActive: {
        width: '50%',
        backgroundColor: '#000',
        height: 2,
    },
    mainBanner: {
        width: '100%',
    },
    textConstHeaderBanner: {
        marginHorizontal: 32,
        paddingTop: 10,
        paddingBottom: 10,
    },
    slide: {
        backgroundColor: 'red',
    },
    textName: {
        color: '#000',
        fontSize: 18,
    },
    text: {
        color: '#000',
        fontSize: 18,
        fontStyle: 'italic',
        margin: 10,
    },
    cartSearch: {
        width: '100%',
        paddingLeft: 16,
        paddingRight: 16,
    },
    input: {
        width: width,
        height: 40,
        paddingRight: 10,
    },
    searchHr: {
        backgroundColor: '#9D9D9D',
        width: '100%',
        height: 1,
    },
    cartSearchKategoreLiner: {
        marginTop: 10,
        marginBottom: 10,
        width: '100%',
        flexDirection: 'row',
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
    headerLine: {
        width: '100%',
        height: 1,
        backgroundColor: '#E8E8E8'
    },
    main: {
        padding: 30,
        width: '100%',
        height: 80,
    },
    
    mainBannerLiner: {
        width: width, 
        alignItems:'center'
    },
    mainBannerLinerSwiper: {
        height: 150,
    },
    iconLike: {
        width: 26.67,
        height: 24.47,
        position: 'absolute',
        right: 15,
        top: 15,
    },
    iconSpeck: {
        width: 18,
        height: 18,
    },
    linerButtonRegistr: {
        marginTop: 8,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonRegistr: {
        backgroundColor: '#0060CC',
        width: '96%',
        height: 41,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    textItemBilet: {
        color: '#fff',
    },
});

export default MyIventsScreen;

