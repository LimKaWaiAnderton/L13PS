import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Modify = ({ route, navigation }) => {
    const { record, staticDetails } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Course Details</Text>

            <Text style={styles.label}>Course Name</Text>
            <TextInput style={styles.input} value={record.course_name} editable={false} />

            <Text style={styles.label}>School</Text>
            <TextInput style={styles.input} value={record.school} editable={false} />

            {staticDetails ? (
                <>
                    <Text style={styles.label}>Aggregate Range</Text>
                    <TextInput style={styles.input} value={staticDetails.aggregate_range} editable={false} />

                    <Text style={styles.label}>Entry Requirements</Text>
                    {Object.entries(staticDetails.entry_requirements).map(([key, value], index) => (
                        <View key={index} style={styles.entryContainer}>
                            <Text style={styles.subject}>{key}</Text>
                            <TextInput style={styles.input} value={value} editable={false} />
                        </View>
                    ))}
                </>
            ) : (
                <Text style={styles.noData}>No additional entry requirements available.</Text>
            )}

            <View style={styles.buttonContainer}>
                <Button title="Go Back" onPress={() => navigation.goBack()} color="#7ac142" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        color: '#000',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        marginTop: 5,
        backgroundColor: '#f9f9f9',
        color: '#333',
        fontSize: 16,
    },
    entryContainer: {
        marginTop: 10,
    },
    subject: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
    },
    noData: {
        fontSize: 16,
        color: 'gray',
        marginTop: 10,
        fontStyle: 'italic',
    },
    buttonContainer: {
        marginTop: 20,
    },
});

export default Modify;
