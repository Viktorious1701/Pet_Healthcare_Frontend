import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getPetHealthTrackByHospitalizationId } from "@/Services/PetHealthTrackService";
import { PetHealthTrack as PetHealthTrackDTO} from "@/Models/PetHealthTrack";
import { format } from "date-fns";

const PetHealthTrack: React.FC = () => {
  const { hospitalizationId } = useParams<{ hospitalizationId: string }>();
  console.log(hospitalizationId);
  const navigate = useNavigate();

  const [healthTrack, setHealthTrack] = useState<PetHealthTrackDTO[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 5; // Adjust as needed

  useEffect(() => {
    const fetchHealthTrack = async () => {
      try {
        if (hospitalizationId) {
          const data = await getPetHealthTrackByHospitalizationId(hospitalizationId);
          setHealthTrack(data);
        }
      } catch (error) {
        setError("Error fetching pet health track.");
        console.error("Error fetching pet health track:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthTrack();
  }, [hospitalizationId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const filteredHealthTrack = statusFilter
  ? healthTrack.filter((entry) => String(entry.status) === (statusFilter as string))
  : healthTrack;

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHealthTrack.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const getStatusString = (status: string): string => {
    switch (status) {
      case "0":
        return "Healthy";
      case "1":
        return "Sick";
      case "2":
        return "Injured";
      default:
        return "";
    }
  };

  return (
    <div className="flex">
      <div className="flex-1 pl-6">
        <div className="p-2">
          <div className="box-style p-4">
            <div className="col p-3">
              <Button onClick={() => navigate(-1)} className="mb-4 bg-custom-darkPink text-custom-lightGrey">
                Go Back
              </Button>
              <div className="mb-4">
                <label htmlFor="statusFilter" className="mr-2">Filter by Status:</label>
                <select
                  id="statusFilter"
                  value={statusFilter || ''}
                  onChange={(e) => setStatusFilter(e.target.value as string || null)}
                >
                  <option value="">All</option>
                  <option value={0}>Healthy</option>
                  <option value={1}>Sick</option>
                  <option value={2}>Injured</option>
                </select>

              </div>
              <h1 className="text-3xl font-bold text-pink-600 mb-4">Health Track</h1>
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-pink-200">
                  <tr>
                    <th className="py-2 px-4 text-left">Date</th>
                    <th className="py-2 px-4 text-left">Description</th>
                    <th className="py-2 px-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((entry, index) => (
                    <tr key={index} className={index % 2 === 0 ? "even:bg-pink-50" : "odd:bg-pink-100"}>
                      <td className="py-2 px-4">{entry.date ? format(new Date(entry.date), "MM/dd/yyyy") : "-"}</td>
                      <td className="py-2 px-4">{entry.description}</td>
                      <td className="py-2 px-4">{getStatusString(String(entry.status))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination */}
              <div className="mt-4 flex justify-between">
                <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1 || currentPage === 0}>Previous</Button>
                <Button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredHealthTrack.length / itemsPerPage + 1) }>Next</Button> {/* add number 1 if items are 0 for division */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetHealthTrack;
