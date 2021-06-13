import React, { Component, useContext, useState, useCallback, useEffect } from 'react';
import { Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  Pressable,
  ImageBackground,
  RefreshControl,
  Button
} from 'react-native';
var {height, width } = Dimensions.get('window');
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import GlobalStyle from "../components/GlobalStyle";
import {httpServer, api_key} from '../const';
import { openDatabase } from 'react-native-sqlite-storage';
import {AuthContext} from "../context/authContext";
import SlidingUpPanel from 'rn-sliding-up-panel';

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
    // let panelPlace;
    // let panelPrice;
    const [panelPlace, setPanelPlace] = useState(null);
    const [panelPrice, setPanelPrice] = useState(null);
    const [statusFilter, setStatusFilter] = useState(null);
    

    const getTopList = useCallback(async (temp=null) => {
        try {
            const uri = '?page=2&expand=spheres&fields=id,title,label,image,date_from,date_to,kind,free';
            let data = await request(uri, 'GET', null, {});
            if(temp)
            for (let i=0; i < data.items.length; i++) {
                data.items[i].like = false;
                for (let k=0; k < temp.length; k++) {
                    if (data.items[i].id == temp[k]) {
                        data.items[i].like = true;
                    }
                }
            }
            setSaveIvents(data.items);
        } catch (e) {
        }
    }, [request]);

    const getTopListFI = useCallback(async () => {
        console.log("auth-", auth.token)
        db.transaction((tx) => {
            tx.executeSql(
            'SELECT * FROM table_user',
            [],
            (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i) {
                    if (results.rows.item(i).user_name == auth.token) {
                        temp.push(results.rows.item(i).like);
                    }                    
                }
                getTopList(null, temp);
            }
            );
        });
        if (topBanne.length === 0) {
            getTopList();
        }
    }, [request]);

    useEffect(() => {
        getTopListFI();
    }, [getTopListFI])

    const onPressHandler = async (id) => {
        console.log(id);
        navigation.navigate('event', {
            itemId: id,
        });
    };

    const onLikeHandler = (item) => {
        if (item.like) {
            db.transaction((tx) => {
                tx.executeSql(
                  'DELETE FROM  table_user where like=?',
                  [item.id]
                );
            });
            item.like = false;
            console.log("delete-like-", item.id);
        }
        else {
            db.transaction(function (tx) {
                tx.executeSql(
                  'INSERT INTO table_user (user_name, like) VALUES (?,?)',
                  [auth.token, item.id]
                );
            });
            item.like = true;
            console.log("add-like-", item.id);
        }
        // auth.login(auth.token)
        setSaveIvents([...saveIvents]);
    };

    const onMenuHomeHandler = () => {
        navigation.navigate('Home');
    };

    const onMenuSaveHandler = () => {
        navigation.navigate('MyIvents');
    };
    
    
    const RenderItemA = ({item, index}) => {
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
                                {item.like ? (
                                    <Image
                                    style={styles.iconLike}
                                    source={require('../image/likeActive.png')}
                                    />
                                ) : (
                                    <Image
                                    style={styles.iconLike}
                                    source={require('../image/like.png')}
                                    />
                                )}
                                
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
                        onRefresh={getTopList}
                        colors={['#F16844']}
                    />
                }
            />
        );
    }



    return (
        <View style={styles.body}>

                <View style={styles.glavMenu}>
                <ScrollView 
                contentOffset={{x: 0, y: 0}}
                horizontal={true}
                style={styles.scrollViewMenu}
                >
                <Pressable 
                >
                    <Text 
                    style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textMenuItemActiv,
                    ]}
                    >
                        Все мероприятия
                    </Text>
                </Pressable>
                <Pressable 
                onPress={() => onMenuHomeHandler()}
                >
                    <Text 
                    style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textMenuItem,
                    ]}
                    >
                        Мероприятия
                    </Text>
                </Pressable>
                <Pressable 
                onPress={() => onMenuSaveHandler()}
                >
                    <Text 
                    style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textMenuItem,
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

            <View style={styles.cartSearchLiner}>
                <ScrollView 
                horizontal={true}
                style={styles.scrollViewFilter}
                >
                <Pressable 
                style={styles.buttonFilterM}
                >
                    <Image
                        style={styles.iconFilter}
                        source={require('../image/filter.png')}
                    />
                </Pressable>
                <Pressable 
                style={styles.buttonFilter}
                >
                    <Text 
                    style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textFilterItem,
                    ]}
                    >
                        Дата
                    </Text>
                    <Image
                        style={styles.iconFilterMen}
                        source={require('../image/strel.png')}
                    />
                </Pressable>
                {statusFilter ? (
                    <Pressable 
                    style={styles.buttonFilterActiv}
                    onPress={() => {
                        panelPlace.show();
                        console.log("panelPlace-", panelPlace)
                    }}
                    >
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textFilterItemActiv,
                        ]}
                        >
                            {statusFilter}
                        </Text>
                        <Image
                            style={styles.iconFilterMenActiv}
                            source={require('../image/strelActiv.png')}
                        />
                    </Pressable>
                ) : (
                    <Pressable 
                    style={styles.buttonFilter}
                    onPress={() => {
                        panelPlace.show();
                        console.log("panelPlace-", panelPlace)
                    }}
                    >
                        <Text 
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textFilterItem,
                        ]}
                        >
                            Место
                        </Text>
                        <Image
                            style={styles.iconFilterMen}
                            source={require('../image/strel.png')}
                        />
                    </Pressable>
                )}
                <Pressable 
                style={styles.buttonFilter}
                onPress={() => {
                    panelPrice.show();
                    console.log("panelPrice-")
                }}
                // onPress={() => panelPrice.show()}
                >
                    <Text 
                    style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textFilterItem,
                    ]}
                    >
                        Цена
                    </Text>
                    <Image
                        style={styles.iconFilterMen}
                        source={require('../image/strel.png')}
                    />
                </Pressable>
                </ScrollView>
            </View>
            <View style={styles.mainList}>
                {saveIvents ? <RenderItemA /> : null}
                
            </View>



            


            <SlidingUpPanel 
            stateID={2} 
            draggableRange={{top: 240, bottom: 0}}
            ref={c => setPanelPrice(c)}
            >
            <View style={styles.containerPrice}>
                <FlatList
                    style={styles.flatListPlaces}
                    keyExtractor={(item, index) => index.toString()}
                    data={[
                        {text: 'Бесплатно'},
                        {text: 'Платно'},
                        {text: 'Неважно'}
                    ]}
                    renderItem={({ item, index }) => (
                        <Pressable 
                        key={index}
                        style={styles.buttonPlacesItem}
                        >
                            <Text 
                            style={[
                                GlobalStyle.CustomFontRegular,
                                styles.textPlacesItem,
                            ]}
                            >
                                {item.text}
                            </Text>
                        </Pressable>

                    )}
                />
                <Pressable 
                onPress={() => panelPrice.hide()} 
                style={styles.buttonClous}
                >
                    <Text 
                    style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textbuttonClous,
                    ]}
                    >
                        Отменить
                    </Text>
                </Pressable>
            </View>
            </SlidingUpPanel>

            <SlidingUpPanel
            draggableRange={{top: height-300, bottom: 0}}
            ref={k => setPanelPlace(k)}
            >
                
                    
                    
            <View style={styles.containerPlaces}>
                <FlatList
                    style={styles.flatListPlaces}
                    keyExtractor={(item, index) => index.toString()}
                    data={[
                        {text: 'ВДНХ'},
                        {text: 'Музейный парк'},
                        {text: 'Парк Зарядье'},
                        {text: 'Лианозовский променад',},
                        {text: 'Пресненская набережная'},
                        {text: 'Парк Света'},
                    ]}
                    renderItem={({ item, index }) => (
                        <Pressable 
                        key={index}
                        style={styles.buttonPlacesItem}
                        onPress={() => setStatusFilter(item.text)}
                        >
                            <Text 
                            style={[
                                GlobalStyle.CustomFontRegular,
                                styles.textPlacesItem,
                            ]}
                            >
                                {item.text}
                            </Text>
                        </Pressable>

                    )}
                />
                <Pressable 
                onPress={() => panelPlace.hide()} 
                style={styles.buttonClous}
                >
                    <Text 
                    style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textbuttonClous,
                    ]}
                    >
                        Отменить
                    </Text>
                </Pressable>
            </View>
            </SlidingUpPanel>


        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignContent: 'center',
    },
    flatListPlaces: {
        width: '100%',
        paddingTop: 30,
        paddingLeft: 32,
        paddingRight: 32,
    },
    textPlacesItem: {
        width: '100%',
        height: 48,
    },
    textbuttonClous: {
        paddingLeft: width/2 - 45,
    },
    buttonClous: {
        backgroundColor: '#fff',
        width: '100%',
        height: 60,
        position: 'absolute',
        bottom: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
        alignContent: 'center',
        justifyContent: 'center',
    },
    containerPlaces: {
        width,
        height: height-300,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    containerPrice: {
        width,
        height: 240,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    scrollViewFilter: {
    },
    cartSearchLiner: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        width: '100%',
        height: 45,
    },
    buttonFilterM: {
        marginRight: 15,
    },
    iconFilter: {
        marginTop: 4,
        width: 24,
        height: 16,
    },
    buttonFilter: {
        width: 80,
        height: 29,
        backgroundColor: '#E6E6F0',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        paddingLeft: 10,
        marginRight: 10,
    },
    buttonFilterActiv: {
        height: 29,
        backgroundColor: '#0060CC',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        paddingLeft: 10,
        marginRight: 10,
    },
    iconFilterMen: {
        marginTop: 4,
        width: 7.5,
        height: 3.75,
    },
    iconFilterMenActiv: {
        marginLeft: 10,
        marginTop: 3,
        width: 7,
        height: 6.57,
        marginRight: 10,
    },
    textFilterItem: {
        width: 54,
        color: '#000',
        fontSize: 15,
    },
    textFilterItemActiv: {
        color: '#FFFFFF',
        fontSize: 15,
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

