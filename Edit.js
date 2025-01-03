import React, { useState } from 'react';
import { View, Button, Text, TextInput, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Edit = ({ navigation, route }) => {
    const { book, setBooks } = route.params;
    const [title, setTitle] = useState(book.title);
    const [isbn, setIsbn] = useState(book.isbn);
    const [copies, setCopies] = useState(String(book.copies));
    const [imageUrl, setImageUrl] = useState(book.imageUrl);

    const saveData = async (updatedBooks) => {
        await AsyncStorage.setItem('books', JSON.stringify(updatedBooks));
        setBooks(updatedBooks);
        navigation.navigate('Home');
    };

    const handleSave = () => {
        if (!title || !isbn || !copies || !imageUrl) {
            console.log('Validation failed: All fields are required.');
            return;
        }

        const updatedBooks = [];
        for (let i = 0; i < route.params.book.length; i++) {
            const currentBook = route.params.book[i];
            if (currentBook.isbn === book.isbn) {
                updatedBooks.push({
                    ...currentBook,
                    title,
                    isbn,
                    copies: parseInt(copies, 10),
                    imageUrl,
                });
            } else {
                // Add the book as is
                updatedBooks.push(currentBook);
            }
        }

        saveData(updatedBooks);
    };

    const handleDelete = () => {
        const updatedBooks = [];
        for (let i = 0; i < route.params.book.length; i++) {
            const currentBook = route.params.book[i];
            if (currentBook.isbn !== book.isbn) {
                updatedBooks.push(currentBook);
            }
        }

        saveData(updatedBooks);
    };
    return (
        <View style={styles.container}>
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
            <View style={styles.buttonContainer}>
                <Button title="Save" onPress={handleSave} />
                <Button
                    title="Delete"
                    color="red"
                    onPress={() =>
                        Alert.alert('Are you sure?', 'This will delete the book.', [
                            { text: 'Yes', onPress: handleDelete },
                            { text: 'No' },
                        ])
                    }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightblue',
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
});

export default Edit;
