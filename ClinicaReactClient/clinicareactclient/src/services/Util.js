import * as html2pdf from 'html2pdf.js';

export const generatePDF = (htmlelement) => {
    //const element = document.querySelector("#relatorioatendimento");
    const opt = {
      margin: 2,
      filename: "relatorioExames.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "cm", format: "letter", orientation: "portrait" },
    };
    
    html2pdf().from(htmlelement).set(opt).save();
};