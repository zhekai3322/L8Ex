import React, { useState } from 'react';
import { StatusBar, View, Button, Text, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = ({ navigation, route }) => {
    console.log('Route params:', route.params);
    const { setBooks } = route.params;
    const myBooks = route.params?.datastring ? JSON.parse(route.params.datastring) : [];

    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const [copies, setCopies] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async () => {
        console.log('Form submitted');
        if (!title || !isbn || !copies || !imageUrl) {
            console.log('Validation failed: All fields are required.');
            return;
        }

        const newBook = {
            title,
            isbn,
            copies: parseInt(copies, 10),
            imageUrl,
        };

        myBooks.push(newBook);
        const stringData = JSON.stringify(myBooks);

        setBooks(myBooks);
        try {
            await AsyncStorage.setItem('books', stringData);
            console.log('Book data saved successfully');
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar />
            <Text style={styles.label}>Title:</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter book title"
            />
            <Text style={styles.label}>ISBN:</Text>
            <TextInput
                style={styles.input}
                value={isbn}
                onChangeText={setIsbn}
                placeholder="Enter ISBN"
            />
            <Text style={styles.label}>Number of Copies:</Text>
            <TextInput
                style={styles.input}
                value={copies}
                onChangeText={setCopies}
                placeholder="Enter number of copies"
                keyboardType="numeric"
            />
            <Text style={styles.label}>Image URL:</Text>
            <TextInput
                style={styles.input}
                value={imageUrl}
                onChangeText={setImageUrl}
                placeholder="Enter image URL"
            />
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightyellow',
        flex: 1,
        padding: 16,
    },
    label: {
        fontSize: 16,
        marginVertical: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#000000',
        padding: 10,
        marginVertical: 8,
        borderRadius: 5,
    },
});

export default Add;
