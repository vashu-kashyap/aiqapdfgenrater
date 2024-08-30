"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import Papa from "papaparse";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ClaimForm from "./components/ClaimForm";

export default function Home() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const claimFormsRef = useRef([]);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const csv = event.target.result;
      const result = Papa.parse(csv, {
        header: true,
        skipEmptyLines: true,
      });
      setData(result.data);
    };
    reader.readAsText(file);
  };

  const downloadPDFs = async () => {
    const pdf = new jsPDF();
    for (const [index, formRef] of claimFormsRef.current.entries()) {
      const canvas = await html2canvas(formRef, { scale: 1.5 }); // Adjust scale to reduce resolution
      const imgData = canvas.toDataURL("image/jpeg", 0.5); // Use JPEG and lower quality (0.5)
  
      if (index > 0) {
        pdf.addPage();
      }
  
      const imgWidth = 210*2; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = 297;
      const heightLeft = imgHeight;
  
      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
  
      if (heightLeft > pageHeight) {
        pdf.addPage();
      }
    }
    pdf.save("claim_forms.pdf");
  };

  const clearGeneratedForms = () => {
    setFile(null);
    setData([]);
    claimFormsRef.current = [];
    window.location.reload(); // Reload the page to clear all generated forms
  };



  return (
    <>
      <header>
        <div className="logoimage flex items-center gap-x-4 bg-red-500 w-full h-24 px-4">
          <Image src={"/aiqalogo.jpg"} alt="logo" width={202} height={112} />
          <h1 className="text-4xl text-white font-bold">
            Genrate AiqaHealth Death Claim Form
          </h1>
        </div>
      </header>

      <div>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center h-[80vh] gap-x-10"
        >
          <button
            type="submit"
            className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
          >
            Generate PDF
          </button>

          <label className="block mb-4">
            <span className="block text-gray-600 text-sm font-medium mb-2">
              Choose a CSV file
            </span>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="file-input border"
            />
          </label>
          {data.length > 0 && (
            <button
              className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
              onClick={downloadPDFs}
            >
              Download All as PDF
            </button>
          )}
          {data.length > 0 && (
            <button
              type="button"
              className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
              onClick={clearGeneratedForms}
            >
              Clear Generated Forms
            </button>
          )}
        </form>

        {data.length > 0 &&
          data.map((claim, index) => (
            <div
              className=" mt-5"
              key={claim.loanId}
              ref={(el) => (claimFormsRef.current[index] = el)}
            >
              <ClaimForm
                address={claim.address}
                branch={claim.branch}
                customerName={claim.customerName}
                deathReason={claim.deathReason}
                husbandName={claim.husbandName}
                loanId={claim.loanId}
                mph={claim.mph}
                nominee={claim.nominee}
              />
            </div>
          ))}
      </div>
    </>
  );
}
