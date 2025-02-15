import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select'; // Import RNPickerSelect

const Home = ({ navigation }) => {
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSchool, setSelectedSchool] = useState("All"); // Default is 'All'
    const [schools, setSchools] = useState([]); // List of schools for the dropdown

    const fetchRecords = () => {
        fetch("https://data.gov.sg/api/action/datastore_search?resource_id=d_e333af6c20658af4d774e3ac868f4095")
            .then(response => response.json())
            .then(data => {
                if (data.result && data.result.records) {
                    setRecords(data.result.records);
                    setFilteredRecords(data.result.records); // Initialize filtered list

                    // Extract unique schools
                    const uniqueSchools = [...new Set(data.result.records.map(item => item.school))];
                    setSchools(["All", ...uniqueSchools]); // Add "All" option
                } else {
                    console.error("No records found in API response");
                }
            })
            .catch(error => console.error("Error fetching records:", error));
    };

    // Fetch records on component mount
    useEffect(() => {
        fetchRecords();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        filterRecords(query, selectedSchool);
    };

    const handleSchoolChange = (school) => {
        setSelectedSchool(school);
        filterRecords(searchQuery, school);
    };

    // Filtering function
    const filterRecords = (query, school) => {
        let filtered = records;

        if (school !== "All") {
            filtered = filtered.filter(item => item.school === school);
        }

        if (query.trim() !== "") {
            filtered = filtered.filter(item =>
                item.course_name.toLowerCase().includes(query.toLowerCase()) ||
                item.course_code.toLowerCase().includes(query.toLowerCase())
            );
        }

        setFilteredRecords(filtered);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('Modify', { record: item })}
            style={styles.item}
            activeOpacity={0.8}
        >
            <Text style={styles.name}>{item.course_name}</Text>
            <Text style={styles.details}>{item.school}</Text>
            <Text style={styles.details}>{item.course_code}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Image at the top */}
            <Image
                source={require('./assets/banner.jpg')} // Replace with your image path
                style={styles.banner}
            />

            {/* Search Bar */}
            <TextInput
                style={styles.searchBar}
                placeholder="Search by Course Name or Code"
                placeholderTextColor="#CFCFCF" // Light grey text
                value={searchQuery}
                onChangeText={handleSearch}
            />

            {/* School Filter Dropdown */}
            <View style={styles.pickerContainer}>
                <RNPickerSelect
                    onValueChange={handleSchoolChange}
                    items={schools.map(school => ({
                        label: school,
                        value: school,
                    }))}
                    value={selectedSchool}
                    style={pickerSelectStyles}
                    placeholder={{ label: "Select a School", value: "All" }}
                />
            </View>

            {/* List of Courses */}
            <FlatList
                data={filteredRecords}
                keyExtractor={(item, index) => index.toString()} // Using index as key if ID is unavailable
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        backgroundColor: '#fff',
    },
    banner: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        borderRadius: 12,
        marginBottom: 20,
    },
    searchBar: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        color: '#000',
        fontSize: 16,
        marginBottom: 15,
        borderColor: '#000',
        borderBottomWidth: 1,
    },
    pickerContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 15,
        padding: 5,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#7ac142',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 6,
        elevation: 5,
        borderLeftWidth: 5,
        borderLeftColor: '#7ac142',
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        letterSpacing: 0.5,
    },
    details: {
        fontSize: 16,
        color: '#000',
        marginTop: 5,
    },
});

// Custom styles for RNPickerSelect
const pickerSelectStyles = {
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 10,
        color: '#000',
        paddingRight: 30, // To ensure the text is not covered by the dropdown arrow
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 8,
        color: '#000',
        paddingRight: 30,
    },
    placeholder: {
        color: '#A0A0A0', // Placeholder text color
    },
};

export default Home;
