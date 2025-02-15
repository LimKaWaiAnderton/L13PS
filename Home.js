import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Image, Button, ActivityIndicator } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import courses from './course.json'; // ✅ Import static course data

const Home = ({ navigation }) => {
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSchool, setSelectedSchool] = useState("All");
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userAddedCourses, setUserAddedCourses] = useState([]);

    useEffect(() => {
        fetch("https://data.gov.sg/api/action/datastore_search?resource_id=d_e333af6c20658af4d774e3ac868f4095")
            .then(response => response.json())
            .then(data => {
                if (data.result && data.result.records) {
                    setRecords(data.result.records);
                    setFilteredRecords(data.result.records);

                    const uniqueSchools = [...new Set(data.result.records.map(item => item.school))];
                    setSchools(["All", ...uniqueSchools]);
                }
            })
            .catch(error => console.error("Error fetching records:", error))
            .finally(() => setLoading(false));
    }, []);

    const getNextCourseCode = () => {
        const allCourses = [...records, ...userAddedCourses];
        const courseCodes = allCourses
            .map(course => course.course_code.match(/\d+/) ? parseInt(course.course_code.match(/\d+/)[0]) : null)
            .filter(code => code !== null);
        const highestCode = Math.max(...courseCodes, 0);
        return `R${highestCode + 1}`; // ✅ Auto-increment course code
    };

    const filterRecords = (query, school) => {
        let filtered = [...records, ...userAddedCourses];

        if (school !== "All") {
            filtered = filtered.filter(item => item.school === school);
        }

        if (query.trim() !== "") {
            filtered = filtered.filter(item =>
                item.course_name.toLowerCase().includes(query.toLowerCase()) ||
                item.course_code.toLowerCase().includes(query.toLowerCase()) // 🔹 Search course code too
            );
        }

        setFilteredRecords(filtered);
    };

    const addCourse = (newCourse) => {
        setUserAddedCourses(prevCourses => [...prevCourses, newCourse]);
        filterRecords(searchQuery, selectedSchool);
    };

    return (
        <View style={styles.container}>
            <Image source={require('./assets/banner.jpg')} style={styles.banner} />

            <TextInput
                style={styles.searchBar}
                placeholder="Search by Course Name or Code"
                placeholderTextColor="#CFCFCF"
                value={searchQuery}
                onChangeText={(text) => {
                    setSearchQuery(text);
                    filterRecords(text, selectedSchool);
                }}
            />

            <View style={styles.pickerContainer}>
                <RNPickerSelect
                    onValueChange={(value) => {
                        setSelectedSchool(value);
                        filterRecords(searchQuery, value);
                    }}
                    items={schools.map(school => ({ label: school, value: school }))}
                    value={selectedSchool}
                    style={pickerSelectStyles}
                    placeholder={{ label: "Select a School", value: "All" }}
                />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#7ac142" />
            ) : (
                <FlatList
                    data={filteredRecords}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        const staticDetails = courses.find(course => course.course_name === item.course_name) || null;

                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Modify', { record: item, staticDetails })}
                                style={styles.item}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.name}>{item.course_name}</Text>
                                <Text style={styles.details}>{item.school}</Text>
                                <Text style={styles.details}>{item.course_code}</Text>
                            </TouchableOpacity>
                        );
                    }}
                />
            )}

            <View style={styles.buttonContainer}>
                <Button
                    title="Add New Course"
                    onPress={() =>
                        navigation.navigate('AddCourse', {
                            addCourse,
                            getNextCourseCode, // ✅ Now passing the function correctly
                            schools,
                        })
                    }
                    color="#7ac142"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    banner: { width: '100%', height: 300, resizeMode: 'cover', borderRadius: 12, marginBottom: 20 },
    searchBar: { backgroundColor: '#fff', padding: 12, borderRadius: 8, color: '#000', fontSize: 16, marginBottom: 15, borderColor: '#000', borderBottomWidth: 1 },
    pickerContainer: { backgroundColor: '#f5f5f5', borderRadius: 10, borderWidth: 1, borderColor: '#7ac142', padding: 10, marginBottom: 15 },
    item: { padding: 20, marginVertical: 8, backgroundColor: '#f5f5f5', borderRadius: 12, borderLeftWidth: 5, borderLeftColor: '#7ac142' },
    name: { fontSize: 22, fontWeight: 'bold', color: '#000' },
    details: { fontSize: 16, color: '#000', marginTop: 5 },
    buttonContainer: { marginTop: 20, alignItems: 'center' },
});

const pickerSelectStyles = {
    inputIOS: { fontSize: 16, paddingVertical: 12, paddingHorizontal: 10, borderWidth: 1, borderColor: '#7ac142', borderRadius: 10, color: '#000', backgroundColor: '#f5f5f5', marginBottom: 10 },
    inputAndroid: { fontSize: 16, paddingVertical: 12, paddingHorizontal: 10, borderWidth: 1, borderColor: '#7ac142', borderRadius: 10, color: '#000', backgroundColor: '#f5f5f5', marginBottom: 10 },
    placeholder: { color: '#555', fontSize: 16 },
};

export default Home;
