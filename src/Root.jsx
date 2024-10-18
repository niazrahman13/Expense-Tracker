import Navbar from "./Components/Navbar/Navbar";
import SubmissionFormData from "./Components/Submission Form/SubmissionFormData";

export default function Root() {
    return (
        <>
            <Navbar />
            <div className="relative mx-auto mt-10 w-full max-w-7xl">
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <SubmissionFormData />
                </section >
            </div >


        </>
    );
}