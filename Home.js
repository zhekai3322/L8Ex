import React, { useState, useEffect } from 'react';
import { View, FlatList, Button, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgreen',
        flex: 1,
        padding: 10,
    },
    bookItem: {
        flexDirection: 'row',
        marginVertical: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
    image: {
        width: 50,
        height: 75,
    },
    details: {
        flex: 1,
        marginLeft: 10,
    },
    title: {
        fontWeight: 'bold',
    },
    buttonContainer: {
        padding: 10,
    },
});

const Home = ({ navigation }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const getBooks = async () => {
            const storedBooks = await AsyncStorage.getItem('books');
            if (storedBooks) {
                setBooks(JSON.parse(storedBooks));
            }
        };

        getBooks();
    }, []);

    const handleDelete = async (isbn) => {
        const updatedBooks = books.filter((book) => book.isbn !== isbn);
        setBooks(updatedBooks);
        await AsyncStorage.setItem('books', JSON.stringify(updatedBooks));
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={books}
                keyExtractor={(item) => item.isbn}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.bookItem}
                        onPress={() => navigation.navigate('Edit', { book: item, setBooks })}
                    >
                        <Image source={{uri: item.imageUrl}} style={styles.image} />
                        <View style={styles.details}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text>ISBN: {item.isbn}</Text>
                            <Text>Copies: {item.copies}</Text>
                        </View>
                        <Button title="Delete" color="red" onPress={() => handleDelete(item.isbn)} />
                    </TouchableOpacity>
                )}
            />
            <View style={styles.buttonContainer}>
                <Button
                    title="Add New Book"
                    onPress={() => {
                        console.log('Add New Book button pressed');
                        navigation.navigate('Add', {setBooks, datastring: JSON.stringify(books)});
                    }}
                />
            </View>
        </View>
    );
};

export default Home;
