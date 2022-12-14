import HolidayCreateForm from "./HolidayCreateForm";
import HolidaysTable from "./HolidaysTable";
import Navbar from "./Navbar";

function HolidaysPage() {
  return (
    <>
      <Navbar />
      <h1>Happy Holidays!</h1>
      <HolidayCreateForm />
      <HolidaysTable />
    </>
  );
}

export default HolidaysPage;
