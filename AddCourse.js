import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const AddCourse = ({ route, navigation }) => {
    const { addCourse, getNextCourseCode, schools } = route.params;
    const [courseName, setCourseName] = useState('');
    const [courseCode, setCourseCode] = useState(getNextCourseCode());
    const [selectedSchool, setSelectedSchool] = useState('');

    useEffect(() => {
        setCourseCode(getNextCourseCode());
    }, [courseName, selectedSchool]);

    const handleSubmit = () => {
        if (!courseName || !selectedSchool) {
            alert("Course name and school selection are required.");
            return;
        }

        const newCourse = {
            id: Math.random().toString(),
            course_name: courseName,
            course_code: courseCode,
            school: selectedSchool,
        };

        addCourse(newCourse);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add New Course</Text>

            <Text style={styles.label}>Course Name</Text>
            <TextInput style={styles.input} value={courseName} onChangeText={setCourseName} placeholder="Enter Course Name" />

            <Text style={styles.label}>Course Code</Text>
            <Text style={[styles.input, styles.disabledInput]}>{courseCode}</Text>

            <Text style={styles.label}>School</Text>
            <RNPickerSelect onValueChange={setSelectedSchool} items={schools.map(school => ({ label: school, value: school }))} />

            <Button title="Add Course" onPress={handleSubmit} color="#7ac142" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#333' },
    label: { fontSize: 18, fontWeight: 'bold', marginTop: 15, color: '#000' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginTop: 5, backgroundColor: '#f9f9f9', color: '#333', fontSize: 16 },
    disabledInput: { backgroundColor: '#e0e0e0', color: '#777' },
    buttonContainer: { marginTop: 20, alignItems: 'center' },
});

// Picker Styles
const pickerSelectStyles = {
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#7ac142',
        borderRadius: 10,
        color: '#000',
        backgroundColor: '#f5f5f5',
        marginBottom: 10,
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#7ac142',
        borderRadius: 10,
        color: '#000',
        backgroundColor: '#f5f5f5',
        marginBottom: 10,
    },
    placeholder: {
        color: '#555',
        fontSize: 16,
    },
};

export default AddCourse;
