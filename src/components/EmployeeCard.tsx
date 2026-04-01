import React from 'react';
import { View, Text } from 'react-native';
import { Employee } from '../types/employee';
import { getBgColorByAge } from '../utils/helpers';
import { styles } from '../styles/homeStyles';

interface EmployeeCardProps {
  employee: Employee;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  return (
    <View style={[styles.card, { backgroundColor: getBgColorByAge(employee.employee_age) }]}>
      <Text style={styles.nameLabel}>
        Name: <Text style={styles.nameValue}>{employee.employee_name}</Text>
      </Text>
      <Text>Age: {employee.employee_age}</Text>
      <Text>Salary: ${employee.employee_salary}</Text>
    </View>
  );
};