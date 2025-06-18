import { jsPDF } from "jspdf";

export const generateSalarySlip = (employeeData) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Salary Slip", 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Name: ${employeeData.name}`, 20, 40);
    doc.text(`Position: ${employeeData.position}`, 20, 50);
    doc.text(`Shift: ${employeeData.shift}`, 20, 60);
    doc.text(`Basic Salary: ${employeeData.basicSalary}`, 20, 70);
    doc.text(`Overtime: ${employeeData.overtime}`, 20, 80);
    doc.text(`Bonus: ${employeeData.bonus}`, 20, 90);
    doc.text(`Deductions: ${employeeData.deductions}`, 20, 100);
    doc.text(`Total Salary: ${employeeData.totalSalary}`, 20, 110);

    return doc;
};

export const downloadSalarySlip = (employeeData) => {
    const doc = generateSalarySlip(employeeData);
    doc.save(`${employeeData.name}_salary_slip.pdf`);
};