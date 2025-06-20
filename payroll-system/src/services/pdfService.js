import { jsPDF } from "jspdf";
import 'jspdf-autotable'; // Jika Anda ingin menambahkan tabel yang lebih rapi (perlu di-install: npm install jspdf-autotable)

/**
 * Format angka ke format mata uang Rupiah
 * @param {number} value - Nilai yang akan diformat
 * @returns {string} Format mata uang Rupiah
 */
const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value);
};

/**
 * Generate slip gaji dalam format PDF
 * @param {Object} employeeData - Data karyawan dan gaji
 * @returns {jsPDF} - Dokumen PDF
 */
export const generateSalarySlip = (employeeData) => {
  try {
    // Inisialisasi dokumen PDF
    const doc = new jsPDF();
    
    // Header perusahaan
    doc.setFontSize(20);
    doc.setTextColor(0, 102, 204);
    doc.text("PT. NAMA PERUSAHAAN", 105, 20, { align: "center" });
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("SLIP GAJI KARYAWAN", 105, 30, { align: "center" });
    
    doc.setFontSize(10);
    doc.text("Jl. Contoh Alamat No. 123, Jakarta", 105, 35, { align: "center" });
    doc.text(`Periode: ${employeeData.period || new Date().toISOString().slice(0, 7)}`, 105, 40, { align: "center" });
    
    // Garis pembatas
    doc.setLineWidth(0.5);
    doc.line(20, 45, 190, 45);
    
    // Data karyawan
    doc.setFontSize(12);
    doc.text("DATA KARYAWAN", 20, 55);
    
    doc.setFontSize(10);
    doc.text(`Nama: ${employeeData.name}`, 20, 65);
    doc.text(`Jabatan: ${employeeData.position}`, 20, 70);
    doc.text(`Shift: ${employeeData.shift}`, 20, 75);
    
    // Tabel rincian gaji
    doc.setFontSize(12);
    doc.text("RINCIAN PENGHASILAN", 20, 90);
    
    // Menggunakan jspdf-autotable jika tersedia
    if (doc.autoTable) {
      doc.autoTable({
        startY: 95,
        head: [['Komponen', 'Nominal']],
        body: [
          ['Gaji Pokok', formatCurrency(employeeData.basicSalary || 0)],
          ['Lembur', formatCurrency(employeeData.overtime || 0)],
          ['Bonus', formatCurrency(employeeData.bonus || 0)],
          ['Potongan', `(${formatCurrency(employeeData.deductions || 0)})`],
          ['TOTAL DITERIMA', formatCurrency(employeeData.totalSalary || 0)]
        ],
        styles: { fontSize: 10 },
        headStyles: { fillColor: [66, 139, 202] },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        columnStyles: {
          0: { cellWidth: 100 },
          1: { cellWidth: 70, halign: 'right' }
        },
        foot: [['Total Diterima', formatCurrency(employeeData.totalSalary || 0)]],
        footStyles: { fillColor: [66, 139, 202], textColor: [255, 255, 255], fontStyle: 'bold' }
      });
    } else {
      // Fallback jika jspdf-autotable tidak tersedia
      doc.setFontSize(10);
      doc.text("Gaji Pokok:", 30, 100);
      doc.text(formatCurrency(employeeData.basicSalary || 0), 160, 100, { align: "right" });
      
      doc.text("Lembur:", 30, 110);
      doc.text(formatCurrency(employeeData.overtime || 0), 160, 110, { align: "right" });
      
      doc.text("Bonus:", 30, 120);
      doc.text(formatCurrency(employeeData.bonus || 0), 160, 120, { align: "right" });
      
      doc.text("Potongan:", 30, 130);
      doc.text(`(${formatCurrency(employeeData.deductions || 0)})`, 160, 130, { align: "right" });
      
      doc.line(30, 135, 160, 135);
      doc.setFont(undefined, 'bold');
      doc.text("TOTAL DITERIMA:", 30, 145);
      doc.text(formatCurrency(employeeData.totalSalary || 0), 160, 145, { align: "right" });
      doc.setFont(undefined, 'normal');
    }
    
    // TTD
    const yPos = doc.autoTable ? doc.lastAutoTable.finalY + 30 : 170;
    
    doc.text("Jakarta, " + new Date().toLocaleDateString('id-ID'), 130, yPos);
    doc.text("HRD Manager", 130, yPos + 25);
    
    doc.line(130, yPos + 20, 180, yPos + 20);
    doc.text("(____________________)", 130, yPos + 35);
    
    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(
        `PDF ini dibuat secara elektronik dan sah tanpa tanda tangan. | Halaman ${i} dari ${pageCount}`,
        105, 
        doc.internal.pageSize.height - 10, 
        { align: "center" }
      );
    }
    
    return doc;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Gagal membuat slip gaji");
  }
};

/**
 * Download slip gaji
 * @param {Object} employeeData - Data karyawan
 */
export const downloadSalarySlip = (employeeData) => {
  try {
    const doc = generateSalarySlip(employeeData);
    
    // Format nama file dengan periode dan tanggal
    const period = employeeData.period || new Date().toISOString().slice(0, 7);
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const cleanName = employeeData.name.replace(/\s+/g, "_").replace(/[^\w]/g, "");
    
    const fileName = `SlipGaji_${cleanName}_${period}_${date}.pdf`;
    
    doc.save(fileName);
    return true;
  } catch (error) {
    console.error("Error downloading PDF:", error);
    throw new Error("Gagal mengunduh slip gaji");
  }
};