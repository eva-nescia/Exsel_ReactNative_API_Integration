import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, ActivityIndicator, Button } from 'react-native';
import { Employee } from '../../src/types/employee';
import { getEmployees } from '../../src/api/employeeApi';
import { EmployeeCard } from '../../src/components/EmployeeCard';
import { styles } from '../../src/styles/homeStyles';

export default function HomeScreen() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await getEmployees();
      setEmployees(data);
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

  return (
    <View style={{ flex: 1 }}>
      <Button title="Reload" onPress={fetchEmployees} />
      <FlatList<Employee>
        data={filteredEmployees}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <EmployeeCard employee={item} />}
        contentContainerStyle={styles.listPadding}
      />
    </View>
  );
}