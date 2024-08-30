import Image from "next/image";

const ClaimForm = ({
  customerName,
  husbandName,
  address,
  mph,
  nominee,
  loanId,
  deathReason,
  branch,
}) => {
  // Get the current date and format it as a local date string
  const currentDate = new Date();
  const localDateString = currentDate.toLocaleDateString("en-GB");
  console.log(localDateString)

  return (
    // Main container for the claim form with specified width, height, and padding
    <div className="claimForm  p-10 w-[210mm] h-[297mm] border-2 shadow-xl">
      {/* Header section with logo and date */}
      <div className="header flex justify-between items-end">
        {/* Company logo with specified width and height */}
        <Image
          src="/aiqalogo.jpg"
          alt="aiqalogo"
          width={302}
          height={113}
          className="border-b border-black w-auto h-auto"
        />
        {/* Date display */}
        <time
          dateTime={localDateString}
          className="text-base text-black"
        >
          <span className="font-bold text-lg">Date</span>: {localDateString}
        </time>
      </div>

      {/* Section for customer details */}
      <div className="space-y-3 mt-12 px-4">
        {/* Customer Name */}
        <div className="container grid grid-cols-12">
          <h3 className="col-span-3 text-lg font-bold text-black">
            Customer Name:
          </h3>
          <p className="col-span-9 text-base flex justify-start items-end text-black">
            {customerName}
          </p>
        </div>
        {/* Husband Name */}
        <div className="container grid grid-cols-12">
          <h3 className="col-span-3 text-lg font-bold text-black">
            Husband Name:
          </h3>
          <p className="col-span-9 text-base flex justify-start items-end text-black">
            {husbandName}
          </p>
        </div>
      </div>

      {/* Section for address */}
      <div className="space-y-3 mt-12 px-4">
        <div className="container grid grid-cols-12">
          <h3 className="col-span-2 text-lg font-bold text-black">Address:</h3>
          <p className="col-span-10 text-base flex justify-start items-end text-black">
            {address}
          </p>
        </div>
      </div>

      {/* Section for MPH, Nominee, Branch */}
      <div className="space-y-3 mt-12 px-4">
        <div className="container grid grid-cols-12">
          <h3 className="col-span-3 text-lg font-bold text-black">MPH:</h3>
          <p className="col-span-9 text-base flex justify-start items-end text-black">
            {mph}
          </p>
        </div>
        <div className="container grid grid-cols-12">
          <h3 className="col-span-3 text-lg font-bold text-black">Nominee:</h3>
          <p className="col-span-9 text-base flex justify-start items-end text-black">
            {nominee}
          </p>
        </div>
        <div className="container grid grid-cols-12">
          <h3 className="col-span-3 text-lg font-bold text-black">Branch:</h3>
          <p className="col-span-9 text-base flex justify-start items-end text-black">
            {branch}
          </p>
        </div>
      </div>

      {/* Section for Loan No and Reason for Death */}
      <div className="space-y-3 mt-12 px-4">
        <div className="container grid grid-cols-12">
          <h3 className="col-span-3 text-lg font-bold text-black">Loan No:</h3>
          <p className="col-span-9 text-base flex justify-start items-end text-black">
            {loanId}
          </p>
        </div>
        <div className="container grid grid-cols-12">
          <h3 className="col-span-4 text-lg font-bold text-black">
            Reason for Death:
          </h3>
          <p className="col-span-8 text-base flex justify-start items-end text-black">
            {deathReason}
          </p>
        </div>
      </div>

      {/* Stamp and signature section */}
      <div className="stamp relative px-4 mt-32">
        <Image
          src="/stamp.png"
          alt="authorized person sign"
          width={150}
          height={150}
        />
        <h4 className="font-bold underline absolute bottom-4 -z-50"> 
          Authorized Signature
        </h4>
      </div>
    </div>
  );
};

export default ClaimForm;
