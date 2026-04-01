import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { Employee } from '../../src/types/employee';

interface ApiResponse {
  data: Employee[];
}

export default function HomeScreen() {

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(
        'https://dummy.restapiexample.com/api/v1/employees'
      );
      const json: ApiResponse = await response.json();
      setEmployees(json.data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading employees...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1 }}>
        <Button title="Reload" onPress={fetchEmployees} />
        <View style={styles.center}>
          <Text>Failed to load data</Text>
        </View>
      </View>
    );
  }

  if (employees.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No employees found</Text>
      </View>
    );
  }

  const filteredEmployees = employees.filter(emp => emp.employee_salary > 500000);

  const getBgColorByAge = (age: number) => {
    if (age >= 50) return '#1cd93b';
    if (age >= 40) return 'rgb(228, 205, 35)d9'
    if (age >= 30) return '#1c2fd9'; 
    if (age >= 20) return '#d41818f3'; 
    return '#ffe6e6';              
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="Reload" onPress={fetchEmployees} />
      <FlatList<Employee>
        data={filteredEmployees}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: getBgColorByAge(item.employee_age) }]}>
            <Text style={styles.nameLabel}>
              Name: <Text style={styles.nameValue}>{item.employee_name}</Text>
            </Text>
            <Text>Age: {item.employee_age}</Text>
            <Text>Salary: ${item.employee_salary}</Text>
          </View>
        )}
        contentContainerStyle={styles.listPadding}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listPadding: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  nameLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  nameValue: {
    fontWeight: 'normal',
    color: '#555',
  },
});